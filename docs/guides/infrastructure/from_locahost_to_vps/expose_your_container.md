---
title: Expose your container
description: Learn how to expose your containerized frontend and backend applications to the public on different domains using Docker and Nginx. 
keywords: [expose containerized applications, deploy container images, Docker, Nginx, create Docker network, configure Nginx, access container on different domains, frontend, backend]
---

Now we have that we have two image to deploy:
- `my-frontend:0.0.1` for the frontend
- `my-api:0.0.1` for the backend

We want to make them accessible to the public on different domain:
- `my-domain.com` for the frontend
- `api.my-domain.com` for the backend

Be sure to have a VPS or a Dedicated/Baremetal server available.
and that your `my-domain.com` it pointing to his ip address
also make sure to have Docker installed on your server.

## Upload our image to the server

First we will need to save and export our image.
We can do it with the following command:

```sh
docker save my-frontend:0.0.1 | gzip > /tmp/my-frontend-0.0.1.tar.gz
docker save my-api:0.0.1 | gzip > /tmp/my-api-0.0.1.tar.gz
```

I assume you have ssh already setup for your vps so you can upload you image using scp:

```sh
scp /tmp/my-frontend-0.0.1.tar.gz /tmp/my-api-0.0.1.tar.gz my-user@my-domain.com:~
```

Then connect to your vps using ssh:
```sh
ssh my-user@my-domain.com
```

Load your container images:
```sh
cat ~/my-frontend-0.0.1.tar.gz | docker load
cat ~/api-0.0.1.tar.gz | docker load
```

## Start your images

Now that our image have been loaded inside our server we can run them.<br />
But before we are going to create a docker network:
```sh
docker network create my-domain
```

Then we can run our images:
```sh
docker run -d --network my-domain --name my-frontend my-frontend:0.0.1
docker run -d --network my-domain --name my-api my-api:0.0.1
```

## Setup Nginx

There is multiple way to install [Nginx](https://www.nginx.com) depending on the operating system of your server.<br />
We wont cover it there but if you are running Ubuntu you can use:
```sh
sudo apt install -y nginx
```

In most of case the configuration folder of Nginx will be inside `/etc/nginx`

Now let's create our Nginx configuration under `/etc/nginx/sites-enabled/my-domain.com`

```nginx
server {
    listen 80;
    server_name my-domain.com;

    location / {
        proxy_pass http://ip_of_frontend_container:80;
    }
}
```

You can get the ip of your frontend container by running one of this commands:
```
docker network inspecy my-domain
docker container inspect my-frontend
```

Now let's add the same file for you api under `/etc/nginx/sites-enabled/api.my-domain.com`:
```nginx
server {
    listen 80;
    server_name api.my-domain.com;

    ## To allow versioning
    ## We can add a location /v1/ to the next version of our api and keep the old container running
    ## note that the last / is important
    location /v0/ {
        proxy_pass http://ip_of_api_container:80/;
    }
}
```

You can get the ip of your api container by running one of this commands:
```
docker network inspecy my-domain
docker container inspect my-api
```

Now we can reload nginx configuration:
```sh
sudo nginx -s reload
```

You should now be able to access to your containers from `http://my-domain.com` to access to the frontend and `http://api.my-domain.com/v0` for the backend

---
title: Expose your container
description: Learn how to make your containerized frontend and backend applications accessible to the public on different domains using Docker and Nginx.
keywords: [expose containerized applications, deploy container images, Docker, Nginx, create Docker network, configure Nginx, access container on different domains, frontend, backend]
---

To make `my-frontend:0.0.1` accessible at `my-domain.com` and `my-api:0.0.1` at `api.my-domain.com`, make sure you have a VPS or Dedicated/Baremetal server, and that `my-domain.com` and `api.my-domain.com` are pointing to It.<br/>
Additionally, make sure Docker is installed on your server.

## Uploading our Images to the Server

To save and export our container images, we can use the following command:
```sh
docker save my-frontend:0.0.1 | gzip > /tmp/my-frontend-0.0.1.tar.gz
docker save my-api:0.0.1 | gzip > /tmp/my-api-0.0.1.tar.gz
```

Assuming that you have set up SSH for your VPS, you can upload your images using the scp command:
```sh
scp /tmp/my-frontend-0.0.1.tar.gz /tmp/my-api-0.0.1.tar.gz my-user@my-domain.com:~
```

Next, connect to your VPS using SSH:
```sh
ssh my-user@my-domain.com
```

Finally, load your container images:
```sh
cat ~/my-frontend-0.0.1.tar.gz | docker load
cat ~/api-0.0.1.tar.gz | docker load
```

## Start your images

After loading the images into the server, create a Docker network before running the images using the following command:
```sh
docker network create my-domain
```

Now, start the images using the following commands:
```sh
docker run -d --network my-domain --name my-frontend my-frontend:0.0.1
docker run -d --network my-domain --name my-api my-api:0.0.1
```

You can notices few flags being used, there is some information on them:
- `run`: Create and run a new container from an image.
- `-d`: Detached mode run the container in the background and print the new container ID.
- `--network`: Set the Network mode for the container.
- `--name`: Set the name of your container.
- `my-frontend|my-api`: Name of your container.
- `my-frontend:0.0.1|my-api:0.0.1`: Image to use to create the container.

## Setting up Nginx

There are multiple ways to install [Nginx](https://www.nginx.com), depending on the operating system of your server.<br />
For Ubuntu, you can use the following command to install Nginx:
```sh
sudo apt install -y nginx
```
The configuration folder of Nginx is typically located at `/etc/nginx`.

Next, create the Nginx configuration file for `my-domain.com` at `/etc/nginx/sites-enabled/my-domain.com`.

```nginx
server {
    listen 80;
    server_name my-domain.com;

    location / {
        proxy_pass http://ip_of_frontend_container:80;
    }
}
```

To get the IP address of your frontend container, run one of these commands:
```
docker network inspecy my-domain
docker container inspect my-frontend
```

Next, create the configuration file for `api.my-domain.com` at `/etc/nginx/sites-enabled/api.my-domain.com`.
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

To get the IP address of your API container, run one of these commands:
```
docker network inspecy my-domain
docker container inspect my-api
```

Finally, reload the Nginx configuration with the following command:
```sh
sudo nginx -s reload
```

You should now be able to access to your containers from `http://my-domain.com` to access to the frontend and `http://api.my-domain.com/v0` for the backend

## Enabling HTTPS with Certbot

Like Nginx, there is multiple way to install [Certbot](https://certbot.eff.org) depending on your operating system.<br />
For Ubuntu, you can use the following command to install Certbot:
```sh
sudo apt install -y certbot
```

Certbot has an Nginx plugin that will turn our HTTP config into HTTPS with its generated SSL certificate.<br />
To use it, we can run the following command:
```sh
certbot --nginx --email email@email.com --agree-tos -d your-domain.com
certbot --nginx --email email@email.com --agree-tos -d api.your-domain.com
```

Once the SSL certificate is generated, let's update our Nginx configurations.

For `/etc/nginx/sites-enabled/my-domain.com`, update it as follows:
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name my-domain.com;

    ssl_certificate      /etc/letsencrypt/live/my-domain.com/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/my-domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    if ($scheme != https) {
        return 301 https://$host$request_uri;
    }

    location / {
        proxy_pass http://ip_of_your_container:80;
    }
}
```

And for `/etc/nginx/sites-enabled/api.my-domain.com`, update it as follows:
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name api.my-domain.com;

    ssl_certificate      /etc/letsencrypt/live/api.my-domain.com/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/api.my-domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;

    if ($scheme != https) {
        return 301 https://$host$request_uri;
    }

    location /v0/ {
        proxy_pass http://ip_of_your_container:80/;
    }
}
```

Note that we have added SSL configurations and a redirect to HTTPS if the scheme is not already HTTPS.

Finally, we can reload the Nginx configuration:
```sh
sudo nginx -s reload
```

You should now be able to access your containers securely with HTTPS from `https://my-domain.com` to access the frontend and `https://api.my-domain.com/v0` for the backend.

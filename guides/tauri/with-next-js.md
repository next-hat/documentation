<h1 id="nxtmdoc-meta-title">Crossplatform app with Next.js and Tauri</h1>

<blockquote class="tags">
	<strong>Tags</strong>
	</br>
 <span id="nxtmdoc-meta-keywords">
	  Guide, Tutorial, Tauri, Next, Next.js, Nextauri, Crossplatform, App, Windows, Linux, Mac
  </span>
</blockquote>

<p id="nxtmdoc-meta-description">
This page contains step-by-step instructions on how to setup Next.js with Tauri from scratch.
In this tutorial, you’ll see how to:
</p>

- Install Next.js
- Install Tauri
- Build both of them for production

<h2>
Motivation
</h2>

Tauri is great to make cross platform application backed by the `Rust` langage.
It will load an HTML page and add native binding on his context.
Next.js will be the perfect fit for bundle `React` application with `Tauri` it comes with both `SSR` (Server-Side Rendering) and `SSG` (Static-Site Generation) capabilities.
To make Next.js work with Tauri we are going to use the SSG mode since it generates static files that can be included in the final binary.

- The `benefit` of using Next.js SSG mode is pre-rendered React code in static HTML/JavaScript. This means your app will load faster. React doesn't have to render the `HTML` on the client-side but will hydrate it on the first load if needed.
- But the `downside` is that we cannot use `getServerSideProps` or use any type of data fetching for rendering our page. Instead we can use `getStaticProps` to generate our page at build time.

<h2>
Create Next.js project
</h2>

Next.js comes with a scaffolding utility called `create-next-app` that can quickly setup a new project from a number of pre-defined templates. For this guide we will use the `TypeScript` template to create a simple project.

```sh
npx create-next-app@latest --use-npm --typescript
```

- 	Project name </br>
		This will be the name of your project. It corresponds to the name of the folder this utility will create but has otherwise no effect on your app. You can use any name you want here.

When starting or building the frontend, Next.js will look for a config file named `next.config.js` inside the project root. We want to customize this file to get the best compatibility with Tauri.

Update the file with the following content:
```js
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Note: This experimental feature is required to use NextJS Image in SSG mode.
  // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

To be able to build in production we must add a next export command in package.json. This will produce a static HTML/JavaScript version of your Next.js application in the out folder. We'll also add the tauri command to package.json.

Your package.json should look like this:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "start": "next start",
    "tauri": "tauri",
    "lint": "next lint"
  },
```

<h2>
Include Tauri
</h2>

At the heart of every Tauri app is a Rust binary that manages windows, the webview, and calls to the operating system through a Rust crate called tauri. This project is managed by Cargo, the official package manager and general-purpose build tool for Rust.

Our Tauri CLI uses Cargo under the hood so you rarely need to interact with it directly. [Cargo](https://doc.rust-lang.org/cargo) has many more useful features that are not exposed through our CLI, such as testing, linting, and formatting, so please refer to their official docs for more.

1.  Install Tauri CLI
    ```sh
    npm install --save-dev @tauri-apps/cli
    ```

2.  Init Tauri inside your project
    ```sh
    npm run tauri init
    ```

    It will walk you through a series of questions:

    -   What is your app name? </br>
        This will be the name of your final bundle and what the OS will call your app. You can use any name you want here.

    -   What should the window title be? </br>
        This will be the title of the default main window. You can use any title you want here.
        Where are your web assets (HTML/CSS/JS) located relative to the <current dir>/src-tauri/tauri.conf.json file that will be created?
        This is the path that Tauri will load your frontend assets from when building for production.
        Use ../out for this value.

    -   What is the URL of your dev server? </br>
        This can be either a URL or a file path that Tauri will load during development.
        Use http://localhost:3000 for this value.

    -   What is your frontend dev command? </br>
        This is the command to used to start your frontend dev server.
        Use npm run dev for this value.

    -   What is your frontend build command? </br>
        This the the command to build your frontend files.
        Use npm run build && npm run export for this value.

The `tauri init` command generates a folder called `src-tauri`. It's a convention for Tauri apps to place all core-related files into this folder. Let's quickly run through the contents of this folder:

-   `Cargo.toml` </br>
    Cargo's manifest file. You can declare Rust crates your app depends on, metadata about your app, and much more. For the full reference see Cargo's Manifest Format.

-   `tauri.conf.json` </br>
    This file lets you configure and customize aspects of your Tauri application from the name of your app to the list of allowed APIs. See Tauri's API Configuration for the full list of supported options and in-depth explanations for each.

-   `src/main.rs` </br>
    This is the entrypoint to your Rust program and the place where we bootstrap into Tauri. You will find two sections in it:
    ```rust
    #![cfg_attr(
      all(not(debug_assertions), target_os = "windows"),
      windows_subsystem = "windows"
    )]

    fn main() {
      tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    }
    ```
    The line beginning with cfg! macro serves just one purpose: it disables the command prompt window that would normally pop up on Windows if you run a bundled app. If you're on Windows, try to comment it out and see what happens.

    The main function is the entry point and the first function that gets invoked when your program runs.

-   `icons` </br>
    Chances are you want a snazzy icon for your app! To get you going quickly, we included a set of default icons. You should switch these out before publishing your application. Learn more about the various icon formats in Tauri's [icons feature guide](https://tauri.app/v1/guides/features/icons).

Now that we have scaffolded our frontend and initialized the Rust project you're almost ready to run your app. Your tauri.conf.json file should look something like this:

```json
{
  "build": {
    "beforeBuildCommand": "npm run build && npm run export",
    "beforeDevCommand": "npm run dev",
    "devPath": "http://localhost:3000",
    "distDir": "../out"
  },
```

And that's it! Now you can run the following command in your terminal to start a development build of your app:

```sh
npm run tauri dev
```

<h2>
Invoke Commands
</h2>

Tauri lets you enhance your frontend with native capabilities. We call these Commands, essentially Rust functions that you can call from your frontend JavaScript. This enables you to handle heavy processing or calls to the OS in much more performant Rust code.

Let's make a simple example edit `src-tauri/src/main.rs` and add this function :

```rust
#[tauri::command]
fn greet(name: &str) -> String {
   format!("Hello, {}!", name)
}
```

A Command is just like any regular Rust function, with the addition of the #[tauri::command] attribute macro that allows your function to communicate with the JavaScript context.

Lastly, we also need to tell Tauri about our newly created command so that it can route calls accordingly. This is done with the combination of the `.invoke_handler()` function and the `generate_handler![]` macro you can see below:

```rust
fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

Now you're ready to call your Command from the frontend!

To call our newly created command we will use the `@tauri-apps/api` JavaScript library. It provides access to core functionality such as window manipulation, the filesystem, and more through convenient JavaScript abstractions. You can install it using your favorite JavaScript package manager:

```sh
npm install @tauri-apps/api
```

With the library installed, you can modify your `pages/index.ts` file to call the Command:

```tsx
import { invoke } from '@tauri-apps/api/tauri'

// Note: When working with Next.js in development you have 2 execution contexts:
// - In server side where Tauri cannot be called because it's out of the context.
// - In client side where Tauri can be executed.
// To know if we are in server or client side we can do the following:
const isClient = typeof window !== 'undefined'

// Now we can call our Command!
// Right-click on the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
isClient &&
  invoke('greet', { name: 'World' }).then(console.log).catch(console.error)
```

A better approach would be to use Tauri calls in componentDidMount or useEffect that are only run on the client-side by Next.js.

So to make it cleaner we should rewrite it like this:

```tsx
import { invoke } from "@tauri-apps/api/tauri"

const Home: NextPage = () => {
  useEffect(() => {
    invoke('greet', { name: 'World' })
    .then(console.log)
    .catch(console.error)
  }, []);
```


<h2>
Nextauri
</h2>

Alternativelly you should considere take a look at [nextauri](https://github.com/leon3s/nextauri) this is a starter with best practice setups to make you win time.

It came with:
- Next.js
- Typescript
- Eslint (for lint javascript code)
- Tauri
- Clippy (for lint rust code)
- Github workflows to build and lint your code.

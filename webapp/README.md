# A Gridsome Vue.js project

This is a starter project for a Strapi-cms powered Vue.js website.

## Initial project setup

Basically: in Git Bash window, run `gridsome create webapp` in parent folder.

In detail:

### 1. Install Gridsome CLI tool globally if you don't have it already

```bash
npm install --global @gridsome/cli
```

### 2. Create the starter Gridsome project

1. run `gridsome create webapp` in parent folder
2. `cd webapp` to open the folder
3. `gridsome develop` to start a local dev server at `http://localhost:8080`
4. Modify package.json to customize server port and add production build:

  ``` javascript
  "scripts": {
      "build": "gridsome build",
      "dev": "gridsome develop -p 9011",
      "explore": "gridsome explore",
      "prod": "gridsome build && serve -s dist -p 9012"
    },
  ```

### 3. Run Gridsome server

1. `run dev` to start development server
2. `run prod` to pre-build production site and run local prod server.

The production-ready site is deployed to the `dist` folder,
the contents of which can be copied to your webhost as a static-served website.

## Features

- Custom lightweight bare-bones markdown parser which allows for project-specific extensions.
- Favicon definitions.

Changes in the code, during development, cause an automatic (hot) reload of the webapp. Changes made in content in the Strapi CMS require a manual reload of the corresponding webpage (but a server restart is not required).

## Static versus managed assets

Static assets like the favicon icons are stored in the `static` folder.

Managed assests like images that are referenced in the code through the `<g-image>` tag should be stored in the `src\assets` folder.

Note: confusingly, Gridsome will copy everything (including subfolder structures) inside the `static` folder directly to the `dist` distribution folder, while everything in `src\assets` is transformed and copied (excluding subfolder structures) into an `assets\static` subfolder of `dist`. Thus the folder named `static` in the distribution folder does not relate to the folder named `static` in the sources folder.

## Environment variables

In the project's root folder (`webapp`), create files `.env.development.`and `.env.production` to store environment variables.

  E.g. for the Strapi CMS URL in development add the line:
  `GRIDSOME_CMS_URL=http://localhost:1337`
  which is accessed in `gridsome.config.js` as `process.env.GRIDSOME_CMS_URL`.

(Variables that should be available in the browser must be prefixed with `GRIDSOME_`. Variables without that prefix are available to the Gridsome server only; for security reasons.)

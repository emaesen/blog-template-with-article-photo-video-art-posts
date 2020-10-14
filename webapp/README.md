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

## Static versus managed assets

Static assets like the favicon icons are stored in the `static\assets` folder.

Managed assests like images that are referenced in the code through the `<g-image>` tag are stored in the `src\assets` folder.


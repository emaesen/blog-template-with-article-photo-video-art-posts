# Strapi application

A Content Management System for a simple article-based webapp with a graphql API and MongoDB content store.
<https://strapi.io/documentation/v3.x/getting-started/introduction.html>

Open the user interface at <http://localhost:1337/>

Inspect the graphql at <http://localhost:1337/graphql>

A MongoDB service is assumed to be installed and running on the host system. Access control is to be configured in `/config/env/development/database.js` and `/config/env/production/database.js`.

Note: MongoDB is not required to be used, you may use Strapi's embedded default data store as well.

## My impressions of Strapi

- It's a decent CMS
  - The UI interface looks nice
    - but I wish there was a way to customize it.
  - I can do most of what I want
    - but it's not possible to define dynamic zones in components.
  - Sometimes a component allows a nested component field, othertimes that option is not available.
  - Once a field is added to a component it can't be removed through the UI interface
    (but can be manually deleted from the corresponding config file)
- Its architecture is brittle:
  - It has frequent non-descriptive "an error occured" messages.
    - Reloading the page seems to resolve whatever the issue is.
    - Once however the hole system got messed up.
        Server could not restart anymore.
        Un-installing and re-installing was the only solution to fix the issue.
        (Initially the re-install process selected a newer version which led to even more errors - only re-installing to the exact same version as before solved the problem)
  - changing a property name doesn't always propagate to the graphql schema
  - adding a new property to an existing component sometimes is non-editable when trying to use in a content type.
    - restarting the server may or may not fix this.

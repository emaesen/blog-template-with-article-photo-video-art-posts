# Strapi application

A Content Management System for a simple article-based webapp with a graphql API and MongoDB content store.
<https://strapi.io/documentation/v3.x/getting-started/introduction.html>

Open the user interface at <http://localhost:1337/>

Inspect the graphql at <http://localhost:1337/graphql>

A MongoDB service is assumed to be installed and running on the host system. Access control is to be configured in `/config/env/development/database.js` and `/config/env/production/database.js`.

Note: MongoDB is not required to be used, you may use Strapi's embedded default data store as well.

## Customization

This implementation has a custom image upload service that allows a quality setting to be configured.

## My impressions of Strapi (V3.1.4)

- It's a decent CMS, but has numerous issues - mainly at the *admin* stage when new content properties are defined. In the *content editing* stage no major issues have been encountered.
  - The UI interface looks nice
    - but I wish there was a way to customize it.
  - I can do most of what I want
    - but it's not possible to define dynamic zones in components.
  - Sometimes a component allows a nested component field, othertimes that option is not available.
  - Once a field is added to a component it can't be removed through the UI interface
    - but can be manually deleted from the corresponding config file.
    - removing a field with a specific name and adding a new component with the same name results in a blank page and a cryptic error message in the server log: "TypeError: Cannot read property '0' of undefined".
    - a date field, once entered, can not be erased through the UI interface
  - If a media file is replaced, the newly uploaded file gets the name of the old file. It should retain its original new filename so that any cached versions of the old file are ignored.
- Its architecture is brittle:
  - It has frequent non-descriptive "an error occured" messages.
    - Reloading the page seems to resolve whatever the issue is.
    - Once however the whole system got messed up.
      - Server could not restart anymore.
      - Un-installing and re-installing was the only solution to fix the issue.
        - (Initially the re-install process selected a newer version which led to even more errors - only re-installing to the exact same version as before solved the problem)
  - changing a property name doesn't always propagate to the graphql schema
  - adding a new property to an existing component sometimes is non-editable and grayed out ("No permission to see this field") when trying to use in a content type.
    - reloading the page or restarting the server may or may not fix this.
  - if you create a Single Type with the same name (but singular) as a Collection Type (plural name), the application shows again a non-descriptive "an error occured" message.
    - in that case it's not possible to restart the server.
    - the conflicting configuration files need to be manually removed before the server can be restarted.

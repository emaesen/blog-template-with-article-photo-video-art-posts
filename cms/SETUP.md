# Strapi CMS setup

## Database setup

This project uses MongoDB by default, but you can use any other databse supported by Strapi. See the Strapi documentation.

For instance if you want to use SQLite, you need to install three corresponding packages:

`npm install strapi-connector-bookshelf`

`npm install sqlite3`

`npm install knex`

## Basic setup of CMS

Run `npm dev start` to start the CMS server.

Open the admin console at <http://localhost:1337/admin>
Enter your user information and choose a password.

You should now be able to see all pre-defined collections and pages.

Next ensure that the webpage has permission to access the relevant CMS data:

Click "Roles & Permissions" in the left column.
Select the "Public" role.
In the permissions dashboard check all instances of "find", "findone" and "count" under "Application".
Expand the "UPLOAD" section further below.
Check "find", "findone" and "count" under "UPLOAD".
SAVE the settings.

## Content entry in CMS

The web application should now be able to run, but all pages will be blank.

The "Collection Types" in the left collumn relate to the different post types and their taxonomy.

The "Single Types" in the left column relate to pages in the webapp.

Enter some information and view the results in the webpage. (the cms server should restart automatically but you may have to reload the webpage to see recent changes)

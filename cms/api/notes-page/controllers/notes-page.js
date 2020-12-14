'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// `sanitizeEntity` removes all private fields from the model 
// and its relations
const { sanitizeEntity } = require('strapi-utils');

module.exports = {

  async find(ctx) {
    console.log("find NotesPage")
    const entity = await strapi.services.notesPage.find();
    return sanitizeEntity(entity, { model: strapi.models.notesPage });
  },
};

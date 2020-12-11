'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// `sanitizeEntity` removes all private fields from the model 
// and its relations
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;
    console.log("findOne note: " + slug)
    const entity = await strapi.services.note.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.note });
  },
  async find(ctx) {
    let entities;
    console.log("find note: ", ctx.query)
    if (ctx.query._q) {
      entities = await strapi.services.note.search(ctx.query);
    } else {
      entities = await strapi.services.note.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.note }));
  },
};


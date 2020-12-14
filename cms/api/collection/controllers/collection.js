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
    const { title } = ctx.params;
    console.log("findOne collection: " + title)
    const entity = await strapi.services.collection.findOne({ title });
    return sanitizeEntity(entity, { model: strapi.models.collection });
  },
  async find(ctx) {
    let entities;
    console.log("find collection: " + ctx.query.title)
    if (ctx.query._q) {
      entities = await strapi.services.collection.search(ctx.query);
    } else {
      entities = await strapi.services.collection.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.collection }));
  },
};


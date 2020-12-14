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
    console.log("findOne photo: " + slug)
    const entity = await strapi.services.photo.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.photo });
  },
  async find(ctx) {
    let entities;
    console.log("find photo: ", ctx.query)
    if (ctx.query._q) {
      entities = await strapi.services.photo.search(ctx.query);
    } else {
      entities = await strapi.services.photo.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.photo }));
  },
};


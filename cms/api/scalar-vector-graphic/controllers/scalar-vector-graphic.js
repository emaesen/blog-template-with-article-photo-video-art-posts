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
    const { valueOfIdAttributeInSvg } = ctx.params;
    console.log("findOne scalarVectorGraphic: " + valueOfIdAttributeInSvg)
    const entity = await strapi.services['scalar-vector-graphic'].findOne({ valueOfIdAttributeInSvg });
    return sanitizeEntity(entity, { model: strapi.models['scalar-vector-graphic'] });
  },
  async find(ctx) {
    let entities;
    console.log("find scalarVectorGraphic: ", ctx.query)
    if (ctx.query._q) {
      entities = await strapi.services['scalar-vector-graphic'].search(ctx.query);
    } else {
      entities = await strapi.services['scalar-vector-graphic'].find(ctx.query);
    }
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['scalar-vector-graphic'] }));
  },
};


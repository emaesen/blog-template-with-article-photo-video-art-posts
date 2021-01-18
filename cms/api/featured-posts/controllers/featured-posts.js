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
    console.log("find Featured Posts")
    const entity = await strapi.services['featured-posts'].find();
    return sanitizeEntity(entity, { model: strapi.models['featured-posts'] });
  },
};

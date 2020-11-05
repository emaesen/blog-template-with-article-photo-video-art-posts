'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// `sanitizeEntity` removes all private fields from the model 
// and its relations
const { sanitizeEntity } = require('strapi-utils');
const condenceImageSliderData = require('../../../custom-utils/condence-image-slider-data');

module.exports = {

  async find(ctx) {
    console.log("find Home")
    const entity = await strapi.services.home.find();
    const sanitizedData = sanitizeEntity(entity, { model: strapi.models.home })
    const condencedData = condenceImageSliderData(sanitizedData)
    return condencedData;
  },
};

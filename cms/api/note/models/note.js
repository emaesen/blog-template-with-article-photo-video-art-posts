'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate(data) {
      // overwrite any manually entered slug with a semi-random
      // 10-character id
      // using a simple date-based id generator
      data.slug = ((new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)).substring(2,12)
    },
  },
};

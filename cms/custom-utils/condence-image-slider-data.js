'use strict';
const _ = require('lodash');

/* The image slider provides a "choice" between a linkImage
 * and an articleLink. It's a component, which doesn't support
 * a dynamic zone, so both types can potentially be filled out.
 * The resulting data is a complex collection of properties, some
 * optional. So we'll condence it into something managable here.
 */

/* The modified data show up in the REST API, but for graphql the 
 * schema would have to be custom extended. 
 * That's possible (https://hashinteractive.com/blog/strapi-customize-graphql-schema-example/),
 * but there are several problems/complications:
 * - that schema is auto-generated, 
 * - and these Image Sliders can appear anywhere,
 * - in multiple places,
 * - potentially nested deep within a data structure.
 * It seems impracticle and a maintenance nightmare to extend the
 * graphql schema programatically.
 * So my solution in this project is a fairly simple work-around: 
 * - create a new Slide component in the API CMS,
 *     - which has all the properties of the `slide` that is 
 *       defined below here
 *     - and thus auto-generates the desired corresponding graphql
 *       schema
 * - include the Slide component in the SliderImage component
 * - configure the view of the SliderImage component and hide the
 *   Slide component, so the CMS user doesn't see it
 * Thus Slide provides a placeholder for the code below to populate.
 * The graphql schema will still have the orignal linkImage and
 * articleLink fields, but both will always be null.
 */
const condenceImageSliderData = (sourceData) => {
  if (typeof sourceData !== 'object' || _.isNil(sourceData)) {
    return sourceData;
  }
  let data = sourceData;
  data.content.map(section => {
    let type = section.__component
    console.log("section " + type)
    if (type === "sections.images-slider") {
      let sliderImages = section.sliderImages
      console.log("sliderImages ", sliderImages)
      let condensedSliderImages = sliderImages.map(item => {
        let condenced = {}
        const articleLink = item.articleLink
        const linkImage = item.linkImage
        if (linkImage && articleLink) {
          console.warn ("Images Slider item has an article as well as an additional image defined. The image will be ignored.")
        }
        if (linkImage) {
          condenced.type = linkImage.url.startsWith("/") ? "internal" : "external"
          condenced.title = linkImage.title
          condenced.url = linkImage.url
          condenced.image = linkImage.image
        }
        if (articleLink) {
          let article = articleLink.article
          condenced.type = "article"
          condenced.title = article.title
          condenced.slug = article.slug
          condenced.url = "/article/" + article.slug
          condenced.image = article.coverImage
        }
        // replace original image containers with new slide
        delete item.articleLink
        delete item.linkImage
        item.slide = condenced
        return item
      })
      section.__condencedData = true
      // replace the original section
      delete section.images
      delete section.sliderImages
      section.sliderImages = condensedSliderImages
      // remove unwanted properties
      delete section.LinkImage
      delete section.linkImages
    }
    return section
  })
  return data
}

module.exports = condenceImageSliderData;
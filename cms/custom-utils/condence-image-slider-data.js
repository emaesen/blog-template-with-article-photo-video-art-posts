'use strict';
const _ = require('lodash');

/* The image slider data is a complex collection of properties, some
 * optional. So we'll condence it into something managable here
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
export function getSeoMetaTags(title, description, image, url, siteName) {
  let metas = [
    {
      key: 'description',
      name: 'description',
      content: description,
    },
    {
      key: 'og:title',
      property: 'og:title',
      content: title,
    },
    {
      key: 'twitter:title',
      name: 'twitter:title',
      content: title,
    },
    {
      key: 'og:description',
      property: 'og:description',
      content: description,
    },
    {
      key: 'twitter:description',
      name: 'twitter:description',
      content: description,
    },
  ]

  if (url) {
    metas.push({
      key: 'og:url',
      property: 'og:url',
      content: url,
    })
  }

  if (siteName) {
    metas.push({
      key: 'og:site_name',
      property: 'og:site_name',
      content: siteName,
    })
  }

  if (image) {
    metas.push({
      key: 'og:image',
      property: 'og:image',
      content: image,
    },
    {
      key: 'twitter:image',
      name: 'twitter:image',
      content: image,
    },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    })
  } else {
    metas.push({
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary',
    })
  }

  return metas
}

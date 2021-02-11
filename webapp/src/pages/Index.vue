<template>
  <div class="main-index">

    <h1>{{ homePage.title }}</h1>

    <div class=" h-card vcard">

      <div id="author" class="author personal">
        <a class="u-url u-uid" rel="author" href="#author"></a>
        <div class="photo u-photo" v-if="photoUrl">
          <g-image :src="photoUrl" width="100"/>
        </div>
        <div>
          <div class="name p-name fn cursive">
            {{ author.name }}
          </div>
          <div class="p-location location emph" :title="location">
            {{ location }}
          </div>
          <div class="email" v-if="author.email">
            <a
              rel="me noopener noreferrer nofollow"
              :href="'mailto:' + author.email"
              class="u-email"
            >{{ author.email }}</a>
          </div>
        </div>
        <div class="p-role role">
          <span
            v-for="tag in author.tag"
            :key="tag.name"
            class="tag p-category category cursive"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>

      <div class="organizations" v-if="organizations">
        <dl
          v-for="org in organizations"
          :key="org.id"
          class="organization p-org"
        >
          <dt>
          <span class="p-role">
            {{ org.role }}
          </span>
          <span v-if="!org.website" class="p-name">
            {{ org.name }}
          </span>
          <span v-if="org.website">
            <a
              :href="org.website.url"
              target="_blank"
              rel="me noopener noreferrer nofollow"
              class="nowrap u-url"
            >{{ org.name }}</a>
          </span>
          </dt>
          <dd v-if="org.website" class="description p-summary">
            {{ org.website.description }}
          </dd>
        </dl>
      </div>

    </div>

    <Content :content="homePage.content" />


  </div>
</template>

<page-query>
query IndexPage {
  cms {
    # Get global data
    global {
      author {
        name
        photo {
          url
        }
        tag {
          name
        }
        email
        address {
          city
          state_province
          country
        }
      }
      organization {
        id
        name
        role
        associatedSince
        associatedUntil
        website {
          url
          title
          description
        }
      }
    }
    # Get homepage data
    home {
      # Metadata for SEO
      seo {
        title
        description
        shareImage {
          id
          url
        }
      }
      title
      content {
        __typename
        ... on cmsTypes_ComponentSectionsRichText {
          id
          content
        }
        ... on cmsTypes_ComponentSectionsLargeMedia {
          id
          media {
            id
            url
            mime
          }
          description
        }
        ... on cmsTypes_ComponentSectionsImagesSlider {
          id
          title
          sliderImages {
            id
            slide {
              type
              title
              slug
              url
              image {
                name
                url
              }
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Content from '~/components/Content'

import { getCmsMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/meta-tags'


export default {
  name: 'Index',
  components: {
    Content,
  },
  data() {
    return {
    }
  },
  metaInfo() {
    return getMetaTags(this.homePage.seo) 
  },
  computed: {
    homePage() {
      return this.$page.cms.home || {}
    },
    global() {
      return this.$page.cms.global || {}
    },
    author() {
      return this.global.author || {}
    },
    address() {
      return this.author.address || {}
    },
    photoUrl() {
      return getCmsMedia(this.author.photo && this.author.photo.url)
    },
    organizations() {
      return this.global.organization
    },
    location() {
      let loc = []
      if (this.address.city) loc.push(this.address.city)
      if (this.address.state_province) loc.push(this.address.state_province)
      if (this.address.country) loc.push(this.address.country)
      return loc.join(", ")
    }
  },
}
</script>

<style lang="less" scoped>
.u-uid {
  display: none;
}
.photo {
  width: 40%;
  max-width: 180px;
  img {
    border-radius: 18px;
    margin-left: 5px;
    box-shadow: 0 0 7px var(--color_border_accent-1);
  }
}
.author {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2em;
  > * {
    margin-right: 2em;
  }
}
.name {
  line-height: 1em;
  font-size: 2em;
  margin-bottom: 1em;
}
.role {
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 120%;
}
.category {
  text-align: center;
}
.email {
  margin-top: 1em;
  font-size: 90%;
  text-align: center;
  opacity: .7;
}

.organization {
  font-style: italic;
  text-align: center;
  dt,dd {
    margin: 0;
    margin-inline: 0 0;
  }
  .description {
    font-size: 90%;
    opacity: .7;
  }
}

@media all and (max-width: 650px) {
  .author {
    flex-direction: column;
  }
  .name {
    margin-top: .9em;
    margin-bottom: .1em;
  }
  .location {
    margin-bottom: .1em;
  }
  .role {
    margin-top: .9em;
    line-height: 1.6em;
  }
}
</style>

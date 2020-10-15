<template>
  <footer class="">
    <p class="">
      {{ $static.cms.global.siteName }}
    </p>
    <div class="">
      <!-- Site name, contact email and copyright -->
      <div class="">
        <p>{{ $static.cms.global.contactEmail }}</p>
        <p class="">
          Copyright {{ new Date().getFullYear() }}
        </p>
      </div>
      <!-- Site pages -->
      <ul class="">
        <li
          v-for="page in pages" 
          :key="page.path"
        >
          <g-link
            :to="page.path"
            class=""
          >
            {{ page.title }}
          </g-link>
        </li>
      </ul>
      <!-- Social network links -->
      <ul class="">
        <li
          v-for="socialNetwork in $static.cms.global.socialNetworks" 
          :key="socialNetwork.id"
        >
          <a
            :href="socialNetwork.url"
            target="_blank"
            rel="noopener noreferrer"
            class=""
          >
            <img
              :src="getCmsMedia(socialNetwork.icon.url)"
              :alt="socialNetwork.title"
              class=""
            />
            <span>{{ socialNetwork.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { getCmsMedia } from '~/utils/medias'

export default {
  methods: {
    getCmsMedia,
  },
  computed: {
    pages() {
      // Select random project index
      const { projects } = this.$static.cms
      const randomIndex = Math.floor(Math.random() * projects.length)
      return [
        {
          title: 'Home',
          path: '/',
        },
        {
          title: 'About',
          path: '/about',
        },
        {
          title: 'Random project',
          path: `/project/${projects[randomIndex].slug}`,
        }
      ]
    },
  }
}
</script>

<static-query>
query {
  cms {
    global {
      siteName
      contactEmail
      socialNetworks {
        id
        url
        title
        icon {
          id
          url
        }
      }
    }
    projects {
      id
      slug
    }
  }
}
</static-query>

/**
 * Mixin to implement animation when element comes into view
 *
 * Add custom directive `v-lazyload-on-intersection` to an element to add
 * an observer which will trigger an animation behavior 
 * (default class is defined by this.defaultAnimationClass;
 *  override this with a custom class on the element).
 * 
 */

import observeIntersection from '@/mixins/observe-intersection.js';
import vObserveIntersection from "@/directives/v-observe-intersection.js";

export default {
  name: 'mixins/lazyload-on-intersection',
  directives: {
    lazyloadOnIntersection: vObserveIntersection
  },
  mixins: [observeIntersection],
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    intsecHandler(target, opts) {
      if (opts && opts.init) {
        this.initImage(target)
      } else {
        this.loadImage(target)
      }
    },
    initImage(el) {
      el.classList.add('v-image--preload')
    },
    loadImage(el) {
      const src = el.getAttribute('data-src')
      const sizes = el.getAttribute('data-sizes')
      const srcset = el.getAttribute('data-srcset')

      if (!src || el.src.endsWith(src)) {
        return // src is already switched
      }

      el.onload = () => {
        el.classList.remove('v-image--preload')
        el.classList.add('v-image--loaded')
      }

      el.srcset = srcset
      el.sizes = sizes
      el.src = src

      el.removeAttribute('data-src')
      el.removeAttribute('data-sizes')
      el.removeAttribute('data-srcset')
    }
  }
}
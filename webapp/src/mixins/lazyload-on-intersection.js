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

import { logMessage } from '@/utils/logger.js'

export default {
  name: 'mixins/lazyload-on-intersection',
  directives: {
    lazyloadOnIntersection: vObserveIntersection
  },
  mixins: [observeIntersection],
  data() {
    return {
      intsecObserverBehavior: {
        // keep observing because viewed image size may be changed
        // interactively by the website viewer 
        observeOnlyOnce: false,
      },
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
      logMessage("lazyload intsecHandler init: " + el.alt)
      el.classList.add('v-image--preload')
    },
    loadImage(el) {
      const src = el.getAttribute('data-src')
      const sizes = el.getAttribute('data-sizes')
      const srcset = el.getAttribute('data-srcset')

      if (!src || el.src.endsWith(src)) {
        // src is already switched, but sizes may have changed reactively.
        // (for the pages where the number of images per row can be changed
        //  interactively by the visitor)
        if (sizes && !el.sizes.endsWith(sizes)) {
          logMessage("lazyload intsecHandler resize: " + el.alt)
          el.sizes = sizes
          el.removeAttribute('data-sizes')
        }
        // Currently, srcset is not subject to change. If that were to
        // change, then uncomment the following:
        // if (srcset && !el.srcset.endsWith(srcset)) {
        //   el.srcset = srcset
        //   el.removeAttribute('data-srcset')
        // }
      } else {
        logMessage("lazyload intsecHandler LOAD: " + el.alt)
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
}
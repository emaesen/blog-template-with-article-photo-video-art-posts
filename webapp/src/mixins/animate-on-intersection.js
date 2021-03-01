/**
 * Mixin to implement animation when element comes into view
 *
 * Add custom directive `v-animate-on-intersection` to an element to add
 * an observer which will trigger an animation behavior 
 * (default class is defined by this.defaultAnimationClass;
 *  override this with a custom class on the element).
 * 
 */

import observeIntersection from '@/mixins/observe-intersection.js';
import vObserveIntersection from "@/directives/v-observe-intersection.js";

import { logMessage } from '@/utils/logger.js'

export default {
  name: 'mixins/animate-on-intersection',
  directives: {
    animateOnIntersection: vObserveIntersection
  },
  mixins: [observeIntersection],
  data() {
    return {
      defaultAnimationClass: "anima__slide-in-from-below"
    };
  },
  computed: {
  },
  methods: {
    intsecHandler(target, opts) {
      if (opts && opts.init) {
        logMessage("animate intsecHandler init: ", target)
        if (!target.className.includes("anima__")) {
          target.classList.add(this.defaultAnimationClass);
        }
        target.classList.add("anima__-paused");
      } else {
        logMessage("animate intsecHandler ANIMATE: ", target)
        target.addEventListener("animationend", this.onAnimationEnd, false);
        target.classList.remove("anima__-paused");
      }
    },
    onAnimationEnd(evt) {
      // remove animation class to prevent positioning issues for child modals
      let target = evt.target;
      let classes = target.className;
      target.removeEventListener("animationend", this.onAnimationEnd)
      target.className = classes.replace(/anima__[^ ]+/g, "");
    }
  }
}
// https://www.digitalocean.com/community/tutorials/vuejs-global-event-bus

import Vue from 'vue';
export const EventBus = new Vue();

/*
 * // import in component
 * import { EventBus } from '~/utils/event-bus'
 *
 * // emit event in component
 * EventBus.$emit('my-event-name', optionalPayload)
 * 
 * // listen for event in component
 * const eventHandler = function(payload) {
 *   // take action
 * }
 * EventBus.$on('my-event-name', eventHandler)
 * 
 * // remove handler/listener for event
 * EventBus.$off('my-event-name', eventHandler)
 * 
 * // remove all listeners for event
 * EventBus.$off('my-event-name')
 * 
 * // remove all listeners for all events
 * EventBus.$off()
 */
/* very basic persistence logic */

const localStore = (typeof window !== 'undefined') && window.localStorage
const sessionStore = (typeof window !== 'undefined') && window.sessionStorage
const colorModeIndex_Key = "epvm:color-mode-index"
const selectionIndex_Key = "epvm:selection-index"
const openingAnimationShown_Key = "epvm:opening-animation-shown"

/* generic functions */

function persistSessionData(key, value) {
  sessionStore && sessionStore.setItem(key, value)
}

function retrieveSessionData(key) {
  return sessionStore && sessionStore.getItem(key)
}

function clearSessionData(key) {
  return sessionStore && sessionStore.removeItem(key)
}

function persistLocalData(key, value) {
  localStore && localStore.setItem(key, value)
}

function retrieveLocalData(key) {
  return localStore && localStore.getItem(key)
}

function clearLocalData(key) {
  return localStore && localStore.removeItem(key)
}

function ensureNumber(val, curVal) {
  if (val !== null) {
    return 1 * val
  } else {
    return curVal
  }
}

function ensureBoolean(val, curVal) {
  if (val !== null) {
    if (val===1 || val==="true" || val===true) {
      return true
    } else {
      return false
    }
  } else {
    return curVal
  }
}

/* get/set color mode index for light-dark color scheme */

export function persistColorModeIndex(value) {
  persistLocalData(colorModeIndex_Key, value)
}

export function retrieveColorModeIndex(curVal) {
  if (curVal === undefined) {
    return retrieveLocalData(colorModeIndex_Key)
  } else {
    const persistedColorModeIndex = retrieveColorModeIndex()
    return ensureNumber(persistedColorModeIndex, curVal)
  }
}

export function clearColorModeIndex() {
  clearLocalData(colorModeIndex_Key)
}


/* get/set selection index for featured/latest posts display */

function compoundKey(key, subkey) {
  return key + "--" + subkey
}

export function persistSelectionIndex(subkey, value) {
  persistLocalData(compoundKey(selectionIndex_Key, subkey), value) 
}

export function retrieveSelectionIndex(subkey, curVal) {
  if (curVal === undefined) {
    return retrieveLocalData(compoundKey(selectionIndex_Key, subkey))
  } else {
    const persistedSelectionIndex = retrieveSelectionIndex(subkey)
    return ensureNumber(persistedSelectionIndex, curVal)
  }
}

export function clearSelectionIndex(subkey) {
  clearLocalData(compoundKey(selectionIndex_Key, subkey))
}


/* get/set openingAnimationShown indicator */

export function persistOpeningAnimationShown(value) {
  persistSessionData(openingAnimationShown_Key, value)
}

export function retrieveOpeningAnimationShown(curVal) {
  if (curVal === undefined) {
    return retrieveSessionData(openingAnimationShown_Key)
  } else {
    const persistedOpeningAnimationShown = retrieveOpeningAnimationShown()
    return ensureBoolean(persistedOpeningAnimationShown, curVal)
  }
}

export function clearOpeningAnimationShown() {
  clearSessionData(openingAnimationShown_Key)
}
/* very basic persistence logic */

const store = (typeof window !== 'undefined') && window.localStorage;
const colorModeIndex_Key = "epvm:color-mode-index";
const selectionIndex_Key = "epvm:selection-index";


function persistData(key, value) {
  store && store.setItem(key, value);
}

function retrieveData(key) {
  return store && store.getItem(key);
}

function clearData(key) {
  return store && store.removeItem(key);
}

export function persistColorModeIndex(value) {
  persistData(colorModeIndex_Key, value) ;
}

export function retrieveColorModeIndex(curVal) {
  if (curVal === undefined) {
    return retrieveData(colorModeIndex_Key);
  } else {
    const persistedColorModeIndex = retrieveColorModeIndex()
    if (persistedColorModeIndex !== null) {
      return persistedColorModeIndex
    } else {
      return curVal
    }
  }
}

export function clearColorModeIndex() {
  clearData(colorModeIndex_Key) ;
}


function compoundKey(key, subkey) {
  return key + "-" + subkey
}

export function persistSelectionIndex(subkey, value) {
  persistData(compoundKey(selectionIndex_Key, subkey), value) ;
}

export function retrieveSelectionIndex(subkey, curVal) {
  if (curVal === undefined) {
    return retrieveData(compoundKey(selectionIndex_Key, subkey));
  } else {
    const persistedSelectionIndex = retrieveSelectionIndex(subkey)
    if (persistedSelectionIndex !== null) {
      return 1 * persistedSelectionIndex
    } else {
      return curVal
    }
  }
}

export function clearSelectionIndex(subkey) {
  clearData(compoundKey(selectionIndex_Key, subkey)) ;
}

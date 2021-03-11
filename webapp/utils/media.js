const axios = require('axios').default
const path = require('path')
const fse = require('fs-extra')

const { logMsg } = require('./log')

const { INCLUDE_DERIVED_MEDIA_ASSETS,
  CMS_URL,
  CMS_MEDIA_URL,
  CMS_MEDIA_FULL_PATH } = require('./constants')

async function getListOfCmsMediaFiles() {
  let mediaAssets = []
  let mediaResponse
  try {
    mediaResponse = await axios.get(CMS_MEDIA_URL)
  } catch (error) {
    console.error(`ERROR: error retrieving ${CMS_MEDIA_URL}. MAKE SURE THE STRAPI CMS SERVER IS RUNNING!`, {error})
  }

  if (mediaResponse && mediaResponse.status === 200) {
    mediaAssets = mediaResponse.data.flatMap(asset => {
      let urls = [asset.url]
      if (asset.formats && INCLUDE_DERIVED_MEDIA_ASSETS) {
        // also include alternative formats of the asset
        for(let [_altKey,alt] of Object.entries(asset.formats)) {
          urls.push(alt.url)
        }
      }
      return urls
    })
    logMsg(`Received metadata for ${mediaAssets.length} CMS media assets from  ${CMS_MEDIA_URL}`)
  } else {
    console.error("ERROR: Unable to process CMS media assets metadata")
  }
  logMsg(`Files available from ${CMS_URL}:`, mediaAssets)
  return mediaAssets
}

async function downloadCmsMediaFile(file) {
  // make sure CMS media folder exists, if not, create it
  await fse.ensureDir(CMS_MEDIA_FULL_PATH)

  // remove any subfolder in cms filename
  const targetFile = path.join(CMS_MEDIA_FULL_PATH, file.replace(/\/.*\//,""))
  const targetFileExists = await fse.pathExists(targetFile)
  // download the CMS media file, unless it exists already
  if (!targetFileExists) {
    try {
      let response = await axios({
        method: 'get',
        url: CMS_URL + file,
        responseType: 'stream'
      })
      await response.data.pipe(fse.createWriteStream(targetFile))
      logMsg("created " + targetFile)
    } catch (error) {
      console.error(`ERROR: error retrieving ${file}`)
      console.error(error)
    }
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports.downloadCmsMediaFiles = async function () {
  const files = await getListOfCmsMediaFiles()
  await asyncForEach(files, async file => {
    await downloadCmsMediaFile(file)
  })
}

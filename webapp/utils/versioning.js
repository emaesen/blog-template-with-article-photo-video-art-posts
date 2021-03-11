const path = require('path')
const fse = require('fs-extra')

const { logMsg } = require('./log')

const { CMS_BUILD_VERSION_FILE,
  CMS_BUILD_VERSION_FULL_PATH,
  IS_PRODUCTION } = require('./constants')

function parseJson(data) {
  return JSON.parse(data)
}

function formatJson(data) {
  return JSON.stringify(data, null, '  ')
}

module.exports.getSetBuildInfo = async function() {
  await fse.ensureFile(CMS_BUILD_VERSION_FULL_PATH)
  const now =(new Date()).toLocaleString()
  let data = await fse.readFile(CMS_BUILD_VERSION_FULL_PATH, 'utf-8')
  
  if (data==="") {
    data = {
      version: 0,
      buildAt: now
    }
    await fse.outputFile(CMS_BUILD_VERSION_FULL_PATH, formatJson(data), 'utf-8')
    logMsg('creating build version file ' + CMS_BUILD_VERSION_FILE)
  } else {
    data = parseJson(data)
  }

  if (IS_PRODUCTION) {
    data.version = data.version + 1
    data.buildAt = now
    await fse.outputFile(CMS_BUILD_VERSION_FULL_PATH, formatJson(data), 'utf-8')
    logMsg('bumped build version to: ' + data.version)
  }
  return data
}

module.exports.getCodeVersion = async function() {
  const config = path.join(".","gridsome.config.js")
  const data = await fse.readFile(config, 'utf-8')
  const version = /version: *['"](V[^'"]+)['"]/.exec(data)[1]
  return version
}

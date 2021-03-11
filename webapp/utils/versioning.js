const path = require('path')
const fse = require('fs-extra')

const { CMS_BUILD_VERSION_FILE,
  CMS_BUILD_VERSION_FULL_PATH,
  IS_PRODUCTION } = require('./constants')


module.exports.getSetBuildVersion = async function() {
  await fse.ensureFile(CMS_BUILD_VERSION_FILE)
  let buildVersion = await fse.readFile(CMS_BUILD_VERSION_FULL_PATH, 'utf-8')
  if (buildVersion.trim()==="") {
    buildVersion = 0
    await fse.outputFile(CMS_BUILD_VERSION_FULL_PATH, buildVersion, 'utf-8')
    logMsg('created build version file ' + CMS_BUILD_VERSION_FILE)
  }
  if (IS_PRODUCTION) {
    const newVersion = buildVersion + 1
    await fse.outputFile(CMS_BUILD_VERSION_FULL_PATH, newVersion, 'utf-8')
    logMsg('bumped build version to: ' + newVersion)
  }
  return buildVersion
}

module.exports.getCodeVersion = async function() {
  const config = path.join(".","gridsome.config.js")
  const data = await fse.readFile(config, 'utf-8')
  const version = /version: *['"](V[^'"]+)['"]/.exec(data)[1]
  return version
}

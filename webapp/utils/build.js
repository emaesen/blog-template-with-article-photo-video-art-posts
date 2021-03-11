const path = require('path')
const fse = require('fs-extra')

const { logMsg } = require('./log')
const { getCodeVersion, getSetBuildInfo } = require('./versioning')


async function modifyBuildIndexFile(config) {
  const indexFile = path.join(config.outputDir,"index.html")
  const data = await fse.readFile(indexFile, 'utf-8')

  // add script tag for global start timestamp
  const injectedCode1 = '<script>var ___GlobalStartTimeStamp = Date.now()</script>'
  // add script to flip "js-no" class to "js-yes"
  const injectedCode2 = '<script>var appClassList=document.getElementById("app").classList; appClassList.remove("js-no"); appClassList.add("js-yes");</script>'
  const newData = data.replace(/(<\/head>)/i, injectedCode1 + "\n$1")
                      .replace(/(<\/header>)/i, injectedCode2 + "\n$1")

  await fse.writeFile(indexFile, newData, 'utf-8')

  logMsg('afterBuild embedded script tags in ' + indexFile.replace(/.*(webapp.*)/, "$1"))
}

async function copyErrorFile(config) {
  const four0FourFile = path.join(config.outputDir,"404.html")
  const errorFile = path.join(config.outputDir,"error.html")

  await fse.copyFile(four0FourFile, errorFile)

  logMsg('afterBuild copied 404.html to error.html')
}

async function logRedirects(redirects) {
  logMsg('!>>> following redirect rules are required on website host:')
  for (const rule of redirects) {
    // rule.from   - The dynamic path
    // rule.to     - The HTML file path
    // rule.status - 200 if rewrite rule
    logMsg("!>>> redirect from " + rule.from + " - to " + rule.to)
  }
}


module.exports.beforeBuild = async function(store) {
  logMsg("process.env.NODE_ENV = " + process.env.NODE_ENV)
  logMsg("process.env.GRIDSOME_MODE = " + process.env.GRIDSOME_MODE + "\n")

  // append build version to code version
  // and update store metadata.version
  const codeVersion = await getCodeVersion()
  const buildInfo = await getSetBuildInfo()
  const displayVersion = codeVersion + "-" + buildInfo.version
  const buildAt = buildInfo.buildAt
  // overwrite the version property of the store metadata
  store.addMetadata('version', displayVersion )
  store.addMetadata('buildAt', buildAt )
  logMsg('modified metadata "version" to append code version = ' + displayVersion )
  logMsg('added metadata "buildAt" = ' + buildAt )
}

module.exports.afterBuild = async function(config, redirects) {
  await modifyBuildIndexFile(config)
  await copyErrorFile(config)
  await logRedirects(redirects)
}


module.exports.logMsg = function(msg, obj) {
  console.log("\x1b[36m%s\x1b[0m", "INFO: " + msg, obj || "")
}

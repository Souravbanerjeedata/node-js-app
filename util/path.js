const path = require("path");
// depecated
// module.exports = path.dirname(process.mainModule.filename);
module.exports = path.dirname(require.main.filename);

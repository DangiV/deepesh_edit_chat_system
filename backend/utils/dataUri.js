const DataUriParser = require("datauri/parser")
const path = require("path")

const getDataUri = (file) => {
    const parser = new DataUriParser()
    const extName = path.extname(file.name)
    return parser.format(extName, file.data)
}

module.exports = getDataUri
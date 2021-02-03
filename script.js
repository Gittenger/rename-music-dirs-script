const path = require('path')
const fs = require('fs')

const dirname = process.argv[2]
const regex = /(\(|\[|\w*)(\d{4})(\)|\]|\w*)[\W]*([A-Z,a-z -_.]*)/
const year = dirname.match(regex)[2]
const rest = dirname.match(regex)[4]

const result = String.prototype.concat('[', year, '] | ', rest)

fs.renameSync(path.resolve(dirname), result)

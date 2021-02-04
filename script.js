const path = require('path')
const fs = require('fs')

const dirname = process.argv[2]
const str = 'Satyricon-Nemesis_Divina-1996-DeBT_iNT'
// const regex = /(\(|\[|\w*)(\d{4})(\)|\]|\w*)[\W]*([A-Z,a-z -_.]*)/

const year = str.match(regex)[2]
const rest = str.match(regex)[4]

const result = String.prototype.concat('[', year, '] | ', rest)

fs.renameSync(path.resolve(dirname), result)

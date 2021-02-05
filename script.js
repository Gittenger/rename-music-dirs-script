const path = require('path')
const fs = require('fs')

// path variables for use below
// const albumStr = process.argv[2]
const albumStr = 'satyricon -this-_-is-the Album name-2005'
const albumAbs = path.resolve(albumStr)
const artistAbs = path.resolve(albumAbs, '..')
const artistStr = path.basename(artistAbs).toLowerCase()

// check for year
const yearRegex = /((19|20)\d\d)/
let year = ''
let resultStr = ''
if (yearRegex.test(albumStr)) {
	const match = albumStr.match(yearRegex)
	year += match[1]
	// remove year from string
	resultStr = albumStr.replace(yearRegex, '').toLowerCase()
} else resultStr += albumStr.toLowerCase()

// remove extra chars
resultStr = resultStr.replace(/[\(\)\[\]]/g, ' ').trim()
resultStr = resultStr.replace(/[-_.|]/g, ' ').trim()

const artistRegex = new RegExp(artistStr)
if (artistRegex.test(resultStr)) {
	resultStr = resultStr.replace(artistRegex, '').trim()
}

resultStr = resultStr
	.split(' ')
	.map((word, i, arr) => {
		if (
			(word == 'to') |
			(word == 'in') |
			(word == 'of') |
			(word == 'the') |
			(word == 'a') |
			(word == 'and')
		) {
			return word
		} else {
			return String.prototype.concat(
				word.charAt(0).toUpperCase(),
				word.slice(1)
			)
		}
	})
	.filter((word) => word !== '')
	.join(' ')

resultStr = resultStr.charAt(0).toUpperCase() + resultStr.slice(1)
console.log(resultStr)

let final = ''
if (year) {
	final = String.prototype.concat('[', year, '] | ', resultStr)
} else {
	final = resultStr
}

fs.renameSync(path.resolve(albumAbs), final)

// final consideration is to remove adds for blogs, although this is only a minor concern as it's not too common

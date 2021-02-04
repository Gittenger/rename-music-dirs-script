const path = require('path')
const fs = require('fs')

// path variables for use below
const albumStr = process.argv[2]
const albumAbs = path.resolve(albumStr)
const artistAbs = path.resolve(albumAbs, '..')
const artistStr = path.basename(artistAbs).toLowerCase()

// check for year
const yearRegex = /((19|20)\d\d)(.*)/
let year = ''
let resultStr = ''
if (yearRegex.test(albumStr)) {
	const match = albumStr.match(yearRegex)
	year += match[1]
	// remove year from string
	resultStr += match[3].toLowerCase()
} else resultStr += albumStr.toLowerCase()

// remove extra chars
resultStr = resultStr.replace(/[\(\)\[\]]/g, ' ').trim()
resultStr = resultStr.replace(/[-_.]/g, ' ').trim()

const artistRegex = new RegExp(artistStr)
if (artistRegex.test(resultStr)) {
	resultStr = resultStr.replace(artistRegex, '').trim()
}

resultStr = resultStr
	.split(' ')
	.map(word => {
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
			return String.prototype.concat(word.charAt(0).toUpperCase(), word.slice(1))
		}
	})
	.join(' ')

resultStr = resultStr.charAt(0).toUpperCase() + resultStr.slice(1)

let final = ''
if (year) {
	final = String.prototype.concat('[', year, '] | ', resultStr)
} else {
	final = resultStr
}

fs.renameSync(path.resolve(albumAbs), final)

// STILL NEED TO ADDRESS THE DIRECTIONALITY OF WHERE THE YEAR IS IN THE FILENAME. IF YEAR IS AT END, THIS ALGORITHM WON'T WORK.

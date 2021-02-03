const data = [
	'(1994) bethlehem - Dark Metal',
	'[1995] For All Tid',
	'1993 - Dark Medieval Times',
	'bethlehem - 1996 - Dictius Te Necare cd1',
	'Satyricon-Nemesis_Divina-1996-DeBT_iNT',
]

const [one, two, three, four, five] = data

const yearRegex = /(\(|\[|\w*)(\d{4})(\)|\]|\w*)[\W]*([A-Z,a-z -_.]*)/
const year = five.match(yearRegex)[2]
const rest = five.match(yearRegex)[4]

const result = String.prototype.concat('[', year, '] | ', rest)

console.log(result)

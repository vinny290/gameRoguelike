export function generateVerticalPassage(tiles, rows, cols) {
	const passageCol = Math.floor(Math.random() * cols)
	for (let row = 0; row < rows; row++) {
		tiles[row][passageCol].removeClass('tileW')
	}
}

export function generateHorizontalPassage(tiles, rows, cols) {
	const passageRow = Math.floor(Math.random() * rows)
	for (let col = 0; col < cols; col++) {
		tiles[passageRow][col].removeClass('tileW')
	}
}

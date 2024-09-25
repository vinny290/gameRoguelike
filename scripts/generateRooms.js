export function generateRoom(tiles, rows, cols) {
	const roomWidth = Math.floor(Math.random() * 6) + 3
	const roomHeight = Math.floor(Math.random() * 6) + 3
	const startRow = Math.floor(Math.random() * (rows - roomHeight))
	const startCol = Math.floor(Math.random() * (cols - roomWidth))

	for (let row = startRow; row < startRow + roomHeight; row++) {
		for (let col = startCol; col < startCol + roomWidth; col++) {
			tiles[row][col].removeClass('tileW')
		}
	}
}

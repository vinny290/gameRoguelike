export function generateMap(field, rows, cols, tileWidth, tileHeight) {
	const tiles = []
	for (let row = 0; row < rows; row++) {
		tiles[row] = []
		for (let col = 0; col < cols; col++) {
			const tile = $('<div class="tile tileW"></div>').css({
				width: tileWidth + 'px',
				height: tileHeight + 'px',
				left: col * tileWidth + 'px',
				top: row * tileHeight + 'px',
			})
			tiles[row][col] = tile
			field.append(tile)
		}
	}
	return tiles
}

export function updateHeroPosition(tiles, rows, cols) {
	let heroRow, heroCol
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (tiles[row][col].hasClass('tileP')) {
				heroRow = row
				heroCol = col
				return { heroRow, heroCol }
			}
		}
	}
}

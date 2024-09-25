export function moveHero(e, tiles, heroRow, heroCol) {
	let newRow = heroRow
	let newCol = heroCol
	switch (e.which) {
		case 87: // W
			newRow = Math.max(0, heroRow - 1)
			break
		case 65: // A
			newCol = Math.max(0, heroCol - 1)
			break
		case 83: // S
			newRow = Math.min(tiles.length - 1, heroRow + 1)
			break
		case 68: // D
			newCol = Math.min(tiles[0].length - 1, heroCol + 1)
			break
	}

	const newTile = tiles[newRow][newCol]
	if (!newTile.hasClass('tileW') && !newTile.hasClass('tileE')) {
		tiles[heroRow][heroCol].removeClass('tileP').addClass('tile')
		newTile.addClass('tileP')
		heroRow = newRow
		heroCol = newCol
	}
	return { heroRow, heroCol }
}

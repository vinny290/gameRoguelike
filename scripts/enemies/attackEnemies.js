export function attackEnemies(
	heroRow,
	heroCol,
	rows,
	cols,
	tiles,

	heroHealth,
	maxHeroHealth,
	healthIndicator
) {
	const directions = [
		[-1, 0], // Вверх
		[1, 0], // Вниз
		[0, -1], // Влево
		[0, 1], // Вправо
	]

	directions.forEach(([rowOffset, colOffset]) => {
		const newRow = heroRow + rowOffset
		const newCol = heroCol + colOffset

		if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
			const tile = tiles[newRow][newCol]
			if (tile.hasClass('tileE')) {
				tile.removeClass('tileE').addClass('tile')
				tile.css('backgroundImage', '') // Удаляем изображение противника
			}
		}
	})
}

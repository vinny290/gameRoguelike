export function moveEnemies(
	rows,
	cols,
	tiles,
	updateHealthIndicator,
	heroRow,
	heroCol,
	heroHealth,
	maxHeroHealth,
	healthIndicator,
	tileWidth
) {
	$('.tileE').each(function () {
		const tile = $(this)
		const directions = [
			[-1, 0], // Вверх
			[1, 0], // Вниз
			[0, -1], // Влево
			[0, 1], // Вправо
		]

		const validDirections = directions.filter(([rowOffset, colOffset]) => {
			const newRow = tile.data('row') + rowOffset
			const newCol = tile.data('col') + colOffset
			return (
				newRow >= 0 &&
				newRow < rows &&
				newCol >= 0 &&
				newCol < cols &&
				!tiles[newRow][newCol].hasClass('tileW') &&
				!tiles[newRow][newCol].hasClass('tileE')
			)
		})

		if (validDirections.length > 0) {
			const [rowOffset, colOffset] =
				validDirections[Math.floor(Math.random() * validDirections.length)]
			const currentRow = tile.data('row')
			const currentCol = tile.data('col')

			const newRow = currentRow + rowOffset
			const newCol = currentCol + colOffset

			// Перемещаем врага на новую плитку
			tile.removeClass('tileE').addClass('tile').css('backgroundImage', '')
			tiles[newRow][newCol]
				.addClass('tileE')
				.css('backgroundImage', 'url(./images/tile-E.png)')
			tiles[newRow][newCol].data('row', newRow)
			tiles[newRow][newCol].data('col', newCol)

			// Проверяем атаку на героя
			if (newRow === heroRow && newCol === heroCol) {
				console.log('Hero is attacked by enemy at', newRow, newCol)
				heroHealth -= 10
				updateHealthIndicator(
					healthIndicator,
					heroRow,
					heroCol,
					heroHealth,
					maxHeroHealth,
					tiles,
					tileWidth
				)
			}
		}
	})
	return heroHealth // Возвращаем обновленное здоровье героя
}

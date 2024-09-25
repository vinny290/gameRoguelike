export function enemyAttack(
	heroRow,
	heroCol,
	rows,
	cols,
	tiles,
	updateHealthIndicator,
	heroHealth,
	maxHeroHealth,
	healthIndicator,
	tileWidth
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
				console.log('Hero is attacked by enemy at', newRow, newCol)
				heroHealth -= 10 // Уменьшение здоровья героя
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
	return heroHealth
}

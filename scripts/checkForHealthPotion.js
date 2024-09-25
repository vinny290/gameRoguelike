// healthPotion.js
export function checkForHealthPotion(
	heroRow,
	heroCol,
	tiles,
	heroHealth,
	maxHeroHealth,
	healthIndicator,
	tileWidth,
	updateHealthIndicator
) {
	const tile = tiles[heroRow][heroCol]
	if (tile.hasClass('tileHP')) {
		heroHealth = Math.min(heroHealth + 20, maxHeroHealth) // Восстановление здоровья
		tile.removeClass('tileHP').addClass('tile')
		tile.css('backgroundImage', '')
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
	return heroHealth // Возвращаем обновленное здоровье героя
}

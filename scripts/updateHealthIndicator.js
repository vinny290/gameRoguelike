export function updateHealthIndicator(
	healthIndicator,
	heroRow,
	heroCol,
	heroHealth,
	maxHeroHealth,
	tiles,
	tileWidth
) {
	const heroTile = tiles[heroRow][heroCol]
	healthIndicator.css({
		left: heroTile.position().left + 'px',
		top: heroTile.position().top - 10 + 'px',
		width: (heroHealth / maxHeroHealth) * tileWidth + 'px',
	})
}

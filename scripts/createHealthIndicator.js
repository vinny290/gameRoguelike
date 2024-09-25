export function createHealthIndicator(field, tileWidth, maxHealth) {
	const healthBar = $('<div class="health-indicator"></div>').css({
		position: 'absolute',
		width: tileWidth + 'px',
		height: '5px',
		backgroundColor: 'green',
		zIndex: 10,
	})
	field.append(healthBar)
	return healthBar
}

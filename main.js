$(function () {
	const field = $('.field')
	const fieldWidth = 1024
	const fieldHeight = 640
	const rows = 24
	const cols = 40

	let heroHealth = 100
	const maxHeroHealth = 100
	let heroAttackPower = 20

	let swordPower = 0
	let maxSwordPower = 100
	let swordAttackPower = 50

	const enemyMaxHealth = 100
	let totalEnemies = 0
	let enemiesKilled = 0

	let heroRow, heroCol
	const tileWidth = fieldWidth / cols
	const tileHeight = fieldHeight / rows
	field.empty()

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

	const numberOfRooms = Math.floor(Math.random() * 6) + 5
	for (let i = 0; i < numberOfRooms; i++) {
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
	const verticalPassages = Math.floor(Math.random() * 3) + 3
	const horizontalPassages = Math.floor(Math.random() * 3) + 3

	function createPassages(orientation, count) {
		for (let i = 0; i < count; i++) {
			const index = Math.floor(
				Math.random() * (orientation === 'vertical' ? cols : rows)
			)
			for (let j = 0; j < (orientation === 'vertical' ? rows : cols); j++) {
				const tile =
					orientation === 'vertical' ? tiles[j][index] : tiles[index][j]
				tile.removeClass('tileW')
			}
		}
	}

	// Сбор пустых клеток
	const emptyTiles = []
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (!tiles[row][col].hasClass('tileW')) {
				emptyTiles.push(tiles[row][col])
			}
		}
	}

	function updateEnemyCount() {
		totalEnemies = $('.tileE').length
	}

	function checkVictory() {
		if (totalEnemies <= 0) {
			alert(`Поздравляем! Все враги побеждены! Выиграна игра.`)
			location.reload()
		}
	}

	function placeItems(className, count, emptyTiles, addHealthBar = false) {
		for (let i = 0; i < count; i++) {
			const index = Math.floor(Math.random() * emptyTiles.length)
			const tile = emptyTiles.splice(index, 1)[0]
			tile.addClass(className)

			if (addHealthBar && className === 'tileE') {
				tile.data('health', 100)
				const healthBar = $('<div class="enemy-health-bar"></div>').css({
					position: 'absolute',
					width: '100%',
					height: '5px',
					backgroundColor: 'red',
					top: '-10px',
					left: '0px',
					zIndex: 10,
				})
				tile.append(healthBar)
			}
		}
	}

	placeItems('tileSW', 2, emptyTiles)
	placeItems('tileHP', 10, emptyTiles)
	placeItems('tileE', 10, emptyTiles, true)
	placeItems('tileP', 1, emptyTiles)

	function updateHeroPosition() {
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				if (tiles[row][col].hasClass('tileP')) {
					heroRow = row
					heroCol = col
					return
				}
			}
		}
	}

	function createIndicator(className, color) {
		const indicator = $('<div></div>')
			.addClass(className)
			.css({
				position: 'absolute',
				width: tileWidth + 'px',
				height: '5px',
				backgroundColor: color,
				zIndex: 10,
			})
		field.append(indicator)
		return indicator
	}

	function updateIndicator(type, value, maxValue, offsetY) {
		const heroTile = tiles[heroRow][heroCol]
		const indicator = type === 'health' ? healthIndicator : swordIndicator
		indicator.css({
			left: heroTile.position().left + 'px',
			top: heroTile.position().top - offsetY + 'px',
			width: (value / maxValue) * tileWidth + 'px',
		})
	}

	function updateHealthIndicator() {
		updateIndicator('health', heroHealth, maxHeroHealth, 10)
	}

	function updateSwordIndicator() {
		updateIndicator('sword', swordPower, maxSwordPower, 20)
	}

	// Функция для обновления индикатора здоровья врага
	function updateEnemyHealthBar(tile) {
		const currentHealth = tile.data('health') || 0
		const healthBar = tile.find('.enemy-health-bar')
		if (healthBar.length) {
			healthBar.css('width', (currentHealth / enemyMaxHealth) * 100 + '%')
		}
	}

	// Функция для атаки врагов на соседних клетках
	function attackEnemies() {
		const directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]

		directions.forEach(([rowOffset, colOffset]) => {
			const newRow = heroRow + rowOffset
			const newCol = heroCol + colOffset

			if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
				const tile = tiles[newRow][newCol]
				if (tile.hasClass('tileE')) {
					let currentHealth = tile.data('health') || enemyMaxHealth
					if (swordPower > 0) {
						currentHealth -= swordAttackPower
					} else {
						currentHealth -= heroAttackPower
					}
					tile.data('health', currentHealth)

					if (currentHealth <= 0) {
						tile.removeClass('tileE').addClass('tile')
						tile.css('backgroundImage', '')
						tile.find('.enemy-health-bar').remove()
						enemiesKilled++
						updateEnemyCount()
						checkVictory()
					} else {
						updateEnemyHealthBar(tile)
					}
				}
			}
		})
		if (swordPower > 0) {
			swordPower -= 10
			updateSwordIndicator()
		}
		if (heroHealth <= 0) {
			alert(
				`Игра завершена. Вы умерли. Убито врагов: ${enemiesKilled}. Перезагрузите страницу, чтобы начать заново.`
			)
			location.reload()
		}
	}

	// Функция для атаки героя противником
	function enemyAttack() {
		const directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]

		directions.forEach(([rowOffset, colOffset]) => {
			const newRow = heroRow + rowOffset
			const newCol = heroCol + colOffset

			if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
				const tile = tiles[newRow][newCol]
				if (tile.hasClass('tileE')) {
					heroHealth -= 10
					if (heroHealth < 0) heroHealth = 0
					updateHealthIndicator()
					if (heroHealth <= 0) {
						alert(
							`Игра завершена. Вы умерли. Убито врагов: ${enemiesKilled}. Перезагрузите страницу, чтобы начать заново.`
						)
						location.reload()
					}
				}
			}
		})
	}

	// Функция перемещения врагов
	function moveEnemies() {
		$('.tileE').each(function () {
			const tile = $(this)

			const directions = [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
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

				tile.removeClass('tileE').addClass('tile').css('backgroundImage', '')
				tiles[newRow][newCol]
					.addClass('tileE')
					.css('backgroundImage', 'url(./images/tile-E.png)')
				tiles[newRow][newCol].data('row', newRow)
				tiles[newRow][newCol].data('col', newCol)

				const healthBar = tile.find('.enemy-health-bar')
				if (healthBar.length) {
					healthBar.appendTo(tiles[newRow][newCol])
				}

				if (newRow === heroRow && newCol === heroCol) {
					heroHealth -= 10
					updateHealthIndicator()
				}
			}
		})
	}

	//находим все элементы с классом .tileE на странице
	$('.tileE').each(function () {
		const tile = $(this)
		const row = Math.floor(tile.position().top / tileHeight)
		const col = Math.floor(tile.position().left / tileWidth)
		tile.data('row', row)
		tile.data('col', col)
	})

	function checkForItem(itemClass, effect, updateIndicator) {
		const tile = tiles[heroRow][heroCol]
		if (tile.hasClass(itemClass)) {
			effect()
			tile.removeClass(itemClass).addClass('tile')
			tile.css('backgroundImage', '')
			updateIndicator()
		}
	}

	function checkForHealthPotion() {
		checkForItem(
			'tileHP',
			() => {
				heroHealth = Math.min(heroHealth + 20, maxHeroHealth)
			},
			updateHealthIndicator
		)
	}

	function checkForSword() {
		checkForItem(
			'tileSW',
			() => {
				swordPower = 100
			},
			updateSwordIndicator
		)
	}

	// Обработчик нажатий клавиш
	$(document).on('keydown', function (e) {
		let newRow = heroRow
		let newCol = heroCol
		let direction = 'right'

		switch (e.which) {
			case 87:
				newRow = Math.max(0, heroRow - 1)
				break
			case 65:
				newCol = Math.max(0, heroCol - 1)
				direction = 'left'
				break
			case 83:
				newRow = Math.min(rows - 1, heroRow + 1)
				break
			case 68:
				newCol = Math.min(cols - 1, heroCol + 1)
				direction = 'right'
				break
			case 32:
				attackEnemies()
				return
			default:
				return
		}
		const newTile = tiles[newRow][newCol]

		if (!newTile.hasClass('tileW') && !newTile.hasClass('tileE')) {
			const currentTile = tiles[heroRow][heroCol]
			currentTile
				.removeClass('tileP')
				.addClass('tile')
				.css('backgroundImage', '')
			newTile
				.addClass('tileP')
				.css('backgroundImage', 'url(./images/tile-P.png)')
			heroRow = newRow
			heroCol = newCol

			const heroElement = $('.tileP')
			if (direction === 'left') {
				heroElement.css('transform', 'scaleX(-1)')
			} else {
				heroElement.css('transform', 'scaleX(1)')
			}

			updateHealthIndicator()
			updateSwordIndicator()
			checkForHealthPotion()
			checkForSword()
			enemyAttack()
		}
	})
	createPassages('vertical', verticalPassages)
	createPassages('horizontal', horizontalPassages)

	updateEnemyCount()
	updateHeroPosition()

	const healthIndicator = createIndicator('health', 'green')
	const swordIndicator = createIndicator('sword', 'blue')

	setInterval(moveEnemies, 1000)
	updateHealthIndicator()
	updateSwordIndicator()
})

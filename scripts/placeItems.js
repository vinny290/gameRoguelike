// export function placeItems(className, count, emptyTiles, addHealthBar = false) {
// 	for (let i = 0; i < count; i++) {
// 		const index = Math.floor(Math.random() * emptyTiles.length)
// 		const tile = emptyTiles.splice(index, 1)[0] // Убираем плитку из списка доступных
// 		tile.addClass(className)

// 		// Если нужно добавить индикатор здоровья для врага
// 		if (addHealthBar && className === 'tileE') {
// 			tile.data('health', 100) // Инициализация здоровья врага

// 			// Создаем элемент индикатора здоровья
// 			const healthBar = $('<div class="enemy-health-bar"></div>').css({
// 				position: 'absolute',
// 				width: '100%',
// 				height: '5px',
// 				backgroundColor: 'red',
// 				top: '-10px', // Смещение вверх от позиции врага
// 				left: '0px',
// 				zIndex: 10,
// 			})

// 			console.log('Adding health bar to enemy at:', tile) // Логируем добавление индикатора

// 			// Добавляем индикатор в саму клетку
// 			tile.append(healthBar)
// 		}
// 	}
// }

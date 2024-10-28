console.log('Скрипт map.js загружен');

// Инициализация карты (используем Leaflet.js для примера)
const map = L.map('map').setView([50.27, 30.31], 10); // Центрируем на Москву

// Добавление слоя карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Функция для загрузки данных из API
async function loadTrashLocations() {
    console.log('Загрузка данных о свалках с API...');
    const apiUrl = 'https://ecomaner.com:444/api/photo-locations';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
		// mode: 'cors'  // Убедитесь, что это используется при обращении через браузер

        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Полученные данные:', data);

        // Добавляем маркеры на карту
        data.forEach(location => {
            const { latitude, longitude, comments } = location;
            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup(`<b>Место ID: ${location.id}</b><br>Комментарий: ${comments || 'Нет комментария'}`);
        });
    } catch (error) {
        console.error('Ошибка загрузки данных о свалках:', error);
    }
}

// Вызываем функцию загрузки данных после инициализации карты
loadTrashLocations();

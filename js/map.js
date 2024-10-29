console.log('Скрипт map.js загружен');

// Инициализация карты
const map = L.map('map').setView([50.27, 30.31], 10);

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
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Полученные данные:', data);

        if (Array.isArray(data)) {
            const bounds = L.latLngBounds(); // для автоматической подгонки области карты
            data.forEach(location => {
                const { latitude, longitude, comments } = location;
                const lat = parseFloat(latitude);
                const lng = parseFloat(longitude);

                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = L.marker([lat, lng])
                        .addTo(map)
                        .bindPopup(`<b>Место ID: ${location.id}</b><br>Комментарий: ${comments || 'Нет комментария'}`);
                    
                    bounds.extend([lat, lng]); // расширяем границы области
                } else {
                    console.warn('Некорректные координаты:', location);
                }
            });
            map.fitBounds(bounds); // подгоняем карту к границам с маркерами
        } else {
            console.error('Ожидался массив, получено:', typeof data);
        }
    } catch (error) {
        console.error('Ошибка загрузки данных о свалках:', error);
    }
}

// Вызываем функцию загрузки данных после инициализации карты
loadTrashLocations();

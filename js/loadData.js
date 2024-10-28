console.log('Скрипт loadData.js загружен');

async function fetchData() {
    console.log('Функция fetchData запущена');
    try {
        // Используйте https и порт 444, если API настроен через Nginx для работы с SSL
        const apiUrl = 'https://ecomaner.com:444/api/data';
        console.log('Отправка запроса на:', apiUrl);

        // Отправка запроса на API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Логируем статус ответа
        console.log('Статус ответа:', response.status);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        // Получаем данные
        const data = await response.json();
        console.log('Полученные данные:', data);

        // Отображение данных
        const container = document.getElementById('data-container');
        if (data && data.length > 0) {
            let html = '<ul>';
            data.forEach(user => {
                html += `<li>ID: ${user.id}, Имя: ${user.first_name}, Фамилия: ${user.last_name}, Баланс: ${user.balance}</li>`;
            });
            html += '</ul>';
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p>Нет данных для отображения.</p>';
        }
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        document.getElementById('data-container').innerHTML = `<p>Ошибка загрузки данных: ${error.message}</p>`;
    }
}

// Запускаем функцию после загрузки страницы
window.onload = fetchData;

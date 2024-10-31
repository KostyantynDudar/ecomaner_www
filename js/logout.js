// Функция для выхода
async function logout() {
    const token = localStorage.getItem('authToken'); // Получаем токен из localStorage
    console.log("Токен из localStorage:", token);

    if (!token) {
        alert('Вы не авторизованы');
        console.log("Токен отсутствует, пользователь не авторизован.");
        return;
    }

    try {
        console.log("Отправка запроса на выход...");
        const response = await fetch('https://ecomaner.com:444/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Подставляем токен в заголовок Authorization
            }
        });

        console.log("Ответ от сервера получен:", response);
        const data = await response.json();
        console.log("Данные ответа от сервера:", data);

        if (data.success) {
            localStorage.removeItem('authToken'); // Удаляем токен после выхода
            console.log("Токен удален из localStorage");
            alert(data.message);
            console.log("Перенаправление на главную страницу");
            window.location.href = '/index.html';
        } else {
            alert('Ошибка при выходе');
            console.error("Ошибка при выходе:", data.message);
        }
    } catch (error) {
        console.error('Ошибка при выходе (try-catch):', error);
        alert('Ошибка при выходе. Попробуйте снова.');
    }
}

// Проверка состояния авторизации и управление отображением кнопок
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const registerButton = document.getElementById('registerButton');
    const emailRegisterButton = document.getElementById('emailRegisterButton');
    const emailLoginButton = document.getElementById('emailLoginButton');
    const pilotDashboardButton = document.getElementById('pilotDashboardButton');
    const logoutButton = document.getElementById('logoutButton');

    if (token) {
        console.log("Токен найден, показываем 'Кабина пилота' и 'Выйти', скрываем 'Регистрация' и 'Вход'");
        
        // Показываем "Кабина пилота" и "Выйти"
        pilotDashboardButton.style.display = 'block';
        logoutButton.style.display = 'block';

        // Скрываем кнопки регистрации и входа
        registerButton.style.display = 'none';
        emailRegisterButton.style.display = 'none';
        emailLoginButton.style.display = 'none';

        // Обработчик для перехода в "Кабину пилота"
        pilotDashboardButton.onclick = () => {
            window.location.href = '/pilot-dashboard.html'; // Путь к странице "Кабина пилота"
        };
    } else {
        console.log("Токен не найден, скрываем 'Кабина пилота' и 'Выйти'");
        
        // Скрываем "Кабина пилота" и "Выйти"
        pilotDashboardButton.style.display = 'none';
        logoutButton.style.display = 'none';

        // Показываем кнопки регистрации и входа
        registerButton.style.display = 'block';
        emailRegisterButton.style.display = 'block';
        emailLoginButton.style.display = 'block';
    }
});

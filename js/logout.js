// logout.js

// Функция для выхода
async function logout() {
    const token = localStorage.getItem('authToken'); // Получаем токен из localStorage
    console.log("Токен из localStorage:", token); // Проверка наличия токена

    if (!token) {
        alert('Вы не авторизованы');
        console.log("Токен отсутствует, пользователь не авторизован."); // Сообщение об отсутствии токена
        return;
    }

    try {
        console.log("Отправка запроса на выход..."); // Уведомление о начале запроса на выход
        const response = await fetch('https://ecomaner.com:444/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Подставляем токен в заголовок Authorization
            }
        });

        console.log("Ответ от сервера получен:", response); // Проверка, получен ли ответ
        const data = await response.json();
        console.log("Данные ответа от сервера:", data); // Вывод данных ответа сервера

        if (data.success) {
            localStorage.removeItem('authToken'); // Удаляем токен после выхода
            console.log("Токен удален из localStorage"); // Уведомление об удалении токена
            alert(data.message); // Сообщение "Выход выполнен успешно"
            console.log("Перенаправление на главную страницу"); // Уведомление о перенаправлении
            window.location.href = '/index.html'; // Перенаправление на главную страницу
        } else {
            alert('Ошибка при выходе');
            console.error("Ошибка при выходе:", data.message); // Сообщение об ошибке выхода
        }
    } catch (error) {
        console.error('Ошибка при выходе (try-catch):', error); // Сообщение об ошибке при выполнении запроса
        alert('Ошибка при выходе. Попробуйте снова.');
    }
}

// Проверка состояния авторизации и отображение кнопки "Выйти"
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const logoutButton = document.getElementById('logoutButton');

    if (token) {
        logoutButton.style.display = 'block'; // Показываем кнопку, если токен есть
    } else {
        logoutButton.style.display = 'none';  // Скрываем кнопку, если токена нет
    }
});

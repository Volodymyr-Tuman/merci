var tg = null;

// Захист від передчасного завантаження: чекаємо, поки з'явиться window.Telegram.WebApp
function initApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
    } else {
        setTimeout(initApp, 100);
    }
}
initApp();

var errorMsg = document.getElementById('errorMsg');

function showError(text) {
    errorMsg.textContent = text;
    errorMsg.classList.toggle('show', Boolean(text));
}

document.getElementById('submitBtn').addEventListener('click', function () {
    var name = document.getElementById('name').value.trim();
    var age = document.getElementById('age').value.trim();
    var tiktok = document.getElementById('tiktok').value.trim();

    if (!name || !age || !tiktok) {
        showError("Будь ласка, заповніть усі поля.");
        return;
    }
    showError("");

    var formData = {
        name: name,
        age: age,
        tiktok: tiktok
    };

    if (!tg) {
        showError("Помилка: Telegram WebApp ще не ініціалізовано, спробуйте ще раз.");
        return;
    }

    tg.sendData(JSON.stringify(formData));
});
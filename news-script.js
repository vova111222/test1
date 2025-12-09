// Функции для страницы новостей

// Поиск по новостям
document.getElementById('newsSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const articles = document.querySelectorAll('.news-article');
    
    articles.forEach(article => {
        const title = article.querySelector('h2').textContent.toLowerCase();
        const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
        const text = article.textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || text.includes(searchTerm)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});

// Фильтрация по категориям
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const articles = document.querySelectorAll('.news-article');
        
        articles.forEach(article => {
            const category = article.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    });
});

// Обработка форм комментариев
document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const textarea = this.querySelector('textarea');
        const comment = textarea.value.trim();
        
        if (comment) {
            addComment(this, comment);
            textarea.value = '';
        }
    });
});

function addComment(form, commentText) {
    const commentsList = form.previousElementSibling;
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    
    newComment.innerHTML = `
        <div class="comment-author">
            <strong>Вы</strong>
            <span>только что</span>
        </div>
        <p>${commentText}</p>
    `;
    
    commentsList.appendChild(newComment);
    
    // Показываем уведомление
    showNotification('Комментарий добавлен!', 'success');
}

// Таймер обратного отсчета для акции
function updateCountdown() {
    const targetDate = new Date('2025-02-01').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }
}

// Запускаем таймер
updateCountdown();
setInterval(updateCountdown, 60000);

// Галерея изображений
document.querySelectorAll('.gallery-thumbs img').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const mainImage = this.closest('.article-gallery').querySelector('.gallery-main img');
        const tempSrc = mainImage.src;
        mainImage.src = this.src;
        this.src = tempSrc;
    });
});

// Плавная прокрутка к статьям при переходе по якорям
function scrollToArticle() {
    const hash = window.location.hash;
    if (hash) {
        const article = document.querySelector(hash);
        if (article) {
            article.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

window.addEventListener('load', scrollToArticle);
window.addEventListener('hashchange', scrollToArticle);

// Функция бронирования тура
function bookTour(tourIndex) {
    const tours = [
        { title: "Водопады и джунгли", price: "7000руб" },
        { title: "Райский пляж", price: "8000руб" },
        { title: "Джунгли", price: "9000руб" },
        { title: "Дикая бухта", price: "9000руб" },
        { title: "Горное приключение", price: "11000руб" },
        { title: "Ночное сафари", price: "8500руб" }
    ];
    
    const tour = tours[tourIndex];
    const phoneNumber = '79531776472';
    const message = `Здравствуйте! Хочу забронировать тур: "${tour.title}". Цена: ${tour.price}. Пожалуйста, свяжитесь со мной для уточнения деталей.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        font-weight: bold;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Чеклист - отмечаем выполненные пункты
document.querySelectorAll('.checklist-item input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.style.textDecoration = 'line-through';
            label.style.opacity = '0.6';
        } else {
            label.style.textDecoration = 'none';
            label.style.opacity = '1';
        }
    });
});

// Плавная прокрутка к статье при загрузке страницы с якорем
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const article = document.querySelector(hash);
        if (article) {
            setTimeout(() => {
                article.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});
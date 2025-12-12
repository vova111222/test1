/**
 * ПЗМ Завод Комплектации - Основные скрипты
 * Версия 1.0 - Полный комплект
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('ПЗМ Завод Комплектации - сайт загружен');
    
    // Инициализация всех компонентов
    initSearch();
    initMobileMenu();
    initOrderForms();
    initModalWindows();
    initSmoothScroll();
    initNotifications();
});

/**
 * Инициализация поиска
 */
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.querySelector('.search-input').focus();
        });
        
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
        });
        
        // Закрытие по клику вне поиска
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
        
        // Поиск по нажатию Enter
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

/**
 * Выполнение поиска
 */
function performSearch(query) {
    if (!query.trim()) return;
    
    console.log('Поиск:', query);
    
    // Здесь будет интеграция с реальным поиском
    alert('Поиск по запросу: "' + query + '"\n\nФункция поиска будет реализована в следующем обновлении.');
    
    // Временный редирект на страницу каталога
    // window.location.href = 'katalog.html?search=' + encodeURIComponent(query);
}

/**
 * Инициализация мобильного меню
 */
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    
    if (window.innerWidth <= 768 && navMenu) {
        headerContent.insertBefore(menuToggle, navMenu);
        
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

/**
 * Инициализация форм заказа
 */
function initOrderForms() {
    const orderButtons = document.querySelectorAll('.order-btn, .cta-button[onclick*="openOrderModal"]');
    const orderModal = document.getElementById('orderModal');
    
    if (orderButtons.length > 0 && orderModal) {
        orderButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (!this.hasAttribute('href')) {
                    e.preventDefault();
                    openOrderModal();
                }
            });
        });
    }
    
    // Обработка отправки форм
    const orderForms = document.querySelectorAll('.order-form');
    orderForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrderForm(this);
        });
    });
}

/**
 * Открытие модального окна заказа
 */
function openOrderModal(productName = '', price = '') {
    const orderModal = document.getElementById('orderModal');
    if (!orderModal) return;
    
    // Заполнение данных о товаре если переданы
    if (productName) {
        const productInput = orderModal.querySelector('input[name="product"]');
        const priceInput = orderModal.querySelector('input[name="price"]');
        const commentInput = orderModal.querySelector('textarea');
        
        if (productInput) productInput.value = productName;
        if (priceInput) priceInput.value = price;
        if (commentInput) {
            commentInput.value = commentInput.value || `Заказ: ${productName}`;
        }
        
        // Обновление заголовка
        const modalTitle = orderModal.querySelector('h3');
        if (modalTitle) {
            modalTitle.textContent = `Оформление заказа - ${productName}`;
        }
    }
    
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Закрытие модального окна
 */
function closeModal(modalId = '') {
    let modal;
    if (modalId) {
        modal = document.getElementById(modalId);
    } else {
        modal = document.querySelector('.modal-overlay.active');
    }
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Отправка формы заказа
 */
function submitOrderForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Валидация
    if (!data.name || !data.phone) {
        showNotification('Пожалуйста, заполните имя и телефон', 'error');
        return;
    }
    
    // Симуляция отправки
    console.log('Отправка заказа:', data);
    
    // Показать уведомление об успехе
    showNotification('Заявка отправлена! Мы свяжемся с вами в течение 30 минут.', 'success');
    
    // Закрыть модальное окно
    closeModal();
    
    // Очистить форму
    form.reset();
    
    // Отправить данные на сервер (заглушка)
    setTimeout(() => {
        // Здесь будет реальный AJAX запрос
        // fetch('/api/order', { method: 'POST', body: JSON.stringify(data) })
    }, 1000);
}

/**
 * Инициализация модальных окон
 */
function initModalWindows() {
    // Закрытие по крестику
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close') || 
            e.target.closest('.modal-close')) {
            closeModal();
        }
    });
    
    // Закрытие по клику вне модального окна
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/**
 * Плавная прокрутка
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Показать уведомление
 */
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Добавляем в тело документа
    document.body.appendChild(notification);
    
    // Показываем с анимацией
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Автоматическое скрытие через 5 секунд
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Закрытие по клику
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
    
    // Сохраняем ссылку для глобального доступа
    window.lastNotification = notification;
}

/**
 * Скрыть уведомление
 */
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * Инициализация уведомлений
 */
function initNotifications() {
    // Пример: показать приветственное уведомление
    setTimeout(() => {
        if (!localStorage.getItem('welcomeShown')) {
            showNotification('Добро пожаловать на сайт ПЗМ Завод Комплектации! 🚜', 'info');
            localStorage.setItem('welcomeShown', 'true');
        }
    }, 2000);
}

/**
 * Глобальные функции для кнопок
 */
window.openOrderModal = openOrderModal;
window.closeModal = closeModal;
window.showNotification = showNotification;
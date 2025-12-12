/**
 * ПЗМ Завод Комплектации - Яндекс Карты
 * Версия 1.0 - Полный комплект
 */

let map;
let placemark;

/**
 * Инициализация карты на главной странице
 */
function initMainPageMap() {
    const mapContainer = document.getElementById('main-page-map');
    if (!mapContainer) return;
    
    // Координаты завода (г. Белгород)
    const factoryCoords = [50.5955, 36.5873];
    
    try {
        // Инициализация карты
        ymaps.ready(() => {
            map = new ymaps.Map('main-page-map', {
                center: factoryCoords,
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            // Создание метки
            placemark = new ymaps.Placemark(factoryCoords, {
                balloonContentHeader: 'ПЗМ Завод Комплектации',
                balloonContentBody: 'г. Белгород, ул. Заводская, д. 15<br>Производство деталей для тракторов',
                balloonContentFooter: '<strong>Телефон:</strong> +7 (999) 123-45-67'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiNlZDg5MzYiIGZpbGwtb3BhY2l0eT0iMC45IiBzdHJva2U9IiNkZDZiMjAiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40]
            });
            
            map.geoObjects.add(placemark);
            
            // Открываем балун при загрузке
            placemark.balloon.open();
            
            // Скрываем лоадер
            const loadingElement = mapContainer.querySelector('.map-loading-final');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Ошибка загрузки Яндекс Карт:', error);
        showMapError(mapContainer);
    }
}

/**
 * Инициализация карты на странице контактов
 */
function initContactsPageMap() {
    const mapContainer = document.getElementById('contacts-map');
    if (!mapContainer) return;
    
    // Координаты завода
    const factoryCoords = [50.5955, 36.5873];
    
    try {
        ymaps.ready(() => {
            map = new ymaps.Map('contacts-map', {
                center: factoryCoords,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl', 'typeSelector', 'routeButtonControl']
            });
            
            // Детальная метка
            placemark = new ymaps.Placemark(factoryCoords, {
                balloonContentHeader: '<div style="font-size:16px; font-weight:bold; color:#ed8936;">ПЗМ Завод Комплектации</div>',
                balloonContentBody: `
                    <div style="margin:10px 0;">
                        <p><strong>Адрес:</strong> г. Белгород, ул. Заводская, д. 15</p>
                        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
                        <p><strong>Email:</strong> info@pzm-zavod.ru</p>
                        <p><strong>Режим работы:</strong> Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</p>
                    </div>
                    <div style="margin-top:15px;">
                        <button onclick="openYandexRoute()" style="background:#ed8936; color:white; border:none; padding:8px 15px; border-radius:4px; cursor:pointer; margin-right:10px;">
                            <i class="fas fa-route"></i> Построить маршрут
                        </button>
                        <button onclick="copyAddress()" style="background:#4a5568; color:white; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">
                            <i class="fas fa-copy"></i> Копировать адрес
                        </button>
                    </div>
                `,
                balloonContentFooter: '<em>Производство деталей для тракторов с 2008 года</em>'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjIiIGZpbGw9IiNlZDg5MzYiIGZpbGwtb3BhY2l0eT0iMC45IiBzdHJva2U9IiNkZDZiMjAiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik0yNSwxMCBBMTUsMTUgMCAxLDEgMjUsNDAgQTE1LDE1IDAgMSwxIDI1LDEwIFoiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iNiIgZmlsbD0iI2VkODkzNiIvPjwvc3ZnPg==',
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -50],
                balloonCloseButton: true
            });
            
            map.geoObjects.add(placemark);
            
            // Открываем балун
            setTimeout(() => {
                placemark.balloon.open();
            }, 1000);
            
            // Добавляем другие точки (например, представительства)
            addOtherLocations();
            
            // Скрываем лоадер
            const loadingElement = mapContainer.querySelector('.map-loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Ошибка загрузки Яндекс Карт:', error);
        showMapError(mapContainer);
    }
}

/**
 * Добавление других локаций на карту
 */
function addOtherLocations() {
    if (!map) return;
    
    const locations = [
        {
            coords: [50.6100, 36.5800],
            title: 'Склад запчастей',
            content: 'Основной склад готовой продукции'
        },
        {
            coords: [50.5800, 36.6000],
            title: 'Офис продаж',
            content: 'Прием заказов и консультации'
        }
    ];
    
    locations.forEach(location => {
        const marker = new ymaps.Placemark(location.coords, {
            balloonContent: `<strong>${location.title}</strong><br>${location.content}`
        }, {
            preset: 'islands#blueCircleDotIcon'
        });
        
        map.geoObjects.add(marker);
    });
}

/**
 * Показать ошибку загрузки карты
 */
function showMapError(container) {
    container.innerHTML = `
        <div class="map-error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Карта временно недоступна</h3>
            <p>Вы можете связаться с нами другими способами:</p>
            <div class="error-contacts">
                <a href="tel:+79991234567"><i class="fas fa-phone"></i> +7 (999) 123-45-67</a>
                <a href="https://yandex.ru/maps/?text=г.%20Белгород,%20ул.%20Заводская,%20д.%2015" target="_blank">
                    <i class="fas fa-map-marked-alt"></i> Открыть в Яндекс.Картах
                </a>
            </div>
        </div>
    `;
    
    // Добавляем стили для ошибки
    const style = document.createElement('style');
    style.textContent = `
        .map-error {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .map-error i {
            font-size: 3rem;
            color: #e53e3e;
            margin-bottom: 20px;
        }
        
        .map-error h3 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        .map-error p {
            color: #4a5568;
            margin-bottom: 20px;
        }
        
        .error-contacts {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            max-width: 300px;
        }
        
        .error-contacts a {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            color: #4a5568;
            text-decoration: none;
            transition: all 0.3s;
        }
        
        .error-contacts a:hover {
            background: #ed8936;
            color: white;
            border-color: #ed8936;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Открыть маршрут в Яндекс.Картах
 */
function openYandexRoute() {
    const destination = 'г. Белгород, ул. Заводская, д. 15';
    const url = `https://yandex.ru/maps/?rtext=~${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
}

/**
 * Увеличить масштаб карты
 */
function zoomMapIn() {
    if (map) {
        const currentZoom = map.getZoom();
        map.setZoom(currentZoom + 1, {duration: 300});
    }
}

/**
 Уменьшить масштаб карты
 */
function zoomMapOut() {
    if (map) {
        const currentZoom = map.getZoom();
        map.setZoom(currentZoom - 1, {duration: 300});
    }
}

/**
 * Переключить вид карты (схема/спутник)
 */
function toggleSatellite() {
    if (map) {
        const currentType = map.getType();
        if (currentType === 'yandex#map') {
            map.setType('yandex#satellite');
            showNotification('Включен спутниковый вид', 'info');
        } else {
            map.setType('yandex#map');
            showNotification('Включен схематичный вид', 'info');
        }
    }
}

/**
 * Копировать адрес в буфер обмена
 */
function copyAddress() {
    const address = 'г. Белгород, ул. Заводская, д. 15';
    
    navigator.clipboard.writeText(address).then(() => {
        showNotification('Адрес скопирован в буфер обмена', 'success');
    }).catch(err => {
        console.error('Ошибка копирования:', err);
        showNotification('Не удалось скопировать адрес', 'error');
    });
}

/**
 * Инициализация карт при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', function() {
    // Определяем, на какой странице находимся
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/') {
        initMainPageMap();
    } else if (path.includes('kontakty.html')) {
        initContactsPageMap();
    }
    
    // Добавляем обработчики для кнопок управления картой
    const zoomInBtn = document.querySelector('.action-btn-zoom');
    const satelliteBtn = document.querySelector('.action-btn-satellite');
    const routeBtn = document.querySelector('.action-btn-route');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', zoomMapIn);
    }
    
    if (satelliteBtn) {
        satelliteBtn.addEventListener('click', toggleSatellite);
    }
    
    if (routeBtn) {
        routeBtn.addEventListener('click', openYandexRoute);
    }
});

/**
 * Глобальные функции для кнопок
 */
window.openYandexRoute = openYandexRoute;
window.zoomMapIn = zoomMapIn;
window.zoomMapOut = zoomMapOut;
window.toggleSatellite = toggleSatellite;
window.copyAddress = copyAddress;
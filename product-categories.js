/**
 * ПЗМ Завод Комплектации - Управление категориями на страницах товаров
 * Версия 1.0 - Полный комплект
 */

class ProductCategoriesManager {
    constructor() {
        this.currentTractor = null;
        this.currentCategory = 'engine';
        this.categoriesContainer = null;
        this.recommendedContainer = null;
        
        // Загружаем данные из внешнего файла
        this.tractorData = window.TRACTOR_PARTS_DATA || {};
        this.categoriesList = window.CATEGORIES || [];
        this.recommendedData = window.RECOMMENDED_PARTS || {};
    }

    /**
     * Инициализация на странице
     */
    init() {
        // Находим контейнер для категорий
        this.categoriesContainer = document.querySelector('.product-categories-container');
        if (!this.categoriesContainer) {
            console.error('Контейнер категорий не найден');
            return;
        }

        // Получаем модель трактора из data-атрибута
        this.currentTractor = this.categoriesContainer.dataset.tractorModel;
        if (!this.currentTractor || !this.tractorData[this.currentTractor]) {
            console.error('Модель трактора не определена или не найдена в базе данных');
            return;
        }

        // Создаем структуру категорий
        this.renderModelHeader();
        this.renderCategoryTabs();
        this.renderCategoryContent(this.currentCategory);
        
        // Инициализируем рекомендованные товары
        this.initRecommendedProducts();
        
        // Добавляем обработчики событий
        this.addEventListeners();
        
        console.log(`Категории инициализированы для трактора: ${this.tractorData[this.currentTractor].name}`);
    }

    /**
     * Рендер заголовка модели трактора
     */
    renderModelHeader() {
        const tractor = this.tractorData[this.currentTractor];
        
        const headerHTML = `
            <div class="model-header">
                <div class="model-badge">${tractor.name}</div>
                <div>
                    <h2>Комплектующие и запчасти</h2>
                    <p class="model-description">${tractor.description} • Все детали в наличии • Гарантия качества</p>
                </div>
            </div>
        `;
        
        this.categoriesContainer.insertAdjacentHTML('afterbegin', headerHTML);
    }

    /**
     * Рендер вкладок категорий
     */
    renderCategoryTabs() {
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'category-tabs';
        
        this.categoriesList.forEach(category => {
            const isActive = category.id === this.currentCategory ? 'active' : '';
            const tabHTML = `
                <button class="category-tab ${isActive}" data-category="${category.id}">
                    <i class="${category.icon}"></i>
                    <span>${category.name}</span>
                </button>
            `;
            tabsContainer.insertAdjacentHTML('beforeend', tabHTML);
        });
        
        this.categoriesContainer.appendChild(tabsContainer);
    }

    /**
     * Рендер контента категории
     */
    renderCategoryContent(categoryId) {
        // Удаляем предыдущий контент если есть
        const oldContent = this.categoriesContainer.querySelector('.category-content-container');
        if (oldContent) oldContent.remove();
        
        const tractor = this.tractorData[this.currentTractor];
        const category = tractor.categories[categoryId];
        
        if (!category) {
            console.error(`Категория ${categoryId} не найдена для трактора ${this.currentTractor}`);
            return;
        }
        
        const contentContainer = document.createElement('div');
        contentContainer.className = 'category-content-container';
        
        // Галерея категории
        const galleryHTML = this.renderCategoryGallery(category);
        
        // Детали категории
        const partsHTML = this.renderCategoryParts(category);
        
        contentContainer.innerHTML = `
            <div class="category-content active" id="${categoryId}-category">
                ${galleryHTML}
                ${partsHTML}
            </div>
        `;
        
        this.categoriesContainer.appendChild(contentContainer);
    }

    /**
     * Рендер галереи категории
     */
    renderCategoryGallery(category) {
        // Если нет реальных фото, используем заглушки
        const galleryItems = category.gallery && category.gallery.length > 0 
            ? category.gallery.map((img, index) => `
                <div class="gallery-item">
                    <img src="../images/categories/${img}" alt="${category.name} фото ${index + 1}"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTBhYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRldGFpbCBwaG90byA${index + 1}</dGV4dD48L3N2Zz4='">
                    <p>Деталь ${index + 1}</p>
                </div>
            `).join('')
            : Array.from({length: 3}, (_, i) => `
                <div class="gallery-item">
                    <div style="height:150px; background:#e2e8f0; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-cog" style="font-size:2rem; color:#94a3b8;"></i>
                    </div>
                    <p>Пример детали ${i + 1}</p>
                </div>
            `).join('');
        
        return `
            <div class="category-gallery">
                <h3>Детали категории "${category.name}"</h3>
                <div class="gallery-grid">
                    ${galleryItems}
                </div>
            </div>
        `;
    }

    /**
     * Рендер деталей категории
     */
    renderCategoryParts(category) {
        const partsHTML = category.parts.map(part => `
            <div class="part-card">
                <div class="part-image">
                    <img src="../images/parts/${part.id}.jpg" alt="${part.name}"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRhMTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QYXJ0IEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="part-badge">В наличии</div>
                </div>
                <div class="part-info">
                    <h4>${part.name}</h4>
                    <div class="part-price">${part.price.toLocaleString('ru-RU')} ₽</div>
                    <div class="part-specs">
                        <ul>
                            ${part.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="part-actions">
                        <button class="part-button primary" onclick="productCategories.showPartDetail('${part.id}')">
                            <i class="fas fa-shopping-cart"></i> Заказать
                        </button>
                        <button class="part-button secondary" onclick="productCategories.showPartInfo('${part.id}')">
                            <i class="fas fa-info-circle"></i> Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        return `
            <div class="category-parts">
                <h3>Детали в наличии (${category.parts.length} позиций)</h3>
                <div class="parts-grid">
                    ${partsHTML}
                </div>
            </div>
        `;
    }

    /**
     * Переключение категории
     */
    switchCategory(categoryId) {
        // Обновляем активную вкладку
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === categoryId);
        });
        
        // Обновляем контент
        this.currentCategory = categoryId;
        this.renderCategoryContent(categoryId);
        
        // Прокручиваем к началу категории
        const container = this.categoriesContainer.querySelector('.category-content-container');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Инициализация рекомендованных товаров
     */
    initRecommendedProducts() {
        this.recommendedContainer = document.querySelector('.recommended-products');
        if (!this.recommendedContainer) return;
        
        const recommended = this.recommendedData[this.currentTractor];
        if (!recommended || recommended.length === 0) return;
        
        const recommendedHTML = recommended.map(item => `
            <div class="product-card">
                <div class="product-image">
                    <img src="../images/products/${item.image}" alt="${item.name}"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOThmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKEoiBSZWNvbW1lbmRlZDwvdGV4dD48L3N2Zz4='">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${item.name}</h3>
                    <div class="product-price">${item.price.toLocaleString('ru-RU')} ₽</div>
                    <a href="${item.link}" class="cta-button">Смотреть</a>
                </div>
            </div>
        `).join('');
        
        this.recommendedContainer.innerHTML = `
            <h2 class="section-title">Рекомендуемые запчасти для ${this.tractorData[this.currentTractor].name}</h2>
            <div class="recommended-grid">
                ${recommendedHTML}
            </div>
        `;
    }

    /**
     * Показать детальную информацию о детали
     */
    showPartDetail(partId) {
        // Находим деталь в данных
        let part = null;
        const tractor = this.tractorData[this.currentTractor];
        
        for (const category of Object.values(tractor.categories)) {
            part = category.parts.find(p => p.id === partId);
            if (part) break;
        }
        
        if (!part) return;
        
        // Показываем модальное окно заказа
        const orderModal = document.getElementById('orderModal');
        if (orderModal) {
            // Заполняем данные в форме
            const form = orderModal.querySelector('.order-form');
            if (form) {
                const productInput = form.querySelector('input[name="product"]');
                const priceInput = form.querySelector('input[name="price"]');
                const commentInput = form.querySelector('textarea');
                
                if (productInput) productInput.value = part.name;
                if (priceInput) priceInput.value = part.price;
                if (commentInput) commentInput.value = `Заказ детали: ${part.name}\nАртикул: ${part.id}`;
            }
            
            // Обновляем заголовок модального окна
            const modalTitle = orderModal.querySelector('h3');
            if (modalTitle) {
                modalTitle.textContent = `Оформление заказа - ${part.name}`;
            }
            
            // Показываем модальное окно
            orderModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Показать информацию о детали
     */
    showPartInfo(partId) {
        // Находим деталь в данных
        let part = null;
        let categoryName = '';
        const tractor = this.tractorData[this.currentTractor];
        
        for (const [catId, category] of Object.entries(tractor.categories)) {
            part = category.parts.find(p => p.id === partId);
            if (part) {
                categoryName = category.name;
                break;
            }
        }
        
        if (!part) return;
        
        // Создаем детальное модальное окно
        const detailModal = document.createElement('div');
        detailModal.className = 'modal-overlay';
        detailModal.innerHTML = `
            <div class="modal" style="max-width: 600px;">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <h3>${part.name}</h3>
                <div class="part-detail-content">
                    <div class="part-detail-image">
                        <img src="../images/parts/${part.id}.jpg" alt="${part.name}"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRhMTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QYXJ0IEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    </div>
                    <div class="part-detail-info">
                        <div class="part-detail-price">${part.price.toLocaleString('ru-RU')} ₽</div>
                        <div class="part-detail-category">Категория: ${categoryName}</div>
                        <div class="part-detail-specs">
                            <h4>Характеристики:</h4>
                            <ul>
                                ${part.specs.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="part-detail-actions">
                            <button class="cta-button" onclick="productCategories.showPartDetail('${part.id}')">
                                <i class="fas fa-shopping-cart"></i> Заказать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(detailModal);
        
        // Закрытие по клику вне модального окна
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                detailModal.remove();
            }
        });
    }

    /**
     * Добавление обработчиков событий
     */
    addEventListeners() {
        // Обработчики для вкладок категорий
        document.addEventListener('click', (e) => {
            const tab = e.target.closest('.category-tab');
            if (tab && tab.dataset.category) {
                e.preventDefault();
                this.switchCategory(tab.dataset.category);
            }
        });
        
        // Глобальная функция для кнопок деталей
        window.productCategories = {
            showPartDetail: (partId) => this.showPartDetail(partId),
            showPartInfo: (partId) => this.showPartInfo(partId)
        };
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const categoriesManager = new ProductCategoriesManager();
    categoriesManager.init();
});
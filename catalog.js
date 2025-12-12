/**
 * ПЗМ Завод Комплектации - Каталог товаров
 * Версия 1.0 - Полный комплект
 */

class CatalogManager {
    constructor() {
        this.currentModel = 'all';
        this.currentCategory = 'all';
        this.currentPrice = 'all';
        this.currentSort = 'popular';
        this.currentView = 'grid';
        this.currentPage = 1;
        this.productsPerPage = 12;
        
        this.products = [];
        this.filteredProducts = [];
        
        this.init();
    }
    
    /**
     * Инициализация каталога
     */
    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCounts();
    }
    
    /**
     * Загрузка продуктов из данных
     */
    loadProducts() {
        // Используем данные из product-data.js
        const tractorData = window.TRACTOR_PARTS_DATA || {};
        this.products = [];
        
        // Преобразуем структурированные данные в плоский массив продуктов
        for (const [modelKey, modelData] of Object.entries(tractorData)) {
            for (const [categoryKey, categoryData] of Object.entries(modelData.categories)) {
                categoryData.parts.forEach(part => {
                    this.products.push({
                        ...part,
                        model: modelKey,
                        modelName: modelData.name,
                        category: categoryKey,
                        categoryName: categoryData.name
                    });
                });
            }
        }
        
        // Для демонстрации добавим дополнительные продукты
        this.addDemoProducts();
        
        console.log(`Загружено продуктов: ${this.products.length}`);
    }
    
    /**
     * Добавление демо-продуктов
     */
    addDemoProducts() {
        const demoProducts = [
            {
                id: 'demo-1',
                name: 'Колесо ведущее МТЗ',
                price: 8500,
                specs: ['Диаметр 15"', '6 отверстий', 'Покраска'],
                model: 'mtz82',
                modelName: 'МТЗ-82',
                category: 'chassis',
                categoryName: 'Ходовая часть'
            },
            {
                id: 'demo-2',
                name: 'Ремень генератора Т-40',
                price: 850,
                specs: ['Длина 1120мм', 'Клиновой', 'Неопрен'],
                model: 't40',
                modelName: 'Т-40',
                category: 'cooling',
                categoryName: 'Система охлаждения'
            },
            {
                id: 'demo-3',
                name: 'Фара противотуманная',
                price: 1200,
                specs: ['Галоген 55Вт', 'IP67', 'Крепление'],
                model: 'ymz6',
                modelName: 'ЮМЗ-6',
                category: 'electrical',
                categoryName: 'Электрика'
            }
        ];
        
        this.products.push(...demoProducts);
    }
    
    /**
     * Настройка обработчиков событий
     */
    setupEventListeners() {
        // Фильтры
        document.getElementById('tractorModel')?.addEventListener('change', (e) => {
            this.currentModel = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('category')?.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('priceRange')?.addEventListener('change', (e) => {
            this.currentPrice = e.target.value;
            this.applyFilters();
        });
        
        document.querySelector('.filter-apply')?.addEventListener('click', () => {
            this.applyFilters();
        });
        
        document.querySelector('.filter-reset')?.addEventListener('click', () => {
            this.resetFilters();
        });
        
        // Сортировка
        document.querySelector('.sort-select')?.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.sortProducts();
            this.renderProducts();
        });
        
        // Переключение вида
        document.querySelector('.grid-view')?.addEventListener('click', () => {
            this.setView('grid');
        });
        
        document.querySelector('.list-view')?.addEventListener('click', () => {
            this.setView('list');
        });
        
        // Клики по боковому меню
        document.querySelectorAll('.tractor-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const model = link.dataset.model;
                if (model) {
                    this.filterByModel(model);
                }
            });
        });
        
        document.querySelectorAll('.category-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;
                if (category) {
                    this.filterByCategory(category);
                }
            });
        });
        
        // Пагинация
        document.querySelectorAll('.page-btn:not(.prev):not(.next)').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentPage = parseInt(btn.textContent);
                this.updatePagination();
                this.renderProducts();
            });
        });
        
        document.querySelector('.page-btn.prev')?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updatePagination();
                this.renderProducts();
            }
        });
        
        document.querySelector('.page-btn.next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updatePagination();
                this.renderProducts();
            }
        });
    }
    
    /**
     * Применение фильтров
     */
    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Фильтр по модели
            if (this.currentModel !== 'all' && product.model !== this.currentModel) {
                return false;
            }
            
            // Фильтр по категории
            if (this.currentCategory !== 'all' && product.category !== this.currentCategory) {
                return false;
            }
            
            // Фильтр по цене
            if (this.currentPrice !== 'all') {
                const price = product.price;
                switch (this.currentPrice) {
                    case '0-1000':
                        if (price > 1000) return false;
                        break;
                    case '1000-5000':
                        if (price < 1000 || price > 5000) return false;
                        break;
                    case '5000-10000':
                        if (price < 5000 || price > 10000) return false;
                        break;
                    case '10000+':
                        if (price < 10000) return false;
                        break;
                }
            }
            
            return true;
        });
        
        this.sortProducts();
        this.currentPage = 1;
        this.renderProducts();
        this.updateCounts();
        this.updatePagination();
    }
    
    /**
     * Сброс фильтров
     */
    resetFilters() {
        document.getElementById('tractorModel').value = 'all';
        document.getElementById('category').value = 'all';
        document.getElementById('priceRange').value = 'all';
        
        this.currentModel = 'all';
        this.currentCategory = 'all';
        this.currentPrice = 'all';
        
        this.applyFilters();
        
        showNotification('Фильтры сброшены', 'info');
    }
    
    /**
     * Фильтрация по модели из бокового меню
     */
    filterByModel(model) {
        document.getElementById('tractorModel').value = model;
        this.currentModel = model;
        this.applyFilters();
        
        // Обновляем активный элемент в меню
        document.querySelectorAll('.tractor-list a').forEach(link => {
            link.classList.toggle('active', link.dataset.model === model);
        });
    }
    
    /**
     * Фильтрация по категории из бокового меню
     */
    filterByCategory(category) {
        document.getElementById('category').value = category;
        this.currentCategory = category;
        this.applyFilters();
        
        // Обновляем активный элемент в меню
        document.querySelectorAll('.category-list a').forEach(link => {
            link.classList.toggle('active', link.dataset.category === category);
        });
    }
    
    /**
     * Сортировка продуктов
     */
    sortProducts() {
        switch (this.currentSort) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'new':
                // Для демо - сортируем по ID
                this.filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'popular':
            default:
                // Случайный порядок для демонстрации
                this.filteredProducts.sort(() => Math.random() - 0.5);
                break;
        }
    }
    
    /**
     * Установка вида отображения
     */
    setView(view) {
        this.currentView = view;
        
        // Обновляем кнопки
        document.querySelector('.grid-view').classList.toggle('active', view === 'grid');
        document.querySelector('.list-view').classList.toggle('active', view === 'list');
        
        // Обновляем класс контейнера
        const container = document.querySelector('.catalog-products');
        container.classList.toggle('grid-view', view === 'grid');
        container.classList.toggle('list-view', view === 'list');
        
        this.renderProducts();
    }
    
    /**
     * Рендер продуктов
     */
    renderProducts() {
        const container = document.querySelector('.catalog-products');
        if (!container) return;
        
        // Вычисляем какие продукты показывать для текущей страницы
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);
        
        if (productsToShow.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Товары не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                    <button class="cta-button" onclick="catalogManager.resetFilters()">Сбросить фильтры</button>
                </div>
            `;
            return;
        }
        
        // Рендерим продукты
        container.innerHTML = productsToShow.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="images/parts/${product.id}.jpg" alt="${product.name}"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRhMTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QYXJ0IEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="product-badge">${product.modelName}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-category">${product.categoryName}</div>
                    <div class="product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                    <div class="product-specs">
                        <ul>
                            ${product.specs.slice(0, 2).map(spec => `<li>${spec}</li>`).join('')}
                            ${product.specs.length > 2 ? '<li>...</li>' : ''}
                        </ul>
                    </div>
                    <div class="product-actions">
                        <button class="cta-button" onclick="catalogManager.orderProduct('${product.id}')">
                            <i class="fas fa-shopping-cart"></i> Заказать
                        </button>
                        <button class="cta-button secondary" onclick="catalogManager.showDetails('${product.id}')">
                            <i class="fas fa-info-circle"></i> Подробнее
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Добавляем стили для no-products
        const style = document.createElement('style');
        style.textContent = `
            .no-products {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
            }
            
            .no-products i {
                font-size: 4rem;
                color: #cbd5e0;
                margin-bottom: 20px;
            }
            
            .no-products h3 {
                color: #2d3748;
                margin-bottom: 10px;
            }
            
            .no-products p {
                color: #718096;
                margin-bottom: 25px;
            }
            
            .product-badge {
                position: absolute;
                top: 15px;
                left: 15px;
                background: rgba(237, 137, 54, 0.9);
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .product-category {
                color: #718096;
                font-size: 0.9rem;
                margin-bottom: 10px;
            }
            
            .product-specs ul {
                list-style: none;
                padding: 0;
                margin: 15px 0;
            }
            
            .product-specs li {
                padding: 5px 0;
                padding-left: 20px;
                position: relative;
                color: #4a5568;
                font-size: 0.9rem;
            }
            
            .product-specs li:before {
                content: '•';
                position: absolute;
                left: 0;
                color: #ed8936;
            }
            
            .product-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .list-view .product-card {
                display: grid;
                grid-template-columns: 200px 1fr;
                gap: 30px;
                align-items: center;
            }
            
            .list-view .product-image {
                height: 150px;
            }
            
            .list-view .product-info {
                padding: 20px;
            }
            
            @media (max-width: 768px) {
                .list-view .product-card {
                    grid-template-columns: 1fr;
                }
                
                .product-actions {
                    flex-direction: column;
                }
            }
        `;
        
        if (!document.querySelector('#catalog-styles')) {
            style.id = 'catalog-styles';
            document.head.appendChild(style);
        }
    }
    
    /**
     * Обновление счетчиков
     */
    updateCounts() {
        // Обновляем счетчики в боковом меню
        const models = ['t40', 'mtz82', 'ymz6', 'kirovets', 'dt75', 'belarus1221'];
        
        models.forEach(model => {
            const count = this.products.filter(p => p.model === model).length;
            const countElement = document.querySelector(`.tractor-list a[data-model="${model}"] .count`);
            if (countElement) {
                countElement.textContent = `(${count})`;
            }
        });
        
        // Обновляем заголовок
        const title = document.querySelector('.catalog-main h2');
        if (title) {
            const total = this.filteredProducts.length;
            const modelName = this.currentModel !== 'all' 
                ? this.products.find(p => p.model === this.currentModel)?.modelName 
                : 'всех моделей';
            
            title.textContent = `Запчасти для ${modelName} (${total} товаров)`;
        }
    }
    
    /**
     * Обновление пагинации
     */
    updatePagination() {
        const totalProducts = this.filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / this.productsPerPage);
        
        if (totalPages <= 1) {
            document.querySelector('.pagination').style.display = 'none';
            return;
        }
        
        document.querySelector('.pagination').style.display = 'flex';
        
        // Обновляем кнопки prev/next
        const prevBtn = document.querySelector('.page-btn.prev');
        const nextBtn = document.querySelector('.page-btn.next');
        
        prevBtn.disabled = this.currentPage <= 1;
        nextBtn.disabled = this.currentPage >= totalPages;
        
        // Обновляем номера страниц
        const pageNumbers = document.querySelector('.page-numbers');
        let pagesHTML = '';
        
        // Простая логика отображения страниц
        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        // Первая страница
        if (startPage > 1) {
            pagesHTML += `<button class="page-btn">1</button>`;
            if (startPage > 2) {
                pagesHTML += `<span class="page-dots">...</span>`;
            }
        }
        
        // Основные страницы
        for (let i = startPage; i <= endPage; i++) {
            pagesHTML += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}">${i}</button>`;
        }
        
        // Последняя страница
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pagesHTML += `<span class="page-dots">...</span>`;
            }
            pagesHTML += `<button class="page-btn">${totalPages}</button>`;
        }
        
        pageNumbers.innerHTML = pagesHTML;
        
        // Добавляем обработчики для новых кнопок
        document.querySelectorAll('.page-numbers .page-btn').forEach((btn, index) => {
            const pageNum = parseInt(btn.textContent);
            btn.addEventListener('click', () => {
                this.currentPage = pageNum;
                this.updatePagination();
                this.renderProducts();
            });
        });
    }
    
    /**
     * Заказ продукта
     */
    orderProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        openOrderModal(product.name, product.price);
    }
    
    /**
     * Показать детали продукта
     */
    showDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        // Создаем модальное окно с деталями
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal" style="max-width: 700px;">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="product-detail">
                    <div class="detail-image">
                        <img src="images/parts/${product.id}.jpg" alt="${product.name}"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRhMTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QYXJ0IEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    </div>
                    <div class="detail-info">
                        <div class="detail-badges">
                            <span class="badge model">${product.modelName}</span>
                            <span class="badge category">${product.categoryName}</span>
                        </div>
                        <h2>${product.name}</h2>
                        <div class="detail-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                        
                        <div class="detail-specs">
                            <h3>Характеристики:</h3>
                            <ul>
                                ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="detail-actions">
                            <button class="cta-button" onclick="catalogManager.orderProduct('${product.id}')">
                                <i class="fas fa-shopping-cart"></i> Заказать
                            </button>
                            <button class="cta-button secondary" onclick="window.print()">
                                <i class="fas fa-print"></i> Распечатать
                            </button>
                        </div>
                        
                        <div class="detail-note">
                            <p><i class="fas fa-info-circle"></i> Цена указана без учета доставки. Точную стоимость уточняйте у менеджера.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Закрытие по клику вне модального окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Стили для модального окна деталей
        const style = document.createElement('style');
        style.textContent = `
            .product-detail {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 30px;
            }
            
            .detail-image {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .detail-image img {
                max-width: 100%;
                max-height: 250px;
                object-fit: contain;
            }
            
            .detail-badges {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .badge {
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .badge.model {
                background: #ed8936;
                color: white;
            }
            
            .badge.category {
                background: #e2e8f0;
                color: #4a5568;
            }
            
            .detail-info h2 {
                color: #2d3748;
                margin-bottom: 15px;
                font-size: 1.8rem;
            }
            
            .detail-price {
                font-size: 2rem;
                font-weight: 700;
                color: #ed8936;
                margin: 20px 0;
            }
            
            .detail-specs h3 {
                color: #2d3748;
                margin: 25px 0 15px;
            }
            
            .detail-specs ul {
                list-style: none;
                padding: 0;
            }
            
            .detail-specs li {
                padding: 10px 0;
                padding-left: 25px;
                position: relative;
                color: #4a5568;
                border-bottom: 1px dashed #e2e8f0;
            }
            
            .detail-specs li:before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #38a169;
                font-weight: bold;
            }
            
            .detail-actions {
                display: flex;
                gap: 15px;
                margin: 30px 0;
            }
            
            .detail-note {
                background: #ebf8ff;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #3182ce;
            }
            
            .detail-note p {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #2c5282;
                margin: 0;
                font-size: 0.9rem;
            }
            
            @media (max-width: 768px) {
                .product-detail {
                    grid-template-columns: 1fr;
                }
                
                .detail-actions {
                    flex-direction: column;
                }
            }
        `;
        
        if (!document.querySelector('#detail-styles')) {
            style.id = 'detail-styles';
            document.head.appendChild(style);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.catalogManager = new CatalogManager();
});
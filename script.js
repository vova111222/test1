// ===== КОНФИГУРАЦИЯ И ДАННЫЕ =====

// Данные туров
const tours = [
    {
        image: 'main-foto1/vodopad1.jpg',
        title: 'Водопады и джунгли',
        desc: 'Прогулка по живописным местам, много разных водопадов, в самом сердце острова в диких джунглях',
        detailedDesc: 'Этот тур проведет вас через самые красивые водопады острова. Вы увидите скрытые природные бассейны, искупаетесь в кристально чистой воде и насладитесь видами нетронутой природы.',
        price: '7000руб',
        duration: '6 часов',
        groupSize: 'до 8 человек',
        difficulty: 'Средняя',
        gallery: ['vodopad5/v1.jpg', 'vodopad5/v2.jpg', 'vodopad5/v3.jpg', 'vodopad5/v4.jpg', 
            'vodopad5/v5.jpg','vodopad5/v6.jpg', 'vodopad5/v7.jpg', 'vodopad5/v8.jpg', 'vodopad5/v9.jpg', 
            'vodopad5/v10.jpg', 'vodopad5/v11.jpg', 'vodopad5/v12.jpg'],
         videoUrl: 'https://www.youtube.com/embed/ТВОЙ_КОД_ВИДЕО'
    },
    {
        image: 'main-foto1/Plag1.jpg', 
        title: 'Райский пляж',
        desc: 'Вы окунетесь в самую чистейшую воду, дайвинг, посмотр коралловых рыбок',
        detailedDesc: 'Идеальный тур для любителей пляжного отдыха и подводного мира. Мы посетим самые красивые пляжи острова с белым песком и бирюзовой водой.',
        price: '8000руб',
        duration: '8 часов',
        groupSize: 'до 6 человек',
        difficulty: 'Низкая',
        gallery: ['raisrii-plaj4/r1.jpg', 'raisrii-plaj4/r2.jpg', 'raisrii-plaj4/r3.jpg', 'raisrii-plaj4/r4.jpg',
             'raisrii-plaj4/r5.jpg', 'raisrii-plaj4/r6.jpg', 'raisrii-plaj4/r7.jpg', 'raisrii-plaj4/r8.jpg', 
             'raisrii-plaj4/r9.jpg', 'raisrii-plaj4/r10.jpg', 'raisrii-plaj4/r11.jpg', 'raisrii-plaj4/r12.jpg', 'raisrii-plaj4/r13.jpg'],
        videoUrl: 'https://www.youtube.com/embed/ТВОЙ_КОД_ВИДЕО'
             
    },
    {
        image: 'main-foto1/gungli1.jpg',
        title: 'Джунгли', 
        desc: 'Прогулки по диким джунглям, будет возможность искупатся в заводях под водопадом',
        detailedDesc: 'Экстремальное приключение для настоящих исследователей! Мы отправимся вглубь нетронутых джунглей, где вас ждут переход через подвесные мосты и купание в природных бассейнах.',
        price: '9000руб',
        duration: '5 часов',
        groupSize: 'до 10 человек',
        difficulty: 'Высокая',
        gallery: ['jungli3/j1.jpg', 'jungli3/j2.jpg', 'jungli3/j3.jpg', 'jungli3/j4.jpg', 'jungli3/j5.jpg', 'jungli3/j6.jpg',
             'jungli3/j7.jpg', 'jungli3/j8.jpg', 'jungli3/j9.jpg', 'jungli3/j10.jpg'],
         videoUrl: 'https://www.youtube.com/embed/ТВОЙ_КОД_ВИДЕО'
    },
    {
        image: 'main-foto1/diki1.jpg',
        title: 'Дикая бухта',
        desc: 'В этой дикой бухте вы почувствуете сябя, словно вы на не обитаемом острове',
        detailedDesc: 'Уединенный тур для тех, кто хочет почувствовать себя настоящим Робинзоном Крузо. Мы посетим труднодоступные бухты, куда не доходят обычные туристы.',
        price: '9000руб',
        duration: '7 часов',
        groupSize: 'до 4 человек',
        difficulty: 'Средняя',
        gallery: ['dikay-buxta2/db1.jpg', 'dikay-buxta2/db2.jpg', 'dikay-buxta2/db3.jpg', 'dikay-buxta2/db4.jpg', 'dikay-buxta2/db5.jpg',
             'dikay-buxta2/db6.jpg', 'dikay-buxta2/db7.jpg', 'dikay-buxta2/db8.jpg', 'dikay-buxta2/db9.jpg', 'dikay-buxta2/db10.jpg', 
             'dikay-buxta2/db11.jpg', 'dikay-buxta2/db12.jpg', 'dikay-buxta2/db13.jpg', 'dikay-buxta2/db14.jpg', 'dikay-buxta2/bd15.jpg'],
        videoUrl: 'https://www.youtube.com/embed/ТВОЙ_КОД_ВИДЕО'
    },
    {
        image: 'main-foto1/gungli1.jpg',
        title: 'Горное приключение', 
        desc: 'Восхождение на самые живописные вершины острова с опытными гидами',
        detailedDesc: 'Для любителей гор и панорамных видов. Этот тур включает восхождение на самые высокие точки острова, откуда открываются захватывающие виды на океан.',
        price: '11000руб',
        duration: '8 часов',
        groupSize: 'до 6 человек',
        difficulty: 'Высокая',
        gallery: ['jungli3/j1.jpg', 'jungli3/j2.jpg', 'jungli3/j3.jpg'],
        videoUrl: 'https://www.youtube.com/embed/ТВОЙ_КОД_ВИДЕО'
    },
    {
        image: 'main-foto1/diki1.jpg',
        title: 'Ночное сафари',
        desc: 'Уникальная возможность увидеть ночную жизнь джунглей и экзотических животных',
        detailedDesc: 'Магическое путешествие в ночные джунгли! С помощью специального оборудования мы будем наблюдать за ночными животными: лемурами, летучими мышами и ночными птицами.',
        price: '8500руб',
        duration: '4 часа',
        groupSize: 'до 8 человек',
        difficulty: 'Низкая',
        gallery: ['dikay-buxta2/db1.jpg', 'dikay-buxta2/db2.jpg', 'dikay-buxta2/db3.jpg'],
        videoUrl: 'https://www.youtube.com/embed/ТВОЙ_КОД_ВИДЕО'
    }
];

// Данные новостей
// НАЙДИ ЭТУ ЧАСТЬ В script.js И ЗАМЕНИ ВСЮ (строки примерно 406-441):

// Данные новостей
const newsData = [
    {
        id: 1,
        title: "Отправляйтесь на райский пляж 'Райский пляж'",
        excerpt: "Мы нашли самый красивый пляж острова с белым песком и кристально чистой водой.",
        date: "2025-01-15",
        category: "события",
        image: "news-photos/n1.jpg",
        views: 1247,
        tags: ["горы", "новый маршрут", "приключения"],
        featured: true
    },
    {
        id: 2,
        title: "Специальная акция для раннего бронирования",
        excerpt: "Забронируйте любой тур до 1 февраля и получите скидку 15% на все экскурсии! Успейте воспользоваться выгодным предложением.",
        date: "2025-01-10",
        category: "акции",
        image: "news-photos/n2.jpg",
        views: 892,
        tags: ["акция", "скидка", "бронирование"],
        featured: false
    },
    {
        id: 3,
        title: "Как подготовиться к походу в джунгли",
        excerpt: "Подробное руководство для начинающих путешественников: что взять с собой, какую обувь выбрать и как вести себя в дикой природе.",
        date: "2025-01-05",
        category: "советы",
        image: "news-photos/n3.jpg",
        views: 1563,
        tags: ["советы", "подготовка", "джунгли"],
        featured: false
    },
    {
        id: 4,
        title: "Джунгли + Водопады + Дикая бухта",
        excerpt: "Новый маршрут для настоящих искателей приключений!" + 
        "2 дня в дикой природе: переход через джунгли, ночёвка у водопада и отдых в заповедной бухте.",
        date: "2025-01-03",
        category: "обновления",
        image: "news-photos/n5.jpg",
        views: 734,
        tags: ["обновление", "сафари", "ночь"],
        featured: false
    },
    {
        id: 5,
        title: "Сезон дождей: лучшее время для водопадов",
        excerpt: "Узнайте, почему сезон дождей - идеальное время для посещения водопадов и какие из них самые впечатляющие в этот период.",
        date: "2024-12-28",
        category: "советы",
        image: "news-photos/n6.jpg",
        views: 921,
        tags: ["водопады", "сезон", "советы"],
        featured: false
    },
    {
        id: 6,
        title: "Новые фотографии с туров доступны в галерее",
        excerpt: "Обновили галерею свежими фотографиями с последних туров. Теперь вы можете лучше представить свои будущие приключения!",
        date: "2024-12-25",
        category: "обновления",
        image: "news-photos/n7.jpg",
        views: 645,
        tags: ["фотографии", "галерея", "обновление"],
        featured: false
    }
];

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let currentTourIndex = 0;
let currentImageIndex = 0;
let fullscreenCurrentIndex = 0;

// ===== ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ =====
function initImageOptimization() {
    // Ленивая загрузка картинок
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        // Сохраняем оригинальный src в data-src
        if (!img.dataset.src) {
            img.dataset.src = img.src;
            img.src = '';
            img.classList.add('skeleton');
        }
        imageObserver.observe(img);
    });
}

// ===== ФУНКЦИИ ДЛЯ ТУРОВ И ГАЛЕРЕИ =====

/**
 * Генерация карточек туров для секции "Популярные"
 */
function generateTours() {
    const grid = document.querySelector('.features-grid');
    if (!grid) return;
    
    grid.innerHTML = tours.map((tour, index) => `
        <div class="feature-card">
            <div class="card-image" style="background-image: url('${tour.image}')" onclick="openGallery(${index})">
                <button class="gallery-toggle" onclick="event.stopPropagation(); openGallery(${index})">➞</button>
            </div>
            <div class="card-content">
                <h3>${tour.title}</h3>
                <p>${tour.desc}</p>
                <p class="price">цена ${tour.price}</p>
            </div>
        </div>
    `).join('');
}

/**
 * Открытие галереи тура
 */
function openGallery(tourIndex) {
    try {
        currentTourIndex = tourIndex;
        currentImageIndex = 0;
        const tour = tours[tourIndex];
        
        // Заполняем информацию о туре
        document.getElementById('galleryTitle').textContent = tour.title;
        document.getElementById('galleryDescription').textContent = tour.detailedDesc;
        document.getElementById('tourDuration').textContent = tour.duration;
        document.getElementById('tourGroupSize').textContent = tour.groupSize;
        document.getElementById('tourDifficulty').textContent = tour.difficulty;
        document.getElementById('galleryPrice').textContent = tour.price;
        
        // Показываем модальное окно
        document.getElementById('galleryModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Показываем первое фото и создаем миниатюры
        showImage();
        createThumbnails();
        
        // Добавляем обработчик для кнопки бронирования
        document.getElementById('bookTourBtn').onclick = function() {
            bookTour(currentTourIndex);
        };
    } catch (error) {
        console.error('Ошибка при открытии галереи:', error);
        alert('Произошла ошибка при загрузке галереи. Пожалуйста, попробуйте позже.');
    }
}

/**
 * Показ текущего изображения в галерее
 */
function showImage() {
    try {
        const tour = tours[currentTourIndex];
        const imageElement = document.getElementById('galleryImage');
        
        if (tour.gallery && tour.gallery[currentImageIndex]) {
            imageElement.src = tour.gallery[currentImageIndex];
            imageElement.alt = `${tour.title} - фото ${currentImageIndex + 1}`;
        } else {
            imageElement.src = tour.image;
            imageElement.alt = tour.title;
        }
        
        updateActiveThumbnail();
    } catch (error) {
        console.error('Ошибка при отображении изображения:', error);
    }
}
/**
 * Создание миниатюр для галереи
 */
function createThumbnails() {
    try {
        const container = document.getElementById('galleryThumbnails');
        const tour = tours[currentTourIndex];
        
        container.innerHTML = '';
        
        const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];
        
        images.forEach((image, index) => {
            const thumb = document.createElement('img');
            thumb.src = image;
            thumb.alt = `Фото тура ${tour.title} - изображение ${index + 1}`;
            thumb.loading = "lazy";
            thumb.className = 'thumbnail';
            if (index === currentImageIndex) {
                thumb.classList.add('active');
            }
            
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                showImage();
            });
            
            container.appendChild(thumb);
        });
        
        // Добавляем клик на главное фото для полноэкранного просмотра
        const mainImage = document.getElementById('galleryImage');
        mainImage.onclick = function() {
            const tour = tours[currentTourIndex];
            const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];
            
            // Используем новую функцию из gallery-viewer.js
            if (typeof openPhotoFullscreen === 'function') {
                openPhotoFullscreen(mainImage, images, currentImageIndex);
            }
        };
    } catch (error) {
        console.error('Ошибка при создании миниатюр:', error);
    }
}

/**
 * Обновление активной миниатюры
 */
function updateActiveThumbnail() {
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

/**
 * Переход к следующему изображению
 */
function nextImage() {
    const tour = tours[currentTourIndex];
    const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage();
}

/**
 * Переход к предыдущему изображению
 */
function prevImage() {
    const tour = tours[currentTourIndex];
    const images = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage();
}

/**
 * Закрытие галереи
 */
function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== ФУНКЦИИ БРОНИРОВАНИЯ =====

/**
 * Бронирование тура через WhatsApp
 */
function bookTour(tourIndex) {
    try {
        const tour = tours[tourIndex];
        const phoneNumber = '79531776472';
        const message = `Здравствуйте! Хочу забронировать тур: "${tour.title}". Цена: ${tour.price}. Пожалуйста, свяжитесь со мной для уточнения деталей.`;
        
        // Открываем WhatsApp с сообщением
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Закрываем галерею если она открыта
        closeGallery();
    } catch (error) {
        console.error('Ошибка при бронировании тура:', error);
        alert('Произошла ошибка при бронировании. Пожалуйста, попробуйте позже.');
    }
}

// ===== ФУНКЦИИ СЛАЙДЕРА =====

/**
 * Инициализация слайдера туров
 */
function initSlider() {
    const track = document.querySelector('.slider-track');
    if (!track) return;
    
    try {
        // Создаем карточки для слайдера
        track.innerHTML = tours.map((tour, index) => `
            <div class="feature-card" style="min-width: calc(100% / 3); padding: 0 10px;">
                <div class="card-image" style="background-image: url('${tour.image}')" onclick="openGallery(${index})">
                    <button class="gallery-toggle" onclick="event.stopPropagation(); openGallery(${index})">➞</button>
                </div>
                <div class="card-content">
                    <h3>${tour.title}</h3>
                    <p>${tour.desc}</p>
                    <p class="price">цена ${tour.price}</p>
                </div>
            </div>
        `).join('');

        const cards = document.querySelectorAll('.slider-track .feature-card');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (cards.length === 0) return;

        let currentSlide = 0;
        const cardsPerSlide = 3;
        const totalSlides = Math.ceil(cards.length / cardsPerSlide);
        
        // Создаем точки для слайдера
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateSlider() {
            const slideWidth = 100 / cardsPerSlide;
            track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            // Обновляем активную точку
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Автопрокрутка слайдера
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Останавливаем автопрокрутку при наведении
        track.addEventListener('mouseenter', () => clearInterval(slideInterval));
        track.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Инициализируем слайдер
        updateSlider();
    } catch (error) {
        console.error('Ошибка при инициализации слайдера:', error);
    }
}

// ===== ФУНКЦИИ СЕКЦИИ "О НАС" =====

/**
 * Инициализация секции "О нас"
 */
function initAboutSection() {
    // Переключение табов
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок и панелей
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и панели
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Анимация счетчиков
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Запускаем анимацию при скролле к секции
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ===== ФУНКЦИИ СЕКЦИИ НОВОСТЕЙ =====

/**
 * Инициализация секции новостей
 */
function initNewsSection() {
    let currentFilter = 'all';
    let visibleNews = 3;
    
    // Рендер новостей
    function renderNews(filter = 'all', count = visibleNews) {
        try {
            const container = document.getElementById('newsContainer');
            if (!container) return;
            
            const filteredNews = filter === 'all' 
                ? newsData 
                : newsData.filter(news => news.category === filter);
            
            const newsToShow = filteredNews.slice(0, count);
            
            container.innerHTML = newsToShow.map(news => `
                <div class="news-card" data-category="${news.category}">
                    <div class="news-image">
                        <img src="${news.image}" alt="${news.title}" loading="lazy" onerror="this.src='placeholder.jpg'">
                        <span class="news-category">${news.category}</span>
                    </div>
                    <div class="news-content">
                        <div class="news-meta">
                            <span class="news-date">${formatDate(news.date)}</span>
                            <span class="news-views">👁️ ${formatViews(news.views)}</span>
                        </div>
                        <h3>${news.title}</h3>
                        <p class="news-excerpt">${news.excerpt}</p>
                        <div class="news-tags">
                            ${news.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                        <a href="news/news-${news.id}.html" class="read-more">Читать далее →</a>

                    </div>
                </div>
            `).join('');
            
            // Показываем/скрываем кнопку "Показать еще"
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = count < filteredNews.length ? 'block' : 'none';
            }
        } catch (error) {
            console.error('Ошибка при рендеринге новостей:', error);
        }
    }
    
    /**
     * Форматирование даты
     */
    function formatDate(dateString) {
        try {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('ru-RU', options);
        } catch (error) {
            console.error('Ошибка форматирования даты:', error);
            return dateString;
        }
    }
    
    /**
     * Форматирование просмотров
     */
    function formatViews(views) {
        if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views;
    }
    
    /**
     * Настройка фильтров новостей
     */
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Обновляем активную кнопку
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Применяем фильтр
                currentFilter = this.getAttribute('data-filter');
                visibleNews = 3;
                renderNews(currentFilter, visibleNews);
            });
        });
    }
    
    /**
     * Настройка кнопки "Показать еще"
     */
    function setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                visibleNews += 3;
                renderNews(currentFilter, visibleNews);
            });
        }
    }
    
    /**
     * Настройка подписки на новости
     */
    function setupSubscription() {
        const subscribeBtn = document.getElementById('subscribeNewsBtn');
        const emailInput = document.getElementById('newsEmail');
        
        if (subscribeBtn && emailInput) {
            subscribeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                const errors = validateEmail(email);
                
                if (errors.length === 0) {
                    // Здесь можно добавить отправку на сервер
                    showNotification('Спасибо за подписку! Мы отправили confirmation email.', 'success');
                    emailInput.value = '';
                    emailInput.classList.remove('error');
                } else {
                    showNotification(errors[0], 'error');
                    emailInput.classList.add('error');
                }
            });
        }
        
        // Валидация в реальном времени
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const email = this.value.trim();
                const errors = validateEmail(email);
                
                if (errors.length === 0) {
                    this.classList.remove('error');
                    this.classList.add('success');
                } else {
                    this.classList.remove('success');
                    this.classList.add('error');
                }
            });
        }
    }
    
    // Инициализация
    renderNews();
    setupFilters();
    setupLoadMore();
    setupSubscription();
}

// ===== ФУНКЦИИ ВАЛИДАЦИИ =====

/**
 * Валидация email
 */
function validateEmail(email) {
    const errors = [];
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        errors.push('Пожалуйста, введите email адрес.');
    } else if (!re.test(email)) {
        errors.push('Пожалуйста, введите корректный email адрес.');
    }
    
    return errors;
}

/**
 * Показать уведомление
 */
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
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
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== ФУНКЦИИ ПОГОДЫ =====

class WeatherWidget {
    constructor() {
        this.apiKey = '';
        this.city = 'Saint Petersburg';
        this.units = 'metric';
        this.lang = 'ru';
    }
    
    async init() {
        try {
            await this.getCurrentWeather();
            await this.getForecast();
            this.setupRefresh();
        } catch (error) {
            console.error('Ошибка инициализации погодного виджета:', error);
            this.showError();
        }
    }
    
    async getCurrentWeather() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=${this.units}&lang=${this.lang}&appid=${this.apiKey}`
            );
            
            if (!response.ok) throw new Error('Weather data not available');
            
            const data = await response.json();
            this.updateCurrentWeather(data);
            
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.showError();
        }
    }
    
    async getForecast() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=${this.units}&lang=${this.lang}&appid=${this.apiKey}`
            );
            
            if (!response.ok) throw new Error('Forecast data not available');
            
            const data = await response.json();
            this.updateForecast(data);
            
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    }
    
    updateCurrentWeather(data) {
        try {
            // Обновляем основную информацию
            document.getElementById('weatherCity').textContent = data.name;
            document.getElementById('weatherTemp').textContent = Math.round(data.main.temp);
            document.getElementById('weatherDescription').textContent = data.weather[0].description;
            document.getElementById('weatherFeelsLike').textContent = Math.round(data.main.feels_like) + '°C';
            document.getElementById('weatherHumidity').textContent = data.main.humidity + '%';
            document.getElementById('weatherWind').textContent = data.wind.speed + ' м/с';
            document.getElementById('weatherPressure').textContent = data.main.pressure + ' hPa';
            
            // Обновляем иконку
            const iconCode = data.weather[0].icon;
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
            
            // Обновляем время
            document.getElementById('weatherUpdateTime').textContent = this.formatTime(new Date());
        } catch (error) {
            console.error('Ошибка при обновлении данных о погоде:', error);
            this.showError();
        }
    }
    
    updateForecast(data) {
        try {
            const forecastContainer = document.getElementById('weatherForecast');
            const dailyForecasts = this.getDailyForecasts(data.list);
            
            forecastContainer.innerHTML = dailyForecasts.map(day => `
                <div class="forecast-day">
                    <div class="forecast-date">${this.formatDate(day.date)}</div>
                    <div class="forecast-icon">
                        <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}">
                    </div>
                    <div class="forecast-temp">${Math.round(day.temp)}°C</div>
                    <div class="forecast-desc">${day.description}</div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Ошибка при обновлении прогноза погоды:', error);
        }
    }
    
    getDailyForecasts(forecastList) {
        try {
            // Берем прогноз на 12:00 каждого дня
            const dailyForecasts = [];
            const processedDays = new Set();
            
            forecastList.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dayKey = date.toDateString();
                
                // Берем только один прогноз в день (в 12:00)
                if (!processedDays.has(dayKey) && date.getHours() === 12) {
                    dailyForecasts.push({
                        date: date,
                        temp: item.main.temp,
                        icon: item.weather[0].icon,
                        description: item.weather[0].description
                    });
                    processedDays.add(dayKey);
                }
            });
            
            return dailyForecasts.slice(0, 5); // Берем 5 дней
        } catch (error) {
            console.error('Ошибка при получении ежедневного прогноза:', error);
            return [];
        }
    }
    
    formatTime(date) {
        try {
            return date.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Ошибка форматирования времени:', error);
            return '--:--';
        }
    }
    
    formatDate(date) {
        try {
            return date.toLocaleDateString('ru-RU', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            });
        } catch (error) {
            console.error('Ошибка форматирования даты:', error);
            return '--';
        }
    }
    
    setupRefresh() {
        const refreshBtn = document.getElementById('refreshWeather');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.getCurrentWeather();
                this.getForecast();
            });
        }
    }
    
    showError() {
        try {
            const elements = [
                'weatherTemp', 'weatherDescription', 'weatherFeelsLike', 
                'weatherHumidity', 'weatherWind', 'weatherPressure'
            ];
            
            elements.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = '--';
            });
            
            const weatherIcon = document.getElementById('weatherIcon');
            if (weatherIcon) {
                weatherIcon.alt = 'Данные недоступны';
            }
        } catch (error) {
            console.error('Ошибка при отображении ошибки погоды:', error);
        }
    }
}

// ===== ФУНКЦИИ НАВИГАЦИИ =====

/**
 * Обновление активного пункта меню при скролле
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Плавная прокрутка к секциям
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ФУНКЦИИ КАРТЫ =====

/**
 * Класс для виджета карты
 */
class YandexMapWidget {
    constructor() {
        this.map = null;
        this.marker = null;
        this.location = [59.950971, 30.315107];
        this.isSatellite = false;
        this.trafficEnabled = false;
    }
    
    init() {
        this.showFallbackMap();
    }
    
    showFallbackMap() {
        // Fallback - простая карта через iframe
        const mapContainer = document.getElementById('yandex-map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <iframe 
                    src="https://yandex.ru/map-widget/v1/?ll=37.617494%2C55.755826&z=15&pt=37.617494,55.755826,comma" 
                    width="100%" 
                    height="400" 
                    style="border:0; border-radius: 15px;" 
                    allowfullscreen="true">
                </iframe>
            `;
        }
    }
}

// ===== ФУНКЦИИ ДЛЯ КАРТЫ =====

/**
 * Переключение спутникового вида
 */
function setupMapControls() {
    const satelliteBtn = document.getElementById('satelliteView');
    const fullscreenBtn = document.getElementById('fullscreenMap');
    
    if (satelliteBtn) {
        satelliteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            // В реальном проекте здесь будет код для переключения спутникового вида
            const mapFrame = document.querySelector('#yandex-map iframe');
            if (mapFrame) {
                const currentSrc = mapFrame.src;
                if (this.classList.contains('active')) {
                    mapFrame.src = currentSrc.replace('map', 'satellite');
                } else {
                    mapFrame.src = currentSrc.replace('satellite', 'map');
                }
            }
        });
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const mapContainer = document.getElementById('yandex-map');
            if (mapContainer.requestFullscreen) {
                mapContainer.requestFullscreen();
            } else if (mapContainer.webkitRequestFullscreen) {
                mapContainer.webkitRequestFullscreen();
            } else if (mapContainer.msRequestFullscreen) {
                mapContainer.msRequestFullscreen();
            }
        });
    }
}

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====

/**
 * Открытие навигации Яндекс
 */
function openYandexNavigation() {
    try {
        const coordinates = [59.950971, 30.315107].join(',');
        const url = `https://yandex.ru/maps/?rtext=~${coordinates}&rtt=auto`;
        window.open(url, '_blank');
    } catch (error) {
        console.error('Ошибка при открытии навигации:', error);
        alert('Не удалось открыть навигацию. Пожалуйста, попробуйте позже.');
    }
}

/**
 * Копирование телефона в буфер обмена
 */
function copyPhone() {
    try {
        const phone = '+79531776472';
        navigator.clipboard.writeText(phone).then(() => {
            showNotification('Телефон скопирован: ' + phone, 'success');
        }).catch(() => {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = phone;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Телефон скопирован: ' + phone, 'success');
        });
    } catch (error) {
        console.error('Ошибка при копировании телефона:', error);
        showNotification('Не удалось скопировать телефон', 'error');
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ =====

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация основных модулей
    generateTours();
    initSlider();
    initAboutSection();
    initNewsSection();
    
    // Инициализация погодного виджета
    const weatherWidget = new WeatherWidget();
    weatherWidget.init();
    
    // Инициализация карты
    const yandexMapWidget = new YandexMapWidget();
    yandexMapWidget.init();
    
    // Инициализация управления картой
    setupMapControls();
    
    // Мобильное меню
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    
    // Кнопка "Подобрать тур" в герое
    document.getElementById('findTourBtn').addEventListener('click', function() {
        document.getElementById('popular').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Кнопка "Заказать звонок"
    document.querySelector('.call-btn').addEventListener('click', function() {
        const phoneNumber = '79531776472';
        window.open(`tel:${phoneNumber}`);
    });
    
    // Галерея события
    document.querySelector('.close-gallery').addEventListener('click', closeGallery);
    document.getElementById('galleryModal').addEventListener('click', function(e) {
        if (e.target === this) closeGallery();
    });
    document.querySelector('.gallery-nav.next').addEventListener('click', nextImage);
    document.querySelector('.gallery-nav.prev').addEventListener('click', prevImage);
    
    // Навигация клавишами
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('galleryModal').style.display === 'flex') {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeGallery();
        }
    });
    
    // Плавная прокрутка
    setupSmoothScroll();
    
    // Обновление активной навигации при скролле
    window.addEventListener('scroll', updateActiveNav);
});

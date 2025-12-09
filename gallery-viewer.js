// ===== ГАЛЕРЕЯ ДЛЯ ПРОСМОТРА ФОТО И ВИДЕО =====
// Общий файл для туров и новостей

// Глобальные переменные
let currentPhotoIndex = 0;
let currentScale = 1;
let isDragging = false;
let lastTouchDistance = null;
let allPhotos = [];
let isOpen = false;

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

/**
 * Определить тип контента (фото/видео)
 */
function getContentType(element) {
    const src = element.src || element.href || element.dataset.src || '';
    
    if (!src) return 'unknown';
    
    // Проверяем видео по расширению или URL
    const videoPatterns = [
        /\.mp4($|\?)/i,
        /\.webm($|\?)/i, 
        /\.avi($|\?)/i,
        /\.mov($|\?)/i,
        /\.mkv($|\?)/i,
        /youtube\.com/i,
        /youtu\.be/i,
        /vimeo\.com/i,
        /video\//i
    ];
    
    const isVideo = videoPatterns.some(pattern => pattern.test(src));
    return isVideo ? 'video' : 'image';
}

/**
 * Проверить YouTube ли это
 */
function isYouTubeVideo(url) {
    return url.includes('youtube.com') || url.includes('youtu.be');
}

// ===== ОСНОВНЫЕ ФУНКЦИИ =====

/**
 * Открыть фото или видео на весь экран
 */
function openPhotoFullscreen(element, contentArray = null, startIndex = 0) {
    try {
        const contentType = getContentType(element);
        
        if (contentType === 'video') {
            openVideoFullscreen(element);
            return;
        }
        
        // ПРОВЕРКА ДЛЯ ГАЛЕРЕИ ТУРОВ
        if (contentArray && Array.isArray(contentArray) && contentArray.length > 0) {
            // Если передали массив фото (из галереи туров)
            allPhotos = contentArray.map((src, index) => ({
                src: src,
                alt: `Фото ${index + 1}`,
                element: null
            }));
            currentPhotoIndex = startIndex;
        } else {
            // Для обычных страниц (новостей)
            allPhotos = collectAllPhotos(element);
        }
        
        currentScale = 1;
        isOpen = true;
        
        // Создаём HTML для просмотрщика
        createViewerHTML();
        
        // Показываем текущее фото
        showCurrentPhoto();
        
        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
        
        // Добавляем обработчики клавиш
        document.addEventListener('keydown', handleKeyPress);
        
    } catch (error) {
        console.error('Ошибка при открытии контента:', error);
    }
}

/**
 * Собрать все фото на странице (для новостей)
 */
function collectAllPhotos(clickedImg) {
    const photos = [];
    
    // Проверяем есть ли галерея туров
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal && galleryModal.style.display === 'flex') {
        // Это галерея туров - собираем фото из неё
        return getTourGalleryPhotos(clickedImg);
    }
    
    // Для обычных страниц (новостей)
    const container = clickedImg.closest('article, .gallery-container, .article-content');
    if (container) {
        const imgs = container.querySelectorAll('img');
        imgs.forEach(img => {
            if (img.src && !img.src.includes('data:image')) {
                photos.push({
                    src: img.src,
                    alt: img.alt || 'Фото',
                    element: img
                });
            }
        });
    }
    
    // Если не нашли фото в контейнере, берём все на странице
    if (photos.length === 0) {
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.src.includes('data:image')) {
                photos.push({
                    src: img.src,
                    alt: img.alt || 'Фото',
                    element: img
                });
            }
        });
    }
    
    // Находим индекс кликнутого фото
    const clickedSrc = clickedImg.src;
    const foundIndex = photos.findIndex(p => p.src === clickedSrc);
    if (foundIndex !== -1) {
        currentPhotoIndex = foundIndex;
    }
    
    return photos;
}

/**
 * Получить фото из галереи туров
 */
function getTourGalleryPhotos(clickedImg) {
    const photos = [];
    
    // Главное фото галереи
    const mainImage = document.getElementById('galleryImage');
    if (mainImage && mainImage.src) {
        photos.push({
            src: mainImage.src,
            alt: mainImage.alt || 'Главное фото',
            element: mainImage
        });
    }
    
    // Миниатюры галереи
    const thumbnails = document.querySelectorAll('#galleryThumbnails .thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (thumb.src && thumb.src !== mainImage.src) {
            photos.push({
                src: thumb.src,
                alt: thumb.alt || `Фото ${index + 1}`,
                element: thumb
            });
        }
    });
    
    // Находим индекс кликнутого фото
    const clickedSrc = clickedImg.src;
    const foundIndex = photos.findIndex(p => p.src === clickedSrc);
    if (foundIndex !== -1) {
        currentPhotoIndex = foundIndex;
    } else if (mainImage && mainImage.src === clickedSrc) {
        currentPhotoIndex = 0; // Если кликнули на главное фото
    }
    
    return photos;
}

// ===== ВИДЕО ФУНКЦИИ =====

/**
 * Открыть видео на весь экран
 */
function openVideoFullscreen(videoElement) {
    try {
        const videoSrc = videoElement.src || videoElement.href || videoElement.dataset.src;
        const videoAlt = videoElement.alt || 'Видео';
        
        // Создаём HTML для видео-просмотрщика
        const viewerHTML = `
            <div id="video-viewer" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <span onclick="closeVideoFullscreen()" style="
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    color: white;
                    font-size: 40px;
                    cursor: pointer;
                    z-index: 10001;
                    background: none;
                    border: none;
                    padding: 10px;
                ">&times;</span>
                
                <div style="
                    width: 90%;
                    max-width: 1200px;
                    background: #000;
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                ">
                    ${isYouTubeVideo(videoSrc) ? createYouTubePlayer(videoSrc) : createHTML5Video(videoSrc)}
                    
                    <div style="
                        padding: 20px;
                        color: white;
                        background: rgba(0,0,0,0.7);
                    ">
                        <h3 style="margin: 0 0 10px 0;">${videoAlt}</h3>
                        <p style="margin: 0; opacity: 0.8;">Нажмите на видео для управления воспроизведением</p>
                    </div>
                </div>
            </div>
        `;
        
        // Вставляем в страницу
        document.body.insertAdjacentHTML('beforeend', viewerHTML);
        document.body.style.overflow = 'hidden';
        
        // Добавляем обработчик клавиши Esc
        document.addEventListener('keydown', handleVideoKeyPress);
        
    } catch (error) {
        console.error('Ошибка при открытии видео:', error);
        // Fallback: открыть видео в новой вкладке
        if (videoSrc) window.open(videoSrc, '_blank');
    }
}

/**
 * Создать YouTube плеер
 */
function createYouTubePlayer(youtubeUrl) {
    // Извлекаем ID видео из YouTube URL
    let videoId = '';
    
    if (youtubeUrl.includes('youtu.be/')) {
        videoId = youtubeUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (youtubeUrl.includes('v=')) {
        videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
    } else if (youtubeUrl.includes('/embed/')) {
        videoId = youtubeUrl.split('/embed/')[1]?.split('?')[0];
    }
    
    if (videoId) {
        return `
            <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
    }
    
    return createHTML5Video(youtubeUrl);
}

/**
 * Создать HTML5 видео плеер
 */
function createHTML5Video(videoSrc) {
    return `
        <video 
            controls 
            autoplay 
            style="width: 100%; height: auto; max-height: 80vh;"
            oncontextmenu="return false;"
        >
            <source src="${videoSrc}" type="video/mp4">
            <source src="${videoSrc}" type="video/webm">
            Ваш браузер не поддерживает видео.
        </video>
    `;
}

/**
 * Закрыть видео-просмотрщик
 */
function closeVideoFullscreen() {
    const viewer = document.getElementById('video-viewer');
    if (viewer) {
        // Останавливаем все видео перед удалением
        const videos = viewer.querySelectorAll('video, iframe');
        videos.forEach(video => {
            if (video.pause) video.pause();
            if (video.src && video.src.includes('youtube')) {
                video.src = ''; // Останавливаем YouTube
            }
        });
        
        viewer.remove();
    }
    
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleVideoKeyPress);
}

/**
 * Обработчик клавиш для видео
 */
function handleVideoKeyPress(e) {
    if (e.key === 'Escape') {
        closeVideoFullscreen();
    }
    if (e.key === ' ') {
        const video = document.querySelector('#video-viewer video');
        if (video) {
            if (video.paused) video.play();
            else video.pause();
            e.preventDefault();
        }
    }
}

// ===== СОЗДАНИЕ HTML ДЛЯ ФОТО-ПРОСМОТРЩИКА =====

/**
 * Создать HTML для просмотрщика фото
 */
function createViewerHTML() {
    // Удаляем старый просмотрщик если есть
    const oldViewer = document.getElementById('photo-viewer');
    if (oldViewer) oldViewer.remove();
    
    // Создаём HTML
    const viewerHTML = `
        <div id="photo-viewer" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: zoom-in;
        ">
            <span id="close-viewer" style="
                position: absolute;
                top: 20px;
                right: 30px;
                color: white;
                font-size: 40px;
                cursor: pointer;
                z-index: 10001;
                background: none;
                border: none;
                padding: 10px;
            " onclick="closePhotoFullscreen()">&times;</span>
            
            <button id="prev-photo" style="
                position: absolute;
                top: 50%;
                left: 30px;
                transform: translateY(-50%);
                background: rgba(255,255,255,0.2);
                border: 2px solid rgba(255,255,255,0.8);
                color: white;
                padding: 15px;
                cursor: pointer;
                font-size: 24px;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
            " onclick="prevPhoto()">‹</button>
            
            <button id="next-photo" style="
                position: absolute;
                top: 50%;
                right: 30px;
                transform: translateY(-50%);
                background: rgba(255,255,255,0.2);
                border: 2px solid rgba(255,255,255,0.8);
                color: white;
                padding: 15px;
                cursor: pointer;
                font-size: 24px;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
            " onclick="nextPhoto()">›</button>
            
            <div id="viewer-container" style="
                position: relative;
                max-width: 90%;
                max-height: 90%;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <img id="viewer-image" style="
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    border-radius: 10px;
                    transition: transform 0.3s ease;
                    transform-origin: center;
                ">
                
                <div id="zoom-indicator" style="
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 14px;
                    z-index: 10002;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                "></div>
            </div>
            
            <div id="zoom-controls" style="
                position: fixed;
                bottom: 100px;
                right: 30px;
                z-index: 10002;
                display: flex;
                flex-direction: column;
                gap: 10px;
            ">
                <button class="zoom-btn" onclick="zoomViewerIn()" style="
                    width: 50px;
                    height: 50px;
                    background: rgba(255,255,255,0.9);
                    border: none;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                ">+</button>
                <button class="zoom-btn" onclick="zoomViewerOut()" style="
                    width: 50px;
                    height: 50px;
                    background: rgba(255,255,255,0.9);
                    border: none;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                ">−</button>
                <button class="zoom-btn" onclick="resetViewerZoom()" style="
                    width: 50px;
                    height: 50px;
                    background: rgba(255,255,255,0.9);
                    border: none;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                ">↺</button>
            </div>
        </div>
    `;
    
    // Вставляем в страницу
    document.body.insertAdjacentHTML('beforeend', viewerHTML);
    
    // Настраиваем зум и касания
    setupZoom();
    setupTouch();
}

// ===== ПОКАЗ ФОТО И НАВИГАЦИЯ =====

/**
 * Показать текущее фото
 */
function showCurrentPhoto() {
    if (allPhotos.length === 0) return;
    
    const photo = allPhotos[currentPhotoIndex];
    const imgElement = document.getElementById('viewer-image');
    
    if (imgElement && photo) {
        imgElement.src = photo.src;
        imgElement.alt = photo.alt;
        resetViewerZoom();
    }
}

/**
 * Следующее фото
 */
function nextPhoto() {
    if (allPhotos.length === 0) return;
    
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    showCurrentPhoto();
}

/**
 * Предыдущее фото
 */
function prevPhoto() {
    if (allPhotos.length === 0) return;
    
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    showCurrentPhoto();
}

/**
 * Закрыть просмотрщик фото
 */
function closePhotoFullscreen() {
    const viewer = document.getElementById('photo-viewer');
    if (viewer) {
        viewer.remove();
    }
    
    isOpen = false;
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleKeyPress);
}

// ===== ЗУМ И УПРАВЛЕНИЕ =====

/**
 * Настройка зума
 */
function setupZoom() {
    const imgElement = document.getElementById('viewer-image');
    if (!imgElement) return;
    
    // Зум колесиком мыши
    imgElement.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        if (e.deltaY < 0) {
            zoomViewerIn();
        } else {
            zoomViewerOut();
        }
    });
    
    // Двойной клик для зума
    imgElement.addEventListener('dblclick', function(e) {
        e.preventDefault();
        if (currentScale === 1) {
            currentScale = 2;
        } else {
            currentScale = 1;
        }
        applyViewerZoom();
    });
}

/**
 * Настройка касаний для телефонов
 */
function setupTouch() {
    const imgElement = document.getElementById('viewer-image');
    if (!imgElement) return;
    
    // Pinch-to-zoom
    imgElement.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            lastTouchDistance = getTouchDistance(e.touches[0], e.touches[1]);
            e.preventDefault();
        }
    });
    
    imgElement.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
            const scaleChange = currentDistance / lastTouchDistance;
            
            const newScale = currentScale * scaleChange;
            if (newScale >= 1 && newScale <= 5) {
                currentScale = newScale;
                applyViewerZoom();
            }
            
            lastTouchDistance = currentDistance;
            e.preventDefault();
        }
    });
    
    imgElement.addEventListener('touchend', function() {
        lastTouchDistance = null;
    });
}

/**
 * Расстояние между двумя касаниями
 */
function getTouchDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Увеличить масштаб
 */
function zoomViewerIn() {
    if (currentScale < 3) {
        currentScale += 0.5;
        applyViewerZoom();
    }
}

/**
 * Уменьшить масштаб
 */
function zoomViewerOut() {
    if (currentScale > 1) {
        currentScale -= 0.5;
        applyViewerZoom();
    }
}

/**
 * Сбросить масштаб
 */
function resetViewerZoom() {
    currentScale = 1;
    applyViewerZoom();
}

/**
 * Применить масштаб
 */
function applyViewerZoom() {
    const imgElement = document.getElementById('viewer-image');
    const viewer = document.getElementById('photo-viewer');
    const indicator = document.getElementById('zoom-indicator');
    
    if (!imgElement) return;
    
    imgElement.style.transform = `scale(${currentScale})`;
    
    if (currentScale > 1) {
        imgElement.style.cursor = 'grab';
        if (viewer) viewer.style.cursor = 'zoom-in';
    } else {
        imgElement.style.cursor = 'zoom-in';
        if (viewer) viewer.style.cursor = 'zoom-in';
    }
    
    // Показать индикатор зума
    if (indicator) {
        indicator.textContent = `${Math.round(currentScale * 100)}%`;
        indicator.style.opacity = '1';
        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 1000);
    }
}

/**
 * Обработка горячих клавиш для фото
 */
function handleKeyPress(e) {
    if (!isOpen) return;
    
    switch(e.key) {
        case 'Escape':
            closePhotoFullscreen();
            break;
        case 'ArrowRight':
            nextPhoto();
            break;
        case 'ArrowLeft':
            prevPhoto();
            break;
        case '+':
        case '=':
            zoomViewerIn();
            break;
        case '-':
            zoomViewerOut();
            break;
        case '0':
            resetViewerZoom();
            break;
    }
}

// ===== ПРОСТОЙ ИНТЕРФЕЙС ДЛЯ ИСПОЛЬЗОВАНИЯ =====

/**
 * Простая функция для открытия одного фото
 */
function openSinglePhoto(imgElement) {
    if (!imgElement || !imgElement.src) return;
    
    allPhotos = [{
        src: imgElement.src,
        alt: imgElement.alt || 'Фото',
        element: imgElement
    }];
    
    currentPhotoIndex = 0;
    openPhotoFullscreen(imgElement);
}

/**
 * Функция для совместимости (для туров)
 */
function openFullscreen(imageIndex) {
    const mainImage = document.getElementById('galleryImage');
    if (mainImage) {
        openPhotoFullscreen(mainImage);
    }
}

// ===== АВТОМАТИЧЕСКАЯ НАСТРОЙКА ФОТО И ВИДЕО =====

/**
 * Автоматически сделать все фото и видео кликабельными
 */
function setupPagePhotos() {
    // Ждём загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPagePhotos);
    } else {
        initPagePhotos();
    }
}

function initPagePhotos() {
    // 1. Настраиваем видео-ссылки
    const videoSelectors = [
        'a[href*=".mp4"]',
        'a[href*=".webm"]', 
        'a[href*=".avi"]',
        'a[href*=".mov"]',
        'a[href*="youtube"]',
        'a[href*="youtu.be"]',
        'a[data-video]',
        'video[src]'
    ];
    
    videoSelectors.forEach(selector => {
        const videos = document.querySelectorAll(selector);
        videos.forEach(video => {
            video.style.cursor = 'pointer';
            video.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openVideoFullscreen(this);
            });
        });
    });
    
    // 2. Настраиваем фото
    const allImages = document.querySelectorAll('img');
    
    const filteredImages = Array.from(allImages).filter(img => {
        // Пропускаем если это иконка или логотип
        if (img.classList.contains('social-icon') || 
            img.classList.contains('site-logo') ||
            img.classList.contains('weather-icon') ||
            img.alt.includes('иконка') ||
            img.alt.includes('icon') ||
            img.alt.includes('лого') ||
            img.src.includes('icon') ||
            img.width < 100) {
            return false;
        }
        
        // Проверяем что это реальное фото
        return img.src && 
               !img.src.includes('data:image') && 
               (img.naturalWidth > 100 || img.width > 100);
    });
    
    // Делаем фото кликабельными
    filteredImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openSinglePhoto(this);
        });
    });
}

// ===== ЭКСПОРТ ФУНКЦИЙ ДЛЯ ГЛОБАЛЬНОГО ИСПОЛЬЗОВАНИЯ =====

window.openPhotoFullscreen = openPhotoFullscreen;
window.openSinglePhoto = openSinglePhoto;
window.openFullscreen = openFullscreen;
window.openVideoFullscreen = openVideoFullscreen;
window.closePhotoFullscreen = closePhotoFullscreen;
window.closeVideoFullscreen = closeVideoFullscreen;
window.nextPhoto = nextPhoto;
window.prevPhoto = prevPhoto;
window.zoomViewerIn = zoomViewerIn;
window.zoomViewerOut = zoomViewerOut;
window.resetViewerZoom = resetViewerZoom;

// Автоматически настраиваем фото и видео при загрузке скрипта
setupPagePhotos();

// ===== КОНЕЦ ФАЙЛА gallery-viewer.js =====
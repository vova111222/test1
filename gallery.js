/**
 * ПЗМ Завод Комплектации - Галерея проектов
 * Версия 1.0 - Полный комплект
 */

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initProjectModal();
});

/**
 * Инициализация галереи проектов
 */
function initGallery() {
    // Инициализация модального окна для проектов
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

/**
 * Показать детали проекта
 */
function showProjectDetails(projectId) {
    const projectsData = {
        1: {
            title: 'Запчасти для двигателей',
            category: 'Двигатели',
            duration: '2 недели',
            price: '85 000 ₽',
            location: 'Выборгский район, СПб',
            description: 'Комплексный заказ запчастей для двигателей тракторов МТЗ и Кировец. Включает поршни, коленвалы, ГБЦ и комплектующие.',
            details: `
                <h3>Детали проекта:</h3>
                <ul>
                    <li>Поршни Д-240 (комплект 4шт) - 4 шт</li>
                    <li>Коленвал ЯМЗ-240 - 1 шт</li>
                    <li>ГБЦ Д-240 - 2 шт</li>
                    <li>Клапаны впускные/выпускные - 16 шт</li>
                    <li>Комплект прокладок - 2 набора</li>
                </ul>
                
                <h4>Особенности:</h4>
                <ul>
                    <li>Термообработка всех деталей</li>
                    <li>Контроль качества каждого элемента</li>
                    <li>Упаковка для безопасной транспортировки</li>
                </ul>
                
                <h4>Отзыв клиента:</h4>
                <blockquote>
                    "Заказывали запчасти для ремонта трактора. Все детали отличного качества, 
                    соответствуют оригиналу. Доставили вовремя. Рекомендую!"
                </blockquote>
            `,
            images: ['project1-1.jpg', 'project1-2.jpg']
        },
        2: {
            title: 'Мосты для тяжелой техники',
            category: 'Ходовая часть',
            duration: '3 недели',
            price: '120 000 ₽',
            location: 'Курортный район, СПб',
            description: 'Изготовление и ремонт мостов для тяжелой сельхозтехники. Полная балансировка и тестирование.',
            details: `
                <h3>Детали проекта:</h3>
                <ul>
                    <li>Мост передний МТЗ-82 - 1 шт</li>
                    <li>Дифференциал блокируемый - 2 шт</li>
                    <li>ШРУСы усиленные - 4 шт</li>
                    <li>Ступицы с подшипниками - 4 комплекта</li>
                    <li>Тормозные диски - 4 шт</li>
                </ul>
                
                <h4>Особенности:</h4>
                <ul>
                    <li>Усиленная конструкция</li>
                    <li>Балансировка на специальном стенде</li>
                    <li>Покраска антикоррозийным составом</li>
                </ul>
                
                <h4>Отзыв клиента:</h4>
                <blockquote>
                    "Мост изготовили точно в срок. Качество на высшем уровне. 
                    Техника работает уже полгода без нареканий."
                </blockquote>
            `,
            images: ['project2-1.jpg', 'project2-2.jpg']
        },
        3: {
            title: 'Комплектующие для КПП',
            category: 'Коробка передач',
            duration: '1 неделя',
            price: '65 000 ₽',
            location: 'Приморский район, СПб',
            description: 'Производство комплектующих для коробок передач различных моделей тракторов.',
            details: `
                <h3>Детали проекта:</h3>
                <ul>
                    <li>Шестерни КПП (различные модули) - 12 шт</li>
                    <li>Валы первичные/вторичные - 4 шт</li>
                    <li>Подшипники КПП - 8 шт</li>
                    <li>Синхронизаторы - 6 комплектов</li>
                    <li>Сальники и уплотнения - 20 шт</li>
                </ul>
                
                <h4>Особенности:</h4>
                <ul>
                    <li>Высокоточное изготовление на ЧПУ</li>
                    <li>Азотирование поверхностей</li>
                    <li>Индивидуальная упаковка каждой детали</li>
                </ul>
                
                <h4>Отзыв клиента:</h4>
                <blockquote>
                    "Нужны были срочно шестерни для КПП. Сделали за неделю, 
                    хотя другие обещали месяц. Качество отличное!"
                </blockquote>
            `,
            images: ['project3-1.jpg', 'project3-2.jpg']
        }
    };
    
    const project = projectsData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-header">
                <h2>${project.title}</h2>
                <div class="project-modal-category">${project.category}</div>
            </div>
            
            <div class="project-modal-grid">
                <div class="project-modal-info">
                    <div class="project-modal-specs">
                        <div class="spec">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <strong>Срок выполнения</strong>
                                <p>${project.duration}</p>
                            </div>
                        </div>
                        <div class="spec">
                            <i class="fas fa-ruble-sign"></i>
                            <div>
                                <strong>Стоимость</strong>
                                <p>${project.price}</p>
                            </div>
                        </div>
                        <div class="spec">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Местоположение</strong>
                                <p>${project.location}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-modal-description">
                        <h3>Описание проекта</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    ${project.details}
                </div>
                
                <div class="project-modal-gallery">
                    <h3>Фото проекта</h3>
                    <div class="project-images">
                        ${project.images.map((img, index) => `
                            <div class="project-image-item">
                                <div class="image-placeholder">
                                    <i class="fas fa-image"></i>
                                    <span>Фото ${index + 1}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="project-modal-actions">
                        <a href="tel:+78121234567" class="cta-button">
                            <i class="fas fa-phone"></i> Обсудить проект
                        </a>
                        <a href="https://wa.me/78121234567?text=Здравствуйте!%20Интересует%20проект%20'${encodeURIComponent(project.title)}'" 
                           class="cta-button secondary" target="_blank">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * Закрыть модальное окно
 */
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

/**
 * Загрузка каталога (заглушка)
 */
function downloadCatalog() {
    showNotification('Каталог начнет скачиваться через секунду...', 'info');
    
    setTimeout(() => {
        // Здесь будет реальная загрузка файла
        // window.location.href = '/downloads/catalog.pdf';
        
        showNotification('К сожалению, каталог временно недоступен. Мы отправим его вам по email.', 'info');
        
        // Предложить ввести email для отправки каталога
        setTimeout(() => {
            const email = prompt('Введите ваш email для получения каталога:');
            if (email) {
                showNotification(`Каталог будет отправлен на ${email} в течение 24 часов.`, 'success');
            }
        }, 1000);
    }, 1000);
}

/**
 * Инициализация модального окна проектов
 */
function initProjectModal() {
    const modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            <div id="modalContent"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Стили для модального окна проектов
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        
        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 30px;
            border-radius: 12px;
            width: 90%;
            max-width: 1000px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #666;
        }
        
        .close-modal:hover {
            color: #ed8936;
        }
        
        .project-modal-content {
            padding: 20px;
        }
        
        .project-modal-header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .project-modal-header h2 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        .project-modal-category {
            display: inline-block;
            background: #ed8936;
            color: white;
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        
        .project-modal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        
        .project-modal-specs {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        
        .project-modal-specs .spec {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .project-modal-specs .spec i {
            font-size: 1.5rem;
            color: #ed8936;
        }
        
        .project-modal-description {
            margin-bottom: 30px;
        }
        
        .project-modal-description h3 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        .project-images {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .project-image-item {
            aspect-ratio: 4/3;
            background: #f1f5f9;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #64748b;
        }
        
        .project-modal-actions {
            display: flex;
            gap: 15px;
        }
        
        @media (max-width: 768px) {
            .project-modal-grid {
                grid-template-columns: 1fr;
            }
            
            .modal-content {
                margin: 10% auto;
                width: 95%;
                padding: 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Глобальные функции
 */
window.showProjectDetails = showProjectDetails;
window.closeModal = closeModal;
window.downloadCatalog = downloadCatalog;
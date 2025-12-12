/**
 * ПЗМ Завод Комплектации - Интерактивные шаги "Как мы работаем"
 * Версия 1.0 - Полный комплект
 */

document.addEventListener('DOMContentLoaded', function() {
    initWorkSteps();
});

/**
 * Инициализация интерактивных шагов
 */
function initWorkSteps() {
    const steps = document.querySelectorAll('.work-step');
    
    steps.forEach(step => {
        // Добавляем анимацию при наведении
        step.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Закрытие по клику вне шага
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.work-step') && !e.target.closest('.step-content')) {
            closeAllSteps();
        }
    });
}

/**
 * Открыть шаг
 */
function openStep(stepNumber) {
    // Закрываем все открытые шаги
    closeAllSteps();
    
    const step = document.querySelector(`.work-step:nth-child(${stepNumber})`);
    const stepContent = document.getElementById(`stepContent${stepNumber}`);
    
    if (!step || !stepContent) return;
    
    // Добавляем активный класс
    step.classList.add('active');
    stepContent.style.display = 'block';
    
    // Анимация появления
    setTimeout(() => {
        stepContent.style.opacity = '1';
        stepContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Прокручиваем к шагу если нужно
    if (window.innerWidth <= 768) {
        step.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Закрыть шаг
 */
function closeStep(stepNumber, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const step = document.querySelector(`.work-step:nth-child(${stepNumber})`);
    const stepContent = document.getElementById(`stepContent${stepNumber}`);
    
    if (!step || !stepContent) return;
    
    // Анимация закрытия
    stepContent.style.opacity = '0';
    stepContent.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        step.classList.remove('active');
        stepContent.style.display = 'none';
        step.style.transform = 'translateY(0) scale(1)';
    }, 300);
}

/**
 * Закрыть все открытые шаги
 */
function closeAllSteps() {
    const activeSteps = document.querySelectorAll('.work-step.active');
    
    activeSteps.forEach(step => {
        const stepNumber = Array.from(step.parentNode.children).indexOf(step) + 1;
        closeStep(stepNumber);
    });
}

/**
 * Показать следующий шаг
 */
function nextStep(currentStep) {
    closeStep(currentStep);
    
    const nextStepNumber = currentStep + 1;
    const totalSteps = document.querySelectorAll('.work-step').length;
    
    if (nextStepNumber <= totalSteps) {
        setTimeout(() => {
            openStep(nextStepNumber);
        }, 300);
    }
}

/**
 * Показать предыдущий шаг
 */
function prevStep(currentStep) {
    closeStep(currentStep);
    
    const prevStepNumber = currentStep - 1;
    
    if (prevStepNumber >= 1) {
        setTimeout(() => {
            openStep(prevStepNumber);
        }, 300);
    }
}

/**
 * Автоматическая демонстрация шагов
 */
function startAutoDemo() {
    let currentStep = 1;
    const totalSteps = document.querySelectorAll('.work-step').length;
    
    // Закрываем все шаги сначала
    closeAllSteps();
    
    // Функция демонстрации
    function demoNextStep() {
        if (currentStep > totalSteps) {
            currentStep = 1;
            setTimeout(demoNextStep, 2000);
            return;
        }
        
        openStep(currentStep);
        currentStep++;
        
        setTimeout(demoNextStep, 3000);
    }
    
    // Запускаем демонстрацию
    setTimeout(demoNextStep, 1000);
}

/**
 * Инициализация демо-режима
 */
function initDemoMode() {
    const demoButton = document.createElement('button');
    demoButton.className = 'demo-button';
    demoButton.innerHTML = '<i class="fas fa-play"></i> Автодемо';
    demoButton.title = 'Запустить автоматическую демонстрацию';
    
    const howWeWorkSection = document.querySelector('.how-we-work');
    if (howWeWorkSection) {
        howWeWorkSection.style.position = 'relative';
        howWeWorkSection.appendChild(demoButton);
        
        // Стили для кнопки демо
        const style = document.createElement('style');
        style.textContent = `
            .demo-button {
                position: absolute;
                top: 20px;
                right: 20px;
                background: #ed8936;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 8px 15px;
                font-size: 0.9rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s;
                z-index: 10;
            }
            
            .demo-button:hover {
                background: #dd6b20;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(237, 137, 54, 0.3);
            }
            
            .demo-button.active {
                background: #38a169;
            }
            
            @media (max-width: 768px) {
                .demo-button {
                    position: relative;
                    top: auto;
                    right: auto;
                    margin: 20px auto;
                    display: block;
                    width: fit-content;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Обработчик клика
        let isDemoRunning = false;
        let demoInterval;
        
        demoButton.addEventListener('click', function() {
            if (!isDemoRunning) {
                isDemoRunning = true;
                demoButton.classList.add('active');
                demoButton.innerHTML = '<i class="fas fa-stop"></i> Остановить';
                startAutoDemo();
                
                // Останавливаем демо через 15 секунд
                demoInterval = setTimeout(() => {
                    stopDemo();
                }, 15000);
            } else {
                stopDemo();
            }
        });
        
        function stopDemo() {
            isDemoRunning = false;
            demoButton.classList.remove('active');
            demoButton.innerHTML = '<i class="fas fa-play"></i> Автодемо';
            closeAllSteps();
            
            if (demoInterval) {
                clearTimeout(demoInterval);
            }
        }
    }
}

/**
 * Добавить навигацию между шагами
 */
function addStepNavigation() {
    const steps = document.querySelectorAll('.work-step');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const stepContent = step.querySelector('.step-content');
        
        if (stepContent) {
            const navigation = document.createElement('div');
            navigation.className = 'step-navigation';
            navigation.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                    ${stepNumber > 1 ? `<button onclick="prevStep(${stepNumber})" class="step-nav-btn prev"><i class="fas fa-arrow-left"></i> Назад</button>` : '<div></div>'}
                    ${stepNumber < steps.length ? `<button onclick="nextStep(${stepNumber})" class="step-nav-btn next">Далее <i class="fas fa-arrow-right"></i></button>` : '<div></div>'}
                </div>
            `;
            
            stepContent.appendChild(navigation);
        }
    });
    
    // Стили для навигации
    const style = document.createElement('style');
    style.textContent = `
        .step-navigation {
            margin-top: 20px;
        }
        
        .step-nav-btn {
            padding: 8px 15px;
            background: #ed8936;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }
        
        .step-nav-btn:hover {
            background: #dd6b20;
            transform: translateY(-2px);
        }
        
        .step-nav-btn.prev {
            background: #4a5568;
        }
        
        .step-nav-btn.prev:hover {
            background: #2d3748;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Инициализация дополнительных функций шагов
 */
function initStepEnhancements() {
    // Добавляем иконку "кликабельности"
    const steps = document.querySelectorAll('.work-step');
    steps.forEach(step => {
        const clickIcon = document.createElement('div');
        clickIcon.className = 'step-click-icon';
        clickIcon.innerHTML = '<i class="fas fa-hand-pointer"></i>';
        clickIcon.title = 'Нажмите для подробностей';
        step.appendChild(clickIcon);
    });
    
    // Добавляем подсветку активного шага
    const style = document.createElement('style');
    style.textContent = `
        .step-click-icon {
            position: absolute;
            bottom: 10px;
            right: 10px;
            color: #ed8936;
            opacity: 0.5;
            transition: opacity 0.3s;
            font-size: 0.9rem;
        }
        
        .work-step:hover .step-click-icon {
            opacity: 1;
        }
        
        .work-step.active {
            box-shadow: 0 10px 30px rgba(237, 137, 54, 0.3);
            border: 2px solid #ed8936;
        }
        
        .step-content {
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }
        
        .step-content.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Инициализация всех функций шагов
 */
document.addEventListener('DOMContentLoaded', function() {
    initWorkSteps();
    addStepNavigation();
    initStepEnhancements();
    initDemoMode();
});

/**
 * Глобальные функции
 */
window.openStep = openStep;
window.closeStep = closeStep;
window.nextStep = nextStep;
window.prevStep = prevStep;
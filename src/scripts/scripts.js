document.addEventListener('DOMContentLoaded', () => {

    /* Глобальные константы */

    const isDesktop = window.matchMedia("(min-width: 740px)").matches;
    const responsiveSpacing = isDesktop ? 24 : parseInt(getComputedStyle(document.documentElement).getPropertyValue('--container-padding'));
    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header')) || 0;



    /* Слайдеры */

    // Слайдеры чувствителен к количеству контента внутри. По-этому ждём пока прогрузятся картинки и применятся шрифты
    window.addEventListener('load', function() {

        /* Слайдер "Service" */

        new Swiper('.swiper--service', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: responsiveSpacing,
            autoHeight: true,

            navigation: {
                prevEl: '.service__navigation .swiper-button-prev',
                nextEl: '.service__navigation .swiper-button-next',
            },

            breakpoints: {
                740: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                }
            }
        });


        /* Слайдер "Team" */

        new Swiper('.swiper--team', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: responsiveSpacing,
            autoHeight: true,

            navigation: {
                prevEl: '.team__navigation .swiper-button-prev',
                nextEl: '.team__navigation .swiper-button-next',
            },

            breakpoints: {
                740: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                }
            }
        });


        /* Слайдер "Guide" */

        if( ! isDesktop ) {
            new Swiper('.swiper--guide', {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: responsiveSpacing,
                autoHeight: true,

                navigation: {
                    prevEl: '.guide__navigation .swiper-button-prev',
                    nextEl: '.guide__navigation .swiper-button-next',
                },
            });
        }


        /* Слайдер "Solutions" */

        new Swiper('.swiper--partners', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: responsiveSpacing,
            autoHeight: true,

            navigation: {
                prevEl: '.experience__partners-navigation .swiper-button-prev',
                nextEl: '.experience__partners-navigation .swiper-button-next',
            },

            breakpoints: {
                740: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                }
            },

            autoplay: {
                delay: 3000, // Delay in ms
                disableOnInteraction: false, // Continue autoplay after user interactions
            },
        });


        /* Слайдер "Solutions" */

        new Swiper('.swiper--solutions', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: responsiveSpacing,
            autoHeight: true,

            navigation: {
                prevEl: '.experience__solutions-navigation .swiper-button-prev',
                nextEl: '.experience__solutions-navigation .swiper-button-next',
            },

            breakpoints: {
                740: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                }
            }
        });


        /* Слайдер "Feedback" */

        new Swiper('.swiper--feedback', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--container-padding')),
            autoHeight: true,

            navigation: {
                prevEl: '.feedback__navigation .swiper-button-prev',
                nextEl: '.feedback__navigation .swiper-button-next',
            },
        });

    });




    /* Форма */

    /* Уведомления */
    document.querySelectorAll('.alert').forEach(function (alert) {
        alert.addEventListener('click', function () {
            alert.style.display = 'none';
        });
    });

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 27) {
            document.querySelectorAll('.alert').forEach(function (alert) {
                alert.style.display = 'none';
            });
        }
    });


    /* Сама форма */
    document.querySelectorAll('.callback__form').forEach(function (subscriptionForm) {
        const subscriptionInputs = subscriptionForm.querySelectorAll('.input');
        const subscriptionSubmit = subscriptionForm.querySelector('.callback__submit');
        const subscriptionSuccessAlert = document.querySelector('.notifications-center__callback-success');
        const subscriptionFailureAlert = document.querySelector('.notifications-center__callback-failure');

        /* Состояния инпутов (на время отправки формы инпуты должны блокироваться) */
        function disableSubscriptionInputs() {
            subscriptionInputs.forEach((input) => {
                input.classList.add('input--loading');
                input.querySelector('.input__widget').setAttribute('disabled', 'disabled');
            });
        }

        function enableSubscriptionInputs() {
            subscriptionInputs.forEach((input) => {
                input.classList.remove('input--loading');
                input.querySelector('.input__widget').removeAttribute('disabled');
            });
        }

        /* Состояния кнопки */
        function changeSubmitStateToLoading() {
            subscriptionSubmit.classList.add('button--loading');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToSuccess() {
            subscriptionSubmit.classList.remove('button--loading');
            subscriptionSubmit.classList.add('button--success');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToFailure() {
            subscriptionSubmit.classList.remove('button--loading');
            subscriptionSubmit.classList.add('button--warning');
            subscriptionSubmit.setAttribute('disabled', 'disabled');
        }

        function changeSubmitStateToPristine() {
            subscriptionSubmit.classList.remove('button--loading', 'button--success', 'button--warning');
            subscriptionSubmit.removeAttribute('disabled');
        }

        /* Если пользователь начал взаимодействовать с инпутами, то убираем уведомления с прошлой попытки отправки: */
        subscriptionInputs.forEach(input => input.addEventListener('input', () => {
            subscriptionFailureAlert.style.display = 'none';
        }));


        /* Отправка */
        subscriptionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            /* Если с прошлой попытки висит уведомление об ошибке: */
            subscriptionFailureAlert.style.display = 'none';

            /* Начинаем отправку данных, для начала блокируем форму */
            disableSubscriptionInputs();
            changeSubmitStateToLoading();

            /* Представим, что 3000ms отправляем данные */
            setTimeout(function () {

                /* ... дальше развилка, пусть для примера будет рандом 50/50: */

                // Если данные успешно отправлены
                if (Math.random() < 0.5) {

                    // показываем зелёное уведомление:
                    subscriptionSuccessAlert.style.display = 'block';

                    // показываем галочку на кнопке:
                    changeSubmitStateToSuccess();

                    // и то и другое на 4.5 секунды:
                    setTimeout(function () {
                        subscriptionSuccessAlert.style.display = 'none';
                        changeSubmitStateToPristine();
                        enableSubscriptionInputs();
                    }, 4500);

                }

                // Если произошла ошибка
                else {

                    // показываем красное уведомление
                    subscriptionFailureAlert.style.display = 'block';

                    // Показываем восклицательный знак на кнопке:
                    changeSubmitStateToFailure();

                    // В данном случае всего 2 секунды, чтобы пользователь мог быстро вернуться к работе с формой.
                    // Уведомление в этом случае НЕ убираем -- пусть висит, пока пользователь не увидит и явно не закроет, или не начнёт заново заполнять форму / попытается отправить:
                    setTimeout(function () {
                        changeSubmitStateToPristine();
                        enableSubscriptionInputs();
                    }, 2000);

                }

            }, 3000);

        });
    });





    /* FAQ */

    const faqQuestions = document.querySelectorAll('.faq__question');


    /* Дублируем хендлеры для десктопов */

    // Здесь большая сложность с тем, что на смартфонах требуется аккордеон, а не десктопах табы.
    // А это принципиально разная вложенность тегов. К сожаление вёрсткой не придумал как это разрулить.

    // Базовой делаем версию аккордеона -- она проще. Она же и в HTML. А для версии с табами,
    // дублируем кнопки, но уже в другом месте в DOM-дереве. Дальше стили показывают либо одну пачку
    // кнопок, либо другую.

    const faqDesktopTabs = document.createElement('div');
    faqDesktopTabs.classList.add('faq__desktop-tabs');

    faqQuestions.forEach(question => {
        const questionCopy = question.cloneNode(true);
        questionCopy.classList.remove('faq__question');
        questionCopy.classList.add('faq__desktop-question-copy');
        faqDesktopTabs.appendChild(questionCopy);
    });

    const faqList = document.querySelector('.faq__list');
    faqList.parentElement.insertBefore(faqDesktopTabs, faqList);

    const faqDesktopCopies = document.querySelectorAll('.faq__desktop-question-copy');



    /* Расхлопывание */

    function handleFaqToggle(index) {
        const faqItem = faqQuestions[index].parentElement;
        const correspondingCopy = faqDesktopCopies[index];

        const isExpanded = faqItem.classList.toggle('faq__item--expanded');

        if (isExpanded) {

            faqQuestions.forEach((q, i) => {
                if (i !== index) {
                    q.parentElement.classList.remove('faq__item--expanded');
                }
            });

            faqDesktopCopies.forEach((c, i) => {
                if (i !== index) {
                    c.classList.remove('faq__desktop-question-copy--current');
                }
            });

            correspondingCopy.classList.add('faq__desktop-question-copy--current');
        } else {
            correspondingCopy.classList.remove('faq__desktop-question-copy--current');
        }
    }

    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', () => {
            handleFaqToggle(index);
        });
    });

    faqDesktopCopies.forEach((copy, index) => {
        copy.addEventListener('click', () => {
            if (!copy.classList.contains('faq__desktop-question-copy--current')) { // на десктопах не закрываем текущий айтем по повторному клику
                handleFaqToggle(index);
            }
        });
    });

    /* При первом открытии страницы расхлопываем первый элемент */
    handleFaqToggle(0);




    /* Шапка */

    const $header = document.querySelector('.header');
    const $headerMenu = $header.querySelector('.header__menu');
    const $headerBurger = $header.querySelector('.header__burger');
    const $headerLinks = document.querySelectorAll('.header__link');
    const anchorOffset = isDesktop ? 50 : 24;


    /* Расхлопывание бургера */

    $headerBurger.addEventListener('click', () => {
        $header.classList.toggle('header--expanded');
    });

    document.addEventListener('click', (event) => {
        if (!$headerMenu.contains(event.target) && !$headerBurger.contains(event.target)) {
            $header.classList.remove('header--expanded');
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            $header.classList.remove('header--expanded');
        }
    });


    // Якоря

    $headerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1); // target ID without без '#'
            const targetElement = document.getElementById(targetId);

            if (targetElement) {

                $header.classList.remove('header--expanded');

                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight - anchorOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });



    /* Анимация цифр в секции about */

    if( isDesktop) {

        const $about = document.querySelector('.about__summary')

        function runCounters() {

            // Создаём счетчики, заполняем их данными со страницы
            const aboutCounter1 = {
                reference: document.querySelector('.about__counter-1'),
                value: document.querySelector('.about__counter-1').textContent
            };

            const aboutCounter2 = {
                reference: document.querySelector('.about__counter-2'),
                value: document.querySelector('.about__counter-2').textContent
            };

            const counter3 = {
                reference: document.querySelector('.about__counter-3'),
                value: document.querySelector('.about__counter-3').textContent
            };

            // запускаем countUp
            new CountUp(aboutCounter1.reference, 0, aboutCounter1.value).start();
            new CountUp(aboutCounter2.reference, 0, aboutCounter2.value).start();
            new CountUp(counter3.reference, 0, counter3.value).start();
        }

        // Но всё это не сразу, а только тогда, когда докрутили до этой секции
        const observer = new IntersectionObserver(
            ([about]) => {
                if (about.isIntersecting) {
                    runCounters()
                    observer.unobserve(about.target); /* Останавливаем observer */
                }
            },
            {
                root: null, // Используем viewport в качестве контейнер
                rootMargin: '0px',
                threshold: 0.7 // порог, когда 70% элемента видимо
            }
        );

        // Запускаем observer
        observer.observe($about);
    }


    /* Инпуты */

    // placeholder у селекта (см. markups/_input.html)
    function selectPlaceholder(element) {
        if (element.value === 'placeholder') {
            element.parentElement.classList.add('input--placeholder-is-chosen');
        } else {
            element.parentElement.classList.remove('input--placeholder-is-chosen');
        }
    }

    document.querySelectorAll('select.input__widget').forEach(select => {
        selectPlaceholder(select);
        select.addEventListener('change', () => {
            selectPlaceholder(select);
        });
    });

    // Expanding textarea -- авторасхлопывание при печати (см. markups/_input.html)
    function expandTextarea(element) {
        element.style.height = 'auto';
        element.style.height = (element.scrollHeight + 2 * parseInt(getComputedStyle(element).borderWidth, 10)) + 'px';
    }

    document.querySelectorAll('.input--expandable .input__widget').forEach(textarea => {
        expandTextarea(textarea);
        textarea.addEventListener('input', () => {
            expandTextarea(textarea);
        });
    });

    // Вывод ошибок
    document.querySelectorAll('.input__widget').forEach(input => {
        input.addEventListener('focus', () => {
            let parent = input.closest('.input');
            if (parent) {
                parent.classList.remove('input--error');
                let siblings = parent.nextElementSibling;
                while (siblings && siblings.classList.contains('helper--error')) {
                    siblings.remove();
                    siblings = parent.nextElementSibling;
                }
            }
        });
    });




    /* Отлипание карточек тарифов */

    if(isDesktop) {

        // Алгоритм состоит из двух частей:
        // 1) Залипание делается стилями (position: sticky) -- смотри styles/_tariffs.css
        // 2) Отливание делается этим скриптом.

        // Этот алгоритм чувствителен к высоте и координатам. По-этому ждём пока прогрузятся картинки и применятся шрифты
        window.addEventListener('load', function() {

            // Насколько карточки выглядывают друг из-под друга
            const tariffsOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tariffs-offset')) || 0;


            // Первая важная сущность -- родитель .tariffs__body
            const $tariffsBody = document.querySelector('.tariffs__body');

            // Несколько раз понадобится его высота
            const tariffsBodyHeight = $tariffsBody.offsetHeight;

            // Сразу же проставляем эту высоту явно, так как внутри будет появляться position: absolute, и чтобы секция не схлопнулась -- удерживаем её
            $tariffsBody.style.height = tariffsBodyHeight + 'px';


            // Вторая важная сущность -- сами карточки .tariffs__card
            const $cards = document.querySelectorAll('.tariffs__card');

            // В частности последняя из них
            const $lastCard = $cards[$cards.length - 1];

            // Понадобится так же высота последней карточки
            const lastCardHeight = $lastCard.offsetHeight;


            // Координата отлипания -- когда проскролили до последней карточки. Он, на самом деле, не прилипает, не успевает.
            const unstickingPoint = $lastCard.offsetTop - headerHeight - $cards.length * tariffsOffset;


            /* Алгоритм отлипания */

            window.addEventListener('scroll', () => {

                // Ловим позицию скролла
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Когда пришло время карточкам отлипать нужно просто расположить их внизу $tariffsBody.
                // В этот момент включаем состояние tariffs__body--fully-scrolled и в контексте этого класса
                // карточки перестроится в position: absolute. Нужно дать им координату top.
                // При этом небольшые вытягивания карточек типа 80px, 160px, 240px прилетят из стилей.
                if(scrollTop > unstickingPoint) {
                    $tariffsBody.classList.add('tariffs__body--fully-scrolled');
                    $cards.forEach((element, index) => {
                        element.style.top = (tariffsBodyHeight - lastCardHeight) + 'px';
                    });
                } else {
                    $tariffsBody.classList.remove('tariffs__body--fully-scrolled');
                    $cards.forEach((element, index) => {
                        element.style.removeProperty('top');
                    });
                }
            });
        });
    }


    /* Модалка -- здесь кусок кода на jQuery поскольку пока не могу
       найти хорошую замену magnific popup */

    (function ($) {

        $('.mfp-handler').magnificPopup({
            type: 'inline',
            removalDelay: 200,
            showCloseBtn: false,
            callbacks: {
                // Перезапускаем обсчёт expanding textareas для инстансов внутри откртой модалки
                open: function() {
                    const instance = $.magnificPopup.instance;
                        const modalContent = instance.content[0];
                        const textareas = $(modalContent).find('.input--expandable .input__widget');

                        textareas.each(function() {
                            expandTextarea(this);
                        });

                }
            }
        });

    })(jQuery);

});


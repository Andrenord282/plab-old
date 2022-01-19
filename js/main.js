"use strict";

// Общие переменные
var mainElement = document.documentElement;
var container = document.querySelector('.container');
var containerWidth = container.clientWidth; // Работа кнопок калькулятора вызов замерщика и инфомрация сервис

var headerMenuBtnsInfo = document.querySelector('.header-info-btns__btns');
var listInfoService = document.querySelector('.header-info-btns__info');
var btnMeasurer = document.querySelector('.header-info-btns__measurer');
var btnInfoService;
var btnTextInfo; // Работа кнопок контактов, вызов набора номера и кнопка заказа звонка

var headerMenuCall = document.querySelector('.header-worktime-tel-feedback__contacts');
var headerCallFeedback = document.querySelector('.header-worktime-tel-feedback__tel-feedback');
var btnCall;
var btnMail;
var btnCloseMenuCall; // Работа меню навигации по сайту в хеадере

var navList = document.querySelector('.header-navigation__list');
var navItem = document.querySelectorAll('.header-navigation__item');
var navItemPerent = document.querySelectorAll('.header-navigation__parent');
var navLink = document.querySelectorAll('.header-navigation__link');
var navAdditionallist;
var btnBurger = document.querySelector('.burger-nav');
var btnLine; // Работа слайдера-таба в блоке херо

var tabCarusel = document.querySelector('.hero__carusel');
var tabNavItem = document.querySelectorAll('.hero-tabs__item');
var tabContentItem = document.querySelectorAll('.hero__carusel-item'); // CATALOG-PREVIEW
// Работа превью каталога продуктов

var productsContent = document.querySelector('.catalog-preview__content');
var navBtnsMenu = document.querySelector('.catalog-preview-nav'); // Навигация по категориям в карусели

var navBtnMenu = document.querySelectorAll('.catalog-preview-nav__item'); // Кнопки навигации по категориям в карусели

var productsCarusel = document.querySelector('.catalog-preview__carusel'); // Окно карусели

var productsCaruselWidth = productsCarusel.clientWidth; // Ширина окна корусели

var productsCaruselItems = document.querySelectorAll('.catalog-preview__products'); // Ленты с картчоками товаров

var productsCaruselItemsActive;
var countItemsCarusel;
var productsCaruselItemsActiveWidth;
var itemCaruselWidth;
var itemCaruselCurrentWidth;
var productCaruselItem = document.querySelectorAll('.catalog-preview__product'); // Карточки товаров
// const productsCaruselWidth 
// const productsCaruselScrollWidth = productsCarusel.scrollWidth;

var paginationNav;
var paginationItem;
var productNavBtn;
var productsBtnNext;
var productBtnPrev; // const productCard = document.querySelectorAll('.product-card');
"use strict";

navigationCatalogPrew();
setCaruselHeight();

if (containerWidth <= 500) {
  createNavCarusel();
  paginationCarusel();
  addBtnPagCarusel();
  carusel();
} // Настрйоки высоты карусели


function setCaruselHeight() {
  // Определяем какой блок с продуктами самый высокий
  var productsHeights = []; // Создаем массив с высотами

  productsCaruselItems.forEach(function (productCarusel, i) {
    productsHeights.push(productCarusel.scrollHeight); // Записываем высоту каждого списка с продуктами в массив
  });
  var caruselHeight = maxNum(productsHeights); // Выбираем самую большую высоту списка продуктов

  productsCarusel.style.minHeight = "".concat(caruselHeight, "px");
} // Наибольшее число в массиве


function maxNum(list) {
  var maxHeight = list[0];
  list.forEach(function (e) {
    if (e > maxHeight) maxHeight = e;
  });
  return maxHeight;
} // Работа навигации категория продуктов


function navigationCatalogPrew() {
  navBtnsMenu.addEventListener('click', function (e) {
    // Отслеживаем клилк событие по навигации
    var self = e.target; // Переменная с целью собития

    var perentSelf = self.closest('.catalog-preview-nav__item'); // Есть ли у цели родитель с нужным классом

    resetClass(navBtnMenu, 'active'); // Сбросить класс active на всех кнопках

    perentSelf.classList.add('active'); // Добавить кнопке которая является родителем цели класс active

    navBtnMenu.forEach(function (navBtn, i) {
      if (navBtn.classList.contains('active')) {
        resetClass(productsCaruselItems, 'active');
        productsCaruselItems[i].classList.add('active');

        if (productsCaruselItems[i].classList.contains('active') != true) {
          productsCaruselItems[i].style.transform = 'null';
        }
      }
    });
    carusel();
  });
} // Создаем кнопки навигации для разрешения 500 пикселей и меньше


function createNavCarusel() {
  productNavBtn = document.createElement('div');
  productNavBtn.classList.add('catalog-preview__nav-btn');
  productBtnPrev = document.createElement('button');
  productBtnPrev.classList.add('catalog-preview__btn', 'catalog-preview__btn_prev', 'btn-reset');
  productNavBtn.append(productBtnPrev);
  productsBtnNext = document.createElement('button');
  productsBtnNext.classList.add('catalog-preview__btn', 'catalog-preview__btn_next', 'btn-reset');
  productNavBtn.append(productsBtnNext);
} // Создаем меню пагинации для разрешение 500 пикселей и меньше


function paginationCarusel() {
  for (var index = 0; index < productsCaruselItems.length; index++) {
    paginationNav = document.createElement('div');
    paginationNav.classList.add('catalog-preview__pagination-nav');
    var listChildren = productsCaruselItems[index].children;
    var quantity = listChildren.length;
    console.log(productsCaruselItems.length);
    console.log(index);
    productBtnPrev.after(paginationNav);

    for (var _index = 0; _index < quantity; _index++) {
      paginationItem = document.createElement('span');
      paginationItem.classList.add('catalog-preview__pagination-item');
      paginationNav.append(paginationItem);
    }
  }
} // Добавляем пагинацию и кнопки прокрутки карусели для разрешения 500 пикселей и меньше


function addBtnPagCarusel() {
  // productNavBtn.append(productBtnPrev);
  // productNavBtn.append(paginationNav);
  // productNavBtn.append(productsBtnNext);
  productsContent.append(productNavBtn);
} // Работа карусели для разрешения 500 пикселей и меньше


function carusel() {
  productsCaruselItemsActive = document.querySelector('.catalog-preview__products.active');
  countItemsCarusel = productsCaruselItemsActive.children.length;
  productsCaruselItemsActiveWidth = productsCaruselItemsActive.scrollWidth;
  itemCaruselWidth = productsCaruselItemsActive.scrollWidth / countItemsCarusel;
  itemCaruselCurrentWidth = itemCaruselWidth;
  console.log(productsCaruselItemsActive);
  console.log(productsCaruselItemsActiveWidth);
  console.log(itemCaruselWidth);
  console.log(itemCaruselWidth);
  productNavBtn.addEventListener('click', function (e) {
    var self = e.target;
    var btnNext;
    productsCaruselItemsActive = document.querySelector('.catalog-preview__products.active');

    if (self.closest('.catalog-preview__btn_next')) {
      productsCaruselItemsActive.style.transform = "translate(-".concat(itemCaruselCurrentWidth, "px, 0px)");
      itemCaruselCurrentWidth += itemCaruselWidth;

      if (itemCaruselCurrentWidth == productsCaruselItemsActiveWidth) {
        itemCaruselCurrentWidth = productsCaruselItemsActive.scrollWidth / countItemsCarusel;
      }
    }

    if (self.closest('.catalog-preview__btn_prev')) {
      if (itemCaruselCurrentWidth <= itemCaruselWidth) {
        productsCaruselItemsActive.style.transform = "translate(-".concat(productsCaruselItemsActiveWidth - itemCaruselWidth, "px, 0px)");
        itemCaruselCurrentWidth = productsCaruselItemsActiveWidth - itemCaruselWidth;
      } else {
        itemCaruselCurrentWidth -= itemCaruselWidth;
        productsCaruselItemsActive.style.transform = "translate(-".concat(itemCaruselCurrentWidth, "px, 0px)");
      }
    }
  });
}
"use strict";

console.log('hello');
"use strict";

var footerNavigationList = document.querySelector('.footer-navigation__list');

if (containerWidth <= 768) {
  footerNavigationList.addEventListener('click', function (e) {
    e.preventDefault();
    var self = e.target;
    var footernNavigationSublist = self.nextElementSibling;

    if (self.closest('.footer-navigation__link.active')) {
      self.classList.remove('active');
      footernNavigationSublist.classList.remove('show');
      footernNavigationSublist.style.minHeight = "".concat(footernNavigationSublist.scrollHeight, "px");
    }
  });
}
"use strict";

// Создаем кнопку меню звонка при разрешение ниже 500,
// при нажатии на кнопку будет появляться меню заказа звонка и набора телефона
if (containerWidth <= 500) {
  btnMail = document.createElement('a'); // Созадем кнопку для вызова почтового адреса

  btnMail.setAttribute("href", "mailto:pro@peregorodkalab.ru");
  btnMail.classList.add('header-worktime-tel-feedback__mail-btn'); // Назначаем классы для кнопки

  headerMenuCall.appendChild(btnMail); // Ставим кнопку в блок кнопок хеадера, первой по счету

  btnCall = document.createElement('button'); // Созадем кнопку для вызова телефона и заказа звонка

  btnCall.innerHTML = "<svg>\n                            <use xlink:href=\"img/sprite.svg#makeCall\"></use>\n                        </svg>"; // Добавляем иконку в кнопку

  btnCall.classList.add('header-worktime-tel-feedback__tel-icon-btn', 'btn-reset'); // Назначаем классы для кнопки

  headerMenuCall.appendChild(btnCall); // Ставим кнопку в блок кнопок

  btnCloseMenuCall = document.createElement('button'); // Создаем кнопку закрытия контактов

  btnCloseMenuCall.innerHTML = "<svg>\n                                    <use xlink:href=\"img/sprite.svg#cross\"></use>\n                                    </svg>"; // Добавляем элименты для кнопки

  btnCloseMenuCall.classList.add('header-worktime-tel-feedback__close-btn', 'btn-reset'); // Добавляем класс для кнопки

  headerCallFeedback.appendChild(btnCloseMenuCall); // Ставим кнопку в блок кнопок
} // Работа кнопки контактов, при нажатие либо появляется меню с
// с вызовом и обратным звоном или исчезает


if (btnCall != undefined && btnCall.classList.contains('header-worktime-tel-feedback__tel-icon-btn')) {
  // Проверяем есть ли кнопка контактов
  btnCall.addEventListener('click', function () {
    // Отслеживает события клик на кнопку
    btnCall.classList.toggle('active'); // Добавляем или убираем класс active

    if (headerCallFeedback.classList.contains('show')) {
      // Проверяем есть ли у списка информации и сервисом класс show
      headerCallFeedback.classList.remove('show'); // Убираем класс show
      // listInfoService.style.maxHeight = null; // Ставим в стиле макимальную высота списка 0
    } else {
      headerCallFeedback.classList.add('show'); // Присваиваем списку класс show так как его нет
    }
  });
  btnCloseMenuCall.addEventListener('click', function () {
    // При нажатии на крестик, меню контакты скрывается
    headerCallFeedback.classList.remove('show'); // Убираем класс show скрываем меню
  });
}
"use strict";

// Создаем кнопку информация и сервисом при разрешение ниже 657,
// при нажатии на кнопку будет появляться меню сервиса и информаии
if (containerWidth <= 657) {
  // Условие при каком разрешении работает
  btnInfoService = document.createElement('button'); // Созадем кнопку

  btnTextInfo = 'Информация'; // Текст внутри кнопку

  btnInfoService.classList.add('header-info-btns__info-srvice', 'btn', 'btn__info-srvice', 'btn-reset'); // Назначаем классы для кнопки

  btnInfoService.textContent = btnTextInfo; // Добавляем текст

  headerMenuBtnsInfo.insertBefore(btnInfoService, btnMeasurer); // Ставим кнопку в блок кнопок хеадера, первой по счету
} // Работа кнопки, при нажатие либо появляется меню с инфомрацией
// и сервисом или меню скрывается


if (btnInfoService != undefined && btnInfoService.classList.contains('header-info-btns__info-srvice')) {
  // Проверяем есть ли кнопка синфомрацией и сервисами
  btnInfoService.addEventListener('click', function () {
    // Отслеживает события клик на кнопку
    btnInfoService.classList.toggle('active'); // Добавляем или убираем класс active

    if (listInfoService.classList.contains('show')) {
      // Проверяем есть ли у списка информации и сервисом класс show
      listInfoService.classList.remove('show'); // Убираем класс show

      listInfoService.style.maxHeight = null; // Ставим в стиле макимальную высота списка 0
    } else {
      listInfoService.classList.add('show'); // Присваиваем списку класс show так как его нет

      listInfoService.style.maxHeight = listInfoService.scrollHeight + 'px'; // Вычисляем высоту блока через scroll что бы дать высоту блока и отобразить его
    }
  });
}
"use strict";

// Работа навигациипри разрешение ширины 769 пикселей  и больше
// при навидении на элимент навигации, если он имеет подменю, то опоказываем его,
// при уходе с элимента, подменю исчезает
if (containerWidth >= 769) {
  // Условие при каком разрешении работает
  navItem.forEach(function (item) {
    // Перебор элементов с навигационными ссылками
    item.addEventListener('mouseenter', function (e) {
      // Отслеживание события наведение мышки
      var self = e.currentTarget; // Отслеживание цель события

      navAdditionallist = self.querySelector('.header-navigation__child-list'); // Находим подменю у элимента навигации, если оно есть

      if (navAdditionallist != null) {
        // Если подменю не равно null (то есть имеет значение определенное с классом)
        navAdditionallist.classList.add('show'); // Даем подменю класс show
      }
    });
    item.addEventListener('mouseleave', function (e) {
      // Отслеживание события покидание мышки с элиммента
      var self = e.currentTarget; // Отслеживание цель события

      navAdditionallist = self.querySelector('.header-navigation__child-list'); // Находим подменю у элимента навигации, если оно есть

      if (navAdditionallist != null) {
        // Если подменю не равно null (то есть имеет значение определенное с классом)
        navAdditionallist.classList.remove('show'); // Убираем у подменю класс show
      }
    });
  });
} // Работа навигации при разрешении ширины 768 пикселей и меньше
// при таких разрешениях появляется кнопка бургер, нажимая на нее
// появляется меню навигации, если у элимента есть подменю, то при нажатии
// на элимент, его подменю появляется в виде аккордеона


if (containerWidth <= 768) {
  // Условие при каком разрешении работает
  btnBurger.addEventListener('click', function () {
    btnLine = btnBurger.querySelectorAll('.burger-nav__line');
    btnLine.forEach(function (line) {
      line.classList.toggle('active');
    });
    navList.classList.toggle('show');
  }); // Работа аккордиона

  navItemPerent.forEach(function (navItemPerent) {
    navItemPerent.addEventListener('click', function (e) {
      var self = e.currentTarget;
      self.classList.toggle('active');
      navAdditionallist = self.querySelector('.header-navigation__child-list'); // Находим подменю у элимента навигации, если оно есть

      if (navAdditionallist.classList.contains('show') == false) {
        // Если подменю не равно null (то есть имеет значение определенное с классом)
        navAdditionallist.classList.add('show'); // Даем подменю класс active

        navAdditionallist.style.maxHeight = navAdditionallist.scrollHeight + 'px';
      } else if (navAdditionallist != null && navAdditionallist.classList.contains('show')) {
        navAdditionallist.classList.remove('show'); // Даем подменю класс active

        navAdditionallist.style.maxHeight = '0';
      }
    });
  });
}
"use strict";

var num = 0; // Цикл прокрутки табов и слайдов через каждые 5 секунд

startTabsSlades(tabNavItem, tabContentItem); // Основная работа табов вместе с слайдами

function startTabsSlades(tabs, slades) {
  console.log(num);
  tabs[num].classList.add('active');
  slades[num].classList.add('show');
  num++; // cycleChangeAfterClick;

  clickTabNav(tabNavItem, tabContentItem);
} // При клике на элимент, он становиться активный
// и показывается слайд соответсвующий индексу


function clickTabNav(tabs, slades) {
  // Кидаем название элимента
  tabs.forEach(function (item, i) {
    // Перебираем коллекцию элиментов
    item.addEventListener('click', function (e) {
      // Событие клик мышки
      num = i;
      console.log(num);
      resetClass(tabs, 'active'); // Сбрасываем класс active у всех элиментов

      resetClass(slades, 'show'); // Сбрасываем класс active у всех элиментов

      item.classList.add('active'); // Добавляем класс active конкретному элименту с кликом мышки

      slades[num].classList.add('show'); // Добавляем класс show слайду, согласно индексу элимента

      if (num < tabs.length) {
        num++;
      }

      console.log(num);
    });
  });
} // Сбросить класс у элиментов


function resetClass(element, className) {
  element.forEach(function (el) {
    el.classList.remove(className);
  });
}

var cycleChangeAfterClick = setInterval(function () {
  if (num == tabNavItem.length) {
    num = 0;
  }

  resetClass(tabNavItem, 'active'); // Сбрасываем класс active у всех элиментов

  resetClass(tabContentItem, 'show'); // Сбрасываем класс active у всех элиментов

  tabNavItem[num].classList.add('active');
  tabContentItem[num].classList.add('show');
  num++;
  console.log(num);

  if (num == tabNavItem.length) {
    num = 0;
  }
}, 5000, num);
"use strict";

// IDEAS
// работа табов и слайдеров идей
var navBarIdeas = document.querySelector('.nav-bar-ideas');
var navItemIdeas = document.querySelectorAll('.nav-bar-ideas__item');
var caruselsSlider = document.querySelectorAll('.ideas-sliders__carusel');
var caruselsSliderInItem = document.querySelectorAll('.idea-item__carusel');
var ideaItems = document.querySelectorAll('.idea-item');
var navItems = document.querySelectorAll('.idea-item__nav-slider');
var itemsSliders = document.querySelector('.ideas-sliders__items');
var currentIndexNavItem = 0;
var currentIndexArrowItems = 0;
var currentIndexcCaruselsSlider = 0;
var caruselsSlidercrollWidth;
var widthItemCarusel;
var translateX; // Настрйоки высоты ideaItems

function setIdeaItemsHeight() {
  // Определяем какой блок с идеей самый высокий
  var ideaHeights = []; // Создаем массив с высотами

  ideaItems.forEach(function (ideaItem, i) {
    ideaHeights.push(ideaItem.offsetHeight); // Записываем высоту каждой идеи в массив
  });
  var caruselHeight = maxNum(ideaHeights); // Выбираем самую большую высоту идеи

  itemsSliders.style.minHeight = "".concat(caruselHeight, "px");
}

setIndexItem(navItemIdeas, 'index'); // Навигационным кнопкам добавляем их индекс

pickIdea();

if (containerWidth >= 769) {
  // Условие при каком разрешении работает
  workCaruselsSlider(caruselsSlider, navItems);
}

if (containerWidth <= 768) {
  // Условие при каком разрешении работает
  setIdeaItemsHeight();
  workCaruselsSlider(caruselsSliderInItem, navItems);
}

function workCaruselsSlider(carusels, parentArrowNav) {
  caruselsSlidercrollWidth = carusels[currentIndexcCaruselsSlider].scrollWidth;
  widthItemCarusel = caruselsSlidercrollWidth / carusels[currentIndexcCaruselsSlider].children.length;
  translateX = 0;
  parentArrowNav.forEach(function (arrow, i) {
    arrow.addEventListener('click', function (e) {
      var self = e.target;
      var currentArrow = self.closest('.idea-item__btn-arrow ');

      if (currentArrow.matches('.idea-item__btn-arrow_next')) {
        carusels.forEach(function (carusel, i) {
          if (i == currentIndexNavItem) {
            translateX += widthItemCarusel;
            carusel.style = "transform:translateX(-".concat(translateX, "px)");

            if (translateX == caruselsSlidercrollWidth) {
              translateX = 0;
              console.log(translateX);
              carusel.style = "transform:translateX(".concat(translateX, "px)");
            }
          }

          if (i != currentIndexNavItem) {
            carusel.style = "transform:translateX(0px)";
          }
        });
      }

      if (currentArrow.matches('.idea-item__btn-arrow_prew')) {
        carusels.forEach(function (carusel, i) {
          if (i == currentIndexNavItem) {
            if (translateX == 0) {
              translateX = caruselsSlidercrollWidth;
              carusel.style = "transform:translateX(".concat(translateX, "px)");
            }

            translateX = translateX - widthItemCarusel;
            carusel.style = "transform:translateX(-".concat(translateX, "px)");
          }

          if (i != currentIndexNavItem) {
            carusel.style = "transform:translateX(0px)";
          }
        });
      }
    });
  });
}

function pickIdea() {
  caruselsSlider.forEach(function (carusel, i) {
    carusel.style = "transform:translateX(0)";
  });
  navBarIdeas.addEventListener('click', function (e) {
    var self = e.target;
    var currentNavItem = self.closest('.nav-bar-ideas__item');

    if (currentNavItem) {
      currentIndexNavItem = currentNavItem.dataset.index;
      currentIndexArrowItems = currentIndexNavItem;
      translateX = 0;
      navItemIdeas.forEach(function (navItem, i) {
        if (i == currentIndexNavItem) {
          navItem.classList.add('active');
          ideaItems[currentIndexNavItem].classList.add('show');
          caruselsSlider[currentIndexNavItem].classList.add('show');
          caruselsSlider[currentIndexNavItem].setAttribute('data-visible', 'true');
        } else {
          navItem.classList.remove('active');
          ideaItems[i].classList.remove('show');
          caruselsSlider[i].classList.remove('show');
          caruselsSlider[i].setAttribute('data-visible', 'false');
        }
      });
    }
  });
}
"use strict";

var ourWorksItems = document.querySelectorAll('.our-works-list-item');
var ourWorksRights = document.querySelector('.our-works-list__right');
var ourWorksLeft = document.querySelector('.our-works-list__left');
setSrcImgItem(ourWorksItems, 'src');

function setSrcImgItem(items, value) {
  items.forEach(function (item, i) {
    item.setAttribute("data-".concat(value), "../img/ourWorks0".concat(i + 1, ".jpg"));
    item.style.backgroundImage = "url('".concat(item.dataset.src, "')");
  });
}

console.dir(ourWorksItems[0]);
/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
"use strict";
//# sourceMappingURL=main.js.map

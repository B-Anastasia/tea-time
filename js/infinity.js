//TODO: hide link navigation

var navButton = document.querySelector('.navigation__button');
var navLink = document.querySelector('.navigation__list');
navButton.addEventListener('click', check);

function check () {
  navLink.classList.toggle('hide');
}

// TODO: show send message form

var btn = document.querySelector(".header__message");
var btnClose = document.querySelector(".form__close");
var header = document.querySelector('.header');

btn.addEventListener("click", function () {
    header.classList.add('header--form-open');
});

btnClose.addEventListener("click", function () {
    header.classList.remove('header--form-open');
});


//TODO: create SLIDER

'use strict';
var multiItemSlider = (function () {
  return function (selector, config) {
    var
      _mainElement = document.querySelector(selector),
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper'),
      _sliderItems = _mainElement.querySelectorAll('.slider__item'),
      _sliderControls = _mainElement.querySelectorAll('.slider__control'), 
      _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // button "LEFT"
      _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // button "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), 
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), 
      _positionLeftItem = 0,
      _transform = 0,
      _step = _itemWidth / _wrapperWidth * 100,
      _items = [],
      _interval = 0,
      _config = {
        isCycling: false,
        direction: 'right', 
        interval: 5000,
        pause: true 
      };

    for (var key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }

   
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      }
    }

    var _transformItem = function (direction) {
      var nextItem;
      if (direction === 'right') {
        _positionLeftItem++;
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
      }
      if (direction === 'left') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform += _step;
      }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
    }

    var _cycle = function (direction) {
      if (!_config.isCycling) {
        return;
      }
      _interval = setInterval(function () {
        _transformItem(direction);
      }, _config.interval);
    }

    var _controlClick = function (e) {
      var direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
      e.preventDefault();
      _transformItem(direction);
      clearInterval(_interval);
      _cycle(_config.direction);
    };

    var _setUpListeners = function () {
      _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
      if (_config.pause && _config.isCycling) {
        _mainElement.addEventListener('mouseenter', function () {
          clearInterval(_interval);
        });
        _mainElement.addEventListener('mouseleave', function () {
          clearInterval(_interval);
          _cycle(_config.direction);
        });
      }
    }

    // инициализация
    _setUpListeners();
    _cycle(_config.direction);

    return {
      right: function () { // method right
        _transformItem('right');
      },
      left: function () { // method left
        _transformItem('left');
      },
      stop: function () { // method stop
        _config.isCycling = false;
        clearInterval(_interval);
      },
      cycle: function () { // method cycle 
        _config.isCycling = true;
        clearInterval(_interval);
        _cycle();
      }
    }

  }
}());

var slider = multiItemSlider('.slider', {
  isCycling: true
});

// Modal

var modalContent = {
  'global-sourcing': {
    title: 'Global Sourcing',
    text: 'Our buyers travel to the world\'s most celebrated tea regions every harvest season. From the misty highlands of Darjeeling and the volcanic slopes of Japan\'s Shizuoka prefecture to the ancient forests of Yunnan, China, we build direct relationships with estate owners and small-hold farmers alike. This ensures fair pricing for growers and unmatched freshness for you, with leaves arriving within weeks of being plucked.'
  },
  'artisan-processing': {
    title: 'Artisan Processing',
    text: 'Great tea is made, not just grown. After careful hand-picking, each batch is withered to reduce moisture, then rolled to release essential oils that define its character. Depending on the variety, leaves may be oxidized for hours or gently steamed within minutes of harvest. Our partner artisans follow generations-old methods, adjusting timing and temperature by instinct and experience to coax out the fullest flavor from every leaf.'
  },
  'quality-control': {
    title: 'Quality Control',
    text: 'Before any tea earns a place in our collection, it must pass a rigorous multi-stage evaluation. Our certified tea sommeliers assess dry leaf appearance, wet leaf aroma, liquor color, and the full taste profile across multiple infusions. We test for purity, consistency, and the absence of additives. Only lots that meet our standards for aroma, body, finish, and overall balance are approved for packaging and sale.'
  },
  'fresh-delivery': {
    title: 'Fresh Delivery',
    text: 'Freshness is everything. Once approved, teas are sealed in airtight, light-blocking packaging at our climate-controlled facility to lock in flavor and fragrance. Orders are dispatched within 24 hours, and we use express shipping partners to minimize transit time. Whether you are across the city or across the globe, your tea arrives as close to estate-fresh as possible, ready to brew the perfect cup.'
  },
  'green-tea': {
    title: 'Green Tea',
    text: 'Originating in China thousands of years ago, green tea is made from unoxidized leaves and is one of the least processed types of tea. It has a light, fresh flavor ranging from grassy and vegetal to sweet and nutty, depending on the variety. Popular styles include Chinese Longjing (Dragon Well) and Japanese Sencha. Brew at 70\u201380\u00B0C for 2\u20133 minutes to avoid bitterness and enjoy its delicate character.'
  },
  'black-tea': {
    title: 'Black Tea',
    text: 'Black tea is fully oxidized, giving it a robust, bold flavor and a deep amber to dark brown liquor. It is the most popular type of tea worldwide, with famous varieties including Assam, Darjeeling, Earl Grey, and English Breakfast. Black tea pairs well with milk, sugar, or lemon. Brew with freshly boiled water at 95\u2013100\u00B0C for 3\u20135 minutes for a rich, full-bodied cup.'
  },
  'white-tea': {
    title: 'White Tea',
    text: 'White tea is the least processed of all teas, made from young buds and leaves that are simply withered and dried. It originates from China\'s Fujian province, with Silver Needle and White Peony being the most prized varieties. The flavor is subtle, sweet, and floral with a silky mouthfeel. Brew at 70\u201375\u00B0C for 4\u20135 minutes to let its gentle complexity unfold.'
  },
  'oolong-tea': {
    title: 'Oolong Tea',
    text: 'Oolong falls between green and black tea in oxidation, ranging from 15% to 85%. This gives it an incredibly diverse flavor spectrum, from light and floral (like Taiwanese High Mountain oolong) to dark and roasted (like Wuyi Rock oolong). Oolong leaves are often rolled into tight balls or long twists and can be steeped multiple times, with each infusion revealing new layers of flavor. Brew at 85\u201395\u00B0C for 3\u20135 minutes.'
  },
  'matcha-tea': {
    title: 'Matcha Tea',
    text: 'Matcha is a finely ground powder made from shade-grown Japanese green tea leaves. Because you consume the whole leaf, matcha delivers a concentrated dose of antioxidants, L-theanine, and a calm, sustained energy. Its flavor is rich, umami-forward, and slightly sweet. Whisk 1\u20132 grams of matcha with 70\u201380\u00B0C water using a bamboo chasen until frothy for the traditional preparation.'
  },
  'herbal-tea': {
    title: 'Herbal Tea',
    text: 'Herbal teas (or tisanes) are caffeine-free infusions made from dried herbs, flowers, fruits, and spices rather than the Camellia sinensis plant. Popular varieties include chamomile, peppermint, ginger, and lemongrass. Each blend offers unique benefits, from calming and digestive support to immune-boosting properties. Brew with boiling water and steep for 5\u20137 minutes to extract the full flavor and benefits.'
  },
  'rooibos-tea': {
    title: 'Rooibos Tea',
    text: 'Rooibos (meaning "red bush") is a caffeine-free herbal tea native to South Africa\'s Cederberg region. Its naturally sweet, smooth flavor carries notes of honey, vanilla, and caramel with no bitterness. Rich in antioxidants and minerals, rooibos is enjoyed plain or with milk and sweetener. Brew with boiling water and steep for 5\u20137 minutes. It makes an excellent iced tea as well.'
  },
  'hibiscus-tea': {
    title: 'Hibiscus Tea',
    text: 'Made from the vibrant crimson petals of the Hibiscus sabdariffa flower, this caffeine-free tea is tart, cranberry-like, and deeply refreshing. It is enjoyed hot or iced across cultures, from Mexican agua de jamaica to Egyptian karkade. Hibiscus tea is rich in vitamin C and anthocyanins. Brew with boiling water for 5\u201310 minutes and sweeten to taste for a beautiful ruby-red infusion.'
  },
  'green-rooibos-tea': {
    title: 'Green Rooibos Tea',
    text: 'Green rooibos is made from the same South African plant as traditional rooibos, but it is dried immediately after harvest instead of being oxidized. This preserves a lighter, more grassy and mineral flavor compared to its red counterpart, along with higher antioxidant levels. It is caffeine-free and naturally sweet. Brew at 90\u2013100\u00B0C for 5\u20137 minutes for a clean, refreshing cup.'
  }
};

var modal = document.getElementById('modal');
var modalTitle = modal.querySelector('.modal__title');
var modalText = modal.querySelector('.modal__text');
var modalCloseBtn = modal.querySelector('.modal__close');
var modalOverlay = modal.querySelector('.modal__overlay');

document.querySelectorAll('[data-modal]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var key = this.getAttribute('data-modal');
    var data = modalContent[key];
    if (data) {
      modalTitle.textContent = data.title;
      modalText.textContent = data.text;
      modal.classList.add('modal--active');
    }
  });
});

function closeModal() {
  modal.classList.remove('modal--active');
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


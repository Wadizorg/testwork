/**
 *
 * @constructor
 */
var SamsungAd = function () {

    /**
     * Main image position
     * @type {number}
     */
    this.descriptState = 0;

    /**
     * State drop rain
     * @type {boolean}
     */
    this.dropRainState = false;

    /**
     * Elements
     * @type {Element}
     */
    this.mainContainer = document.querySelector('.main-container');
    this.rangeInput = document.querySelector('input[type=range]');
    this.mainImage = document.querySelector('.image');
    this.flashAria = document.querySelector('.flash');
    this.descriptContainer = document.querySelector('.description');
    this.descriptFadeAria = document.querySelector('.description-fade-aria');
    this.imageFadeAria = document.querySelector('.image-fade-aria');
    this.raindropAria = document.querySelector('.raindrop-aria');

    /**
     * Check item class
     * @param node
     * @param className
     * @returns {boolean}
     */
    this.hasClass = function (node, className) {
        return new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)").test(node.className);
    };

    /**
     * Adding a class to element
     * @param node
     * @param className
     * @returns {SamsungAd}
     */
    this.addClass = function (node, className) {
        if (!this.hasClass(node, className)) {
            node.className = node.className ? [node.className, className].join(' ') : className;
        }
        return this;
    };

    /**
     * Removing a class of element
     * @param node
     * @param className
     * @returns {SamsungAd}
     */
    this.removeClass = function (node, className) {
        if (this.hasClass(node, className)) {
            var c = node.className;
            node.className = c.replace(new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)", "g"), '');
        }
        return this;
    };

    /**
     * Preload array of images
     * @param arr
     * @param fn
     * @returns fn result
     */
    this.imageOnload = function (arr, fn) {
        var preloadedImages = [];

        for (var i = 0; i < arr.length; i++) {
            var image = new Image();
            image.src = arr[i];
            image.onload = function () {
                preloadedImages.push(this);
                if (arr.length === preloadedImages.length) return fn(preloadedImages);
            }
        }
    };

    /**
     * Toggle class using delay
     * @param node
     * @param className
     * @param delay
     */
    this.toggleClass = function (node, className, delay) {
        var self = this,
            name = className;
        delay = delay || 0;
        this.addClass(node, className);
        setTimeout(function () {
            self.removeClass(node, name);
        }, delay);
    };

    /**
     * Changes main image
     * @param e
     * @param maxIndex
     * @param imageHeight
     * @returns {SamsungAd}
     */
    this.mainImageChange = function (e, maxIndex, imageHeight) {
        if (Number(e.target.value) == maxIndex) {
            this.addClass(this.imageFadeAria, 'fade');
            this.imageFadeAria.style.backgroundPosition = '0px ' + (-Number(e.target.value) * imageHeight + 'px');
        } else {
            this.removeClass(this.imageFadeAria, 'fade');
            this.mainImage.style.backgroundPosition = '0px ' + (-Number(e.target.value) * imageHeight + 'px');
        }
        return this;
    };

    /**
     * Changes description aria
     * @param e
     * @param maxIndex
     * @param descriptHeight
     * @param delay
     * @returns {SamsungAd}
     */
    this.decriptChange = function (e, maxIndex, descriptHeight, delay) {
        if (Number(e.target.value) < maxIndex / 4) {
            if (this.descriptState == 0) return this;
            this.toggleClass(this.descriptFadeAria, 'fade', delay);
            this.descriptContainer.style.backgroundImage  = 'url(/samsung-test/images/T_Text' + 0 + '.png)';
            this.descriptState = 0;
        } else if (Number(e.target.value) < maxIndex / 2.25) {
            if (this.descriptState == 1) return this;
            this.toggleClass(this.descriptFadeAria, 'fade', delay);
            this.descriptContainer.style.backgroundImage  ='url(/samsung-test/images/T_Text' + 1 + '.png)';
            this.descriptState = 1;
        } else if (Number(e.target.value) < maxIndex / 1.25) {
            if (this.descriptState == 2) return this;
            this.toggleClass(this.descriptFadeAria, 'fade', delay);
            this.descriptContainer.style.backgroundImage  = 'url(/samsung-test/images/T_Text' + 2 + '.png)';
            this.descriptState = 2;
        } else if (Number(e.target.value) < maxIndex) {
            if (this.descriptState == 3) return this;
            this.toggleClass(this.descriptFadeAria, 'fade', delay);
            this.descriptContainer.style.backgroundImage  = 'url(/samsung-test/images/T_Text' + 3 + '.png)';
            this.descriptState = 3;
        }
        return this;
    };

    /**
     * Flash launches
     * @param e
     * @param state
     * @param delay
     * @returns {SamsungAd}
     */
    this.blinkFlashAria = function (e, state, delay) {
        if (Number(e.target.value) == state) {
            this.toggleClass(this.flashAria, 'light', delay);
        }
        return this;
    };

    /**
     * Youtube video control
     * @param e
     * @param state
     * @returns {SamsungAd}
     */
    this.ytbPlayerControl = function (e, state) {
        if (Number(e.target.value) == state) {
            this.addClass(this.mainImage, 'play');
            this.player.playVideo();
        } else {
            this.removeClass(this.mainImage, 'play');
            this.player.pauseVideo();
        }
        return this;
    };

    /**
     * Rain control
     * @param e
     * @param start
     * @param stop
     * @returns {SamsungAd}
     */
    this.rainControl = function (e, start, stop) {
        if (Number(e.target.value) >= start && Number(e.target.value) <= stop) {
            if (this.dropRainState) return this;
            this.startRain();
        } else {
            this.stopRain();
        }
        return this;
    };

    /**
     * Start rain
     * @returns {SamsungAd}
     */
    this.startRain = function () {
        var self = this;
        this.dropRainState = true;
        this.addClass(this.raindropAria, 'drop');

        this.dropInterval = setInterval(function () {
            var drop = document.createElement('div');
            drop.className = 'raindrop' + String((Math.round(Math.random() * 3)) + 1);
            drop.style.top = String(Math.round(Math.random() * self.raindropAria.offsetHeight) + 1) + 'px';
            drop.style.left = String(Math.round(Math.random() * self.raindropAria.offsetWidth) + 1) + 'px';
            self.raindropAria.appendChild(drop);
        }, 50);

        setTimeout(function () {
            self.stopRain.call(self)
        }, 10000);

        return this;
    };

    /**
     * Stop rain
     * @returns {SamsungAd}
     */
    this.stopRain = function () {
        clearInterval(this.dropInterval);
        this.dropRainState = false;
        this.removeClass(this.raindropAria, 'drop');
        while (this.raindropAria.firstChild) {
            this.raindropAria.removeChild(this.raindropAria.firstChild);
        }
        return this;
    };

    /**
     * Youtube video load
     * @param fn
     * @returns fn result
     */
    this.loadYTPlayer = function (fn) {
        var self = this;
        window.onYouTubePlayerAPIReady = function () {
            self.player = new YT.Player('ytplayer', {
                height: '100%',
                width: '100%',
                videoId: '9xKR8Vcjias',
                playerVars: {
                    autoplay: 1,
                    loop: 1,
                    rel: 0,
                    showinfo: 0
                }
            });
            self.addClass(self.mainImage, 'play');
            return fn();
        };
    }
};


var images = [
    '/samsung-test/images/phone_sprite.png',
    '/samsung-test/images/T_SliderText.png',
    '/samsung-test/images/T_CTA.png'
];


var MAIN_IMAGE_H = 221,
    MAIN_IMAGE_MAX_I = 59,
    DESCRIPT_H = 50,
    DESCRIPT_FADE_DELAY = 250,
    FLASH_LIGHT_STATE = 29,
    FLASH_LIGHT_DELAY = 500,
    RAIN_START_POS = 1,
    RAIN_STOP_POS = 25,
    YOUTUBE_PLAYER_STATE = 0;


var sB = new SamsungAd();
sB.loadYTPlayer(function () {
    sB.imageOnload(images, function (data) {
        sB.addClass(sB.mainContainer, 'show');
        sB.rangeInput.addEventListener('mousemove', function (event) {
            sB.mainImageChange(event, MAIN_IMAGE_MAX_I, MAIN_IMAGE_H)
                .decriptChange(event, MAIN_IMAGE_MAX_I, DESCRIPT_H, DESCRIPT_FADE_DELAY)
                .blinkFlashAria(event, FLASH_LIGHT_STATE, FLASH_LIGHT_DELAY)
                .ytbPlayerControl(event, YOUTUBE_PLAYER_STATE)
                .rainControl(event, RAIN_START_POS, RAIN_STOP_POS);
        }, false);
    });
});


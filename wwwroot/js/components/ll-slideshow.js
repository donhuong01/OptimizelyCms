var llSliderShow = function (slideShowId) {
    try {
        var root = document.getElementById(slideShowId);
        if (root == null) {
            return this;
        }
        var wrapper = root.getElementsByTagName("ul")[0];
        if (wrapper == null) {
            return this;
        }
        var childs = wrapper.getElementsByTagName('li');
        if (childs.length <= 1) {
            return this;
        }
        var pager = root.getElementsByTagName("ul")[1];
        if (pager == null) {
            var pagerWrapper = document.createElement("div");
            pagerWrapper.className = "ll-widget-pager box-size-100";
            pager = document.createElement("ul");
            root.appendChild(pagerWrapper);
            pagerWrapper.appendChild(pager);
        }
        pager.innerHTML = "";
        var spacing_per_page = root.getAttribute("ll-percent-space") ? parseInt(root.getAttribute("ll-percent-space")) : 3,
            totalPage = childs.length,
            temp_spacing = spacing_per_page / (totalPage + 2),
            child_width = (100 / totalPage),
            currentIndex = 0,
            pagingSelected = null,
            pageWidth = child_width;
        limitSwipe = root.offsetWidth * 0.01;

        var meta = {
            isActive: false,
            isAllowMove: false,
            first_milli: 0,
            last_milli: 0,
            first_x: 0,
            last_x: 0,
            translate_percent: 0,
            capture_translate: 0,
            moveRange: function () {
                return Math.abs(this.last_x - this.first_x);
            },
            allowChange: function () {
                console.log(this.moveRange(), root.offsetWidth * 0.3);
                var range = this.moveRange();
                return range > root.offsetWidth * 0.3 || (this.isFastSwipe() && range > root.offsetWidth * 0.15);
            },
            isSwipeToRight: function () {
                return this.first_x < this.last_x;
            },
            isFastSwipe: function () {
                return this.last_milli > 0 && this.last_milli - this.first_milli < 120;
            }
        }

        var isAbsoluteOrFixed = getComputedStyle(wrapper)["position"].toLowerCase() === "fixed"
            || getComputedStyle(wrapper)["position"].toLowerCase() === "absolute";
        function generatePaging(index) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            var span = document.createElement("span");
            a.appendChild(span);
            li.appendChild(a);
            a.onclick = function (e) {
                changePage(index, true);
                e.preventDefault();
            }
            if (index == 0) {
                pagingSelected = a;
                pagingSelected.className = "selected";
            }
            return li;
        }

        for (var i = 0; i < childs.length; i++) {
            if (isAbsoluteOrFixed) {
                childs[i].style.width = child_width + "%";
                childs[i].style.left = ((child_width * i) + (spacing_per_page * i)) + "%";
            } else {
                childs[i].style.width = (child_width - temp_spacing) + "%";
                childs[i].style.marginLeft = (i == 0 ? 0 : temp_spacing) + "%";
            }
            childs[i].style.opacity = 1;
            pager.appendChild(generatePaging(i));
        }
        wrapper.style.width = ((100 * childs.length) + spacing_per_page * (totalPage - 1)) + "%";

        function changePage(index, isPagerClicked) {

            if (isPagerClicked) {
                wrapper.style.transition = 'transform .4s ease-in-out';
            } else if (meta.isFastSwipe()) {
                wrapper.style.transition = 'transform .1s ease-in-out';
            } else {
                wrapper.style.transition = 'transform .4s ease-in-out';
            }

            meta.translate_percent = (-pageWidth * index) - ((isAbsoluteOrFixed ? spacing_per_page : 0) * (index));
            wrapper.style.transform = "translateX(" + meta.translate_percent + "%)";
            currentIndex = index;
            if (pagingSelected) {
                pagingSelected.className = "";
            }
            pagingSelected = pager.getElementsByTagName('a')[index];
            pagingSelected.className = "selected";
            meta.first_x = 0;
            meta.last_x = 0;
            meta.last_milli = 0;
            meta.first_milli = 0;
        }

        // triggers
        var keydown = 'mousedown', keyup = "mouseup", keymove = 'mousemove', keyout = "mouseleave";
        if (_isMobile.any()) {
            keydown = "touchstart";
            keyup = "touchend";
            keymove = "touchmove";
            keyout = null;
        }

        root.addEventListener(keydown, function (e) {
            if (meta.isActive) {
                return;
            }
            preventCurrentSlide = true;
            var val = (e.touches && e.touches.length > 0) ? e.touches[0] : e;
            meta.first_x = val.screenX;
            meta.first_milli = performance.now();
            meta.isActive = true;
            meta.isAllowMove = false;
            meta.capture_translate = meta.translate_percent;
            wrapper.style.transition = 'none';
        })

        document.body.addEventListener(keymove, function (e) {
            if (!meta.isActive) {
                return;
            }

            preventCurrentSlide = true;
            var val = (e.touches && e.touches.length > 0) ? e.touches[0] : e;
            meta.last_x = val.screenX;
            if (meta.moveRange() < limitSwipe) {
                return;
            }
            meta.isAllowMove = true;

            if (meta.isSwipeToRight() && currentIndex == 0 ||
                !meta.isSwipeToRight() && currentIndex >= totalPage - 1) {
                meta.translate_percent = (meta.capture_translate + (meta.last_x - meta.first_x + (meta.isSwipeToRight() ? -limitSwipe : limitSwipe)) * 0.02 * 100 / root.offsetWidth);
            } else {
                meta.translate_percent = (meta.capture_translate + (meta.last_x - meta.first_x + (meta.isSwipeToRight() ? -limitSwipe : limitSwipe)) * (_isMobile.any() ? 0.4 : 0.4) * 100 / root.offsetWidth);
            }
            wrapper.style.transform = "translateX(" + meta.translate_percent + "%)";
            e.preventDefault();
        })


        var func_keyup = function (e) {
            meta.last_milli = performance.now();

            meta.isActive = false;

            if (!meta.isAllowMove || meta.moveRange() < limitSwipe) {
                return;
            }
            setTimeout(function () {
                preventCurrentSlide = false;
            }, 5000);
            meta.isAllowMove = false;
            if (meta.isSwipeToRight() && meta.allowChange() && currentIndex > 0) {
                // swipe to right
                currentIndex--;
                changePage(currentIndex);

            } else if (!meta.isSwipeToRight() && meta.allowChange() && currentIndex < totalPage - 1) {
                // swipe to left
                currentIndex++;
                changePage(currentIndex);
            } else {
                changePage(currentIndex);
            }
        }

        document.body.addEventListener(keyup, func_keyup)
        if (keyout) {
            root.addEventListener(keyout, func_keyup)
        }

        var preventCurrentSlide = false;
        setInterval(function () {
            if (preventCurrentSlide) {
                return;
            }
            currentIndex++;
            if (currentIndex >= totalPage) {
                currentIndex = 0;

            }
            changePage(currentIndex, true);
        }, 5000);
    } catch (ex) {

    }

    return this;
}

var _isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (_isMobile.Android() || _isMobile.BlackBerry() || _isMobile.iOS() || _isMobile.Opera() || _isMobile.Windows());
    }
};
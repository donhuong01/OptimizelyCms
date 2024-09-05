var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
            } else if (dataProp) return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, { // for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, { // for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }],
    dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }]

};

///// mobile
var isMobile = {
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
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


$(function () {
    initSubMenuForMobile();
    initExpanderView();
    initHashTags();
    var isNavShowing = false;
    $('#btn_hamburger').click(function () {
        isNavShowing = !isNavShowing;
        if (isNavShowing) {
            $('html').css("overflow-y", 'hidden');
            $('#btn_hamburger').css("background-image", "url('../themes/lendlease/assets/images/ic_close_blue.png')");
            $('#ll-nav-wapper').find(".nav").addClass("show-nav");
            $('#ll-nav-wapper').find(".nav").removeClass("hide-nav");
            $("#ll-footer").addClass("show-nav");
        } else {
            $('html').css("overflow-y", 'auto');
            $('#btn_hamburger').css("background-image", "");
            $('#ll-nav-wapper').find(".nav").addClass("hide-nav");
            $('#ll-nav-wapper').find(".nav").removeClass("show-nav");
            $("#ll-footer").removeClass("show-nav");
        }
    })

    $(".nav").on("touchmove", function (e) {
        e.preventDefault();
    })

    var navs_inside = document.querySelectorAll("li > ul");
    if (isMobile.any()) {
        for (var i = 0; i < navs_inside.length; i++) {
            var a = navs_inside[i].parentElement.getElementsByTagName("a")[0];
            console.log(a);
            if (a == null) {
                continue;
            }
            a.setAttribute("ll-stt", '0');
            a.onclick = function () {
                var state = a.getAttribute('ll-stt');
                var nav = a.parentElement.getElementsByTagName("ul")[0];
                if (state === "0") {
                    a.setAttribute("ll-stt", '1');
                    nav.style.display = "block";
                } else {
                    a.setAttribute("ll-stt", '0');
                    nav.style.display = "none";
                }
                return false;
            }
        }
    }

    var items = document.querySelectorAll(".ll-promo-item > .title");
    for (var i = 0; i < items.length; i++) {
        if (items[i].innerHTML.length >= 50) {
            app_utils.trimTitleText(items[i])
        }
    }

    var waiter_trim_text = null;
    document.body.style.minHeight = window.innerHeight + "px";

    window.addEventListener("resize", function () {
        if (waiter_trim_text != null) {
            clearTimeout(waiter_trim_text);
        }
        waiter_trim_text = setTimeout(function () {
            document.body.style.minHeight = window.innerHeight + "px";
            app_utils._meta.defaultTitleLength = -1;
            for (var i = 0; i < app_utils._meta.poolTitles.length; i++) {
                app_utils.trimTitleText(app_utils._meta.poolTitles[i])
            }
            waiter_trim_text = null;
        }, 400);
    })

    var hyperlinks = document.getElementsByTagName("a");
    for (var i = 0; i < hyperlinks.length; i++) {
        app_utils.convertTargetLink(hyperlinks[i]);
    }
})

function initExpanderView() {
    var renderItem = function (expander_root) {
        var isShowTerm = false;
        var button = expander_root.getElementsByClassName("expander-button")[0];
        var content_box = expander_root.getElementsByClassName("expander-content-box")[0];

        $(button).click(function () {
            isShowTerm = !isShowTerm;
            if (isShowTerm) {
                $(button).addClass("expanded");
            } else {
                $(button).removeClass("expanded");
            }
        });
    }

    var expander_roots = document.getElementsByClassName('ll-widget-expander-root');
    for (var i = 0; i < expander_roots.length; i++) {
        renderItem(expander_roots[i]);
    }
}



var app_utils = {
    _meta: {
        poolTitles: [],
        defaultTitleLength: -1,
        view_measure: null,
        max_width: 0
    },
    init: function (elem) {
        if (app_utils._meta.view_measure == null) {
            app_utils._meta.view_measure = document.createElement("span");
            app_utils._meta.view_measure.style.position = 'fixed';
            app_utils._meta.view_measure.style.zIndex = -1;
            app_utils._meta.view_measure.style.visibility = 'hidden';
            app_utils._meta.view_measure.style.display = 'inline-block';
            app_utils._meta.view_measure.style.left = 0;
            app_utils._meta.view_measure.style.top = 0;
            document.body.appendChild(app_utils._meta.view_measure);
        }
        if (elem.offsetWidth > 0) {
            app_utils._meta.max_width = elem.offsetWidth;
        }
        app_utils._meta.view_measure.style.fontSize = getComputedStyle(elem).fontSize;
        app_utils._meta.view_measure.style.fontWeight = getComputedStyle(elem).fontWeight;
        app_utils._meta.view_measure.style.fontFamily = getComputedStyle(elem).fontFamily;
        app_utils._meta.view_measure.style.fontStyle = getComputedStyle(elem).fontStyle;


    },
    measureText: function (text) {
    },
    canAppendMoreText: function (text) {
        app_utils._meta.view_measure.innerHTML = text;
        console.log(text, app_utils._meta.view_measure.offsetWidth, 'vs', app_utils._meta.max_width);
        return app_utils._meta.view_measure.offsetWidth < app_utils._meta.max_width;
    },
    trimTitleText: function (element, lengthPerLine, noLine) {
        var value = element.html ? element.html : ((element.innerText.length > 0) ? element.innerHTML.toString().trim() : ""),
            outs = [],
            current = "",
            count_spacing = 0,
            pool_index = -1;
        if (value.length == 0) {
            return;
        }

        if (element.elm == undefined) {
            app_utils._meta.poolTitles.push({
                elm: element,
                html: value
            });
        } else {
            pool_index = app_utils._meta.poolTitles.indexOf(element);
            value = app_utils._meta.poolTitles[pool_index].html;
            element = app_utils._meta.poolTitles[pool_index].elm
        }

        app_utils.init(element);
        var rs = "";
        var texts = value.trim().split(' ');
        noLine = noLine == undefined ? 3 : noLine;
        noLine -= 1;

        while (texts.length > 0) {
            current = texts.shift();
            var can_append_more = app_utils.canAppendMoreText(current + " " + outs[outs.length - 1]);
            if (outs.length > 0 && can_append_more) {
                outs[outs.length - 1] += " " + current;
                rs += " " + current;
            } else if (outs.length == 0) {
                rs += current;
                outs.push(current);
            } else if (outs.length <= noLine) {
                outs.push(current);
                rs += "<br/>" + current;
            }

            if (outs.length == noLine + 1 && texts.length > 0 && can_append_more == false) {
                var count = 0;
                if (texts.length > 0) {
                    current = texts.shift();
                    outs[outs.length - 1] += " " + current;
                    rs += " " + current;
                }
                var last_line = outs[outs.length - 1];
                var dot = '...';
                can_append_more = app_utils.canAppendMoreText(last_line + dot);
                while (can_append_more == false && count < 20) {
                    last_line = last_line.substr(0, last_line.length - 1).trim();
                    rs = rs.substr(0, rs.length - 1);
                    can_append_more = app_utils.canAppendMoreText(last_line + dot);
                }
                outs[noLine] += "...";
                rs += "...";
                break;
            }
        }
        element.style.whiteSpace = "nowrap";
        element.innerHTML = rs;
        return rs;
    },
    convertTargetLink: function (aElelement) {
        if (aElelement) {
            var paths = aElelement.href.replace("//", "/").replace("www.", "").split("/");
            if ((paths.length > 2
                && paths[0].indexOf("http") != -1
                && paths[1].indexOf(location.hostname.replace("www.", "")) == -1)) {
                aElelement.target = "_blank";
                aElelement.setAttribute("rel", "noreferrer");
            }
        }
    }
}


// InputView and Validate

var VALID_CASE = {
    empty: 0,
    specialChar: 1,
    number: 2,
    email: 3,
    checked: 4,
    limit: 5,
    existed: 6,
    func: 7,
    onlyLetter: 8,
    onlyLetterAllowSpacing: 9
}

var validator = {
    empty: function (val) {
        return val.length > 0;
    },
    email: function (sEmail) {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(sEmail)) {
            return true;
        }
        else {
            return false;
        }
    },
    specialChar: function (str) {
        var format = /[^a-zA-Z0-9\-\/]/;
        if (format.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    onlyLetter: function (str) {
        var format = /[^a-zA-Z\-\/]/;
        if (format.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    onlyLetterAllowSpacing: function (str) {
        var format = /[^a-zA-Z\- \/]/;
        if (format.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    isNumber: function (val) {
        return !isNaN(val);
    },
    ageLess60: function (dob_date) {

        var clone = new Date(dob_date.getTime());
        clone.setFullYear(clone.getFullYear() + 60);
        var currentDate = new Date();
        return currentDate.getTime() < clone.getTime()
    }
}


function InputView(domId) {
    this.view = document.getElementById(domId);
    if (this.view == null) {
        return null;
    }
    this._domId = domId;
    this.error_box = null;
    this.valid_cases = [];
    var self = this;
    this.view.onkeyup = function () {
        if (this.value.length > 0) {
            self.isValid();
        }
    };
    this.view.onkeyout = function () {
        setTimeout(function () {
            if (self.error_box == null) {
                self.isValid();
            }
        }, 200);
    }

    this.view.onblur = function () {
        if (self.error_box == null) {
            self.isValid();
        }
    }
    this.getValue = function () {
        return this.view.value;
    }
    this.setError = function (message) {
        if (message && message.length > 0 && this.error_box == null) {
            var parent = this.view.parentNode;
            this.error_box = document.createElement("span");
            this.error_box.className = "error-box";
            this.error_box.innerHTML = message;
            parent.appendChild(this.error_box);
            this.error_box.className += message.length > 30 ? " min-size" : "";
            if (this.view.className.indexOf("error") == -1) {
                this.view.className = (this.view.className + " error").replace("success", "").trim();
            }
        } else if (message && message.length > 0) {
            if (message.length > 30 && this.error_box.className.indexOf("min-size") == -1) {
                this.error_box.className += " min-size";
            } else if (message.length < 30) {
                this.error_box.className = this.error_box.className.replace(" min-size", "");
            }
            this.error_box.innerHTML = message;
            if (this.view.className.indexOf("error") == -1) {
                this.view.className = (this.view.className + " error").replace("success", "").trim();
            }
        } else if (this.error_box != null) {
            this.view.parentNode.removeChild(this.error_box);
            this.error_box = null;
            if (this.view.className.indexOf("success") != -1 && this.view.value.trim().length == 0) {
                this.view.className = this.view.className.replace("success", "");
            } else if (this.view.className.indexOf("success") == -1 && this.view.value.trim().length > 0) {
                this.view.className = (this.view.className + " success").replace("error", "").trim();
            } else {
                this.view.className = this.view.className.replace("error", "");
            }
        } else {
            if (this.view.className.indexOf("success") != -1 && this.view.value.trim().length == 0) {
                this.view.className = this.view.className.replace("success", "");
            } else if (this.view.className.indexOf("success") == -1 && this.view.value.trim().length > 0) {
                this.view.className = (this.view.className + " success").replace("error", "").trim();
            } else {
                this.view.className = this.view.className.replace("error", "");
            }
        }
        return this;
    }
    this.setValidateCase = function (array_case) {
        this.valid_cases = array_case;
        return this;
    }

    this.isValid = function () {
        var value = this.view.value.trim();
        var isValid = false;
        for (var i = 0; i < this.valid_cases.length; i++) {
            switch (this.valid_cases[i].type) {
                case VALID_CASE.empty:
                    isValid = validator.empty(value);
                    break;
                case VALID_CASE.email:
                    if (value.length > 0) {
                        isValid = validator.email(value);
                    } else {
                        isValid = true;
                    }
                    break;
                case VALID_CASE.specialChar:
                    isValid = validator.specialChar(value);
                    break;
                case VALID_CASE.number:
                    isValid = value.length > 0 ? validator.isNumber(value) : true;
                    break;
                case VALID_CASE.limit:
                    isValid = value.length >= this.valid_cases[i].min && value.length <= this.valid_cases[i].max;
                    break;
                case VALID_CASE.onlyLetter:
                    isValid = validator.onlyLetter(value);
                    break;
                case VALID_CASE.onlyLetterAllowSpacing:
                    isValid = validator.onlyLetterAllowSpacing(value);
                    break;
                case VALID_CASE.func:
                    isValid = this.valid_cases[i].validate();
            }
            if (!isValid) {
                this.setError(this.valid_cases[i].message);
                return false;
            }
        }
        this.setError(null);
        return true;
    }
    this.clear = function () {
        this.view.value = "";
    }
}


function initHashTags() {
    var tag_directors = document.querySelectorAll("*[ll-hashtag-direct]");
    var tag_direct_active = document.querySelector(".border-selected[ll-hashtag-direct]"),
        tags_listener_active = [];

    var all_tags_listener = document.querySelectorAll("*[ll-hashtag-listener]");
    $(all_tags_listener).css("display", "none");
    if (tag_direct_active) {
        tags_listener_active = document.querySelectorAll("*[ll-hashtag-listener=" + tag_direct_active.getAttribute("ll-hashtag-direct") + "]")
        if (tags_listener_active.length > 0) {
            $(tags_listener_active).css("display", "block");
        }
    }

    for (var i = 0; i < tag_directors.length; i++) {
        tag_directors[i].onclick = function () {
            if (tag_direct_active != null) {
                tag_direct_active.classList.remove("border-selected");
            }
            if (tags_listener_active.length > 0) {
                $(tags_listener_active).css("display", "none");
            }
            var tag_key = this.getAttribute("ll-hashtag-direct");
            tags_listener_active = document.querySelectorAll("*[ll-hashtag-listener=" + tag_key + "]");
            if (tags_listener_active.length > 0) {
                $(tags_listener_active).css("display", "block");
            }
            this.classList.add("border-selected");
            tag_direct_active = this;
            return false;
        }
    }
}

var app_loading = {
    v_loading: null,
    show: function () {
        if (app_loading.v_loading == null) {
            app_loading.v_loading = document.createElement("div");
            app_loading.v_loading.className = "loading_dialog fade_in";
            var div = document.createElement("div");
            for (var i = 0; i < 3; i++) {
                div.appendChild(document.createElement("span"));
            }
            app_loading.v_loading.appendChild(div);
            document.body.appendChild(app_loading.v_loading);
        }
    },
    hide: function () {
        if (app_loading.v_loading != null) {
            var self = this;
            this.v_loading.className = "loading_dialog fade_out";
            setTimeout(function () {
                document.body.removeChild(self.v_loading)
                self.v_loading = null;
            }, 200);
        }
    }
}


function initSubMenuForMobile() {
    var wrapper = document.body.querySelector(".ll-sub-menu-wrapper");
    if (wrapper != null) {
        var nav_sub_menu = wrapper.querySelector(".sub-menu");
        console.log(nav_sub_menu);
        if (nav_sub_menu != null) {
            var listener = function (e) {
                console.log(e, e.matches);
                if (e.matches) {
                    setTimeout(function () {
                        var width = 0;
                        var lis = nav_sub_menu.querySelectorAll("li");
                        for (var i = 0; i < lis.length; i++) {
                            width += lis[i].offsetWidth + parseFloat(getComputedStyle(lis[i])["margin-right"]) + 2;
                        }
                        console.log("sum", width);

                        nav_sub_menu.style.width = width * 100 / (wrapper.clientWidth - parseFloat(getComputedStyle(wrapper)["padding-right"]) - parseFloat(getComputedStyle(wrapper)["padding-left"])) + "%";
                    }, 50);
                }
            }
            var tracker_720 = window.matchMedia("(max-width: 820px)");
            var tracker_480 = window.matchMedia("(max-width: 480px)");
            var tracker_landscape = window.matchMedia("screen and (min-width: 320px) and (max-width: 767px) and (orientation: landscape)");

            tracker_landscape.addListener(listener);
            tracker_720.addListener(listener);
            tracker_480.addListener(listener);

            listener(tracker_landscape);
            listener(tracker_720);
            listener(tracker_480);
        }
    }
}
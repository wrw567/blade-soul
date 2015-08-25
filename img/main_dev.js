/*
 * Author: TGIDEAS
 * User: troykang
 * Remark: BNS Official Site Javascript Library
 */

var bns = {}
bns.Base = {
    id:function(id){
        return document.getElementById(id);
    },tag:function(p, o) {
        return p.getElementsByTagName(o)
    },gclass:function(fdomid,tagname,classname){
        var father = (typeof fdomid == "string") ? bns.Base.id(fdomid) : fdomid,
            elems = father.getElementsByTagName(tagname),
            domArr = [];
        for(var i = 0; i < elems.length; i++){
            var elemClass = typeof elems[i].className === 'string' ? elems[i].className : elems[i].getAttribute('class');
            if(elemClass.indexOf(classname) !== -1){
                domArr.push(elems[i]);
            }
        }
        return domArr;
    },bind:function(ele, type, listener, useCapture) {
        useCapture = useCapture || false;
        if (window.addEventListener) {
            ele.addEventListener(type, listener, useCapture);
        } else {
            ele.attachEvent('on' + type, listener);
        }
    },unbind:function(ele, type, listener) {
        if (window.removeEventListener) {
            ele.removeEventListener(type, listener, false);
        } else {
            ele.detachEvent("on" + type, listener);
        }
    },css:function(el, style, value) {
        if (arguments.length < 2) {
            return true;
        }
        if (arguments.length == 2) {
            if (document.defaultView) {
                return document.defaultView.getComputedStyle(el, null).getPropertyValue(style);
            } else {
                if (bns.Base.browser.msie && style == 'opacity') {
                    var op = 1;
                    if (el.filters.alpha) {
                        op = el.filters.alpha.opacity;
                    } else if (el.filters["DXImageTransform.Microsoft.Alpha"]) {
                        op = el.filters["DXImageTransform.Microsoft.Alpha"].opacity
                    }
                    return (op);
                }
                style = style.replace(/\-(\w)/g,
                    function($, $1) {
                        return $1.toUpperCase();
                    });
                return el.currentStyle[style];
            }
        } else {
            if (bns.Base.browser.msie && style == 'opacity') {
                if (!el.currentStyle.hasLayout) {
                    el.style.zoom = 1;
                }
                if (el.filters.alpha) {
                    el.filters.alpha.opacity = value * 100;
                } else {
                    el.style.filter = "alpha(opacity=" + value * 100 + ")";
                }
                return el;
            }
            style = style.replace(/\-(\w)/g,
                function($, $1) {
                    return $1.toUpperCase();
                });
            el.style[style] = value;
        }
    },browser:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        var b = {
            msie: /msie/.test(window.navigator.userAgent.toLowerCase()) && !/opera/.test(ua),
            opera: /opera/.test(ua),
            safari: /webkit/.test(ua) && !/chrome/.test(ua),
            firefox: /firefox/.test(ua),
            chrome: /chrome/.test(ua)
        };
        var vMark = "";
        for (var i in b) {
            if (b[i]) {
                vMark = "safari" == i ? "version": i;
                break;
            }
        }
        b.version = vMark && new RegExp("(?:" + vMark + ")[\\/: ]([\\d.]+)").test(ua) ? RegExp.$1: "0";
        return b;
    }(),each:function(arr, callback) {
        var i = 0;
        for (var k in arr) {
            if (!arr.hasOwnProperty || arr.hasOwnProperty(k)) {
                callback.call(arr, i, arr[k]);
                i++;
            }
        }
    },attr:function(elem, attrbute, value) {
        if (!elem || !attrbute) {
            return null;
        }
        if (!value) {
            return elem.getAttribute(attrbute);
        }
        elem.setAttribute(attrbute, value);
    }
};

bns.Script = {
    script:function(u) {
        var o = document.createElement("script");
        o.src = u;
        o.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(o);
        return o;
    },chkload:function(u, s, v) {
        var e = this.script(u);
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            e.onreadystatechange = function() {
                if (this.readyState && this.readyState == "loading") {
                    return false;
                } else {
                    s(v);
                }
            };
        } else {
            e.onload = function() {
                s(v);
            };
        }
    },tabHandler:function(aDom,bDom,e,classOrig,classAdd){
        var eventDom = aDom,
            targetDom = bDom,
            k = 0;

        if(eventDom.length && targetDom.length){
            for(k in eventDom){
                (function(num){
                    bns.Base.bind(eventDom[num],e,function(){
                        bns.Base.each(targetDom,function(i,item){
                            bns.Base.css(item,'display','none');
                        });
                        bns.Base.each(eventDom,function(i,item){
                            item.className = classOrig;
                        });
                        if(bns.Base.css(targetDom[num],'display') !== 'none'){
                            bns.Base.css(targetDom[num],'display','none');
                        } else{
                            bns.Base.css(targetDom[num],'display','block');
                        }
                        eventDom[num].className = classOrig + ' ' + classAdd;
                    })
                }(k))
            }
        } else{
            bns.Base.bind(eventDom,e,function(){
                if(bns.Base.css(targetDom,'display') !== 'none'){
                    bns.Base.css(targetDom,'display','none');
                } else{
                    bns.Base.css(targetDom,'display','block');
                }
            });
        }
    },corp: function() {
        var corp = bns.Base.id("coopmedia"),corp_list = corp.getElementsByTagName("ul")[0];
        corp.onmouseover = corp_list.onmouseover = function() {
            corp_list.style.display = "block";
        };
        corp.onmouseout = corp_list.onmouseout = function() {
            corp_list.style.display = "none";
        };
    },setTopNew:function(){
        var newList = bns.Base.gclass('news','ul','news-list'),
            topNewOpt = bns.Base.tag(newList[0],'li');

        topNewOpt.length && (topNewOpt[0].className = 'news-hot');
    },navHoverEvent:function(){
        var nav = bns.Base.id('nav');
        nav.onmouseover = function(){
            nav.className = 'nav nav-on';
        };
        nav.onmouseout = function(){
            nav.className = 'nav';
        };
    },versionScrollInit:function(){
        var verDom = bns.Base.id('version_box'),
            vlistDom = bns.Base.id('version_list'),
            wrapRange = parseInt(bns.Base.css(verDom,'width')),
            listRange = parseInt(bns.Base.css(vlistDom,'width')),
            clientW = document.documentElement.clientWidth || document.body.clientWidth;
        var mousePosition = function(e){
            var ev = e || window.event,ex = 0;
            if (ev.pageX) {
                ex = ev.pageX;
            } else{
                ex = ev.clientX + document.body.scrollLeft - document.body.clientLeft;
            }
            if(clientW >= 1660){
                return (ex - 400);
            } else if(clientW < 1660 && clientW > 1270){
                return (ex - 320);
            } else if(clientW < 1270 && clientW > 1030){
                return (ex - 208);
            } else{
                return (ex - 198);
            }
        };
        bns.Base.bind(window,'resize',function(){
            wrapRange = parseInt(bns.Base.css(verDom,'width'));
        });
        bns.Base.bind(verDom,'mousemove',function(e){

            var ev = e || window.event,
                mPosi = mousePosition(ev),
                d = -(mPosi/wrapRange*listRange - mPosi);
                vlistDom.style.left = d + 'px'
        })
    },videoInit:function (vid) {
            var video = document.getElementById('video_con');
            video.innerHTML = '<object width="400" height="304" align="middle" codebase="http:\/\/fpdownload.macromedia.com\/get\/flashplayer\/current\/swflash.cab#version=10,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="_playerswf"><param value="http:\/\/static.video.qq.com\/TencentPlayer.swf?vid=' + vid + '&amp;autoplay=1&amp;loadingswf=http:\/\/imgcache.qq.com\/minivideo_v1\/vd\/res\/skins\/web_small_loading.swf&amp;outhost=http:\/\/bns.qq.com\/&amp;pic=http:\/\/ossweb-img.qq.com\/images\/bns\/web201211\/ultra0620\/video.jpg" name="movie"><param value="opaque" name="wmode"><param value="always" name="allowscriptaccess"><param value="high" name="quality"><param value="true" name="allowfullscreen"><param value="all" name="allownetworking"><embed width="400" height="304" align="middle" wmode="opaque" src="http:\/\/static.video.qq.com\/TencentPlayer.swf?vid=' + vid + '&amp;autoplay=1&amp;loadingswf=http:\/\/imgcache.qq.com\/minivideo_v1\/vd\/res\/skins\/web_small_loading.swf&amp;pic=http:\/\/ossweb-img.qq.com\/images\/bns\/web201211\/ultra0620\/video.jpg" quality="high" name="_playerswf" id="_playerswf" allowscriptaccess="always" allowfullscreen="true" type="application\/x-shockwave-flash" pluginspage="http:\/\/www.macromedia.com\/go\/getflashplayer"><\/object>';
    }
};

var slider = function(){
    function sliderClass(sliderDom,options){
        this.sliderDom = typeof sliderDom == 'string' ? bns.Base.id(sliderDom) : sliderDom;
        this.sliderCtrls = bns.Base.gclass(sliderDom,'span','switcher-btn');
        this.sliderBox = bns.Base.gclass(sliderDom,'div','slider-pic')[0];
        this.sliderPics = bns.Base.gclass(sliderDom,'a','pic-lnk');
        this.index = 0;
        this.length = this.sliderPics.length;
        this.options = {};
        this.index = 0;
        this.num = 0;
        for(var k in options) {
            this.options[k] = options[k];
        }
        this.init();
        this._run()
    }
    var Tween = {
        linear : function(pos) {
            return pos
        },easeInOutExpo: function(pos){
            if(pos==0) return 0;
            if(pos==1) return 1;
            if((pos/=0.5) < 1) return 0.5 * Math.pow(2,10 * (pos-1));
            return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
        }
    };
    return sliderClass.prototype = {
        init : function(){
            this.sliderBox.style.left = 0;
            this.ctrlsReset(0)
        },
        ctrlsReset : function(n){
            for(var i = 0; i < this.length; i++){
                this.sliderCtrls[i].className = 'switcher-btn allTrans spr';
            }
            this.sliderCtrls[n].className = 'switcher-btn allTrans switcher-on spr';
        },
        _transition : function(elem,opt){
            var options = arguments[1] || {},
                begin =  options.begin,
                change = options.change,
                duration = options.duration || 500,
                field = 'left',
                ftp = options.ftp || 60,
                ease = Tween.easeInOutExpo,
                end = begin + change,
                startTime = new Date().getTime(),
                onStart = options.onStart || function(){},
                onEnd = options.onEnd || function(){},
                self = this;
            onStart();
            function __run(){
                self.stimer = setTimeout(function(){
                    var newTime = new Date().getTime(),
                        timestamp = newTime - startTime,
                        delta = ease(timestamp / duration);
                    elem.style[field] = Math.ceil(begin + delta * change) + "px";
                    if(duration <= timestamp){
                        elem.style[field] = end + "px";
                        onEnd()
                    }else{
                        self.stimer = setTimeout(__run,1000/ftp);
                    }
                },1000/ftp)
            }
            __run();
        },
        _move : function(){
            var self = this;
            clearTimeout(this.timer);
            clearTimeout(this.stimer);
            if(this.index === (this.length-1)){
                this.index = 0;
                this._transition(this.sliderBox,{
                    begin : -this.options.picWidth*(this.length-1),
                    change : this.options.picWidth*(this.length-1),
                    duration : 500,
                    onStart : function(){
                        self.ctrlsReset(0)
                    }
                });
                this._run()
            } else {
                this.index++;
                this._transition(this.sliderBox,{
                    begin : -this.options.picWidth*(this.index-1),
                    change : -this.options.picWidth,
                    duration : 500,
                    onStart : function(){
                        self.ctrlsReset(self.index)
                    }
                });
                this._run();
            }
        },
        _handleStop : function(){
            var self = this;
            for(var i = 0; i < this.length; i++){
                (function(j){
                    self.sliderCtrls[j].onmouseover = function(){
                        clearTimeout(self.timer);
                        clearTimeout(self.stimer);
                        var leftNow = parseInt(bns.Base.css(self.sliderBox,'left'));
                        self._transition(self.sliderBox,{
                            begin : leftNow,
                            change : (-self.options.picWidth*j) - leftNow,
                            duration : 500,
                            onStart : function(){
                                self.ctrlsReset(j);
                                self.index = j;
                            }
                        })
                    };
                    self.sliderCtrls[j].onmouseleave = function(){
                        self._run();
                    }
                })(i)
            }
        },
        _run : function(){
            var self = this;
            this._handleStop();
            this.timer = setTimeout(function() {
                self._move();
            }, this.options.timeout);
        }
    },sliderClass
}();


var sliderInit = function(){
    var slider1 = new slider('ad_slider',{
        picWidth : 400,
        timeout : 3000
    });
};

var domArrange = function(wrapid,fgridtype,cgridtype,pwidth){
    var tempNodeList = [],
        tempLinkList = [],
        domWrap = document.getElementById(wrapid),
        domAll = domWrap.getElementsByTagName('div');
    function createDomAndInsert(tagname,dClass,targetDom){
        var o = document.createElement(tagname);
        bns.Base.attr(o,'class',dClass);
        return targetDom.appendChild(o);
    }
    //拿到所有gridtype=num的grid dom
    function sortGridByType(gridtype){
        tempNodeList = [];
        tempLinkList = [];
        for(var i=0;i<domAll.length;i++){
            var typeAttr = bns.Base.attr(domAll[i],'grid-type');
            if(typeof typeAttr === 'string' && typeAttr === gridtype){
                var gridLink = domAll[i].getElementsByTagName('a')[0];
                tempNodeList.push(domAll[i]);
                tempLinkList.push(gridLink)
            }
        }
    }
    //生成并初始化已准备好的父grid dom,插入已有的gridDomList
    function createGridSlider(fdom,gridArr,picwidth,timeout){
        //fdom.innerHTML = '';
        var picWrap = createDomAndInsert('div','slider-pic grid-slider pa',fdom),
            switcherWrap = createDomAndInsert('div','slider-switcher grid-slider pa',fdom);
        for(var i=0;i<gridArr.length;i++){
            gridArr[i].parentNode.style.display = 'none';
            picWrap.appendChild(gridArr[i]);
            createDomAndInsert('span','switcher-btn allTrans',switcherWrap);
        }
        switcherWrap.getElementsByTagName('span')[0].className = 'switcher-btn switcher-on allTrans';
        picWrap.style.display = 'block';
        switcherWrap.style.display = 'block';
        var sliderGrid = new slider(fdom,{
            picWidth : picwidth,
            timeout : timeout
        });
    }
    sortGridByType(cgridtype);
    //向gridtype==0的grid dom重新插入所有grid
    function insertGridArrToDom(){
        var temp = tempLinkList,
            tempNumSplit = temp.length/2,
            tempArr1 = [],
            tempArr2 = [];
        if(fgridtype!=='0'){
            sortGridByType(fgridtype);
            createGridSlider(tempNodeList[0],temp,pwidth,4000)
        } else{
            for(var j=0;j<tempNumSplit;j++){
                tempArr1.push(temp[j])
            }
            for(var s=tempNumSplit;s<temp.length;s++){
                tempArr2.push(temp[s])
            }
            sortGridByType('0');
            var topGrid = createDomAndInsert('div','grid1x1 inner-grid',tempNodeList[0]),
                secondGrid = createDomAndInsert('div','grid1x1 inner-grid',tempNodeList[0]);
            createGridSlider(topGrid,tempArr1,pwidth,2500)
            createGridSlider(secondGrid,tempArr2,pwidth,2000)

            for(var i=1;i<tempNodeList.length;i++){
                tempNodeList[i].style.display = 'none'
            }
        }
    }
    insertGridArrToDom();
}
bns.init = function(){
    var newsTabs = bns.Base.gclass('news','a','tab-lnk'),
        newsCons = bns.Base.gclass('news','div','news-con'),
        verTabs = bns.Base.gclass('vertabs','i','version-tab'),
        verLnks = bns.Base.gclass('verlnks','a','version-lnk'),
        guideTabs = bns.Base.gclass('guide','div','guide-box'),
        guideLnks = bns.Base.gclass('guide','div','guide-content');
    bns.Script.tabHandler(newsTabs,newsCons,'mouseover','tab-lnk colorTrans','tlink-on');
    bns.Script.tabHandler(verTabs,verLnks,'mouseover','version-tab','version-tab-on');
    bns.Script.tabHandler(guideTabs,guideLnks,'click','guide-box','gbox-on');
    bns.Script.corp();
    bns.Script.setTopNew();
    bns.Script.navHoverEvent();
    bns.Script.versionScrollInit()
    bns.Script.chkload("http://ossweb-img.qq.com/images/js/comm/tgadshow.min.js",
        function() {
            bns.Script.chkload("http://ossweb-img.qq.com/images/js/title.js",
                function() {
                    ostb_int()
                },
                "")
        }, "")
    bns.Script.chkload("http://ossweb-img.qq.com/images/js/basic/tgswfobj_s.js",
        function() {
            insertSwfV2("swfcontent", "http://ossweb-img.qq.com/images/bns/web201506/main/flash/main0813.swf?v=" + Math.random(), "1046", "350",{},{},"10.0");
            window.gotoPage = function(arg){
                if(arg==="1"){
                    window.open('http://bns.qq.com/cp/a20150810hbtj/index.html')
                } else if(arg==="2"){
                    window.open('http://bns.qq.com/cp/a20150804hbxt/index.html')
                }
            }
        },""
    );
    bns.Script.chkload("http://tajs.qq.com/stats?sId=22212170", function() {
        bns.Script.chkload("http://pingjs.qq.com/ping_tcss_ied.js", function() {
            if (typeof (pgvMain) == 'function') {
                pgvMain();
            }
        }, "")
    }, "");
}

function do_speed_report() {
    var imgSendTimePoint;
    var s = new Array();
    function addTestPoint(iId) {
        var curTime = new Date();
        s.push(iId + "=" + (curTime - d0));
    }
    addTestPoint(1);
    var url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7718&flag2=35&flag3=2&" + s.join("&");
    if (Math.random() < 0.3) {
        imgSendTimePoint = new Image();
        imgSendTimePoint.src = url;
    }
}

function do_speed_report() {
    var imgSendTimePoint;
    var s = new Array();
    function addTestPoint(iId) {
        var curTime = new Date();
        s.push(iId + "=" + (curTime - d0));
    }
    ;
    addTestPoint(1);
    var url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7718&flag2=35&flag3=2&" + s.join("&");
    if (Math.random() < 0.3) {
        imgSendTimePoint = new Image();
        imgSendTimePoint.src = url;
    }
}

window.onload = function(){
    var cw = document.documentElement.clientWidth || document.body.clientWidth;
    if(cw <= 1840 && cw > 1440){
        domArrange('grid_wrap_1','0','1',192);
    } else if(cw <= 1440  && cw > 1352){
        domArrange('grid_wrap_1','0','1',192);
        domArrange('grid_wrap_1','3','4',192);
    } else if(cw <= 1352  && cw > 1008){
        domArrange('grid_wrap_1','0','1',192);
        domArrange('grid_wrap_1','3','4',192);
    } else if(cw <= 1008){
        domArrange('grid_wrap_1','0','1',192);
        domArrange('grid_wrap_3','5','6',190);
    }
    bns.init();
    sliderInit();
    do_speed_report();
}
/*  |xGv00|4fca758e37ef2eb351d69e0d074a21ec */
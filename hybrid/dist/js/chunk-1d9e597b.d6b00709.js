(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d9e597b"],{"264c":function(e,t,o){"use strict";o.d(t,"a",(function(){return r})),o.d(t,"b",(function(){return s})),o.d(t,"c",(function(){return i})),o.d(t,"d",(function(){return l}));var n=o("9ab4"),i=function(e,t){return null!==t.closest(e)},r=function(e){var t;return"string"===typeof e&&e.length>0?(t={"ion-color":!0},t["ion-color-"+e]=!0,t):void 0},a=function(e){if(void 0!==e){var t=Array.isArray(e)?e:e.split(" ");return t.filter((function(e){return null!=e})).map((function(e){return e.trim()})).filter((function(e){return""!==e}))}return[]},s=function(e){var t={};return a(e).forEach((function(e){return t[e]=!0})),t},c=/^[a-z][a-z0-9+\-.]*:/,l=function(e,t,o){return Object(n["a"])(void 0,void 0,void 0,(function(){var i;return Object(n["c"])(this,(function(n){return null!=e&&"#"!==e[0]&&!c.test(e)&&(i=document.querySelector("ion-router"),i)?(null!=t&&t.preventDefault(),[2,i.push(e,o)]):[2,!1]}))}))}},"646f":function(e,t,o){"use strict";o.r(t),o.d(t,"ion_popover",(function(){return b}));var n=o("9ab4"),i=o("69ed"),r=(o("b6d2"),o("c123"),o("157e")),a=(o("a1ca"),o("093a")),s=o("264c"),c=o("bfbf"),l=o("ceb5"),p=function(e,t){var o="top",n="left",i=e.querySelector(".popover-content"),a=i.getBoundingClientRect(),s=a.width,c=a.height,l=e.ownerDocument.defaultView.innerWidth,p=e.ownerDocument.defaultView.innerHeight,d=t&&t.target&&t.target.getBoundingClientRect(),f=null!=d&&"top"in d?d.top:p/2-c/2,v=null!=d&&"left"in d?d.left:l/2,b=d&&d.width||0,h=d&&d.height||0,m=e.querySelector(".popover-arrow"),g=m.getBoundingClientRect(),w=g.width,y=g.height;null==d&&(m.style.display="none");var O={top:f+h,left:v+b/2-w/2},j={top:f+h+(y-1),left:v+b/2-s/2},x=!1,E=!1;j.left<u+25?(x=!0,j.left=u):s+u+j.left+25>l&&(E=!0,j.left=l-s-u,n="right"),f+h+c>p&&f-c>0?(O.top=f-(y+1),j.top=f-c-(y-1),e.className=e.className+" popover-bottom",o="bottom"):f+h+c>p&&(i.style.bottom=u+"%"),m.style.top=O.top+"px",m.style.left=O.left+"px",i.style.top=j.top+"px",i.style.left=j.left+"px",x&&(i.style.left="calc("+j.left+"px + var(--ion-safe-area-left, 0px))"),E&&(i.style.left="calc("+j.left+"px - var(--ion-safe-area-right, 0px))"),i.style.transformOrigin=o+" "+n;var k=Object(r["a"])(),D=Object(r["a"])(),P=Object(r["a"])();return D.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,.08),P.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),k.addElement(e).easing("ease").duration(100).addAnimation([D,P])},u=5,d=function(e){var t=Object(r["a"])(),o=Object(r["a"])(),n=Object(r["a"])();return o.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.08,0),n.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),t.addElement(e).easing("ease").duration(500).addAnimation([o,n])},f=function(e,t){var o=12,n=e.ownerDocument,i="rtl"===n.dir,a="top",s=i?"right":"left",c=e.querySelector(".popover-content"),l=c.getBoundingClientRect(),p=l.width,u=l.height,d=n.defaultView.innerWidth,f=n.defaultView.innerHeight,v=t&&t.target&&t.target.getBoundingClientRect(),b=null!=v&&"bottom"in v?v.bottom:f/2-u/2,h=null!=v&&"left"in v?i?v.left-p+v.width:v.left:d/2-p/2,m=v&&v.height||0,g={top:b,left:h};g.left<o?(g.left=o,s="left"):p+o+g.left>d&&(g.left=d-p-o,s="right"),b+m+u>f&&b-u>0?(g.top=b-u-m,e.className=e.className+" popover-bottom",a="bottom"):b+m+u>f&&(c.style.bottom=o+"px");var w=Object(r["a"])(),y=Object(r["a"])(),O=Object(r["a"])(),j=Object(r["a"])(),x=Object(r["a"])();return y.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,.32),O.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),j.addElement(c).beforeStyles({top:g.top+"px",left:g.left+"px","transform-origin":a+" "+s}).fromTo("transform","scale(0.001)","scale(1)"),x.addElement(e.querySelector(".popover-viewport")).fromTo("opacity",.01,1),w.addElement(e).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).addAnimation([y,O,j,x])},v=function(e){var t=Object(r["a"])(),o=Object(r["a"])(),n=Object(r["a"])();return o.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.32,0),n.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),t.addElement(e).easing("ease").duration(500).addAnimation([o,n])},b=function(){function e(e){var t=this;Object(i["l"])(this,e),this.presented=!1,this.mode=Object(i["d"])(this),this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),t.dismiss()},this.onBackdropTap=function(){t.dismiss(void 0,a["a"])},this.onLifecycle=function(e){var o=t.usersElement,n=h[e.type];if(o&&n){var i=new CustomEvent(n,{bubbles:!1,cancelable:!1,detail:e.detail});o.dispatchEvent(i)}},Object(a["e"])(this.el),this.didPresent=Object(i["e"])(this,"ionPopoverDidPresent",7),this.willPresent=Object(i["e"])(this,"ionPopoverWillPresent",7),this.willDismiss=Object(i["e"])(this,"ionPopoverWillDismiss",7),this.didDismiss=Object(i["e"])(this,"ionPopoverDidDismiss",7)}return e.prototype.present=function(){return Object(n["a"])(this,void 0,void 0,(function(){var e,t,o;return Object(n["c"])(this,(function(n){switch(n.label){case 0:if(this.presented)return[2];if(e=this.el.querySelector(".popover-content"),!e)throw new Error("container is undefined");return t=Object.assign(Object.assign({},this.componentProps),{popover:this.el}),o=this,[4,Object(c["a"])(this.delegate,e,this.component,["popover-viewport",this.el["s-sc"]],t)];case 1:return o.usersElement=n.sent(),[4,Object(l["a"])(this.usersElement)];case 2:return n.sent(),[2,Object(a["f"])(this,"popoverEnter",p,f,this.event)]}}))}))},e.prototype.dismiss=function(e,t){return Object(n["a"])(this,void 0,void 0,(function(){var o;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(a["g"])(this,e,t,"popoverLeave",d,v,this.event)];case 1:return o=n.sent(),o?[4,Object(c["b"])(this.delegate,this.usersElement)]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2,o]}}))}))},e.prototype.onDidDismiss=function(){return Object(a["h"])(this.el,"ionPopoverDidDismiss")},e.prototype.onWillDismiss=function(){return Object(a["h"])(this.el,"ionPopoverWillDismiss")},e.prototype.render=function(){var e,t=Object(i["d"])(this),o=this.onLifecycle;return Object(i["i"])(i["a"],{"aria-modal":"true","no-router":!0,style:{zIndex:""+(2e4+this.overlayIndex)},class:Object.assign(Object.assign({},Object(s["b"])(this.cssClass)),(e={},e[t]=!0,e["popover-translucent"]=this.translucent,e)),onIonPopoverDidPresent:o,onIonPopoverWillPresent:o,onIonPopoverWillDismiss:o,onIonPopoverDidDismiss:o,onIonDismiss:this.onDismiss,onIonBackdropTap:this.onBackdropTap},Object(i["i"])("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop}),Object(i["i"])("div",{class:"popover-wrapper"},Object(i["i"])("div",{class:"popover-arrow"}),Object(i["i"])("div",{class:"popover-content"})))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i["f"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return'.sc-ion-popover-ios-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1001}.overlay-hidden.sc-ion-popover-ios-h{display:none}.popover-wrapper.sc-ion-popover-ios{opacity:0;z-index:10}.popover-content.sc-ion-popover-ios{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-ios{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-ios-h{--width:200px;--max-height:90%;--box-shadow:none}.popover-content.sc-ion-popover-ios{border-radius:10px}.popover-arrow.sc-ion-popover-ios{display:block;position:absolute;width:20px;height:10px;overflow:hidden}.popover-arrow.sc-ion-popover-ios:after{left:3px;top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:"";z-index:10}[dir=rtl].sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after, [dir=rtl] .sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after, [dir=rtl].sc-ion-popover-ios .popover-arrow.sc-ion-popover-ios:after{left:unset;right:unset;right:3px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios{top:auto;bottom:-10px}.popover-bottom.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after{top:-6px}@supports ((-webkit-backdrop-filter:blur(0)) or (backdrop-filter:blur(0))){.popover-translucent.sc-ion-popover-ios-h .popover-arrow.sc-ion-popover-ios:after, .popover-translucent.sc-ion-popover-ios-h .popover-content.sc-ion-popover-ios{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}'},enumerable:!0,configurable:!0}),e}(),h={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"}},bfbf:function(e,t,o){"use strict";o.d(t,"a",(function(){return i})),o.d(t,"b",(function(){return r}));var n=o("9ab4"),i=function(e,t,o,i,r){return Object(n["a"])(void 0,void 0,void 0,(function(){var a;return Object(n["c"])(this,(function(n){switch(n.label){case 0:if(e)return[2,e.attachViewToDom(t,o,r,i)];if("string"!==typeof o&&!(o instanceof HTMLElement))throw new Error("framework delegate is missing");return a="string"===typeof o?t.ownerDocument&&t.ownerDocument.createElement(o):o,i&&i.forEach((function(e){return a.classList.add(e)})),r&&Object.assign(a,r),t.appendChild(a),a.componentOnReady?[4,a.componentOnReady()]:[3,2];case 1:n.sent(),n.label=2;case 2:return[2,a]}}))}))},r=function(e,t){if(t){if(e){var o=t.parentElement;return e.removeViewFromDom(o,t)}t.remove()}return Promise.resolve()}},ceb5:function(e,t,o){"use strict";o.d(t,"a",(function(){return j})),o.d(t,"b",(function(){return k})),o.d(t,"c",(function(){return y})),o.d(t,"d",(function(){return x})),o.d(t,"e",(function(){return c}));var n=o("9ab4"),i=o("69ed"),r=o("a1ca"),a=function(){return o.e("chunk-2d0b3840").then(o.bind(null,"2969"))},s=function(){return o.e("chunk-2d0e5f57").then(o.bind(null,"9769"))},c=function(e){return new Promise((function(t,o){Object(i["m"])((function(){l(e),p(e).then((function(o){o.animation&&o.animation.destroy(),u(e),t(o)}),(function(t){u(e),o(t)}))}))}))},l=function(e){var t=e.enteringEl,o=e.leavingEl;E(t,o,e.direction),e.showGoBack?t.classList.add("can-go-back"):t.classList.remove("can-go-back"),x(t,!1),o&&x(o,!1)},p=function(e){return Object(n["a"])(void 0,void 0,void 0,(function(){var t,o;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,d(e)];case 1:return t=n.sent(),o=t?f(t,e):v(e),[2,o]}}))}))},u=function(e){var t=e.enteringEl,o=e.leavingEl;t.classList.remove("ion-page-invisible"),void 0!==o&&o.classList.remove("ion-page-invisible")},d=function(e){return Object(n["a"])(void 0,void 0,void 0,(function(){var t,o;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return e.leavingEl&&e.animated&&0!==e.duration?e.animationBuilder?[2,e.animationBuilder]:"ios"!==e.mode?[3,2]:[4,a()]:[2,void 0];case 1:return o=n.sent().iosTransitionAnimation,[3,4];case 2:return[4,s()];case 3:o=n.sent().mdTransitionAnimation,n.label=4;case 4:return t=o,[2,t]}}))}))},f=function(e,t){return Object(n["a"])(void 0,void 0,void 0,(function(){var i,r,a;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,b(t,!0)];case 1:n.sent(),n.label=2;case 2:return n.trys.push([2,5,,6]),[4,o.e("chunk-77289590").then(o.bind(null,"e5006"))];case 3:return r=n.sent(),[4,r.create(e,t.baseEl,t)];case 4:return i=n.sent(),[3,6];case 5:return n.sent(),i=e(t.baseEl,t),[3,6];case 6:return g(t.enteringEl,t.leavingEl),[4,m(i,t)];case 7:return a=n.sent(),t.progressCallback&&t.progressCallback(void 0),a&&w(t.enteringEl,t.leavingEl),[2,{hasCompleted:a,animation:i}]}}))}))},v=function(e){return Object(n["a"])(void 0,void 0,void 0,(function(){var t,o;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return t=e.enteringEl,o=e.leavingEl,[4,b(e,!1)];case 1:return n.sent(),g(t,o),w(t,o),[2,{hasCompleted:!0}]}}))}))},b=function(e,t){return Object(n["a"])(void 0,void 0,void 0,(function(){var o,i;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return o=void 0!==e.deepWait?e.deepWait:t,i=o?[j(e.enteringEl),j(e.leavingEl)]:[O(e.enteringEl),O(e.leavingEl)],[4,Promise.all(i)];case 1:return n.sent(),[4,h(e.viewIsReady,e.enteringEl)];case 2:return n.sent(),[2]}}))}))},h=function(e,t){return Object(n["a"])(void 0,void 0,void 0,(function(){return Object(n["c"])(this,(function(o){switch(o.label){case 0:return e?[4,e(t)]:[3,2];case 1:o.sent(),o.label=2;case 2:return[2]}}))}))},m=function(e,t){var o=t.progressCallback,n=new Promise((function(t){e.onFinish((function(o){"number"===typeof o?t(1===o):void 0!==e.hasCompleted&&t(e.hasCompleted)}))}));return o?(e.progressStart(!0),o(e)):e.play(),n},g=function(e,t){y(t,r["c"]),y(e,r["a"])},w=function(e,t){y(e,r["b"]),y(t,r["d"])},y=function(e,t){if(e){var o=new CustomEvent(t,{bubbles:!1,cancelable:!1});e.dispatchEvent(o)}},O=function(e){return e&&e.componentOnReady?e.componentOnReady():Promise.resolve()},j=function(e){return Object(n["a"])(void 0,void 0,void 0,(function(){var t,o;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return t=e,t?null==t.componentOnReady?[3,2]:[4,t.componentOnReady()]:[3,4];case 1:if(o=n.sent(),null!=o)return[2];n.label=2;case 2:return[4,Promise.all(Array.from(t.children).map(j))];case 3:n.sent(),n.label=4;case 4:return[2]}}))}))},x=function(e,t){t?(e.setAttribute("aria-hidden","true"),e.classList.add("ion-page-hidden")):(e.hidden=!1,e.removeAttribute("aria-hidden"),e.classList.remove("ion-page-hidden"))},E=function(e,t,o){void 0!==e&&(e.style.zIndex="back"===o?"99":"101"),void 0!==t&&(t.style.zIndex="100")},k=function(e){if(e.classList.contains("ion-page"))return e;var t=e.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs");return t||e}}}]);
//# sourceMappingURL=chunk-1d9e597b.d6b00709.js.map
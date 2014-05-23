/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

/**
 * mlpushmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
( function( window ) {

    'use strict';

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    // taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
    function hasParent( e, id ) {
        if (!e) return false;
        var el = e.target||e.srcElement||e||false;
        while (el && el.id != id) {
            el = el.parentNode||false;
        }
        return (el!==false);
    }

    // returns the depth of the element "e" relative to element with id=id
    // for this calculation only parents with classname = waypoint are considered
    function getLevelDepth( e, id, waypoint, cnt ) {
        cnt = cnt || 0;
        if ( e.id.indexOf( id ) >= 0 ) return cnt;
        if( classie.has( e, waypoint ) ) {
            ++cnt;
        }
        return e.parentNode && getLevelDepth( e.parentNode, id, waypoint, cnt );
    }

    // http://coveroverflow.com/a/11381730/989439
    function mobilecheck() {
        var check = false;
        (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    // returns the closest element to 'e' that has class "classname"
    function closest( e, classname ) {
        if( classie.has( e, classname ) ) {
            return e;
        }
        return e.parentNode && closest( e.parentNode, classname );
    }

    function mlPushMenu( el, trigger, options ) {
        this.el = el;
        this.trigger = trigger;
        this.options = extend( this.defaults, options );
        // support 3d transforms
        this._init();
    }

    mlPushMenu.prototype = {
        defaults : {
            // overlap: there will be a gap between open levels
            // cover: the open levels will be on top of any previous open level
            type : 'overlap', // overlap || cover
            // space between each overlaped level
            levelSpacing : 40,
            // classname for the element (if any) that when clicked closes the current level
            backClass : 'mp-back'
        },
        _init : function() {
            // if menu is open or not
            this.open = false;
            // level depth
            this.level = 0;
            // the moving wrapper
            this.wrapper = document.getElementById( 'mp-pusher' );
            // the mp-level elements
            this.levels = Array.prototype.slice.call( this.el.querySelectorAll( 'div.mp-level' ) );
            // save the depth of each of these mp-level elements
            var self = this;
            this.levels.forEach( function( el, i ) { el.setAttribute( 'data-level', getLevelDepth( el, self.el.id, 'mp-level' ) ); } );
            // the menu items
            this.menuItems = Array.prototype.slice.call( this.el.querySelectorAll( 'li' ) );
            // if type == "cover" these will serve as hooks to move back to the previous level
            this.levelBack = Array.prototype.slice.call( this.el.querySelectorAll( '.' + this.options.backClass ) );
            // event type (if mobile use touch events)
            this.eventtype = mobilecheck() ? 'touchstart' : 'click';
            // add the class mp-overlap or mp-cover to the main element depending on options.type
            classie.add( this.el, 'mp-' + this.options.type );
            // initialize / bind the necessary events
            this._initEvents();
        },
        _initEvents : function() {
            var self = this;

            // the menu should close if clicking somewhere on the body
            var bodyClickFn = function( el ) {
                self._resetMenu();
                el.removeEventListener( self.eventtype, bodyClickFn );
            };
            // open (or close) the menu
            this.trigger.addEventListener( this.eventtype, function( ev ) {
                ev.stopPropagation();
                ev.preventDefault();
                if( self.open ) {
                    self._resetMenu();
                }
                else {
                    self._openMenu();
                    // the menu should close if clicking somewhere on the body (excluding clicks on the menu)
                    document.addEventListener( self.eventtype, function( ev ) {
                        if( self.open && !hasParent( ev.target, self.el.id ) ) {
                            bodyClickFn( this );
                        }
                    } );
                }
            } );

            // opening a sub level menu
            this.menuItems.forEach( function( el, i ) {
                // check if it has a sub level
                var subLevel = el.querySelector( 'div.mp-level' );
                if( subLevel ) {
                    el.querySelector( 'a' ).addEventListener( self.eventtype, function( ev ) {
                        ev.preventDefault();
                        var level = closest( el, 'mp-level' ).getAttribute( 'data-level' );
                        if( self.level <= level ) {
                            ev.stopPropagation();
                            classie.add( closest( el, 'mp-level' ), 'mp-level-overlay' );
                            self._openMenu( subLevel );
                        }
                    } );
                }
            } );

            // closing the sub levels :
            // by clicking on the visible part of the level element
            this.levels.forEach( function( el, i ) {
                el.addEventListener( self.eventtype, function( ev ) {
                    ev.stopPropagation();
                    var level = el.getAttribute( 'data-level' );
                    if( self.level > level ) {
                        self.level = level;
                        self._closeMenu();
                    }
                } );
            } );

            // by clicking on a specific element
            this.levelBack.forEach( function( el, i ) {
                el.addEventListener( self.eventtype, function( ev ) {
                    ev.preventDefault();
                    var level = closest( el, 'mp-level' ).getAttribute( 'data-level' );
                    if( self.level <= level ) {
                        ev.stopPropagation();
                        self.level = closest( el, 'mp-level' ).getAttribute( 'data-level' ) - 1;
                        self.level === 0 ? self._resetMenu() : self._closeMenu();
                    }
                } );
            } );
        },
        _openMenu : function( subLevel ) {
            // increment level depth
            ++this.level;

            // move the main wrapper
            var levelFactor = ( this.level - 1 ) * this.options.levelSpacing,
                translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + levelFactor : this.el.offsetWidth;

            this._setTransform( 'translate3d(' + translateVal + 'px,0,0)' );

            if( subLevel ) {
                // reset transform for sublevel
                this._setTransform( '', subLevel );
                // need to reset the translate value for the level menus that have the same level depth and are not open
                for( var i = 0, len = this.levels.length; i < len; ++i ) {
                    var levelEl = this.levels[i];
                    if( levelEl != subLevel && !classie.has( levelEl, 'mp-level-open' ) ) {
                        this._setTransform( 'translate3d(-100%,0,0) translate3d(' + -1*levelFactor + 'px,0,0)', levelEl );
                    }
                }
            }
            // add class mp-pushed to main wrapper if opening the first time
            if( this.level === 1 ) {
                classie.add( this.wrapper, 'mp-pushed' );
                this.open = true;
            }
            // add class mp-level-open to the opening level element
            classie.add( subLevel || this.levels[0], 'mp-level-open' );
        },
        // close the menu
        _resetMenu : function() {
            this._setTransform('translate3d(0,0,0)');
            this.level = 0;
            // remove class mp-pushed from main wrapper
            classie.remove( this.wrapper, 'mp-pushed' );
            this._toggleLevels();
            this.open = false;
        },
        // close sub menus
        _closeMenu : function() {
            var translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + ( this.level - 1 ) * this.options.levelSpacing : this.el.offsetWidth;
            this._setTransform( 'translate3d(' + translateVal + 'px,0,0)' );
            this._toggleLevels();
        },
        // translate the el
        _setTransform : function( val, el ) {
            el = el || this.wrapper;
            el.style.WebkitTransform = val;
            el.style.MozTransform = val;
            el.style.transform = val;
        },
        // removes classes mp-level-open from closing levels
        _toggleLevels : function() {
            for( var i = 0, len = this.levels.length; i < len; ++i ) {
                var levelEl = this.levels[i];
                if( levelEl.getAttribute( 'data-level' ) >= this.level + 1 ) {
                    classie.remove( levelEl, 'mp-level-open' );
                    classie.remove( levelEl, 'mp-level-overlay' );
                }
                else if( Number( levelEl.getAttribute( 'data-level' ) ) == this.level ) {
                    classie.remove( levelEl, 'mp-level-overlay' );
                }
            }
        }
    }

    // add to global namespace
    window.mlPushMenu = mlPushMenu;

} )( window );

(function($, window, document, undefined) {
    $.fn.quicksearch = function (target, opt) {

        var timeout, cache, rowcache, jq_results, val = '', e = this, options = $.extend({
            delay: 100,
            selector: null,
            stripeRows: null,
            loader: null,
            noResults: '',
            matchedResultsCount: 0,
            bind: 'keyup',
            onBefore: function () {
                return;
            },
            onAfter: function () {
                return;
            },
            show: function () {
                this.style.display = "";
            },
            hide: function () {
                this.style.display = "none";
            },
            prepareQuery: function (val) {
                return val.toLowerCase().split(' ');
            },
            testQuery: function (query, txt, _row) {
                for (var i = 0; i < query.length; i += 1) {
                    if (txt.indexOf(query[i]) === -1) {
                        return false;
                    }
                }
                return true;
            }
        }, opt);

        this.go = function () {

            var i = 0,
                numMatchedRows = 0,
                noresults = true,
                query = options.prepareQuery(val),
                val_empty = (val.replace(' ', '').length === 0);

            for (var i = 0, len = rowcache.length; i < len; i++) {
                if (val_empty || options.testQuery(query, cache[i], rowcache[i])) {
                    options.show.apply(rowcache[i]);
                    noresults = false;
                    numMatchedRows++;
                } else {
                    options.hide.apply(rowcache[i]);
                }
            }

            if (noresults) {
                this.results(false);
            } else {
                this.results(true);
                this.stripe();
            }

            this.matchedResultsCount = numMatchedRows;
            this.loader(false);
            options.onAfter();

            return this;
        };

        /*
         * External API so that users can perform search programatically.
         * */
        this.search = function (submittedVal) {
            val = submittedVal;
            e.trigger();
        };

        /*
         * External API to get the number of matched results as seen in
         * https://github.com/ruiz107/quicksearch/commit/f78dc440b42d95ce9caed1d087174dd4359982d6
         * */
        this.currentMatchedResults = function() {
            return this.matchedResultsCount;
        };

        this.stripe = function () {

            if (typeof options.stripeRows === "object" && options.stripeRows !== null)
            {
                var joined = options.stripeRows.join(' ');
                var stripeRows_length = options.stripeRows.length;

                jq_results.not(':hidden').each(function (i) {
                    $(this).removeClass(joined).addClass(options.stripeRows[i % stripeRows_length]);
                });
            }

            return this;
        };

        this.strip_html = function (input) {
            var output = input.replace(new RegExp('<[^<]+\>', 'g'), "");
            output = $.trim(output.toLowerCase());
            return output;
        };

        this.results = function (bool) {
            if (typeof options.noResults === "string" && options.noResults !== "") {
                if (bool) {
                    $(options.noResults).hide();
                } else {
                    $(options.noResults).show();
                }
            }
            return this;
        };

        this.loader = function (bool) {
            if (typeof options.loader === "string" && options.loader !== "") {
                (bool) ? $(options.loader).show() : $(options.loader).hide();
            }
            return this;
        };

        this.cache = function () {

            jq_results = $(target);

            if (typeof options.noResults === "string" && options.noResults !== "") {
                jq_results = jq_results.not(options.noResults);
            }

            var t = (typeof options.selector === "string") ? jq_results.find(options.selector) : $(target).not(options.noResults);
            cache = t.map(function () {
                return e.strip_html(this.innerHTML);
            });

            rowcache = jq_results.map(function () {
                return this;
            });

            /*
             * Modified fix for sync-ing "val".
             * Original fix https://github.com/michaellwest/quicksearch/commit/4ace4008d079298a01f97f885ba8fa956a9703d1
             * */
            val = val || this.val() || "";

            return this.go();
        };

        this.trigger = function () {
            this.loader(true);
            options.onBefore();

            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                e.go();
            }, options.delay);

            return this;
        };

        this.cache();
        this.results(true);
        this.stripe();
        this.loader(false);

        return this.each(function () {

            /*
             * Changed from .bind to .on.
             * */
            $(this).on(options.bind, function () {

                val = $(this).val();
                e.trigger();
            });
        });

    };

}(jQuery, this, document));

// Generated by CoffeeScript 1.6.2
/*
 jQuery Waypoints - v2.0.4
 Copyright (c) 2011-2014 Caleb Troughton
 Dual licensed under the MIT license and GPL license.
 https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);

/*

 /*! NProgress (c) 2013, Rico Sta. Cruz
 *  http://ricostacruz.com/nprogress */
;(function(a){if(typeof module==="function"){module.exports=a(this.jQuery||require("jquery"))}else{this.NProgress=a(this.jQuery)}})(function(e){var a={};a.version="0.1.2";var b=a.settings={minimum:0.08,easing:"ease",positionUsing:"",speed:200,trickle:true,trickleRate:0.02,trickleSpeed:800,showSpinner:true,template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};a.configure=function(g){e.extend(b,g);return this};a.status=null;a.set=function(l){var h=a.isStarted();l=f(l,b.minimum,1);a.status=(l===1?null:l);var g=a.render(!h),j=g.find('[role="bar"]'),i=b.speed,k=b.easing;g[0].offsetWidth;g.queue(function(m){if(b.positionUsing===""){b.positionUsing=a.getPositioningCSS()}j.css(c(l,i,k));if(l===1){g.css({transition:"none",opacity:1});g[0].offsetWidth;setTimeout(function(){g.css({transition:"all "+i+"ms linear",opacity:0});setTimeout(function(){a.remove();m()},i)},i)}else{setTimeout(m,i)}});return this};a.isStarted=function(){return typeof a.status==="number"};a.start=function(){if(!a.status){a.set(0)}var g=function(){setTimeout(function(){if(!a.status){return}a.trickle();g()},b.trickleSpeed)};if(b.trickle){g()}return this};a.done=function(g){if(!g&&!a.status){return this}return a.inc(0.3+0.5*Math.random()).set(1)};a.inc=function(g){var h=a.status;if(!h){return a.start()}else{if(typeof g!=="number"){g=(1-h)*f(Math.random()*h,0.1,0.95)}h=f(h+g,0,0.994);return a.set(h)}};a.trickle=function(){return a.inc(Math.random()*b.trickleRate)};a.render=function(g){if(a.isRendered()){return e("#nprogress")}e("html").addClass("nprogress-busy");var i=e("<div id='nprogress'>").html(b.template);var h=g?"-100":d(a.status||0);i.find('[role="bar"]').css({transition:"all 0 linear",transform:"translate3d("+h+"%,0,0)"});if(!b.showSpinner){i.find('[role="spinner"]').remove()}i.appendTo(document.body);return i};a.remove=function(){e("html").removeClass("nprogress-busy");e("#nprogress").remove()};a.isRendered=function(){return(e("#nprogress").length>0)};a.getPositioningCSS=function(){var g=document.body.style;var h=("WebkitTransform" in g)?"Webkit":("MozTransform" in g)?"Moz":("msTransform" in g)?"ms":("OTransform" in g)?"O":"";if(h+"Perspective" in g){return"translate3d"}else{if(h+"Transform" in g){return"translate"}else{return"margin"}}};function f(i,h,g){if(i<h){return h}if(i>g){return g}return i}function d(g){return(-1+g)*100}function c(j,h,i){var g;if(b.positionUsing==="translate3d"){g={transform:"translate3d("+d(j)+"%,0,0)"}}else{if(b.positionUsing==="translate"){g={transform:"translate("+d(j)+"%,0)"}}else{g={"margin-left":d(j)+"%"}}}g.transition="all "+h+"ms "+i;return g}return a});


// jquery.pjax.js 1.7.0
// copyright chris wanstrath
// https://github.com/defunkt/jquery-pjax

!function(a){function b(b,d,e){var f=this;return this.on("click.pjax",b,function(b){var g=a.extend({},p(d,e));g.container||(g.container=a(this).attr("data-pjax")||f),c(b,g)})}function c(b,c,d){d=p(c,d);var f=b.currentTarget;if("A"!==f.tagName.toUpperCase())throw"$.fn.pjax or $.pjax.click requires an anchor element";if(!(b.which>1||b.metaKey||b.ctrlKey||b.shiftKey||b.altKey||location.protocol!==f.protocol||location.hostname!==f.hostname||f.hash&&f.href.replace(f.hash,"")===location.href.replace(location.hash,"")||f.href===location.href+"#")){var g={url:f.href,container:a(f).attr("data-pjax"),target:f},h=a.extend({},g,d),i=a.Event("pjax:click");a(f).trigger(i,[h]),i.isDefaultPrevented()||(e(h),b.preventDefault(),a(f).trigger("pjax:clicked",[h]))}}function d(b,c,d){d=p(c,d);var f=b.currentTarget;if("FORM"!==f.tagName.toUpperCase())throw"$.pjax.submit requires a form element";var g={type:f.method.toUpperCase(),url:f.action,data:a(f).serializeArray(),container:a(f).attr("data-pjax"),target:f};e(a.extend({},g,d)),b.preventDefault()}function e(b){function h(b,d){var e=a.Event(b,{relatedTarget:c});return f.trigger(e,d),!e.isDefaultPrevented()}b=a.extend(!0,{},a.ajaxSettings,e.defaults,b),a.isFunction(b.url)&&(b.url=b.url());var c=b.target,d=o(b.url).hash,f=b.context=q(b.container);b.data||(b.data={}),b.data._pjax=f.selector;var i;b.beforeSend=function(a,c){return"GET"!==c.type&&(c.timeout=0),a.setRequestHeader("X-PJAX","true"),a.setRequestHeader("X-PJAX-Container",f.selector),h("pjax:beforeSend",[a,c])?(c.timeout>0&&(i=setTimeout(function(){h("pjax:timeout",[a,b])&&a.abort("timeout")},c.timeout),c.timeout=0),b.requestUrl=o(c.url).href,void 0):!1},b.complete=function(a,c){i&&clearTimeout(i),h("pjax:complete",[a,c,b]),h("pjax:end",[a,b])},b.error=function(a,c,d){var e=t("",a,b),f=h("pjax:error",[a,c,d,b]);"GET"==b.type&&"abort"!==c&&f&&g(e.url)},b.success=function(c,i,j){var k="function"==typeof a.pjax.defaults.version?a.pjax.defaults.version():a.pjax.defaults.version,l=j.getResponseHeader("X-PJAX-Version"),n=t(c,j,b);if(k&&l&&k!==l)return g(n.url),void 0;if(!n.contents)return g(n.url),void 0;e.state={id:b.id||m(),url:n.url,title:n.title,container:f.selector,fragment:b.fragment,timeout:b.timeout},(b.push||b.replace)&&window.history.replaceState(e.state,n.title,n.url),document.activeElement.blur(),n.title&&(document.title=n.title),f.html(n.contents);var p=f.find("input[autofocus], textarea[autofocus]").last()[0];if(p&&document.activeElement!==p&&p.focus(),u(n.scripts),"number"==typeof b.scrollTo&&a(window).scrollTop(b.scrollTo),""!==d){var q=o(n.url);q.hash=d,e.state.url=q.href,window.history.replaceState(e.state,n.title,q.href);var r=a(q.hash);r.length&&a(window).scrollTop(r.offset().top)}h("pjax:success",[c,i,j,b])},e.state||(e.state={id:m(),url:window.location.href,title:document.title,container:f.selector,fragment:b.fragment,timeout:b.timeout},window.history.replaceState(e.state,document.title));var j=e.xhr;j&&j.readyState<4&&(j.onreadystatechange=a.noop,j.abort()),e.options=b;var j=e.xhr=a.ajax(b);return j.readyState>0&&(b.push&&!b.replace&&(y(e.state.id,f.clone().contents()),window.history.pushState(null,"",n(b.requestUrl))),h("pjax:start",[j,b]),h("pjax:send",[j,b])),e.xhr}function f(b,c){var d={url:window.location.href,push:!1,replace:!0,scrollTo:!1};return e(a.extend(d,p(b,c)))}function g(a){window.history.replaceState(null,"","#"),window.location.replace(a)}function k(b){var c=b.state;if(c&&c.container){if(h&&i==c.url)return;if(e.state.id===c.id)return;var d=a(c.container);if(d.length){var f,j=v[c.id];e.state&&(f=e.state.id<c.id?"forward":"back",z(f,e.state.id,d.clone().contents()));var k=a.Event("pjax:popstate",{state:c,direction:f});d.trigger(k);var l={id:c.id,url:c.url,container:d,push:!1,fragment:c.fragment,timeout:c.timeout,scrollTo:!1};j?(d.trigger("pjax:start",[null,l]),c.title&&(document.title=c.title),d.html(j),e.state=c,d.trigger("pjax:end",[null,l])):e(l),d[0].offsetHeight}else g(location.href)}h=!1}function l(b){var c=a.isFunction(b.url)?b.url():b.url,d=b.type?b.type.toUpperCase():"GET",e=a("<form>",{method:"GET"===d?"GET":"POST",action:c,style:"display:none"});"GET"!==d&&"POST"!==d&&e.append(a("<input>",{type:"hidden",name:"_method",value:d.toLowerCase()}));var f=b.data;if("string"==typeof f)a.each(f.split("&"),function(b,c){var d=c.split("=");e.append(a("<input>",{type:"hidden",name:d[0],value:d[1]}))});else if("object"==typeof f)for(key in f)e.append(a("<input>",{type:"hidden",name:key,value:f[key]}));a(document.body).append(e),e.submit()}function m(){return(new Date).getTime()}function n(a){return a.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function o(a){var b=document.createElement("a");return b.href=a,b}function p(b,c){return b&&c?c.container=b:c=a.isPlainObject(b)?b:{container:b},c.container&&(c.container=q(c.container)),c}function q(b){if(b=a(b),b.length){if(""!==b.selector&&b.context===document)return b;if(b.attr("id"))return a("#"+b.attr("id"));throw"cant get selector for pjax container!"}throw"no pjax container for "+b.selector}function r(a,b){return a.filter(b).add(a.find(b))}function s(b){return a.parseHTML(b,document,!0)}function t(b,c,d){var e={};if(e.url=n(c.getResponseHeader("X-PJAX-URL")||d.requestUrl),/<html/i.test(b))var f=a(s(b.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),g=a(s(b.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));else var f=g=a(s(b));if(0===g.length)return e;if(e.title=r(f,"title").last().text(),d.fragment){if("body"===d.fragment)var h=g;else var h=r(g,d.fragment).first();h.length&&(e.contents=h.contents(),e.title||(e.title=h.attr("title")||h.data("title")))}else/<html/i.test(b)||(e.contents=g);return e.contents&&(e.contents=e.contents.not(function(){return a(this).is("title")}),e.contents.find("title").remove(),e.scripts=r(e.contents,"script[src]").remove(),e.contents=e.contents.not(e.scripts)),e.title&&(e.title=a.trim(e.title)),e}function u(b){if(b){var c=a("script[src]");b.each(function(){var b=this.src,d=c.filter(function(){return this.src===b});if(!d.length){var e=document.createElement("script");e.type=a(this).attr("type"),e.src=a(this).attr("src"),document.head.appendChild(e)}})}}function y(a,b){for(v[a]=b,x.push(a);w.length;)delete v[w.shift()];for(;x.length>e.defaults.maxCacheLength;)delete v[x.shift()]}function z(a,b,c){var d,e;v[b]=c,"forward"===a?(d=x,e=w):(d=w,e=x),d.push(b),(b=e.pop())&&delete v[b]}function A(){return a("meta").filter(function(){var b=a(this).attr("http-equiv");return b&&"X-PJAX-VERSION"===b.toUpperCase()}).attr("content")}function B(){a.fn.pjax=b,a.pjax=e,a.pjax.enable=a.noop,a.pjax.disable=C,a.pjax.click=c,a.pjax.submit=d,a.pjax.reload=f,a.pjax.defaults={timeout:650,push:!0,replace:!1,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:A},a(window).on("popstate.pjax",k)}function C(){a.fn.pjax=function(){return this},a.pjax=l,a.pjax.enable=B,a.pjax.disable=a.noop,a.pjax.click=a.noop,a.pjax.submit=a.noop,a.pjax.reload=function(){window.location.reload()},a(window).off("popstate.pjax",k)}var h=!0,i=window.location.href,j=window.history.state;j&&j.container&&(e.state=j),"state"in window.history&&(h=!1);var v={},w=[],x=[];a.inArray("state",a.event.props)<0&&a.event.props.push("state"),a.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),a.support.pjax?B():C()}(jQuery);

/**
 * Bootstrap.js by @fat & @mdo
 * plugins: bootstrap-transition.js, bootstrap-tooltip.js, bootstrap-popover.js
 * Copyright 2013 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */
!function(a){a(function(){a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f,g,h,i;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,g=this.options.trigger.split(" ");for(i=g.length;i--;)h=g[i],h=="click"?this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this)):h!="manual"&&(e=h=="hover"?"mouseenter":"focus",f=h=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,a.proxy(this.leave,this)));this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a.fn[this.type].defaults,d={},e;this._options&&a.each(this._options,function(a,b){c[a]!=b&&(d[a]=b)},this),e=a(b.currentTarget)[this.type](d).data(this.type);if(!e.options.delay||!e.options.delay.show)return e.show();clearTimeout(this.timeout),e.hoverState="in",this.timeout=setTimeout(function(){e.hoverState=="in"&&e.show()},e.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var b,c,d,e,f,g,h=a.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(h);if(h.isDefaultPrevented())return;b=this.tip(),this.setContent(),this.options.animation&&b.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,b[0],this.$element[0]):this.options.placement,b.detach().css({top:0,left:0,display:"block"}),this.options.container?b.appendTo(this.options.container):b.insertAfter(this.$element),c=this.getPosition(),d=b[0].offsetWidth,e=b[0].offsetHeight;switch(f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}this.applyPlacement(g,f),this.$element.trigger("shown")}},applyPlacement:function(a,b){var c=this.tip(),d=c[0].offsetWidth,e=c[0].offsetHeight,f,g,h,i;c.offset(a).addClass(b).addClass("in"),f=c[0].offsetWidth,g=c[0].offsetHeight,b=="top"&&g!=e&&(a.top=a.top+e-g,i=!0),b=="bottom"||b=="top"?(h=0,a.left<0&&(h=a.left*-2,a.left=0,c.offset(a),f=c[0].offsetWidth,g=c[0].offsetHeight),this.replaceArrow(h-d+f,f,"left")):this.replaceArrow(g-e,g,"top"),i&&c.offset(a)},replaceArrow:function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function e(){var b=setTimeout(function(){c.off(a.support.transition.end).detach()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.detach()})}var b=this,c=this.tip(),d=a.Event("hide");this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?e():c.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(b){var c=b?a(b.currentTarget)[this.type](this._options).data(this.type):this;c.tip().hasClass("in")?c.hide():c.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),!function(a){var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=(typeof c.content=="function"?c.content.call(b[0]):c.content)||b.attr("data-content"),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery)


// Fluidbox
// Description: Replicating the seamless lightbox transition effect seen on Medium.com, with some improvements
// Version: 1.3.1a
// Author: Terry Mun
// Author URI: http://terrymun.com

// --------------------------------------------------------
//  Dependency: Paul Irish's jQuery debounced resize event
// --------------------------------------------------------
!function(a,b){var c=function(a,b,c){var d;return function(){function g(){c||a.apply(e,f),d=null}var e=this,f=arguments;d?clearTimeout(d):c&&a.apply(e,f),d=setTimeout(g,b||100)}};jQuery.fn[b]=function(a){return a?this.bind("resize",c(a)):this.trigger(b)}}(jQuery,"smartresize");

// -----------------------------
//  Fluidbox plugin starts here
// -----------------------------
!function(a){a.fn.fluidbox=function(b){var c=a.extend(!0,{viewportFill:.95,overlayColor:"rgba(255,255,255,.85)",debounceResize:!0,stackIndex:1e3,stackIndexDelta:10,closeTrigger:[{selector:".fluidbox-overlay",event:"click"},{selector:"document",event:"keyup",keyCode:27}]},b);c.stackIndex<c.stackIndexDelta&&(c.stackIndexDelta=c.stackIndex),$fbOverlay=a("<div />",{"class":"fluidbox-overlay",css:{"background-color":c.overlayColor,"z-index":c.stackIndex}});var f,d=this,e=a(window),g=function(){a(".fluidbox-opened").trigger("click")},h=function(a){var b=a.find("img"),c=a.find(".fluidbox-ghost"),d=e.scrollTop()-b.offset().top+.5*b.data("imgHeight")*(b.data("imgScale")-1)+.5*(e.height()-b.data("imgHeight")*b.data("imgScale")),f=.5*b.data("imgWidth")*(b.data("imgScale")-1)+.5*(e.width()-b.data("imgWidth")*b.data("imgScale"))-b.offset().left,g=b.data("imgScale");c.css({transform:"translate("+parseInt(10*f)/10+"px,"+parseInt(10*d)/10+"px) scale("+parseInt(1e3*g)/1e3+")"})},i=function(){d.each(function(){j(a(this))})},j=function(a){function i(){h.imgWidth=b.width(),h.imgHeight=b.height(),h.imgRatio=b.width()/b.height(),d.css({width:b.width(),height:b.height(),top:b.offset().top-g.offset().top,left:b.offset().left-g.offset().left}),h.imgScale=f>h.imgRatio?e.height()*c.viewportFill/b.height():e.width()*c.viewportFill/b.width()}if(f=e.width()/e.height(),a.hasClass("fluidbox")){var b=a.find("img"),d=a.find(".fluidbox-ghost"),g=a.find(".fluidbox-wrap"),h=b.data();i(),b.load(i)}},k=function(b){if(a(this).hasClass("fluidbox")){var d=a(this),e=a(this).find("img"),f=a(this).find(".fluidbox-ghost"),g=a(this).find(".fluidbox-wrap"),i={};0!==a(this).data("fluidbox-state")&&a(this).data("fluidbox-state")?(d.data("fluidbox-state",0).removeClass("fluidbox-opened").addClass("fluidbox-closed"),i.open&&window.clearTimeout(i.open),i.close=window.setTimeout(function(){a(".fluidbox-overlay").remove(),g.css({"z-index":c.stackIndex-c.stackIndexDelta})},10),a(".fluidbox-overlay").css({opacity:0}),f.css({transform:"translate(0,0) scale(1)"}).one("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd transitionEnd",function(){e.css({opacity:1}),i.hideGhost=window.setTimeout(function(){f.css({opacity:0})},100)})):a("<img />",{src:e.attr("src")}).load(function(){d.append($fbOverlay).data("fluidbox-state",1).removeClass("fluidbox-closed").addClass("fluidbox-opened"),i.close&&window.clearTimeout(i.close),i.hideGhost&&window.clearTimeout(i.hideGhost),i.open=window.setTimeout(function(){a(".fluidbox-overlay").css({opacity:1})},10),g.css({"z-index":c.stackIndex+c.stackIndexDelta}),f.off("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd transitionEnd").css({"background-image":"url("+e.attr("src")+")",opacity:1}),e.css({opacity:0}),a("<img />",{src:d.attr("href")}).load(function(){f.css({"background-image":"url("+d.attr("href")+")"})}),h(d)}),b.preventDefault()}};c.closeTrigger&&a.each(c.closeTrigger,function(b){var d=c.closeTrigger[b];"window"!=d.selector?"document"==d.selector?d.keyCode?a(document).on(d.event,function(a){a.keyCode==d.keyCode&&g()}):a(document).on(d.event,g):a(document).on(d.event,c.closeTrigger[b].selector,g):e.on(d.event,g)}),d.each(function(){if(a(this).is("a")&&1===a(this).children().length&&a(this).children().is("img")){var d=a("<div />",{"class":"fluidbox-wrap",css:{"z-index":c.stackIndex-c.stackIndexDelta}}),e=a(this);e.addClass("fluidbox").wrapInner(d).find("img").css({opacity:1}).after('<div class="fluidbox-ghost" />').each(function(){var b=a(this);b.width()>0&&b.height()>0?(j(e),e.click(k)):b.load(function(){j(e),e.click(k)})})}});var l=function(){i();var b=a("a.fluidbox.fluidbox-opened");b.length>0&&h(b)};return c.debounceResize?a(window).smartresize(l):a(window).resize(l),d}}(jQuery);

/*
 Keypress version 2.0.2 (c) 2014 David Mauro.
 Licensed under the Apache License, Version 2.0
 http://www.apache.org/licenses/LICENSE-2.0
 */
(function(){var p,v,x,y,z,q,w,D,E,F,G,r,s,o,k,t,A,H,B={}.hasOwnProperty,i=[].indexOf||function(a){for(var c=0,b=this.length;c<b;c++)if(c in this&&this[c]===a)return c;return-1};q={is_unordered:!1,is_counting:!1,is_exclusive:!1,is_solitary:!1,prevent_default:!1,prevent_repeat:!1};A="meta alt option ctrl shift cmd".split(" ");k="ctrl";p={debug:!1};var C=function(a){var c,b;for(c in a)B.call(a,c)&&(b=a[c],!1!==b&&(this[c]=b));this.keys=this.keys||[];this.count=this.count||0};C.prototype.allows_key_repeat=
    function(){return!this.prevent_repeat&&"function"===typeof this.on_keydown};C.prototype.reset=function(){this.count=0;return this.keyup_fired=null};var g=function(a,c){var b,d;this.should_force_event_defaults=this.should_suppress_event_defaults=!1;this.sequence_delay=800;this._registered_combos=[];this._keys_down=[];this._active_combos=[];this._sequence=[];this._sequence_timer=null;this._prevent_capture=!1;this._defaults=c||{};for(b in q)B.call(q,b)&&(d=q[b],this._defaults[b]=this._defaults[b]||d);
    a=a||document.body;b=function(a,b,c){if(a.addEventListener)return a.addEventListener(b,c);if(a.attachEvent)return a.attachEvent("on"+b,c)};var e=this;b(a,"keydown",function(a){a=a||window.event;e._receive_input(a,!0);return e._bug_catcher(a)});var f=this;b(a,"keyup",function(a){a=a||window.event;return f._receive_input(a,!1)});var h=this;b(window,"blur",function(){var a,b,c,d;d=h._keys_down;b=0;for(c=d.length;b<c;b++)a=d[b],h._key_up(a,{});return h._keys_down=[]})};g.prototype._bug_catcher=function(a){var c;
    if("cmd"===k&&0<=i.call(this._keys_down,"cmd")&&"cmd"!==(c=y(a.keyCode))&&"shift"!==c&&"alt"!==c&&"caps"!==c&&"tab"!==c)return this._receive_input(a,!1)};g.prototype._cmd_bug_check=function(a){return"cmd"===k&&0<=i.call(this._keys_down,"cmd")&&0>i.call(a,"cmd")?!1:!0};g.prototype._prevent_default=function(a,c){if((c||this.should_suppress_event_defaults)&&!this.should_force_event_defaults)if(a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation)return a.stopPropagation()};g.prototype._get_active_combos=
    function(a){var c,b;c=[];b=w(this._keys_down,function(b){return b!==a});b.push(a);this._match_combo_arrays(b,function(a){return function(b){if(a._cmd_bug_check(b.keys))return c.push(b)}}(this));this._fuzzy_match_combo_arrays(b,function(a){return function(b){if(!(0<=i.call(c,b))&&!b.is_solitary&&a._cmd_bug_check(b.keys))return c.push(b)}}(this));return c};g.prototype._get_potential_combos=function(a){var c,b,d,e,f;b=[];f=this._registered_combos;d=0;for(e=f.length;d<e;d++)c=f[d],c.is_sequence||0<=i.call(c.keys,
    a)&&this._cmd_bug_check(c.keys)&&b.push(c);return b};g.prototype._add_to_active_combos=function(a){var c,b,d,e,f,h,j,g,n,l,m;h=!1;f=!0;d=!1;if(0<=i.call(this._active_combos,a))return!0;if(this._active_combos.length){e=j=0;for(l=this._active_combos.length;0<=l?j<l:j>l;e=0<=l?++j:--j)if((c=this._active_combos[e])&&c.is_exclusive&&a.is_exclusive){c=c.keys;if(!h){g=0;for(n=c.length;g<n;g++)if(b=c[g],h=!0,0>i.call(a.keys,b)){h=!1;break}}if(f&&!h){m=a.keys;g=0;for(n=m.length;g<n;g++)if(b=m[g],f=!1,0>i.call(c,
    b)){f=!0;break}}h&&(d?(c=this._active_combos.splice(e,1)[0],null!=c&&c.reset()):(c=this._active_combos.splice(e,1,a)[0],null!=c&&c.reset(),d=!0),f=!1)}}f&&this._active_combos.unshift(a);return h||f};g.prototype._remove_from_active_combos=function(a){var c,b,d,e;b=d=0;for(e=this._active_combos.length;0<=e?d<e:d>e;b=0<=e?++d:--d)if(c=this._active_combos[b],c===a){a=this._active_combos.splice(b,1)[0];a.reset();break}};g.prototype._get_possible_sequences=function(){var a,c,b,d,e,f,h,j,g,n,l,m;d=[];n=
    this._registered_combos;f=0;for(g=n.length;f<g;f++){a=n[f];c=h=1;for(l=this._sequence.length;1<=l?h<=l:h>=l;c=1<=l?++h:--h)if(e=this._sequence.slice(-c),a.is_sequence){if(0>i.call(a.keys,"shift")&&(e=w(e,function(a){return"shift"!==a}),!e.length))continue;c=j=0;for(m=e.length;0<=m?j<m:j>m;c=0<=m?++j:--j)if(a.keys[c]===e[c])b=!0;else{b=!1;break}b&&d.push(a)}}return d};g.prototype._add_key_to_sequence=function(a,c){var b,d,e,f;this._sequence.push(a);d=this._get_possible_sequences();if(d.length){e=0;
    for(f=d.length;e<f;e++)b=d[e],this._prevent_default(c,b.prevent_default);this._sequence_timer&&clearTimeout(this._sequence_timer);-1<this.sequence_delay&&(this._sequence_timer=setTimeout(function(){return this._sequence=[]},this.sequence_delay))}else this._sequence=[]};g.prototype._get_sequence=function(a){var c,b,d,e,f,h,g,u,n,l,m,k;l=this._registered_combos;h=0;for(n=l.length;h<n;h++)if(c=l[h],c.is_sequence){b=g=1;for(m=this._sequence.length;1<=m?g<=m:g>=m;b=1<=m?++g:--g)if(f=w(this._sequence,function(a){return 0<=
    i.call(c.keys,"shift")?!0:"shift"!==a}).slice(-b),c.keys.length===f.length){b=u=0;for(k=f.length;0<=k?u<k:u>k;b=0<=k?++u:--u)if(e=f[b],!(0>i.call(c.keys,"shift")&&"shift"===e)&&!("shift"===a&&0>i.call(c.keys,"shift")))if(c.keys[b]===e)d=!0;else{d=!1;break}}if(d)return c}return!1};g.prototype._receive_input=function(a,c){var b;if(this._prevent_capture)this._keys_down.length&&(this._keys_down=[]);else if(b=y(a.keyCode),(c||this._keys_down.length||!("alt"===b||b===k))&&b)return c?this._key_down(b,a):
    this._key_up(b,a)};g.prototype._fire=function(a,c,b,d){"function"===typeof c["on_"+a]&&this._prevent_default(b,!0!==c["on_"+a].call(c["this"],b,c.count,d));"release"===a&&(c.count=0);if("keyup"===a)return c.keyup_fired=!0};g.prototype._match_combo_arrays=function(a,c){var b,d,e,f;f=this._registered_combos;d=0;for(e=f.length;d<e;d++)b=f[d],(!b.is_unordered&&x(a,b.keys)||b.is_unordered&&v(a,b.keys))&&c(b)};g.prototype._fuzzy_match_combo_arrays=function(a,c){var b,d,e,f;f=this._registered_combos;d=0;
    for(e=f.length;d<e;d++)b=f[d],(!b.is_unordered&&E(b.keys,a)||b.is_unordered&&D(b.keys,a))&&c(b)};g.prototype._keys_remain=function(a){var c,b,d,e;e=a.keys;b=0;for(d=e.length;b<d;b++)if(a=e[b],0<=i.call(this._keys_down,a)){c=!0;break}return c};g.prototype._key_down=function(a,c){var b,d,e,f,h;(b=z(a,c))&&(a=b);this._add_key_to_sequence(a,c);(b=this._get_sequence(a))&&this._fire("keydown",b,c);for(e in t)b=t[e],c[b]&&(e===a||0<=i.call(this._keys_down,e)||this._keys_down.push(e));for(e in t)if(b=t[e],
    e!==a&&0<=i.call(this._keys_down,e)&&!c[b]&&!("cmd"===e&&"cmd"!==k)){b=d=0;for(f=this._keys_down.length;0<=f?d<f:d>f;b=0<=f?++d:--d)this._keys_down[b]===e&&this._keys_down.splice(b,1)}d=this._get_active_combos(a);e=this._get_potential_combos(a);f=0;for(h=d.length;f<h;f++)b=d[f],this._handle_combo_down(b,e,a,c);if(e.length){d=0;for(f=e.length;d<f;d++)b=e[d],this._prevent_default(c,b.prevent_default)}0>i.call(this._keys_down,a)&&this._keys_down.push(a)};g.prototype._handle_combo_down=function(a,c,b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    d){var e,f,h,g,k;if(0>i.call(a.keys,b))return!1;this._prevent_default(d,a&&a.prevent_default);e=!1;if(0<=i.call(this._keys_down,b)&&(e=!0,!a.allows_key_repeat()))return!1;h=this._add_to_active_combos(a,b);b=a.keyup_fired=!1;if(a.is_exclusive){g=0;for(k=c.length;g<k;g++)if(f=c[g],f.is_exclusive&&f.keys.length>a.keys.length){b=!0;break}}if(!b&&(a.is_counting&&"function"===typeof a.on_keydown&&(a.count+=1),h))return this._fire("keydown",a,d,e)};g.prototype._key_up=function(a,c){var b,d,e,f,h,g;b=a;(e=
    z(a,c))&&(a=e);e=s[b];c.shiftKey?e&&0<=i.call(this._keys_down,e)||(a=b):b&&0<=i.call(this._keys_down,b)||(a=e);(f=this._get_sequence(a))&&this._fire("keyup",f,c);if(0>i.call(this._keys_down,a))return!1;f=h=0;for(g=this._keys_down.length;0<=g?h<g:h>g;f=0<=g?++h:--h)if((d=this._keys_down[f])===a||d===e||d===b){this._keys_down.splice(f,1);break}d=this._active_combos.length;e=[];g=this._active_combos;f=0;for(h=g.length;f<h;f++)b=g[f],0<=i.call(b.keys,a)&&e.push(b);f=0;for(h=e.length;f<h;f++)b=e[f],this._handle_combo_up(b,
    c,a);if(1<d){h=this._active_combos;d=0;for(f=h.length;d<f;d++)b=h[d],void 0===b||0<=i.call(e,b)||this._keys_remain(b)||this._remove_from_active_combos(b)}};g.prototype._handle_combo_up=function(a,c,b){var d,e;this._prevent_default(c,a&&a.prevent_default);e=this._keys_remain(a);if(!a.keyup_fired&&(d=this._keys_down.slice(),d.push(b),!a.is_solitary||v(d,a.keys)))this._fire("keyup",a,c),a.is_counting&&("function"===typeof a.on_keyup&&"function"!==typeof a.on_keydown)&&(a.count+=1);e||(this._fire("release",
    a,c),this._remove_from_active_combos(a))};g.prototype.simple_combo=function(a,c){return this.register_combo({keys:a,on_keydown:c})};g.prototype.counting_combo=function(a,c){return this.register_combo({keys:a,is_counting:!0,is_unordered:!1,on_keydown:c})};g.prototype.sequence_combo=function(a,c){return this.register_combo({keys:a,on_keydown:c,is_sequence:!0})};g.prototype.register_combo=function(a){var c,b,d;"string"===typeof a.keys&&(a.keys=a.keys.split(" "));d=this._defaults;for(c in d)B.call(d,
    c)&&(b=d[c],void 0===a[c]&&(a[c]=b));a=new C(a);if(H(a))return this._registered_combos.push(a),a};g.prototype.register_many=function(a){var c,b,d,e;e=[];b=0;for(d=a.length;b<d;b++)c=a[b],e.push(this.register_combo(c));return e};g.prototype.unregister_combo=function(a){var c,b,d,e,f;if(!a)return!1;var g=this;b=function(a){var b,c,d,e;e=[];b=c=0;for(d=g._registered_combos.length;0<=d?c<d:c>d;b=0<=d?++c:--c)if(a===g._registered_combos[b]){g._registered_combos.splice(b,1);break}else e.push(void 0);return e};
    if(a.keys)return b(a);f=this._registered_combos;d=0;for(e=f.length;d<e;d++)c=f[d];"string"===typeof a&&(a=a.split(" "));if(c.is_unordered&&v(a,c.keys)||!c.is_unordered&&x(a,c.keys))return b(c)};g.prototype.unregister_many=function(a){var c,b,d,e;e=[];b=0;for(d=a.length;b<d;b++)c=a[b],e.push(this.unregister_combo(c));return e};g.prototype.get_registered_combos=function(){return this._registered_combos};g.prototype.reset=function(){return this._registered_combos=[]};g.prototype.listen=function(){return this._prevent_capture=
    !1};g.prototype.stop_listening=function(){return this._prevent_capture=!0};g.prototype.get_meta_key=function(){return k};p.Listener=g;y=function(a){return r[a]};w=function(a,c){var b;if(a.filter)return a.filter(c);var d,e,f;f=[];d=0;for(e=a.length;d<e;d++)b=a[d],c(b)&&f.push(b);return f};v=function(a,c){var b,d,e;if(a.length!==c.length)return!1;d=0;for(e=a.length;d<e;d++)if(b=a[d],!(0<=i.call(c,b)))return!1;return!0};x=function(a,c){var b,d,e;if(a.length!==c.length)return!1;b=d=0;for(e=a.length;0<=
    e?d<e:d>e;b=0<=e?++d:--d)if(a[b]!==c[b])return!1;return!0};D=function(a,c){var b,d,e;d=0;for(e=a.length;d<e;d++)if(b=a[d],0>i.call(c,b))return!1;return!0};E=function(a,c){var b,d,e,f;e=d=0;for(f=a.length;e<f;e++)if(b=a[e],b=c.indexOf(b),b>=d)d=b;else return!1;return!0};o=function(){if(p.debug)return console.log.apply(console,arguments)};F=function(a){var c,b,d;c=!1;for(d in r)if(b=r[d],a===b){c=!0;break}if(!c)for(d in s)if(b=s[d],a===b){c=!0;break}return c};H=function(a){var c,b,d,e,f,g,j;f=!0;a.keys.length||
o("You're trying to bind a combo with no keys:",a);b=g=0;for(j=a.keys.length;0<=j?g<j:g>j;b=0<=j?++g:--g)d=a.keys[b],(c=G[d])&&(d=a.keys[b]=c),"meta"===d&&a.keys.splice(b,1,k),"cmd"===d&&o('Warning: use the "meta" key rather than "cmd" for Windows compatibility');j=a.keys;c=0;for(g=j.length;c<g;c++)d=j[c],F(d)||(o('Do not recognize the key "'+d+'"'),f=!1);if(0<=i.call(a.keys,"meta")||0<=i.call(a.keys,"cmd")){c=a.keys.slice();g=0;for(j=A.length;g<j;g++)d=A[g],-1<(b=c.indexOf(d))&&c.splice(b,1);1<c.length&&
(o("META and CMD key combos cannot have more than 1 non-modifier keys",a,c),f=!1)}for(e in a)"undefined"===q[e]&&o("The property "+e+" is not a valid combo property. Your combo has still been registered.");return f};z=function(a,c){var b;if(!c.shiftKey)return!1;b=s[a];return null!=b?b:!1};t={cmd:"metaKey",ctrl:"ctrlKey",shift:"shiftKey",alt:"altKey"};G={escape:"esc",control:"ctrl",command:"cmd","break":"pause",windows:"cmd",option:"alt",caps_lock:"caps",apostrophe:"'",semicolon:";",tilde:"~",accent:"`",
    scroll_lock:"scroll",num_lock:"num"};s={"/":"?",".":">",",":"<","'":'"',";":":","[":"{","]":"}","\\":"|","`":"~","=":"+","-":"_",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(","0":")"};r={"0":"\\",8:"backspace",9:"tab",12:"num",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"print",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
    65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"cmd",92:"cmd",93:"cmd",96:"num_0",97:"num_1",98:"num_2",99:"num_3",100:"num_4",101:"num_5",102:"num_6",103:"num_7",104:"num_8",105:"num_9",106:"num_multiply",107:"num_add",108:"num_enter",109:"num_subtract",110:"num_decimal",111:"num_divide",124:"print",144:"num",145:"scroll",186:";",187:"=",188:",",189:"-",190:".",
    191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"`",224:"cmd",225:"alt",57392:"ctrl",63289:"num"};-1!==navigator.userAgent.indexOf("Mac OS X")&&(k="cmd");-1!==navigator.userAgent.indexOf("Opera")&&(r["17"]="cmd");"function"===typeof define&&define.amd?define([],function(){return p}):window.keypress=p}).call(this);



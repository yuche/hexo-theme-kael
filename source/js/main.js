var hasPushstate = !!(window.history && history.pushState);
// duoshuo load function
var duoshuoName = 'yuche'; // change to your DUOSHUO name
var duoshuoQuery = {short_name: duoshuoName}; // change to your duoshuo name
function toggleDuoshuoComments(container) {
    var el = document.createElement('div');
    el.setAttribute('data-thread-key', postTitle);
    el.setAttribute('data-url', postHref);
    el.setAttribute('data-title', postTitle);
    el.setAttribute('data-author-key', duoshuoName); // change to your duoshuo name
    DUOSHUO.EmbedThread(el);
    jQuery(container).append(el);
}

var smallScreen = window.screen.width < 500;

//    Generate table of contents
var generateTOC = function() {

    $(".post-content").find('h1,h2,h3,h4')
        .each(function (i) {
            var current = $(this);
            current.attr("id", "title" + i);
            $("#toc").append("<li><a id='link" + i + "' href='#title" +
                i + "' title='" + current.text() + "'>" +
                current.text() + "</a></li>");
        });

};

//    Multiple DUOSHUO threads for PJAX START

function  duoshuoInlineComment(){
    $(".post-content").find('p,pre,ol,ul,blockquote,figure')
        .each(function () {
            $(this).attr("class", "disqus");
            $(this).prepend('<span class="ds-thread-count">+</span>');
        });
    $('span.ds-thread-count').each(function(i){
        var self = $(this);
        $(this).attr('id','comment' + i );
        var identifier =  postTitle + $(this).attr('id');
        var jsonURL = 'http://api.duoshuo.com/threads/counts.jsonp?short_name=' +
            duoshuoName + '&threads=' + identifier +
            '&callback=?';
        $.getJSON(jsonURL,function(data) {
            $.each(data.response, function(i, item) {
                if (item.comments !== 0){
                    self.text(item.comments);
                    self.css('opacity','0.4');
                    self.addClass('has-comment');
                }
            });
        });
        $(this).after('<div class="inline-comment"></div>');
    });


    $('.disqus').mouseover(function() {
        $(this).find('span.ds-thread-count').css('opacity','1');
    }).mouseleave(function() {
        var self = $(this);
        self.find('span.ds-thread-count').css('opacity','0.4');
        self.find('span.ds-thread-count').not('.has-comment').css('opacity','0');
    });

    $('span.ds-thread-count').click(function(event){
        var self = $(this);
        if ($('span.ds-thread-count').not(self).hasClass('active')){
            var l = $('span.ds-thread-count').filter('.active');
            hideInlineComment(l, l.next());
        }
        if (!self.hasClass('active')){
            self.addClass('active');
            var inlineComment = $(this).next();
            inlineComment.fadeIn();
            $(".post-content").addClass('right');
            var identifier =  postTitle + $(this).attr('id');
            if (!inlineComment.hasClass('loaded')){
                loadInlineComment(inlineComment,identifier);
            }
        } else {
            hideInlineComment(self,self.next());
        }
        event.stopPropagation();
    });


    // detect a click outside the trigger.

    $('html').click(function() {
        var triggerOpened = $('span.ds-thread-count').filter('.active');
        triggerOpened.removeClass('active');
        if(triggerOpened.next().is(":visible")) {
            triggerOpened.next().fadeOut();
        }
        $(".post-content").filter('.right').removeClass('right');
    });

    $('.inline-comment').click(function(){
        event.stopPropagation();

    })


    var hideInlineComment = function(trigger,comment) {

        trigger.removeClass('active');
        $(".post-content").removeClass('right');
        comment.fadeOut();

    };


    var loadInlineComment = function (container,id){
        $(container).addClass('loaded');
        var el = document.createElement('div');
        el.setAttribute('data-thread-key', id);
        el.setAttribute('data-url', postHref);
        el.setAttribute('data-title', postTitle);
        el.setAttribute('data-author-key', duoshuoName); // change to your duoshuo name
        DUOSHUO.EmbedThread(el);
        $(container).append(el);
    }
}

//    Multiple DUOSHUO threads for PJAX END



//   Scroll spy headline

var scrollSpy = function(){
    for (var i = 1; i < 7; i++) {
        var headI = 'h' + i;
        $('#toc-content').text('Introduction');
        $('.post-content').find(headI).each(function () {
            var self = $(this);
            self.waypoint(function () {
                $('#navbar-toc').show();
                var tocText = self.text();
                $('#toc-content').text(tocText);
            }, {
                context: '.scroller',
                offset: 90
            });
        });
    };
};

//   Easter egg
var kaelEgg = new window.keypress.Listener();
function showEgg(){
    $('.block').remove();
    $('#egg-frame').fadeIn('slow');
    $('#close-button').fadeIn('slow');
    kaelEgg.reset();
}
var kaelEggCombo = kaelEgg.sequence_combo("q w e r", function() {
    lives = 0.8;
    $('.block').show();
    $('.egg').addClass('bounceIn').removeClass('bounceOut');
    $('.egg').append('<iframe id="egg-frame" style="display: none;margin-top:0;" src="http://kael.qiniudn.com/" frameborder="0" width="100%" height="700px" scrolling="no">');
//    iframe onload taken from http://www.nczonline.net/blog/2009/09/15/iframes-onload-and-documentdomain/
    var iframe = document.getElementById('egg-frame');
    if (iframe.attachEvent){
        iframe.attachEvent("onload", function(){
            showEgg();
        });
    } else {
        iframe.onload = function(){
            showEgg();
        };
    }
}, true);

$('#close-button').click(function(){
    $('.egg').removeClass('bounceIn').addClass('bounceOut');
    kaelEgg.register_combo(kaelEggCombo);
    return false;
});

//  Easter egg END

afterPjax();
function afterPjax() {

    postTitle = document.title;
    postHref = window.location.href;

    var ie = navigator.userAgent.match(/windows\snt\s([\d\.]+)/i);
    if (ie !== null && ie[1] < 6) {
        document.getElementsByTagName('html')[0].className += ' windows-xp';
    }

    //    Scroll-To-Top button take effect
    $("#scroll-up").click(function () {
        $(".scroller").animate({ scrollTop: "10" }, "350");
    });




    //  Mutil-push-menu init
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'), {
        type: 'cover'
    });

    $('img').each( function() {
        var $img = $(this),
            href = $img.attr('src');
        $img.wrap('<a data-lightbox="a" href="' + href + '" title="' + $img.attr('alt') +'"' + '></a>');
    });

    $('a[data-lightbox="a"]').fluidbox({
        stackIndex : 1
    });



    $('.share-button').popover({
        placement: 'bottom',
        content: '<a target="_blank" href="http://service.weibo.com/share/share.php?url=' +
            postHref + "&title=" + postTitle +
            '"><i  class=" fa share-icon fa-weibo fa-2x"></i></a>' +
            '<a target="_blank" href="http://widget.renren.com/dialog/share?resourceUrl=' +
            postHref + "&title=" + postTitle +
            '"><i class="fa share-icon fa-renren fa-2x"></i></a>' +
            '<a target="_blank" href="http://twitter.com/share?url=' +
            postHref +
            '"><i class="fa share-icon fa-twitter fa-2x"></i></a>' +
            '<a target="_blank" href="https://plus.google.com/share?url=' +
            postHref + "&title=" + postTitle +
            '"><i class="fa share-icon fa-google-plus fa-2x"></i></a>' +
            '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=' +
            postHref + "&title=" + postTitle +
            '"><i class="fa fa-facebook-square fa-2x"></i></a>',
        html: true
    });

//    Fixed Multi-level-push-menu for PJAX
    $(".mp-pjax a").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var pjaxHref = this.href;
        $('.scroller').trigger('click');
        if ( hasPushstate ) {
            $(".pjax-hidden a").each(function () {
                if (this.href === pjaxHref) {
                    $(this).trigger('click');
                }
            });
        }
    });

    $("a.back-home").click(function (e) {
        e.preventDefault();
        $('.scroller').trigger('click');
        $('#nexus-back').trigger('click');
    });



//  Some JS hacks

    $("a.fa-archive,a.fa-copy,a.fa-tags").click(function () {
        $(".fa-angle-left").css('opacity', '0');
    });
    $(".mp-back").click(function () {
        $(".fa-angle-left").css('opacity','1');
    });
//    Instant search init
    $('input.search-archive').quicksearch('li.search-archive-li');
    $('input.search-category').quicksearch('li.search-category-li');
    $('input.search-tag').quicksearch('li.search-tag-li');

//    Detect URL is Post page or NOT

    isPostPage = false;

    if (location.pathname === "/" || location.pathname.match("/tags/") !== null
        || location.pathname.match("/categories/") !== null ||
        location.pathname.match("/page/") !== null) {
        isPostPage = false;
    } else {
        isPostPage = true;
    }
//    Scroll 500px show Scroll-To-Top button
    $('.scroller').scroll(function () {
        var scroll2top = $('.scroller').scrollTop();
        if (scroll2top > 500) {
            $("#scroll-up").show();
        } else {
            $("#scroll-up").hide();
        }
    });


    $("#scroll-up").hide();


//    If no headline , hide the toc
    if ($('#toc').find('li').length === 0) {
        $('#navbar-toc').hide();
    }
//    Scroll 150px show full header
    if (isPostPage && !smallScreen) {
        generateTOC();
        setTimeout("scrollSpy()",300);
        duoshuoInlineComment();

        $('.scroller').scroll(function () {
            if ((window.screen.width - 700)/2 > $('#trigger').parent().width() + $('#nexus-back').parent().width()){
                if ($('li#navbar-title').width() + $('li#navbar-toc').width() > $('.post').width()) {
                    $('li#navbar-title').hide();
                } else {
                    $('li#navbar-title').show();
                }
            } else {
                $('li#navbar-title').hide();
            }
            var scroll2top = $('.scroller').scrollTop();
            if (scroll2top > 150) {
                $('.nexus').css('width', '100%');
                $('.post-navbar').show(300);
                $('#navbar-title a').show();

            } else {
                $('.post-navbar').hide(300);
                $('.nexus').css('width', 'auto');
            }
        });
    }
//   lazy load DUOSHUO
    var ds_loaded = false;
    if (isPostPage) {
        setTimeout(function(){
            toggleDuoshuoComments('#comment-box');
            ds_loaded = true;
        }, 1000);
    }
//    Smooth Scroll for the TOC in header
    $('#toc a').click(function (e) {
        var headID = $(this).attr('href');
        var headIDpos = $(headID).position().top;
        $('.scroller').animate({ scrollTop: headIDpos + 200 }, 'linear');

        e.preventDefault();
    });

//    Hover TOC navbar to show
    $('#navbar-toc').hover(function () {
        $('#navbar-toc i').removeClass('hover-down').addClass("hover-up");
        $('.hidden-box').slideDown();
    }, function () {
        $('#navbar-toc i').removeClass('hover-up').addClass("hover-down");
        $('.hidden-box').slideUp();
    });




//    Reset Header
    if (isPostPage) {
        var headTitle = $('h1.post-title').text();
        $("#navbar-title a").text(headTitle);
    } else {
        $('.post-navbar').hide(300);
        $('.nexus').css('width', 'auto');
    }

};
//      PJAX init
$(document).pjax('a[data-pjax]', '.container', { fragment: '.container', timeout: 10000 });
$(document).on({
    'pjax:click': function () {
        $('.scroller').removeClass('fadeIn').addClass('fadeOut');
        NProgress.start();
    },
    'pjax:start': function () {
        $('.scroller').css('opacity','0');
    },
    'pjax:end': function () {
        NProgress.done();
        $('.scroller').css('opacity','1').removeClass('fadeOut').addClass('fadeIn');
        afterPjax();
        $('#navbar-toc').hide();
        $('.nexus').css('width', 'auto');
        $('#navbar-title a').hide();
    },
    'pjax:popstate': function () {
        setTimeout("$('#toc').find('li').remove();",100);
        setTimeout("generateTOC()",200);
        setTimeout("$('#comment-box').children().remove();",100);
    },
});






//    Scroll-To-Top button take effect
$("#scroll-up").click(function () {
    $(".scroller").animate({ scrollTop: "10" }, "350");
});
var hasPushstate = !!(window.history && history.pushState);
// duoshuo load function
var duoshuoQuery = {short_name: "yuche"}; // change to your duoshuo name
function toggleDuoshuoComments(container) {
    var el = document.createElement('div');
    el.setAttribute('data-thread-key', postTitle);
    el.setAttribute('data-url', postHref);
    el.setAttribute('data-title', postTitle);
    el.setAttribute('data-author-key', 'yuche'); // change to your duoshuo name
    DUOSHUO.EmbedThread(el);
    jQuery(container).append(el);
}

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



afterPjax();

function afterPjax() {

    postTitle = document.title;
    postHref = window.location.href;


    generateTOC();
    //  Mutil-push-menu init
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'), {
        type: 'cover'
    });

    //    Multiple DUOSHUO threads for PJAX START

    $('img').each( function() {
        var $img = $(this),
            href = $img.attr('src');
        $img.wrap('<a data-lightbox="a" href="' + href + '" title="' + $img.attr('alt') +'"' + '></a>');
    });

    $('a[data-lightbox="a"]').fluidbox({
        stackIndex : 1,
=    });

    $(".post-content").find('p,pre,ol,ul,blockquote,lightbox')
        .each(function () {
            $(this).attr("class", "disqus");
            $(this).prepend('<span class="ds-thread-count">+</span>');
        });
    $('span.ds-thread-count').each(function(i){
        var self = $(this);
        $(this).attr('id','comment' + i );
        var identifier =  postTitle + $(this).attr('id');
        var jsonURL = 'http://api.duoshuo.com/threads/counts.jsonp?short_name=yuche&threads=' + identifier +
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

    $('span.ds-thread-count').click(function(){
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

    });


    // Hide the discussion.


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
        el.setAttribute('data-author-key', 'yuche'); // change to your duoshuo name
        DUOSHUO.EmbedThread(el);
        $(container).append(el);
    }


    //    Multiple DUOSHUO threads for PJAX END



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
    $(".mp-pjax a").click(function () {
        event.preventDefault();
        event.stopPropagation();
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

    $("a.fa-archive,a.fa-copy").click(function () {
        $(".fa-angle-left").css('opacity', '0');
    });
    $(".mp-back").click(function () {
        $(".fa-angle-left").css('opacity','1');
    });
//    Instant search init
    $('input.search-archive').quicksearch('li.search-archive-li');
    $('input.search-category').quicksearch('li.search-category-li');
    $('input.search-tag').quicksearch('li.search-tag-li');

    isPostPage = false;

    if (location.pathname === "/" || location.pathname.match("/tags/") !== null
        || location.pathname.match("/categories/") !== null) {
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
    if (isPostPage) {
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
//   Scroll 150px lazy load DUOSHUO
    var ds_loaded = false;
    if (isPostPage) {
        $('.scroller').scroll(function () {
            var scroll2top = $('.scroller').scrollTop();
            if (scroll2top > 150 && !ds_loaded) {
                toggleDuoshuoComments('#comment-box');
                ds_loaded = true;
            }
        });
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
        /*图标向上旋转*/
        $('#navbar-toc i').removeClass('hover-down').addClass("hover-up");
        /*下拉框出现*/
        $('.hidden-box').slideDown();
    }, function () {
        /*图标向下旋转*/
        $('#navbar-toc i').removeClass('hover-up').addClass("hover-down");
        /*下拉框消失*/
        $('.hidden-box').slideUp();
    });


//    Scroll spy for TOC navbar
    for (var i = 1; i < 7; i++) {
        var headI = 'h' + i;
        $('.post-content').find(headI).each(function () {
            var $this = $(this);
            $this.waypoint(function () {
                $('#navbar-toc').show();
                var tocText = $this.text();
                $('#toc-content').text(tocText);
            }, {
                context: '.scroller',
                offset: 90
            });
        });
    }
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
$.pjax.maxCacheLength = 0;
$(document).pjax('a[data-pjax]', '#pjax', { fragment: '#pjax', timeout: 10000 });
$(document).on({
    'pjax:click': function () {
        $('.scroller').removeClass('fadeIn').addClass('fadeOut');
        NProgress.start();
    },
    'pjax:start': function () {
        $('.scroller').css({'opacity': 0});
    },
    'pjax:end': function () {
        NProgress.done();
        $('.scroller').scrollTop(0);
        $('.scroller').css({'opacity': 1}).removeClass('fadeOut').addClass('fadeIn');
        afterPjax();
        $('#navbar-toc').hide();
        $('.nexus').css('width', 'auto');
        $('#navbar-title a').hide();


    },
    'pjax:popstate': function () {
        setTimeout("$('#toc').find('li').remove();",100);
        setTimeout("generateTOC()",200);
        setTimeout("$('#comment-box').children().remove();",100);

    }
});






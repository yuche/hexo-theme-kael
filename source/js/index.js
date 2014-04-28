//    Scroll-To-Top button take effect
$("#scroll-up").click(function () {
    $(".scroller").animate({ scrollTop: "10" }, "350");
});
// duoshuo load function
var duoshuoQuery = {short_name: "yuche"}; // change to your duoshuo name
function toggleDuoshuoComments(container) {
    var el = document.createElement('div');
    el.setAttribute('data-thread-key', postTitle);
    el.setAttribute('data-url', postHref);
    el.setAttribute('data-title', postTitle);
    el.setAttribute('data-author-key', 'yuche'); // change to your duoshuo name
    DUOSHUO.EmbedThread(el);ƒ
    jQuery(container).append(el);
}

afterPjax();

function afterPjax() {
//    Share button popover
    postTitle = document.title;
    postHref = window.location.href;
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
        pjaxHref = this.href;
        $('.scroller').trigger('click');
        event.preventDefault();
        $(".pjax-hidden a").each(function () {
            if (this.href === pjaxHref) {
                $(this).trigger('click');
            }
        });
    });

    $("a.back-home").click(function () {
        $('.scroller').trigger('click');
        event.preventDefault();
        $('#nexus-back').trigger('click');
    });

    //  Mutil-push-menu init
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'), {
        type: 'cover'
    });

//  Some JS hacks

    $("a.fa-archive,a.fa-copy").click(function () {
        $(".fa-angle-left").css('opacity', '0')
    });
    $(".mp-back").click(function () {
        $(".fa-angle-left").animate({
            opacity: 1
        }, 500);
    });
//    Instant search init
    $('input.search-archive').quicksearch('li.search-archive-li');
    $('input.search-category').quicksearch('li.search-category-li');
    $('input.search-tag').quicksearch('li.search-tag-li');

    isPostPage = false;

    if (location.pathname !== "/") {
        isPostPage = true;
    } else {
        isPostPage = false;
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


//    Generate table of contents
    $(".post-content h1,.post-content h2,.post-content h3").each(function (i) {
        var current = $(this);
        current.attr("id", "title" + i);
        $("#toc").append("<li><a id='link" + i + "' href='#title" +
            i + "' title='" + current.attr("tagName") + "'>" +
            current.html() + "</a></li>");
    });

//    If no headline , hide the toc
    if ($('#toc').find('li').length === 0) {
        $('#navbar-toc').hide();
    }
//    Scroll 150px show full header
    if (isPostPage) {
        $('.scroller').scroll(function () {
            if ($('li#navbar-title').width() + $('li#navbar-toc').width() > $('.post').width()) {
                $('li#navbar-title').hide();
            } else {
                $('li#navbar-title').show();
            }
            var scroll2top = $('.scroller').scrollTop();
            if (scroll2top > 150) {
                $('.nexus').css('width', '100%');
                $('.post-navbar').show(300);
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
    $('#toc a').click(function () {
        var headID = $(this).attr('href');
        var headIDpos = $(headID).position().top;
        $('.scroller').animate({ scrollTop: headIDpos + 30 }, 'linear');

        return false;
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
$(document).pjax('a[data-pjax]', '#pjax', { fragment: '#pjax', timeout: 10000 });
$(document).on({
    'pjax:click': function () {
        $('.scroller').removeClass('fadeIn').addClass('fadeOut');
        NProgress.start();
        $(".scroller").trigger("click");
    },
    'pjax:start': function () {
        $('.scroller').css({'opacity': 0});
    },
    'pjax:end': function () {
        NProgress.done();
        $('.scroller').scrollTop(0);
        $('.scroller').css({'opacity': 1}).removeClass('fadeOut').addClass('fadeIn');
        afterPjax();
    }
});






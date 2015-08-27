fillQuestion(40);



function fillQuestion(num){
    for (var i = 1; i <= num; i++) {
        var $d = $("<a href='#' class='numberItem'>" + i + "</a>");
        $("#strip").append($d);
    }
}

var items = $('.numberItem'),
    selectedIndex = 0,
    scroller = $("#numWrap"),
    scrollerWidth = scroller.width();

selectItem();

items.on('click', function(e) {
    e.preventDefault();
    selectedIndex = items.index($(this));
    selectItem();
});

$('.controls .btn').on('click', function() {
    var button = $(this);
    if (button.hasClass('prev') && selectedIndex > 0) {
        selectedIndex--;
    } else if (button.hasClass('next') && selectedIndex < items.length - 1) {
        selectedIndex++;
    }

   selectItem();
});

function selectItem() {
    var selected = items.eq(selectedIndex);
    items.removeClass('selected');
    selected.addClass('visited selected');
    focus(selected.position().left);
}

function focus(originalLeft) {
    scroll = originalLeft - (scrollerWidth / 2);
    scroller.stop().animate({
        scrollLeft: scroll
    }, 800);
}


var leftArrow=function(){
    console.log("in left")
    var leftPos = $('#numWrap').scrollLeft();
$("#numWrap").animate({scrollLeft: leftPos - 200}, 500);
}

var  rightArrow=function(){
    var leftPos = $('#numWrap').scrollLeft();
$("#numWrap").animate({scrollLeft: leftPos + 200}, 500);
}



$("#lft-arrow").click(_.throttle(leftArrow,800));
$("#rgt-arrow").click(_.throttle(rightArrow,800));






function setProgress(progress)
{
    var progressBarWidth =progress*$(".container").width()/ 100;
    $(".progressbar").width(progressBarWidth).html(progress + "% ");
}

(function ($) {
    $.fn.progressbar = function (options)
    {
        var settings = $.extend({
        width:'300px',
        height:'25px',
        color:'#0ba1b5',
        padding:'0px',
        border:'1px solid #ddd'},options);

        //Set css to container
        $(this).css({
            'width':settings.width,
            'border':settings.border,
            'border-radius':'5px',
            'overflow':'hidden',
            'display':'inline-block',
            'padding': settings.padding,
            'margin':'0px 10px 5px 5px'
            });

        // add progress bar to container
        var progressbar =$("<div></div>");
        progressbar.css({
        'height':settings.height,
        'text-align': 'right',
        'vertical-align':'middle',
        'color': '#fff',
        'width': '0px',
        'border-radius': '3px',
        'background-color': settings.color
        });

        $(this).append(progressbar);

        this.progress = function(value)
        {
            var width = $(this).width() * value/100;
            progressbar.width(width).html(value+"% ");
        }
        return this;
    };

}(jQuery));


var bar1 = $("#progress1").progressbar();





$.ajax({
    url: 'https://www.udacity.com/public-api/v0/courses',
    //url:'https://api.stackexchange.com/2.1/info?site=stackoverflow',
    xhr: function () {
        console.log('xhr');
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('loadend', uploadComplete, false);

        function uploadComplete(event) {
            console.log('uploadComplete');
        }
        xhr.addEventListener("progress", function (evt) {
            console.log(xhr.getAllResponseHeaders('content-length'));
            console.log(evt.percentComplete);
            console.log([evt.lengthComputable, evt.loaded, evt.total]);
            var percentComplete = (evt.loaded / 680000) * 100;
            console.log(percentComplete);
            bar1.progress(percentComplete);
        }, false);
        return xhr;
    },
    success: function (response) {
        console.log("success")
    }
});

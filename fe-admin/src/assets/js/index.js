
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("movetop").style.display = "block";
    } else {
        document.getElementById("movetop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
    
var closebtns = document.getElementsByClassName("close-grid");
var i;

for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function () {
        this.parentElement.style.display = 'none';
    });
}

$(function () {
    $('.sidebar-menu-collapsed').click(function () {
        $('body').toggleClass('noscroll');
    })
});
$(window).load(function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});
    
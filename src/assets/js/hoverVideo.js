const vid = document.querySelectorAll(".vid");

[].forEach.call(vid, function(item) {
    item.addEventListener("mouseover", hoverVideo, false);
    item.addEventListener("mouseleave", hideVideo, false);
});

function hoverVideo(e) {
    this.play();
}

function hideVideo(e) {
    this.pause();
}
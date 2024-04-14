var slideIndex = 0;
showSlides();

function showSlides() {
    var slides = document.getElementsByClassName("mySlides");
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("fade-in");  // Remove fade-in class from all slides
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].classList.add("fade-in");  // Add fade-in class to current slide
    setTimeout(showSlides, 2000); // Change image every 5 seconds with 1 second transition delay
}

function plusSlides(n) {
    slideIndex += n;
    var slides = document.getElementsByClassName("mySlides");
    if (slideIndex > slides.length) {slideIndex = 1}    
    if (slideIndex < 1) {slideIndex = slides.length}
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("fade-in");  // Remove fade-in class from all slides
    }
    slides[slideIndex-1].classList.add("fade-in");  // Add fade-in class to current slide
}
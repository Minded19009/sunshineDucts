// Lenis Initialization:
const lenis = new Lenis({
    lerp: 0.05,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Home Sec Three Swiper:
const secThreeSwiper = new Swiper('.secThreeSwiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 48,
    speed: 2000,

    autoplay: {
        delay: 3000,
    }
})

// Home Sec Five Swiper:
const secFiveSwiper = new Swiper('.secFiveSwiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 48,
    speed: 2000,

    autoplay: {
        delay: 3000,
    }
})
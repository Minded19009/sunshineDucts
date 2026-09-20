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

// Home Pricing Section JS:
const pricingLabel = document.querySelectorAll('.pricingLabel');
const monthlyPlan = document.querySelectorAll('.monthlyPlan');
const yearlyPlan = document.querySelectorAll('.yearlyPlan');

pricingLabel.forEach((label) => {
    label.addEventListener('click', () => {
        pricingLabel.forEach((label) => {
            label.classList.remove('activeLabel');
        })

        label.classList.add('activeLabel');
        const labelName = label.innerText;

        if (labelName === 'Monthly') {
            monthlyPlan.forEach((plan) => {
                plan.style.display = "block";
            })

            yearlyPlan.forEach((plan) => {
                plan.style.display = "none";
            })
        }

        if (labelName === 'Yearly') {
            yearlyPlan.forEach((plan) => {
                plan.style.display = 'block';
            })

            monthlyPlan.forEach((plan) => {
                plan.style.display = "none";
            })
        }
    })
})

// Testimonials Swiper:
const testimonialsSwiper = new Swiper('.testimonialsSwiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 48,
    speed: 2000,
    autoplay: {
        delay: 3000,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

// About Us Switch Boxes:
const aboutUsBadge = document.querySelectorAll('.aboutUsBadge');
const aboutUsBoxes = document.querySelectorAll('.aboutUsBoxes');

aboutUsBadge.forEach((badge) => {
    badge.addEventListener('click', () => {
        aboutUsBadge.forEach((badge) => {
            badge.classList.remove('bg-pri');
            badge.classList.remove('text-white');
        })

        badge.classList.add('bg-pri');
        badge.classList.add('text-white');
        const badgeText = badge.innerText.toLowerCase();
        console.log(badgeText);

        aboutUsBoxes.forEach((box) => {
            box.classList.remove('d-flex');
            box.classList.add('d-none');

            if (badgeText === 'our mission' && box.id === 'ourMissionBox') {
                box.classList.remove('d-none');
                box.classList.add('d-flex');
            }
            
            if (badgeText === 'our vision' && box.id === 'ourVisionBox') {
                box.classList.remove('d-none');
                box.classList.add('d-flex');
            }

            if (badgeText === 'our value' && box.id === 'ourValueBox') {
                box.classList.remove('d-none');
                box.classList.add('d-flex');
            }
        })
    } )
})
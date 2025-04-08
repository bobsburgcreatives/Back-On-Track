/* ===================================================================
 * BB Creatives / Sofia 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    'use strict';

/* preloader
* -------------------------------------------------- */
const ssPreloader = function() {
    const html = document.querySelector('html');
    const siteBody = document.querySelector('body');
    const preloader = document.querySelector('#preloader');
    if (!preloader) return;

    html.classList.add('ss-preload');
    
    window.addEventListener('load', function() {
        html.classList.remove('ss-preload');
        html.classList.add('ss-loaded');
        
        preloader.addEventListener('transitionend', function afterTransition(e) {
            if (e.target.matches('#preloader'))  {
                siteBody.classList.add('ss-show');
                e.target.style.display = 'none';
                preloader.removeEventListener(e.type, afterTransition);
            }
        });
    });
}; // end ssPreloader

document.getElementById("consultationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Send form data to your email
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "YOUR_SERVICE_ID",
        template_id: "YOUR_TEMPLATE_ID",
        user_id: "YOUR_USER_ID",
        template_params: {
          name: document.querySelector("[name='name']").value,
          email: document.querySelector("[name='email']").value,
          date: document.querySelector("[name='consultation_date']").value,
          message: document.querySelector("[name='message']").value
        }
      })
    })
    .then(() => alert("Thank you! We'll contact you soon."))
    .catch(() => alert("Error: Please email us directly at info@backontrack-diabetes.com"));
  });

  
/* offcanvas nav menu
* ------------------------------------------------------ */
const ssOffCanvas = function() {
    const menuToggle = document.querySelector('.s-header__menu-toggle');
    const nav = document.querySelector('.s-header__nav');
    const closeButton = document.querySelector('.s-header__nav-close');
    const menuUnderlay = document.querySelector('.menu-underlay');
    const siteBody = document.querySelector('body');

    if (!(menuToggle && nav)) return;

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        siteBody.classList.add('menu-is-open');
    });

    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (siteBody.classList.contains('menu-is-open')) {
            siteBody.classList.remove('menu-is-open');
        }
    });

    menuUnderlay.addEventListener('click', function(e) {
        if (siteBody.classList.contains('menu-is-open')) {
            siteBody.classList.remove('menu-is-open');
        }
    });

    siteBody.addEventListener('click', function(e) {
        if(!(e.target.matches('.s-header__nav, .s-header__nav-links a'))) {
            if (siteBody.classList.contains('menu-is-open')) {
                siteBody.classList.remove('menu-is-open');
            }
        }
    });
}; // end ssOffcanvas

// Initialize functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ssPreloader();
    ssOffCanvas();
});

   /* glightbox
    * ------------------------------------------------------ */ 
    const ssGLightbox = function() {

        const lightbox = GLightbox({
            selector: '.glightbox',
            zoomable: false,
            touchNavigation: true,
            loop: false,
            autoplayVideos: true,
            svg: {
                close: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>',
                prev: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/></svg>',
                next: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/></svg>'
            }
        });        

    } // end ssGLightbox


    
/* ====================================================== */
/* SLIDER OVERRIDE SYSTEM - FAST TRANSITION, 6SEC PAUSES  */
/* ====================================================== */

// First, remove any existing slider instances and intervals
(function() {
    // Clear all intervals
    const intervalIds = window.setInterval(() => {}, 9999); // Get highest ID
    for (let i = 1; i <= intervalIds; i++) {
        clearInterval(i);
    }

    // Destroy existing Swiper instances
    if (typeof Swiper !== 'undefined') {
        document.querySelectorAll('[class*="swiper"]').forEach(swiper => {
            if (swiper.swiper) swiper.swiper.destroy(true, true);
        });
    }

    // Reset all slider elements
    document.querySelectorAll('.new-slider, [class*="slider"]').forEach(slider => {
        slider.removeAttribute('style');
        const newSlider = slider.cloneNode(true);
        slider.parentNode.replaceChild(newSlider, slider);
    });
})();

// Main slider implementation
document.addEventListener('DOMContentLoaded', function() {
    /* ======================= */
    /* 1. MENU BLOCK SLIDER */
    /* ======================= */
    const menuSliderEl = document.querySelector('.s-menublock__slider');
    if (menuSliderEl) {
        new Swiper(menuSliderEl, {
            slidesPerView: 1,
            autoplay: {
                delay: 6000, // 6 seconds pause
                disableOnInteraction: false,
                waitForTransition: true
            },
            speed: 300, // Fast 300ms transition
            loop: true,
            navigation: {
                nextEl: '.menublock-btn-next',
                prevEl: '.menublock-btn-prev',
            },
            breakpoints: {
                401: { slidesPerView: 1, spaceBetween: 20 },
                681: { slidesPerView: 2, spaceBetween: 44 },
                1101: { slidesPerView: 3, spaceBetween: 50 },
                1401: { slidesPerView: 3, spaceBetween: 60 }
            }
        });
    }

    /* ======================= */
    /* 2. TESTIMONIALS SLIDER */
    /* ======================= */
    const testimonialSliderEl = document.querySelector('.s-testimonials__slider');
    if (testimonialSliderEl) {
        new Swiper(testimonialSliderEl, {
            slidesPerView: 1,
            autoplay: {
                delay: 6000, // 6 seconds pause
                disableOnInteraction: false,
                waitForTransition: true
            },
            speed: 300, // Fast 300ms transition
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                401: { slidesPerView: 1, spaceBetween: 20 },
                901: { slidesPerView: 2, spaceBetween: 50 },
                1201: { slidesPerView: 2, spaceBetween: 80 }
            }
        });
    }

    /* ======================= */
    /* 3. CUSTOM NEW SLIDER */
    /* ======================= */
    const customSliderEl = document.querySelector('.new-slider');
    if (customSliderEl) {
        const slides = customSliderEl.querySelectorAll('.new-slider-image');
        const slideCount = slides.length;
        let currentIndex = 0;
        const transitionSpeed = 300; // Fast transition
        const pauseDuration = 6000; // 6 second pause

        // Initialize slider
        customSliderEl.style.display = 'flex';
        customSliderEl.style.width = '100%';
        slides.forEach(slide => {
            slide.style.minWidth = '100%';
            slide.style.flexShrink = '0';
        });

        function slideNext() {
            currentIndex = (currentIndex + 1) % slideCount;
            
            // Apply fast transition
            customSliderEl.style.transition = `transform ${transitionSpeed}ms ease-in-out`;
            customSliderEl.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Handle infinite loop
            setTimeout(() => {
                if (currentIndex === slideCount - 1) {
                    customSliderEl.style.transition = 'none';
                    customSliderEl.style.transform = 'translateX(0)';
                    setTimeout(() => currentIndex = 0, 50);
                }
            }, transitionSpeed);
        }

        // Start slider with precise timing
        let sliderInterval = setInterval(slideNext, pauseDuration + transitionSpeed);

        // Pause on hover
        customSliderEl.addEventListener('mouseenter', () => clearInterval(sliderInterval));
        customSliderEl.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(slideNext, pauseDuration + transitionSpeed);
        });

        // Force initial position
        setTimeout(() => customSliderEl.style.transform = 'translateX(0)', 100);
    }
});

/* ======================= */
/* CSS OVERRIDES */
/* ======================= */
const sliderStyleOverrides = `
    .new-slider {
        display: flex !important;
        width: 100% !important;
        transition: transform 300ms ease-in-out !important;
    }
    .new-slider-image {
        min-width: 100% !important;
        flex-shrink: 0 !important;
    }
    .swiper-container {
        overflow: hidden !important;
    }
    .swiper-wrapper {
        transition-timing-function: ease-in-out !important;
        transition-duration: 300ms !important;
    }
    .swiper-slide {
        transition: opacity 300ms !important;
    }
`;

// Apply styles
const styleElement = document.createElement('style');
styleElement.innerHTML = sliderStyleOverrides;
document.head.appendChild(styleElement);
    
    document.getElementById('consultationForm').addEventListener('submit', function (e) {
        e.preventDefault();
    
        // Collect form data
        const formData = new FormData(this);
    
        // Convert FormData to JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
    
        // Log the data being sent
        console.log("Sending data:", data);
    
        // Send data to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycby1eV0GjETqhXtYdgy4UwFjjQHHSavWrPLvNvsUGD-dVxmPYI4tzyDLWtcb1lVkWttx6A/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Hide form and show thank-you message
                document.getElementById('consultationForm').style.display = 'none';
                document.getElementById('thankYouMessage').style.display = 'block';
            } else {
                throw new Error(data.message || 'Failed to submit form.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`An error occurred: ${error.message}`);
        });
    });


    

    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes

    




    document.addEventListener('DOMContentLoaded', function() {
        const section = document.querySelector('.section');
        const slideDown = document.querySelector('.slide-down');
        const slideDown1 = document.querySelector('.slide-down-1');
        const slideLeft = document.querySelector('.slide-left');
        const slideRight = document.querySelector('.slide-right');
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the .animate class only once
                    slideDown.classList.add('animate');
                    slideDown1.classList.add('animate');
                    slideLeft.classList.add('animate');
                    slideRight.classList.add('animate');
    
                    // Stop observing after the animation triggers
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible
    
        // Start observing the section
        observer.observe(section);
    });


    
   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssOffCanvas();
        ssGLightbox();
        ssSwiper();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);
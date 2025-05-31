document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const scrollUpBtn = document.querySelector(".scroll-up-btn");
    const menuBtn = document.querySelector(".menu");
    const menu = document.querySelector(".navbar .menu");
    const menuIcon = document.querySelector(".menu-btn i");
    const carousel = document.querySelector(".carousel");
    const dotsContainer = document.querySelector(".dots");
    
    // Sticky Navbar & Scroll-up Button
    window.addEventListener("scroll", () => {
        navbar?.classList.toggle("sticky", window.scrollY > 20);
        scrollUpBtn?.classList.toggle("show", window.scrollY > 500);
    });

    // Scroll to Top Button
    scrollUpBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Smooth Scrolling for Menu Links
    document.querySelectorAll(".navbar .menu li a").forEach(link => {
        link.addEventListener("click", () => {
            document.documentElement.style.scrollBehavior = "smooth";
        });
    });




    // Toggle Menu


    menuIcon.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
    
    menuBtn.addEventListener("click", () => {
        menu.classList.remove("active");
    });
    

 

    

    // Typing Animations
    if (typeof Typed !== "undefined") {
        new Typed(".typing", {
            strings: ["HTML", "CSS","Bootstrap","JavaScript", "React"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });

        // new Typed(".typing-2", {
        //     strings: ["HTML", "CSS","Bootstrap","JavaScript", "React"],
        //     typeSpeed: 100,
        //     backSpeed: 60,
        //     loop: true
        // });
    }

    // Owl Carousel Initialization
    if (typeof $ !== "undefined" && $.fn.owlCarousel) {
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }
        });

        $(".owl-carousel_1").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } }
        });
    }

    // Custom Carousel with Dots
    if (carousel && dotsContainer) {
        let items = [...carousel.querySelectorAll(".item")];
        
        items.forEach((_, index) => {
            let dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });

        let dots = [...dotsContainer.querySelectorAll(".dot")];

        const showItem = (index) => {
            items.forEach((item, idx) => {
                item.classList.toggle("active", idx === index);
                dots[idx].classList.toggle("active", idx === index);
            });
        };

        document.querySelector(".prev")?.addEventListener("click", () => {
            let index = items.findIndex(item => item.classList.contains("active"));
            showItem((index - 1 + items.length) % items.length);
        });

        document.querySelector(".next")?.addEventListener("click", () => {
            let index = items.findIndex(item => item.classList.contains("active"));
            showItem((index + 1) % items.length);
        });

        dotsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("dot")) {
                showItem(parseInt(event.target.dataset.index));
            }
        });
    }
});










        function updateClock() {
      const now = new Date();

      // Format time
      const time = now.toLocaleTimeString(); // e.g., 11:45:30 AM

      // Display
      document.getElementById('time').textContent = `${time}`;
    }

    // Initial call
    updateClock();

    // Update every second
    setInterval(updateClock, 1000);


        function getFormattedDate() {
      const now = new Date();

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

      const dayName = days[now.getDay()];
      const day = now.getDate();
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();

      // Add ordinal suffix (st, nd, rd, th)
      const getOrdinal = (n) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      };

      const formatted = `${dayName} ${day}${getOrdinal(day)} ${monthName} ${year}`;
      return formatted;
    }

    document.getElementById("date").textContent = getFormattedDate();











    const slides = document.querySelectorAll('.slide');
const slider = document.getElementById('slider');
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active');
  });
  slides[i].classList.add('active');
  slider.style.background = slides[i].style.getPropertyValue('--bg');
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 500000);
}

// Auto slide only for small screens
if (screen.width < 700) {
  startAutoSlide();

  // Swipe support
  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    const diffX = endX - startX;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        prevSlide(); // Swiped right
      } else {
        nextSlide(); // Swiped left
      }
    }
  }
}

// Set initial background
showSlide(index);

// Mobile Menu Toggle
const mobileMenu =
  document.getElementById(
    "mobile-menu"
  );

const navUl =
  document.querySelector("nav ul");

if (mobileMenu) {
  mobileMenu.addEventListener(
    "click",
    () => {
      navUl.classList.toggle("show");
    }
  );
}

// Testimonial Slider
const testimonials =
  document.querySelectorAll(
    ".testimonial"
  );

const prevBtn =
  document.getElementById(
    "prevBtn"
  );

const nextBtn =
  document.getElementById(
    "nextBtn"
  );

const dotsContainer =
  document.getElementById(
    "dotsContainer"
  );

let currentIndex = 0;
let autoSlideInterval;

// Create dots
if (
  dotsContainer &&
  testimonials.length > 0
) {
  testimonials.forEach(
    (_, index) => {
      const dot =
        document.createElement(
          "div"
        );

      dot.classList.add("dot");

      if (index === 0) {
        dot.classList.add(
          "active"
        );
      }

      dot.addEventListener(
        "click",
        () => goToSlide(index)
      );

      dotsContainer.appendChild(
        dot
      );
    }
  );
}

function goToSlide(index) {
  testimonials.forEach(
    (testimonial, i) => {
      testimonial.classList.remove(
        "active"
      );

      if (dotsContainer) {
        const dots =
          dotsContainer.children;

        if (dots[i]) {
          dots[
            i
          ].classList.remove(
            "active"
          );
        }
      }
    }
  );

  testimonials[
    index
  ].classList.add("active");

  if (
    dotsContainer &&
    dotsContainer.children[index]
  ) {
    dotsContainer.children[
      index
    ].classList.add("active");
  }

  currentIndex = index;
}

function nextSlide() {
  let newIndex =
    currentIndex + 1;

  if (
    newIndex >=
    testimonials.length
  ) {
    newIndex = 0;
  }

  goToSlide(newIndex);
}

function prevSlide() {
  let newIndex =
    currentIndex - 1;

  if (newIndex < 0) {
    newIndex =
      testimonials.length -
      1;
  }

  goToSlide(newIndex);
}

if (
  prevBtn &&
  nextBtn &&
  testimonials.length > 0
) {
  prevBtn.addEventListener(
    "click",
    () => {
      prevSlide();
      resetAutoSlide();
    }
  );

  nextBtn.addEventListener(
    "click",
    () => {
      nextSlide();
      resetAutoSlide();
    }
  );
}

function startAutoSlide() {
  autoSlideInterval =
    setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(
    autoSlideInterval
  );

  startAutoSlide();
}

if (
  testimonials.length > 0
) {
  startAutoSlide();
}

// API Base URL
const API_BASE =
  "http://localhost:3000/api";

/* ==========================
   RESERVATION FORM
========================== */

const reservationForm =
  document.getElementById(
    "reservationForm"
  );

const resMessage =
  document.getElementById(
    "resMessage"
  );

if (reservationForm) {
  reservationForm.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const reservationData = {
        name:
          document.getElementById(
            "resName"
          ).value,

        email:
          document.getElementById(
            "resEmail"
          ).value,

        phone:
          document.getElementById(
            "resPhone"
          ).value,

        date:
          document.getElementById(
            "resDate"
          ).value,

        time:
          document.getElementById(
            "resTime"
          ).value,

        guests: parseInt(
          document.getElementById(
            "resGuests"
          ).value
        ),
      };

      try {
        const response =
          await fetch(
            `${API_BASE}/reserve`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  reservationData
                ),
            }
          );

        const result =
          await response.json();

        resMessage.style.display =
          "block";

        if (response.ok) {
          resMessage.innerHTML =
            "✅ " +
            result.message;

          resMessage.style.color =
            "green";

          reservationForm.reset();
        } else {
          resMessage.innerHTML =
            "❌ " +
            result.error;

          resMessage.style.color =
            "red";
        }
      } catch (error) {
        resMessage.style.display =
          "block";

        resMessage.innerHTML =
          "❌ Server error";

        resMessage.style.color =
          "red";

        console.error(error);
      }
    }
  );
}

/* ==========================
   CONTACT FORM
========================== */

const contactForm =
  document.getElementById(
    "contactForm"
  );

const contactMessageDiv =
  document.getElementById(
    "contactMessageDiv"
  );

if (contactForm) {
  contactForm.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      const contactData = {
        name:
          document.getElementById(
            "contactName"
          ).value,

        email:
          document.getElementById(
            "contactEmail"
          ).value,

        message:
          document.getElementById(
            "contactMessage"
          ).value,
      };

      try {
        const response =
          await fetch(
            `${API_BASE}/contact`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  contactData
                ),
            }
          );

        const result =
          await response.json();

        contactMessageDiv.style.display =
          "block";

        if (response.ok) {
          contactMessageDiv.innerHTML =
            "✨ " +
            result.message;

          contactMessageDiv.style.color =
            "green";

          contactForm.reset();
        } else {
          contactMessageDiv.innerHTML =
            "❌ " +
            result.error;

          contactMessageDiv.style.color =
            "red";
        }
      } catch (error) {
        contactMessageDiv.style.display =
          "block";

        contactMessageDiv.innerHTML =
          "❌ Server error";

        contactMessageDiv.style.color =
          "red";

        console.error(error);
      }
    }
  );
}
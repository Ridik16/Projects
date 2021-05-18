window.addEventListener("DOMContentLoaded", () => {
  //                                                              ------ToggleSwitch----- 

  const monthlyButton = document.querySelector("#monthly");
  const annualyButton = document.querySelector("#annualy");

  const toggleSwitch = document.querySelector(".toggle");

  const monthlyItem = document.querySelector(".monthlyItem");
  const annualyItem = document.querySelector(".annualyItem");

  toggleSwitch.addEventListener("click", () => {
    if (monthlyButton.checked) {
      monthlyItem.classList.toggle("_active");
    } else if (annualyButton.checked) {
      annualyItem.classList.toggle("_active");
    }
  });

  //                                                           -----ACCORDEON-------

  let acc = document.querySelectorAll(".accordion-item__button");

  for (let i = 0; i < acc.length; i++) {
    /*Set Listener on every item  */
    acc[i].addEventListener("click", function () {
      
      this.classList.toggle("active-accordion");
      let panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  //                                                            ------SLIDER PERSON-------

  const nextSlide = document.querySelector(".next");
  const previousSlide = document.querySelector(".previous");

  /* Index Increment by 1  — Showing Next Slide*/
  nextSlide.addEventListener("click", () => {
    showSlides((slideIndex += 1));
  });

  /* Index Decrement by 1  — Showing Previous Slide*/
  previousSlide.addEventListener("click", () => {
    showSlides((slideIndex -= 1));
  });

  /*Set Default Index */
  let slideIndex = 1;
  showSlides(slideIndex);

  /* Sliding Function */
  function showSlides(n) {

    let slides = document.querySelectorAll(".item");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    /* Hiding all Slides */
    for (let slide of slides) {
      slide.style.display = "none";
    }
    /*Showing slide */
    slides[slideIndex - 1].style.display = "inline-flex";
  }



  //                                                              -------BURGER MENU------
  const menu = document.getElementById("navUl");
  const burger = document.querySelector(".header__burger");
  const body = document.querySelector("body");
  let menuOpen = false;

  const menuLinks = document.querySelectorAll("#menu__link");

  burger.addEventListener("click", () => {
    // Show Menu
    menu.classList.toggle("menu-list--active");
    // Disable Scroll
    body.classList.toggle("modal--open");

    // Burger Animation
    if (!menuOpen) {
      burger.classList.add("open");
      menuOpen = true;
    } else {
      burger.classList.remove("open");
      menuOpen = false;
    }

    // Hiding menu, when menu__link is pressed by User
    for(let i=0; i < menuLinks.length; i++){
      menuLinks[i].addEventListener("click", ()=>{
        // Hide Menu
        menu.classList.remove("menu-list--active");
        // Enable Scroll
        body.classList.remove("modal--open");
        //close Burger
        burger.classList.remove("open");
      })
    }
  });
});
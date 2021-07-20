// TIMER

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    total: t,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(endtime) {
  const minutesSpan = document.querySelector(".minutes");
  const secondsSpan = document.querySelector(".seconds");

  const body = document.querySelector("body");
  const modalWindow = document.querySelector(".modal");
  const close = document.querySelector(".close");

  close.addEventListener("click", function () {
    //Enablle Scroll
    body.classList.toggle("modal_open");
    //Hide Modal
    modalWindow.classList.toggle("modal_close");
  });

  function updateClock() {
    let remainingTime = getTimeRemaining(endtime);
    minutesSpan.innerHTML = ("0" + remainingTime.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + remainingTime.seconds).slice(-2);

    if (remainingTime.total <= 0) {
      // Disable Scroll
      body.classList.toggle("modal_open");
      //Show Modal
      modalWindow.classList.toggle("modal_close");

      clearInterval(timeinterval);
      return true;
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 5000 * 1000);
initializeClock(deadline);



// MENU TABS

let tabs = document.querySelector(".menu__tabs");
let btns = tabs.querySelectorAll(".tabs__btn");
let items = tabs.querySelectorAll(".tabs__item");

function change(arr, i) {
  arr.forEach((item) => {
    item.forEach((i) => {
      i.classList.remove("is-active");
    });
    item[i].classList.add("is-active");
  });
}

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    change([btns, items], i);
  });
}

// SLIDER

$(".owl-carousel").owlCarousel({
  items: 1,
  lazyLoad: true,
  loop: true,
  margin: 50,
});



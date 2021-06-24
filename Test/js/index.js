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
  const modalWindow = document.querySelector(".modalDialog");
  const close = document.querySelector(".close");

  close.addEventListener("click", function () {
    //Enablle Scroll
    body.classList.toggle("modal_open");
    //Hide Modal
    modalWindow.classList.toggle("modalDialog_close");
  });

  function updateClock() {
    let remainingTime = getTimeRemaining(endtime);
    minutesSpan.innerHTML = ("0" + remainingTime.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + remainingTime.seconds).slice(-2);

    if (remainingTime.total <= 0) {
      // Disable Scroll
      body.classList.toggle("modal_open");
      //Show Modal
      modalWindow.classList.toggle("modalDialog_close");

      clearInterval(timeinterval);
      return true;
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 6000 * 1000);
initializeClock(deadline);













// FORMS Verification
const userName = document.querySelector(".contact__name");
const phone = document.querySelector(".contact__tel");
const email = document.querySelector(".contact__email");
const span = document.querySelector(".pattern__error");
const btn = document.querySelector(".contact__button");

// const emailPattern = /^\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/gim;
// const phonePattern = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}/;

btn.addEventListener("click", function () {
  if (typeof userName.value == "string") {
    //Name Control
    const namePattern = /[A-Za-z]/i;
    if (userName.value.search(namePattern) < 0) {
      userName.classList.add("_incorect");
    } else {
      userName.classList.remove("_incorect");
    }
  } else if (typeof phone.value == "number") {
    //Phone Control
    const telPattern = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/i;
    debugger;
    if (phone.value.search(telPattern) < 0) {
      phone.classList.add("_incorect");
      // phone.nextElementSibling.innerHTML = "Invalid phone, example (+1 555-555-5555)";
    } else {
      // phone.nextElementSibling(" ");
      phone.classList.remove("_incorect");
    }
    } 


    else if (typeof e.dataset.email == "string") {
    //Проверка email
    const emailPattern = /^\w+@(\w+\.)+\w{2,4}$/g;

    if (e.value.search(emailPattern) < 0) {
      e.classList.add("incorrect");
      span.innerHTML = "Неверно указан email";
    } else {
      span.innerHTML = "";
      e.classList.remove("incorrect");
      e.classList.add("correct");
    }
    }
});
// function isEmail(){
//   emailPattern.test(userName.value);
// }
// console.log(validator.isEmail("phphtml@mail.ru"));
// console.log(validator.isDomain("phphtml.net"));
// console.log(validator.isDate("12.05.2020"));
// console.log(validator.isPhone("+375 (29) 817-68-92"));

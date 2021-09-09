const wheel = document.querySelector(".rotation");
const maxRad = 3;
const radDiff = 0.3;
let currentRad = 0;

window.addEventListener("wheel", function (e) {
  
  const delta = Math.sign(e.deltaY);
  // down - 1
  if (delta == 1 && currentRad <= maxRad) {
    wheel.style.transform = "rotate(" + (currentRad + radDiff) + "rad)";
    if (currentRad == 3) {
      currentRad = 0;
    }
  } else if (delta == -1 && maxRad >= 0) {
    wheel.style.transform = "rotate(" + (currentRad - radDiff) + "rad)";
    if (currentRad == 0) {
      currentRad = maxRad;
    }
  }
});


const nav = document.getElementById("navUl");
const burgerIcon = document.getElementById("burgerIcon");
let bodyBlock = false;

burgerIcon.addEventListener("click", ()=>{
  
  nav.classList.toggle("nav__ul--active");
  burgerIcon.classList.toggle("_active");

  if(!bodyBlock){
    document.body.style.overflow = "hidden";
    bodyBlock = true
  }else{
    document.body.style.overflow = "auto";
    bodyBlock = false;
  }
})
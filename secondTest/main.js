const myBtn = document.querySelector("button");
const myHead = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Pls enter your name");
    if (!myName) {
        setUserName()
    }
    else{
    localStorage.setItem("name", myName);
    myHead.textContent = `Welcom to this website ${myName}`
}
}
if (!localStorage.getItem("name")) {
    setUserName()
}
else{
    const storedName = localStorage.getItem("name");
    myHead.textContent = `Welcome to this website ${storedName}`
}
myBtn.onclick = ()=>{
    setUserName()
}


const prevBtn =  document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slides = document.querySelectorAll(".slide")
const slideContainer = document.querySelector(".container")
console.log(slides.length);
let i = 0
let interval;
function startInterval(){
    interval = setInterval(()=>{
        i++;
        showSlide()
    },2000)
    }
function stopInterval(){
    clearInterval(interval)
}
nextBtn.addEventListener("click", () => {
    stopInterval()
    i++;
    showSlide();
    startInterval()
});

prevBtn.addEventListener("click", () => {
    stopInterval()
    i--;
    showSlide();
    startInterval()
});

slides.forEach((slide)=>{
    slide.addEventListener("mouseover", stopInterval);
    slide.addEventListener("mouseout", startInterval);
})



function removeClass() {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });
}

function setBg(color) {
    slideContainer.style.background = color;
}

function showSlide() {
    if (i >= slides.length) {
        i = 0;
    }
    if (i < 0) {
        i = slides.length - 1;
    }
    removeClass();
    slides[i].classList.add("active");
    setBg(slides[i].getAttribute('data-bgcolor'));
}

// Set the initial background color
setBg(slides[0].getAttribute('data-bgcolor'));
startInterval()
import './style.css'

const card = document.getElementById("card") as HTMLElement;
let isFlipped = false;

card.addEventListener("click", () => {
    if (!isFlipped) {
        card.style.transform = "rotateY(180deg)";
    } else {
        card.style.transform = "rotateY(0deg)";
    }
    isFlipped = !isFlipped;
});

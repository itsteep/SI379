const box = document.querySelector("#box"); 
const toggleColor = () => {
    if (box.classList.contains("red")) {
        box.classList.remove("red"); 
        box.classList.add("blue"); 
    } else {
        box.classList.add("red"); 
        box.classList.add("blue"); 
    }
};

box.addEventListener("click", toggleColor); 

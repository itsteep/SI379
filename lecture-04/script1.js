const btn = document.querySelector("button"); 

let count = 0; 

btn.addEventListener("click", () => {
    count++; 
    btn.innerText = count;
}); 
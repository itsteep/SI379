// let count = 0; 
const btn = document.querySelector("#button"); 
// const paragraph = document.querySelector(".num"); 
const ulElem = document.querySelector("ul"); 
const inp = document.querySelector("input"); 

inp.focus(); 
// btn.addEventListener("click", () => {
    // count++; 

function doSubmit() { 
    console.log(inp.value); 
    // paragraph.innerText = "Hit button " + count + " times"; 
    // paragraph.innerText = `Hit button ${count} times`;
    btn.setAttribute("disabled", true);  
    setTimeout(() => {
        btn.removeAttribute("disabled"); 
    }, 1000); 
    // const liElem = document.createElement("li"); 
    // liElem.innerText = `Hit button ${count} times`; 
    // ulElem.append(liElem); 
    const text = inp.value; 
    if (text.length > 0) {
        const liElem = document.createElement("li"); 
        liElem.innerText = text; 
        ulElem.append(liElem); 
        inp.value = ""; 
    }
} 

btn.addEventListener("click", doSubmit); 
inp.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
        doSubmit(); 
    }
})

// }); 

// '' --> single quotes 
// `` --> key next to #1 
// hit fn + F2 on a variable name to change it + all other ones that have the same name :O 
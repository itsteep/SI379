// Exercise 1: the user can press "Enter" to submit the form 
// const submitButton = document.querySelector("button");
// const ulElem = document.querySelector("ul");
// const inp = document.querySelector("input");

// function doSubmit() {
//     const inputValue = inp.value;
//     if (inputValue.length > 0) {
//         const liElem = document.createElement("li");
//         liElem.innerText = inputValue;
//         ulElem.append(liElem);
//         inp.value = "";
//     }
// }

// submitButton.addEventListener("click", doSubmit);
// inp.addEventListener("keydown", (event) => { 
//     if(event.key === "Enter") { 
//         doSubmit(); 
//     } 
// });

// Exercise 2: rather than setting the .textContent of the <li>
// element to the input value, you create new <span class="letter" /> elements for each
// letter in the input value, set the <span> 's text content to that letter, and append the
// <span> elements to the <li> element. (like in wordle, each letter has a box around it) 

const submitButton = document.querySelector("button");
const ulElem = document.querySelector("ul");
const inp = document.querySelector("input");

function doSubmit() {
    const inputValue = inp.value;
    if (inputValue.length > 0) {
        const liElem = document.createElement("li");
        // liElem.innerText = inputValue;
        ulElem.append(liElem);
            // ADDING: 
        for (const letter of inputValue) {
            const spanElement = document.createElement("span"); 
            spanElement.classList.add("letter"); 
            spanElement.innerText = letter; 
            liElem.append(spanElement); 
        }
        // END OF ADDING 
        inp.value = "";
    }
}

submitButton.addEventListener("click", doSubmit);
inp.addEventListener("keydown", (event) => { 
    if(event.key === "Enter") { 
        doSubmit(); 
    } 
});



// Write your code here 

// click_pow.html 
// Edit script.js so that when the user clicks the "zzz" image, it changes to the "pow"
// image. Test using click_pow.html (not multi_click_pow.html ).
// When the user clicks the "pow" image, add the "clicked" class if it does not
// already have it.
// Then, one second later, remove the "clicked" class 

// const zzz = document.querySelector("#clickable_elem"); 
// const revert = () => {
//     zzz.classList.remove("clicked"); 
// }

// const toggleImage = () => {
//     if (zzz.classList.contains("clickable")) {
//         zzz.classList.add("clicked"); 
//         setTimeout(revert, 1000); 
//         // can also do: setTimeout(() => { zzz.classList.remove("clicked")}, 1000); 
//     } 
// }; 

// zzz.addEventListener("click", toggleImage); 

// Sample solution: 
// const clickableElement = document.querySelector('#clickable_elem');
// clickableElement.addEventListener('click', () => {
//     if(!clickableElement.classList.contains('clicked')) {
//         clickableElement.classList.add('clicked');
//         setTimeout(() => {
//             clickableElement.classList.remove('clicked');
//         }, 1000);
//     }
// });


// The file multi_click_pow.html is similar to click_pow.html , but it has many
// "pow" images instead of one.
// Update your code so that when the user clicks on any of the "pow" images, it changes
// to the "zzz" image.
// Hint: use document.querySelectorAll() and a for loop 

const clickableElements = document.querySelectorAll('.clickable');

for (const clickableElement of clickableElements) {
    clickableElement.addEventListener('click', () => {
        if(!clickableElement.classList.contains('clicked')) {
            clickableElement.classList.add('clicked');
            setTimeout(() => {
                clickableElement.classList.remove('clicked');
            }, 1000);
        }
    });
}


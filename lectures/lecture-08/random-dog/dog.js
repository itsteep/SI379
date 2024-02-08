// Write your code here 

// The get-random-dog.js file contains a function getRandomDogImageURL that accepts one argument, a callback function. The callback function will be called with a URL to a random dog image. Write code (modify dog.js ) that will call getRandomDogImageURL and display the image on the page as soon as it loads. Hint: create an <img> element and set its src attribute to the URL

// getRandomDogImageUrl((url) => {
//     const img = document.createElement("img"); 
//     img.setAttribute("src", url); 
//     document.body.append(img); 
//     // img.src = url; 
// }); 

// getRandomDogImageURL((url) => {
//     const img = document.createElement('img');
//     img.src = url;
//     document.body.appendChild(img);
// });

// Modify the code from Exercise 4 so that the user can click a button to get a new random dog image. Note: you will want to also modify index.html to include a button Bonus if you remove the existing images elements
    
const button = document.querySelector('button');
function generateRandomDog() {
    getRandomDogImageURL((url) => {
        const img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img);
    });
}
button.addEventListener('click', generateRandomDog);
generateRandomDog();
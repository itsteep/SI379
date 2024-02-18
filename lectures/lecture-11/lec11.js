// Exercise 1:

/*
Define a function `callLater` that takes two arguments:

1. A number of milliseconds (`ms`)
2. A callback (`cb`)

`callLater` should call `cb` with *no arguments* after `ms` milliseconds.
*/

function callLater(ms, cb) {
    setTimeout(() => {
        cb();
    }, ms);
} 

// Example call:
callLater(1000, () => console.log("Hello, world!")); // should print "Hello, world!" after 1 second

// Exercise 2:
/*
Define a function `callLaterWithArg` that takes three arguments:

1. A number of milliseconds (`ms`)
2. A value (`val`)
3. A callback (`cb`)

`callLaterWithArg` should call `cb` with one argument (`val`) after `ms` milliseconds.
*/
function callLaterWithArg(ms, val, cb) {
    setTimeout(() => {
        cb(val); 
    }, ms);
}

// Example call:
callLaterWithArg(1000, "Hello, world! This is SI 379.", (val) => console.log(val)); // should print "Hello, world! This is SI 379." after 1 second


function addLogging(f) {
    return (...args) => {
        console.log("about to call the function", args);
        return f(...args);
    };
}

function add(a, b) {
    return a + b;
}

const loggedAdd = addLogging(add);
console.log(loggedAdd(1, 2)); // should log "about to call the function [1, 2]" and return 3



function throttle(func, wait) {
    let canCall = true;

    return function() {
        if (canCall) { 
            func();
            canCall = false;
            setTimeout(() => {
                canCall = true;
            }, wait);
        }
    };
}

let callbackCount = 0;
function updateCallbackCount() {
    callbackCount++;

    document.querySelector("#call-count").innerText = `Called the callback ${callbackCount} times.`;
}

let throttledUpdateCallbackCount = 0;
function updateThrottledCallbackCount() {
    throttledUpdateCallbackCount++;
    document.querySelector("#throttled-call-count").innerText = `Called the throttled callback ${throttledUpdateCallbackCount} times.`;
}

document.querySelector("button").addEventListener("click", updateCallbackCount);
document.querySelector("button").addEventListener("click", throttle(updateThrottledCallbackCount, 1000));


// Exercise 3:
/*
Define a function `debounce` that takes two arguments:

1. A function (`func`)
2. A number of milliseconds (`delay`)

`debounce` should **return a new function** that calls `func` after `delay` milliseconds have passed since the last time it (the new function) was called.
*/

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId); // Clear any existing timeout
        
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

//------------

// Example usage:
function updateFeedback() {
    document.querySelector("#paused_feedback").innerText = "The user paused typing";
}
const debouncedUpdateFeedback = debounce(updateFeedback, 1000);
document.querySelector("input").addEventListener("keydown", () => {
    document.querySelector("#paused_feedback").innerText = "";
    debouncedUpdateFeedback();
}); // should log the input value after 1 second of no typing
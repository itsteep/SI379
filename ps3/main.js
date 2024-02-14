let events = [];
let timerId = false;

function setSelectedIndex(i) {
    const image = document.querySelector("#selected-image");
    const title = document.querySelector("#selected-title");
    const date = document.querySelector("#selected-date");
    const location = document.querySelector("#selected-location");
    const description = document.querySelector("#selected-description");

    const prevImg = document.querySelector("#thumbnails img.selected");
    if (prevImg) {
        prevImg.classList.remove("selected");
    }

    const newImg = document.querySelector(`#thumb-${events[i].id}`);
    newImg.classList.add("selected");
    image.src = events[i].image_url;
    title.innerText = events[i].event_title;
    title.href = events[i].permalink;
    date.innerText = getReadableTime(events[i].datetime_start);
    description.innerText = events[i].description;

    timerId = setTimeout(() => {
        setSelectedIndex((i + 1) % events.length);
    }, 10000);
}

// I used ChatGPT to help with the addEventListener function 

document.addEventListener('DOMContentLoaded', () => {
    getUMEventsWithImages((data) => {
        events = data;

        const thumbnailsContainer = document.getElementById('thumbnails');
        for (let index = 0; index < events.length; index++) {
            const event = events[index];
            const thumbnail = document.createElement('img');
            thumbnail.src = event.styled_images.event_thumb;
            thumbnail.id = `thumb-${event.id}`;
            thumbnail.addEventListener('click', () => {
                clearTimeout(timerId);
                setSelectedIndex(index);
            });
            thumbnailsContainer.appendChild(thumbnail);
        }

        setSelectedIndex(0);
    });
});

var introSection = document.getElementById("quiz-intro");
var startButton = document.getElementById("start-button");
var nextButton = document.getElementById("next-button");
var quizSection = document.getElementById("quiz");
var questionsElement = document.getElementById("questions");
var answersElement = document.getElementById("answers");
var resultsSection = document.getElementById("results");
var moodResultElement = document.getElementById("mood-result");
var moodImageElement = document.getElementById("mood-image");
var youtubePlaylistElement = document.getElementById("youtube-playlist"); 
var moodDescriptionTextElement = document.getElementById('mood-description-text');

// const apiKey = 'AIzaSyBGWpgUq2m0re4yN_WpSgKdKFsxgPsNE64' 
const apiKey = 'AIzaSyAmXkGPI8GDAAKzlszgnXqP5DZZlH6ADP4' 

function searchYouTubeAPI(searchQuery, mood) {
    const apiKey = 'AIzaSyAmXkGPI8GDAAKzlszgnXqP5DZZlH6ADP4' 
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(searchQuery)}&maxResults=1&key=${apiKey}`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            displayYouTubeVideo(videoId, mood); 
        } else {
            console.error('No videos found for search query:', searchQuery);
        }
    })
    .catch(error => {
        console.error('Error fetching YouTube data:', error);
    });
}
  
function displayYouTubeVideo(videoId, mood) {
    moodResultElement.textContent = `Mood: ${mood}`;
    moodDescriptionTextElement.textContent = moodDescriptionsText[mood];
    moodDescriptionTextElement.classList.remove('hidden');
    moodImageElement.src = ""; 
    moodImageElement.classList.remove('hidden');
    youtubePlaylistElement.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    resultsSection.style.display = 'block';
}

var questionState = 0;

var userStats = [
    0, // cheer 
    0, // dressing 
    0, // exercise 
    0, // sleepy 
    0, // working 
    0  // yoga 
];
var tempStats = [0, 0, 0, 0, 0, 0]; 

var questionText =	[
    "Question 1/6: How are you feeling right now?", // Q1
    "Question 2/6: It's snack time. What are you eating?", // Q1 
    "Question 3/6: What flower do you like the best?", // Q3 
    "Question 4/6: How are you going to spend the next hour?", // Q4 
    "Question 5/6: What is your favorite animal?", // Q5 
    "Question 6/6: What song would you listen to right now?" // Q6 
]; 

var answerText =	[ 
    // Q1 answers													
[	"Calm", 				
    "Energetic", 
    "Angry",
    "Bored",
    "Happy",
    "Sad"],							
    
    // Q2 answers
[	"Hot Cheetos", 							
    "Pocky",
    "Cliff Bar",
    "Fruit",
    "Ice Cream",
    "Smoothie"],
    
    // Q3 answers
[	"Rose", 
    "Tulip",
    "Daisy",
    "Orchid",
    "Sunflower",
    "Lavender"],
    
    // Q4 answers
[	"Relaxing", 
    "Doing Homework",
    "Exercising",
    "Making Dinner",
    "Taking a bath",
    "Doing Laundry"],
    
    // Q5 answers
[	"Cat",
    "Dog", 
    "Panda",
    "Capybara",
    "Rabbit",
    "Seal"],		

    // Q6 answers								
[	"Magnetic by ILLIT", 
    "yes, and? by Ariana Grande",
    "EASY by LE SSERAFIM",
    "From the Start by Laufey",
    "seasons by wave to earth",
    "One Summer's Day (Spirited Away)"]
]

var answerValues =	[
    // Q1 answer values
    [	[0,1,0,2,0,3], // calm 		
        [3,1,2,0,0,0], // energetic 
        [0,0,1,2,3,0], // angry 
        [0,2,0,1,3,0], // bored 
        [3,0,1,0,0,2], // happy 
        [0,2,0,1,3,0]  // sad 
    ],	

    // Q2 answer values
    [	[1,0,0,2,3,0], // Hot Cheetos 
        [0,2,0,1,3,0], // Pocky 
        [0,1,3,0,2,0], // Cliff Bar 
        [2,0,1,0,0,3], // Fruit 
        [3,0,0,2,0,1], // Ice Cream 
        [0,0,2,0,1,3]  // Smoothie 
    ],

    // Q3 answer values
    [	[2,3,0,0,0,1], // Rose 
        [1,0,2,3,0,0], // Tulip 
        [0,0,1,2,0,3], // Daisy 
        [0,1,0,2,3,0], // Orchid 
        [1,0,0,0,2,3], // Sunflower 
        [0,2,1,3,0,0]  // Lavender 
    ],
        
    // Q4 answer values
    [	[0,2,0,1,0,3], // Relaxing 
        [0,1,2,0,3,0], // Doing Homework 
        [1,0,3,0,0,2], // Exercising 
        [1,0,0,0,3,2], // Making Dinner 
        [0,2,1,3,0,0], // Taking a Bath 
        [2,3,0,1,0,0]  // Doing Laundry 
    ],
        
    // Q5 answer values
    [	[3,0,0,1,0,2], // Cat 
        [1,2,3,0,0,0], // Dog 
        [0,1,0,0,2,3], // Panda 
        [1,0,2,3,0,0], // Capybara 
        [2,1,0,0,2,3], // Rabbit 
        [0,3,1,2,0,0]  // Seal 
    ],
        
    // Q6 answer values
    [	[3,1,2,0,0,0], // Magnetic by ILLIT 
        [0,0,0,1,2,3], // yes, and? by Ariana Grande 
        [2,3,1,0,0,0], // EASY by LE SSERAFIM 
        [0,0,0,2,1,3], // From the Start by Laufey 
        [0,1,0,2,0,3], // seasons by wave to earth 
        [2,0,1,0,3,0]  // One Summer's Day (Spirited Away) 
    ]
]

var retakeQuizButton = document.getElementById("retake-quiz-button");

function resetQuiz() {
    questionState = 0;
    userStats = [0, 0, 0, 0, 0, 0];
    tempStats = [0, 0, 0, 0, 0, 0];
    
    // hide results and show quiz intro
    resultsSection.style.display = 'none';
    introSection.style.display = 'block';

    moodImageElement.classList.add('hidden');
    moodDescriptionTextElement.classList.add('hidden');
    retakeQuizButton.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    startButton.addEventListener('click', startQuiz);
    
    nextButton.addEventListener('click', function() {
        changeState();
    }); 
    retakeQuizButton.addEventListener('click', resetQuiz);

});

function startQuiz() {
    introSection.style.display = 'none'; 
    quizSection.style.display = 'block'; 
    nextButton.classList.remove('hidden'); 
    initText(questionState); 
}

function initText(question) {
    var answerSelection = "";
    
    for (var i = 0; i < answerText[question].length; i++) {
        answerSelection += "<li><input type='radio' name='question" +
            (question + 1) + "' onclick='setAnswer(" + i + ")' id='answer" + i + "'><label for='answer" + i + "'>" + answerText[question][i] + "</label></li>";
    }
    
    questions.innerHTML = questionText[question];
    answers.innerHTML = answerSelection;
    nextButton.textContent = questionState < questionText.length - 1 ? "Next" : "See results";  
    nextButton.disabled = true; 
}

function setAnswer(input) {
    clearTempStats();
    tempStats = answerValues[questionState][input];
    nextButton.disabled = false; 
}

function clearTempStats() {
    tempStats = [0, 0, 0, 0, 0, 0];
}

function updatePersonality() {
    for (var i = 0; i < userStats.length; i++) {
        userStats[i] += tempStats[i];
    }
}

function changeState() {
    if (questionState < questionText.length - 1) {
        updatePersonality();
        questionState++;
        initText(questionState);
    } else {
        updatePersonality();
        setCustomPage();
    }
}

function setCustomPage() {
    quizSection.style.display = "none"; 
    results.style.display = "block"; 

    // var highestStatPosition = 0;
    // for (var i = 1; i < userStats.length; i++) {
    //     if (userStats[i] > userStats[highestStatPosition]) {
    //         highestStatPosition = i;
    //     }
    // }

    var highestStatPosition = userStats.indexOf(Math.max(...userStats));
    
    var moodDescriptions = [
        "You're feeling Cheerful!",
        "You're feeling Casual!",
        "You're feeling Active!",
        "You're feeling Sleepy!",
        "You're feeling Busy!",
        "You're feeling Relaxed!"
    ]; 

    var moodImages = [
        "smiski/smiski-cheer.png", // smiski cheer image
        "smiski/smiski-dress.png", // smiski dressing image
        "smiski/smiski-exercise.png", // smiski exercise image
        "smiski/smiski-sleepy.png", // smiski sleepy image
        "smiski/smiski-work.png", // smiski working image
        "smiski/smiski-yoga.png", // smiski yoga image
        
    ]; 

    var moodDescriptionsText = [
        "An energetic playlist for you to keep up the hard work.",
        "A chill playlist for you to keep going about your day.",
        "A playlist for you to blast during your exercise session.",
        "A soothing playlist for you to play while you get ready for bed.",
        "A playlist for you to enjoy while doing work.",
        "A relaxing playlist while you do meditate or do yoga.",
    ];

    // update the mood result text and images
    moodResultElement.textContent = moodDescriptions[highestStatPosition];
    moodImageElement.src = moodImages[highestStatPosition];
    moodDescriptionTextElement.textContent = moodDescriptionsText[highestStatPosition];

    // display elements
    moodImageElement.classList.remove('hidden');
    moodDescriptionTextElement.classList.remove('hidden');
    retakeQuizButton.classList.remove('hidden');

    // use keywords to search YouTube playlists
    var moodKeywords = ['kpop', 'chill', 'workout', 'sleep', 'study', 'meditation'];
    var searchQuery = moodKeywords[highestStatPosition];

    //   searchYouTubeAPI(searchQuery);
    searchYouTubeAPI(searchQuery, moodDescriptions[highestStatPosition]);

}

function displayYouTubeVideo(videoId, mood) {
    moodResultElement.textContent = `Mood: ${mood}`;

    moodImageElement.classList.remove('hidden');

    const existingIframe = youtubePlaylistElement.querySelector('iframe');
    if (existingIframe) {
        existingIframe.remove();
    }
    
    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '560');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('allowfullscreen', true);
    youtubePlaylistElement.appendChild(iframe);

    resultsSection.style.display = 'block'; 
}

var retakeQuizButton = document.getElementById("retake-quiz-button");

retakeQuizButton.addEventListener('click', function() {
  resetQuiz();
}); 
let typing_ground = document.querySelector('#textarea');
let btn = document.querySelector('#btn');
let score = document.querySelector('#score');
let show_sentence = document.querySelector('#show-sent');
let show_time = document.querySelector('#show-timer');

let startTime, endTime, totalTimeTaken, sentence_to_write;

let sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Typing speed tests can help improve both speed and accuracy.",
    "A journey of a thousand miles begins with a single step.",
    "Practicing regularly will lead to significant improvements over time.",
    "The rain in Spain stays mainly in the plain.",
    "To be or not to be, that is the question.",
    "A watched pot never boils.",
    "Better late than never, but never late is better.",
    "Peter Piper picked a peck of pickled peppers.",
    "The early bird catches the worm.",
    "She swiftly sorted seven silly sheep.",
    "Each morning, he enjoys a hot cup of coffee while reading the newspaper.",
    "Learning to type quickly is a valuable skill in the modern world."
];

const errorChecking = (words) => {
    let num = 0;
    sentence_to_write = show_sentence.innerHTML.trim().split(' ');

    for (let i = 0; i < words.length; i++) {
        if (words[i] === sentence_to_write[i]) {
            num++;
        }
    }
    return num;
}

const calculatetypingSpeed = (time_taken) => {
    let totalWords = typing_ground.value.trim().split(' ');
    let actualWords = errorChecking(totalWords);

    if (actualWords !== 0) {
        let typing_speed = (actualWords / time_taken) * 60;
        typing_speed = Math.round(typing_speed);

        score.innerHTML = `Your typing speed is ${typing_speed} words per minute and you wrote ${actualWords} correct words out of ${sentence_to_write.length}. Time taken: ${time_taken} seconds.`;
    } else {
        score.innerHTML = `Your typing speed is 0 words per minute. Time taken: ${time_taken} seconds.`;
    }
}

const endTypingTest = () => {
    btn.innerText = "Start";
    showTimer();

    let date = new Date();
    endTime = date.getTime();

    let totalTime = (endTime - startTime) / 1000;

    calculatetypingSpeed(totalTime);
    show_sentence.innerHTML = "";
    typing_ground.value = "";
}

let intervalID, elapsedTime = 0;

const showTimer = () => {
    if (btn.innerText === "Done") {
        intervalID = setInterval(() => {
            elapsedTime++;
            show_time.innerHTML = elapsedTime;
        }, 1000);
    } else if (btn.innerText === "Start") {
        clearInterval(intervalID);
        show_time.innerHTML = "";
    }
}

const startTyping = () => {
    let randomNumber = Math.floor(Math.random() * sentences.length);
    show_sentence.innerHTML = sentences[randomNumber];

    let date = new Date();
    startTime = date.getTime();

    btn.innerText = "Done";

    showTimer();
}

btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case 'start':
            typing_ground.removeAttribute('disabled');
            startTyping();
            break;

        case 'done':
            typing_ground.setAttribute('disabled', 'true');
            endTypingTest();
            break;
    }
});

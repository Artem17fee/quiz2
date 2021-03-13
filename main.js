
var image = document.querySelector(".img-quest img");
var point = document.querySelector(".point");
var optionsMode = document.querySelector(".options");
var inputMode = document.querySelector(".input-mode");
var options = document.querySelectorAll(".options .option");

var mainModal = document.querySelector(".hint-modal");
var closeModalBtn = mainModal.querySelector(".modal-body span");
var modalHint = mainModal.querySelector(".modal-body .theHint");
var hintText = modalHint.querySelector("p");
var gameOver = mainModal.querySelector(".modal-body .gameover");

var scoreDisplay = gameOver.querySelector("p");
var progress = document.querySelector(".quest-num");

var skipBtn = document.querySelector(".prefs .skip");

var input = document.querySelector(".input-mode input");
var submitBtn = document.querySelector(".input-mode button");
var resetBtn = document.querySelector(".resetBtn");


var index = 0;
var score = 0;

var question = [{
        photo: "img/spider-man.jpeg", 
        choices: ["sign", "symbol", "character", "hieroglyph"],
        hint: "У тебя все получится",
        point: 'Что из последующих слов является типом данных в JS?',
        answer: 1

    },
    {
        photo: "img/google.jpeg",
        choices: ["Google", "Microsoft", "Apple", "Facebook",],
        hint: "Можно загуглить пока никто не видит",
        point: 'Какая IT компания создала библиотеку React js?',
        answer: 3

    },
    {
        photo: "img/html.jpeg",
        choices: ["HyperTurbo Markup Language", "HyperText Main Language", "HyperText Markup Language", "HypedText Markup Language"],
        hint: "Можно загуглить пока никто не видит",
        point: 'Как расшифровывается HTML?',
        answer: 2

    },
    {
        photo: "img/shrek1.jpg",
        choices: ["С+", "СC++", "С++", "СС+"],
        hint: "Вдох, выдох", 
        point: 'Что является языком программирования?',
        answer: 2

    },
    {
        photo: "img/frame.jpeg",
        choices: ["Angular", "Vue", "React", "Ember"],
        hint: "Я не смотрел этот сериал, сори",
        point: 'Лого какого JS фреймворка затаилось в название Теории Большого взрыва?',
        answer: 2
    },
    {
        photo: "img/css2.png",
        choices: ["!important", "!forChristSake", "!critical", "!relevant"],
        hint: "Извини, я пас",
        point: 'При добавлении какого модификатора можно повысить приоритет у стиля в CSS?',
        answer: 0

    },
    {
        photo: "img/gosling.jpeg",
        choices: ["‎Brendan Eich", "James Gosling", "Rasmus Lerdorf", "Ryan Gosling"],
        hint: "Один из Гослингов",
        point: 'Кто создатель JS?',
        answer: 0
    },
    {
        photo: "img/hacker.jpeg",
        choices: ["‎XSS", "Man in the middle", "Injection", "VPN"],
        hint: "Ничего не приходит на ум",
        point: 'Что не является атакой на вебсайт?',
        answer: 3
    },
    {
        photo: "img/yoda.jpeg",
        choices: ["call", "bind", "connect", "apply"],
        hint: "О это же Йода! ...По вопросу не подскажу",
        point: 'Какой из этих методов не связан с привязкой контекста к объекту?',
        answer: 2
    },
    {
        photo: "img/cookies.jpeg",
        choices: ["Сookie", "Cash Storage", "Browser Data", "Session Storage"],
        hint: "Я сегодня не в форме",
        point: 'Что в браузере не является местом для хранения информации?',
        answer: 2
    }
   
];




window.addEventListener("keypress", konami);
options.forEach((element) => {
    element.addEventListener("click", check);
});

submitBtn.addEventListener("click", check);
resetBtn.addEventListener("click", replay);

closeModalBtn.addEventListener("click", () => mainModal.style.display = "none");

skipBtn.addEventListener("click", () => {
    if (index < question.length - 1) {
        index++;
        init();
    } else {
        displayScores();
    }
});

var randQuestion = shuffle(question.slice());

function check() {
 let userInput = this.textContent;
 userInput === randQuestion[index].choices[randQuestion[index].answer] ? score++ : "";
 console.log(userInput);
 console.log(randQuestion[index].choices[randQuestion[index].answer]);
    if (index < question.length - 1) {
        index++;
        init();
    } else {
        displayScores();
    }

}

function replay() {
    score = 0;
    index = 0;
    mode = 0;
    modalHint.style.display = "block";
    gameOver.style.display = "none";
    mainModal.style.display = "none";
    init();
}

function displayScores() {
    scoreDisplay.innerText = `You Scored ${score} out of  ${question.length}`
    modalHint.style.display = "none";
    gameOver.style.display = "block";
    mainModal.style.display = "block";
}

function init() {
    progress.innerText = `Question ${ index + 1} of ${question.length}`;
    console.table(randQuestion);
  console.log(index);
    let randOptions = shuffle(randQuestion[index].choices.slice());
    image.src = randQuestion[index].photo;

    for (let i = 0; i < options.length; i++) {
        options[i].innerText = randOptions[i];
    }
    point.innerText = randQuestion[index].point
    hintText.innerText = randQuestion[index].hint;
}

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let rand = Math.ceil(Math.random() * arr.length - 1);
        let temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
    }
    return arr;
}

let luckyWord = "freecodecamp";
let wordArr = [];

function konami(e) {
    wordArr.push(e.key);
    if (wordArr.length > luckyWord.length) {
        wordArr.shift();
    }
    console.log(wordArr);
    if (wordArr.join("").toLowerCase() === luckyWord) {
        console.log("Lucky You");
        hintText.innerText = randQuestion[index].choices[randQuestion[index].answer];
    }
}

init();
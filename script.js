 
 
  setTimeout(function () {
    document.getElementById("loadingScreen").style.display = "none"; 
    document.getElementById("mainContent").style.display = "block"; 
}, 10000); 




// استماع للنقر في أي مكان في الصفحة
document.addEventListener("click", function () {
    // الحصول على عنصر الصوت
    var sound = document.getElementById("click-sound");

    // تشغيل الصوت
    sound.play();
});
var behind = document.getElementById("behind");

behind.addEventListener("click", function () {
    
        document.querySelector(".hide").style.display = "block"; 
        document.querySelector(".lesson").style.display = "none";
        setTimeout(function () {
            document.getElementById("black-screen").style.display = "none";
        }, 6000);
        
});
 


let score = 0;
let highScore = 0;
let questionIndex = 0;
let totalQuestions = 0;

let questions = [
    {
        type: "imageOptions",
        question: "panda ",
        correctIndex: 1,
        images: ["./tool/img/parrot.png", "./tool/img/panda.png", "./tool/img/pen.png"],
        audio: "./tool/sound/panda.mp3"
    },

    {
        type: "imageOptions",
        question: "pen ",
        correctIndex: 1,
        images: ["./tool/img/parrot.png", "./tool/img/pen.png", "./tool/img/panda.png"],
        audio: "./tool/sound/pen.mp3"
    },

    {
        type: "fillInTheBlank",
        question: "_ _rrot",
        image: "./tool/img/parrot.png",
        answer: "pa",
        missingLetters: ["p", "a"],
        audio: "./tool/sound/parrot.mp3"
    },

    {
        type: "imageOptions",
        question: "bear",
        correctIndex: 0,
        images: ["./tool/img/bear.png", "./tool/img/plate.png", "./tool/img/blue.png"],
        audio: "./tool/sound/bear.mp3"
    },


    {
        type: "fillInTheBlank",
        question: "",
        image: "./tool/img/pen.png",
        answer: "pen",
        missingLetters: ["p", "e", "n"],
        audio: "./tool/sound/pen.mp3"
    },

    {
        type: "imageOptions",
        question: " panda ",
        correctIndex: 1,
        images: ["./tool/img/parrot.png", "./tool/img/panda.png", "./tool/img/pen.png"],
        audio: "./tool/sound/panda.mp3"
    },

    {
        type: "fillInTheBlank",
        question: "b _ a _ ",
        image: "./tool/img/bear.png",
        answer: "er",
        missingLetters: ["e", "r"],
        audio: "./tool/sound/bear.mp3"
    },

    {
        type: "imageOptions",
        question: "bed",
        correctIndex: 0,
        images: ["./tool/img/bed.png", "./tool/img/banana.png", "./tool/img/plate.png"],
        audio: "./tool/sound/bed.mp3"
    },


    {
        type: "fillInTheBlank",
        question: "",
        image: "./tool/img/parrot.png",
        answer: "parrot",
        missingLetters: ["p", "a", "r", "r", "o", "t"],
        audio: "./tool/sound/parrot.mp3"
    },

    {
        type: "imageOptions",
        question: "black",
        correctIndex: 2,
        images: ["./tool/img/blue.png", "./tool/img/pen.png", "./tool/img/black.png"],
        audio: "./tool/sound/black.mp3"
    },
    {
        type: "imageOptions",
        question: "plate",
        correctIndex: 1,
        images: ["./tool/img/blue.png", "./tool/img/plate.png", "./tool/img/plane.png"],
        audio: "./tool/sound/plate.mp3"
    },

    {
        type: "fillInTheBlank",
        question: "",
        image: "./tool/img/bed.png",
        answer: "bed",
        missingLetters: ["b", "e", "d"],
        audio: "./tool/sound/bed.mp3"
    },

    {
        type: "imageOptions",
        question: "banana",
        correctIndex: 2,
        images: ["./tool/img/plane.png", "./tool/img/parrot.png", "./tool/img/banana.png"],
        audio: "./tool/sound/banana.mp3"
    },

    {
        type: "imageOptions",
        question: "blue",
        correctIndex: 2,
        images: ["./tool/img/black.png", "./tool/img/pen.png", "./tool/img/blue.png"],
        audio: "./tool/sound/blue.mp3"
    },

    {
        type: "fillInTheBlank",
        question: "_ _ ack",
        image: "./tool/img/black.png",
        answer: "bl",
        missingLetters: ["b", "l"],
        audio: "./tool/sound/black.mp3"
    },

    {
        type: "imageOptions",
        question: "plane",
        correctIndex: 0,
        images: ["./tool/img/plane.png", "./tool/img/parrot.png", "./tool/img/panda.png"],
        audio: "./tool/sound/plate.mp3"
    },

    {
        type: "fillInTheBlank",
        question: "ba_an_",
        image: "./tool/img/banana.png",
        answer: "na",
        missingLetters: ["n", "a"],
        audio: "./tool/sound/banana.mp3"
    },



];


// تحميل السؤال
function loadQuestion() {
    if (questionIndex >= questions.length) {
        endGame();
        return;
    }

    const questionData = questions[questionIndex];
    document.getElementById("question").textContent = questionData.question;
    resetImages(); // إعادة الصورة الأصلية عند تحميل السؤال الجديد

    if (questionData.type === "imageOptions") {
        loadImageOptions(questionData);
    } else if (questionData.type === "fillInTheBlank") {
        loadFillInTheBlank(questionData);
    }
}

// تحميل الخيارات في أسئلة الصور
function loadImageOptions(questionData) {
    document.getElementById("imageOptions").style.display = "flex";
    document.getElementById("fillInTheBlank").style.display = "none";

    const options = document.querySelectorAll(".option");
    options.forEach((img, index) => {
        img.src = questionData.images[index];
        img.dataset.correct = questionData.correctIndex === index;
        img.nextElementSibling.style.display = "none"; // إخفاء ردود الفعل
    });

    const audio = new Audio(questionData.audio);
    setTimeout(function () {
        audio.play();
    }, 2000); 
}

// تحميل أسئلة الكتابة
function loadFillInTheBlank(questionData) {
    document.getElementById("imageOptions").style.display = "none";
    document.getElementById("fillInTheBlank").style.display = "block";

    document.getElementById("blankImage").src = questionData.image;

    const inputFields = document.getElementById("inputFields");
    inputFields.innerHTML = "";

    questionData.missingLetters.forEach((_, index) => {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("input-letter");
        input.maxLength = 1;
        input.addEventListener("input", function () {
            this.value = this.value.toLowerCase();
            if (this.value.length === 1 && index < questionData.missingLetters.length - 1) {
                inputFields.children[index + 1].focus();
            }
        });
        input.addEventListener("keydown", function (e) {
            if (e.key === "Backspace" && this.value === "" && index > 0) {
                inputFields.children[index - 1].focus();
            }
        });
        inputFields.appendChild(input);
    });

    const audio = new Audio(questionData.audio);
    setTimeout(function () {
        audio.play();
    }, 2000); 
}

// تحميل الأصوات للإجابة الصحيحة والخاطئة
const correctAnswerSound = new Audio('./tool/sound/truesoung.wav'); // تأكد من وضع مسار ملف الصوت الصحيح
const wrongAnswerSound = new Audio('./tool/sound/wrong.wav'); // تأكد من وضع مسار ملف الصوت الصحيح أيضًا

// إعادة تعيين الصور
function resetImages() {
    document.getElementById("mainImage").src = "./tool/img/boy.png"; // إعادة الصورة إلى الأصل
}

// التحقق من الإجابات
function checkInput() {
    const inputFields = document.querySelectorAll(".input-letter");
    const answer = questions[questionIndex].answer.split("");
    let allCorrect = true;

    inputFields.forEach((input, index) => {
        const userInput = input.value.toLowerCase();
        if (userInput === answer[index]) {
            input.classList.add("correct");
            input.classList.remove("incorrect");
        } else {
            input.classList.remove("correct");
            input.classList.add("incorrect");
            allCorrect = false;
        }
    });

    if (allCorrect) {
        document.getElementById("mainImage").src = "./tool/img/true.png"; // تغيير الصورة إذا كانت الإجابة صحيحة
        score++;
        correctAnswerSound.play(); // تشغيل صوت الإجابة الصحيحة
        playTransitionSound(); // تشغيل صوت الانتقال
        setTimeout(() => {
            resetImages();
            nextQuestion();
        }, 2000); // الانتظار ثانيتين قبل الانتقال للسؤال التالي
    } else {
        document.getElementById("mainImage").src = "./tool/img/false.png"; // تغيير الصورة إذا كانت الإجابة خاطئة
        wrongAnswerSound.play(); // تشغيل صوت الإجابة الخاطئة
        playTransitionSound(); // تشغيل صوت الانتقال
        setTimeout(() => {
            resetImages();
            nextQuestion();
        }, 2000);
    }

    document.getElementById("doneButton").disabled = false;
}

// الانتقال إلى السؤال التالي مع تأثير الانتقال
function nextQuestion() {
    questionIndex++;
    loadQuestion();
    applyTransitionEffect(); // تطبيق التأثير السلس
}

// تطبيق تأثير الانتقال
function applyTransitionEffect() {
    const quizArea = document.getElementById("quizArea");
    quizArea.classList.add("slide-out"); // إضافة كلاس التأثير

    setTimeout(() => {
        quizArea.classList.remove("slide-out");
        quizArea.classList.add("slide-in"); // العودة بالتأثير للسؤال الجديد

        setTimeout(() => {
            quizArea.classList.remove("slide-in");
        }, 500); // مدة تأثير الدخول
    }, 500); // مدة تأثير الخروج
}

// تشغيل صوت الانتقال
function playTransitionSound() {
    const audio = new Audio('./transition.mp3'); // أضف الصوت المناسب
    audio.play();
}

let answered = false; // متغير لتتبع إذا تم الإجابة على السؤال

// التعامل مع النقر على الصور
function handleImageClick(event) {
    if (answered) return; // منع التفاعل إذا تم الإجابة بالفعل

    const selectedImg = event.currentTarget;
    const isCorrect = selectedImg.dataset.correct === "true";

    if (isCorrect) {
        document.getElementById("mainImage").src = "./tool/img/true.png"; // تغيير إلى صورة صحيحة
        score++;
        correctAnswerSound.play(); // تشغيل صوت الإجابة الصحيحة
        setTimeout(() => {
            resetImages();
            nextQuestion();
        }, 2000); // الانتظار قبل السؤال التالي
    } else {
        document.getElementById("mainImage").src = "./tool/img/false.png"; // تغيير إلى صورة خاطئة
        wrongAnswerSound.play();
        setTimeout(() => {
            resetImages();
            nextQuestion();
        }, 2000); // تشغيل صوت الإجابة الخاطئة
    }

    document.getElementById("score").textContent = score;
    answered = true; // تعيين أن السؤال قد تمت الإجابة عليه
}

// الانتقال إلى السؤال التالي مع إعادة تعيين حالة الإجابة
function nextQuestion() {
    questionIndex++;
    answered = false; // إعادة تعيين حالة الإجابة للسؤال التالي
    loadQuestion();
    applyTransitionEffect(); // تطبيق التأثير السلس
}

document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", handleImageClick);
});

document.getElementById("doneButton").addEventListener("click", function () {
    checkInput();
});

function endGame() {
    document.getElementById("quizArea").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
    document.getElementById("finalHighscore").textContent = highScore;
    document.getElementById("highscore").textContent = highScore;
}

document.getElementById("again").addEventListener("click", function () {
    // إعادة تعيين الـ score والـ questionIndex
    score = 0;
    questionIndex = 0;

    // إظهار منطقة الأسئلة وإخفاء شاشة النهاية
    document.getElementById("quizArea").style.display = "block";
    document.getElementById("endScreen").style.display = "none";

    // تحديث الواجهات النصية
    document.getElementById("score").textContent = score;

    // إعادة تحميل السؤال الأول
    loadQuestion();

    // إعادة تعيين الصورة الرئيسية للصورة الأصلية
    resetImages();
});




document.getElementById("replaySound").addEventListener("click", function () {
    const questionData = questions[questionIndex];
    const audio = new Audio(questionData.audio);
    audio.play();
});



 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 // دالة لتكبير الشاشة
 function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

// دالة لتصغير الشاشة
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}

// تغيير وضعية الشاشة عند الضغط على الزر
document.getElementById('fullscreen-btn').addEventListener('click', function () {
    const icon = this.querySelector('i');
    if (!document.fullscreenElement) {
        openFullscreen(); // تكبير الشاشة
        icon.classList.remove('fa-expand'); // إزالة أيقونة التكبير
        icon.classList.add('fa-compress'); // إضافة أيقونة التصغير
        this.innerHTML = '<i class="fas fa-compress"></i>  '; // تعديل النص والأيقونة معًا
    } else {
        closeFullscreen(); // تصغير الشاشة
        icon.classList.remove('fa-compress'); // إزالة أيقونة التصغير
        icon.classList.add('fa-expand'); // إضافة أيقونة التكبير
        this.innerHTML = '<i class="fas fa-expand"></i>'; // تعديل النص والأيقونة معًا
    }
});


function playSound() {
    var audio = new Audio("./tool/sound/click.mp3"); // ضع مسار الصوت هنا
    audio.play();


}
document.getElementById('start').addEventListener('click', function () {
    // تغيير display إلى grid بعد 2 ثانية
    setTimeout(function () {
        document.getElementById('black-screen').style.display = 'grid';
    }, 2000); // 2 ثانية

    // إخفاء العنصر (display: none) بعد 5 ثواني من ظهوره (أي بعد 7 ثوانٍ)
    setTimeout(function () {
        document.querySelector('.hide').style.display = 'none';
        document.querySelector('.lesson').style.display = 'block';
    }, 7000); // 7 ثوانٍ من بدء الصوت
})


document.getElementById('sound-btn').addEventListener('click', function () {
    const iconSound = this.querySelector('i');
    // Check if the sound is currently muted
    if (iconSound.classList.contains('fa-volume-up')) {
        // Switch to mute
        iconSound.classList.remove('fa-volume-up');
        iconSound.classList.add('fa-volume-mute');
        this.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Update the button icon to mute
        // You can add logic here to mute the sound
    } else {
        // Switch to unmute
        iconSound.classList.remove('fa-volume-mute');
        iconSound.classList.add('fa-volume-up');
        this.innerHTML = '<i class="fas fa-volume-up"></i>'; // Update the button icon to volume-up
        // You can add logic here to unmute the sound
    }
});


function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById("fullscreen-btn").innerHTML = '<i class="fas fa-compress"></i>'; // أيقونة التصغير
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            document.getElementById("fullscreen-btn").innerHTML = '<i class="fas fa-expand"></i>'; // أيقونة التكبير
        }
    }
}


function toggleVisibility() {
    const lessonElement = document.querySelector('.lesson');
    const hideElement = document.querySelector('.hide');

    // إذا كانت lesson تظهر، اجعلها none واجعل hide block
    if (lessonElement.style.display !== 'none') {
        lessonElement.style.display = 'none';
        hideElement.style.display = 'block';
    } else {
        // إذا كانت lesson مخفية، اجعلها تظهر واجعل hide none
        lessonElement.style.display = 'block';
        hideElement.style.display = 'none';
    }
}
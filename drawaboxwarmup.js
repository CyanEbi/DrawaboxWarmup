//TODO: Link to the page about warmups?
//TODO: Prompt to check instructions now and again
//TODO: Icon
//TODO: Hide fishing line below result box

const lessonsradiogroup = document.getElementById("lessonsradiogroup");
const resultbox = document.getElementById("resultbox");
const result = document.getElementById("result");
const instructions = document.getElementById("instructions");
const weightexercises = document.getElementById("weightexercises");
const weightlessons = document.getElementById("weightlessons");
const button = document.getElementById("button");
let lessons;
let nlessons;
let exercisePools;

fetchExercises();

document.addEventListener("keyup", keyboardShortcut);

async function fetchExercises() {
    const response = await fetch("exercises.json");
    lessons = await response.json();
    nlessons = lessons.length;

    // Create lesson radio buttons
    for (let i = 0; i < nlessons; i++) {
        const label = document.createElement("label");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "lesson"
        radio.value = lessons[i].name;
        label.appendChild(radio);
        
        const shortcuttext = document.createElement("span")
        shortcuttext.innerText = `[${(i+1)%10}] `;
        label.appendChild(shortcuttext);
        
        const lessontext = document.createElement("span")
        lessontext.innerText = lessons[i].name;
        label.appendChild(lessontext);
        lessonsradiogroup.appendChild(label);
    }

    lessonsradiogroup.children[0].children[0].checked = true;
    
    generateExercisePools();
}

function generateExercisePools() {
    exercisePools = Array(nlessons);
    exercisePools[0] = lessons[0].exercises;

    for (let i = 1; i < nlessons; i++) {
        exercisePools[i] = exercisePools[i-1].concat(lessons[i].exercises);
    }
}

function pickWarmup() {
    const idx = getRadioGroupIdx(lessonsradiogroup);

    let exercise;

    if (weightexercises.checked) {
        exercise = weighExercisesEqually(idx);
    } else if (weightlessons.checked) {
        exercise = weighLessonsEqually(idx);
    }

    playAnimation(exercise.name);

    instructions.setAttribute("href", exercise.link);
}

async function playAnimation(exercise) {
    if (resultbox.className == "resultboxup") {
        resultbox.className = "resultboxdown";
        await new Promise(r => setTimeout(r, 500));
    }
    
    result.innerText = exercise;
    resultbox.className = "resultboxup";
}

function getRadioGroupIdx(radiogroup) {
    radiobuttons = radiogroup.children;
    for (let i = 0; i < radiobuttons.length; i++) {
        if (radiobuttons[i].children[0].checked) {
            return i;
        }
    }

    return -1;
}

function weighExercisesEqually(idx) {
    const len = exercisePools[idx].length;
    return exercisePools[idx][Math.floor(Math.random() * len)];
}

function weighLessonsEqually(idx) {
    const lesson = lessons[Math.floor(Math.random() * (idx+1))];
    const len = lesson.exercises.length;
    return lesson.exercises[Math.floor(Math.random() * len)];
}

function keyboardShortcut(event) {
    //Pick exercise shortcut
    if (event.key == "Enter") {
        pickWarmup();
    }
    //Lesson shortcut 
    else if ((event.key >= "0") & (event.key <= "9")) {
        const idx = mod(event.key-1, 10);
        lessonsradiogroup.children[idx].children[0].checked = true;
    }
}

//Apparently js does not have a modulo operator
function mod(a, m) {
    return ((a % m) + m) % m;
}
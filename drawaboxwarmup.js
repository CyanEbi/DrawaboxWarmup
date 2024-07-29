//TODO: Keyboard shortcuts? To make the process faster
//TODO: Try putting the image as a background image
//TODO: Improve mask to better fit pool opening
//TODO: Make all exercises fit in the pool opening (shrinking magic or multiline text)
//TODO: Pretty css
//TODO: Link to the page about warmups?
//TODO: Prompt to check instructions now and again
//TODO: Link back to github page

const lessonsradiogroup = document.getElementById("lessonsradiogroup");
const resultbox = document.getElementById("resultbox");
const result = document.getElementById("result");
const instructions = document.getElementById("instructions");
const weightexercises = document.getElementById("weightexercises");
const weightlessons = document.getElementById("weightlessons");
let lessons;
let nlessons;
let exercisePools;

fetchExercises();

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
        
        const span = document.createElement("span")
        span.innerText = lessons[i].name;
        label.appendChild(span);
        lessonsradiogroup.appendChild(label);
    }

    lessonsradiogroup.firstChild.firstChild.checked = true;
    
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

    instructions.innerText = "Instructions";
    instructions.setAttribute("href", exercise.link);
}

async function playAnimation(exercise) {
    if (resultbox.className == "resultboxup") {
        resultbox.className = "resultboxdown";
        await new Promise(r => setTimeout(r, 400));
    }
    
    result.innerText = exercise;
    resultbox.className = "resultboxup";
}

function getRadioGroupIdx(radiogroup) {
    radiobuttons = radiogroup.children;
    for (let i = 0; i < radiobuttons.length; i++) {
        if (radiobuttons[i].firstChild.checked) {
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
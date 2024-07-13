//TODO: Pretty css
//TODO: weigh exercises or lessons equally
//TODO: Radio buttons for stage? Or something else to make selection faster
//TODO: Keyboard shortcuts? To make the process faster
//TODO: Link to the page about warmups?

const select = document.getElementById("dropdown");
const result = document.getElementById("result");
const instructions = document.getElementById("instructions");
let lessons;
let nlessons;
let exercisePools;

fetchExercises();

async function fetchExercises() {
    const response = await fetch("exercises.json");
    lessons = await response.json();
    nlessons = lessons.length;

    for (let i = 0; i < nlessons; i++) {
        const option = document.createElement("option");
        option.text = lessons[i].name;
        select.add(option);
    }
    
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
    const idx = select.selectedIndex;
    const len = exercisePools[idx].length;
    const exercise = exercisePools[idx][Math.floor(Math.random() * len)]
    result.innerText = exercise.name;
    instructions.innerText = "Instructions";
    instructions.setAttribute("href", exercise.link);
}
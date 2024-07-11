const select = document.getElementById("dropdown");
const result = document.getElementById("result");
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
    result.innerText = exercisePools[idx][Math.floor(Math.random() * len)].name;
}
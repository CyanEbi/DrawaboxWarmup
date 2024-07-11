const select = document.getElementById("dropdown");

fetchExercises();

async function fetchExercises() {
    const response = await fetch("exercises.json");
    const lessons = await response.json();
    const nlessons = lessons.length;

    for (let i = 0; i < nlessons; i++) {
        const option = document.createElement("option");
        option.text = lessons[i].name;
        select.add(option);
    }
    
}
const draggables = document.querySelectorAll('.option');
const dropzones = document.querySelectorAll('.dropzone');
const pointCounter = document.querySelector('#pointcounter');
const errCounter = document.querySelector('#errcounter');
const score = document.querySelector('#score');

let wrongDrops = 0;
let rightDrops = 0;
let currentDropzoneIndex = 0;

// Store the correct answers in an object
const correctAnswers = {
    'dropzone-1': 'Worm',
    'dropzone-2': 'Snake',
    'dropzone-3': 'Dog',
    'dropzone-4': 'Cat',
    'dropzone-5': 'Cow',
    'dropzone-6': 'Monkey',
    'dropzone-7': 'Fox',
    'dropzone-8': 'Tiger',
    'dropzone-9': 'Rabbit',
    'dropzone-10': 'Crocodile',
    'dropzone-11': 'Elephant',
    'dropzone-12': 'Lion'
};

// Hide all dropzones except the first one
hideAllDropzones();
dropzones[currentDropzoneIndex].parentElement.style.display = 'flex';

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', event => {
        event.preventDefault();
        dropzone.classList.add('hovered');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('hovered');
    });

    dropzone.addEventListener('drop', event => {
        event.preventDefault();
        const draggable = document.querySelector('.dragging');
        const droppedOn = event.target;

        // Check if the dropped item matches the correct answer
        if (correctAnswers[droppedOn.id] === draggable.innerText) {
            rightDrops++;
            draggable.classList.add('correct');
            draggable.setAttribute('draggable', 'false');

            // Hide the current dropzone and image
            dropzones[currentDropzoneIndex].parentElement.style.display = 'none';

            // Move to the next dropzone and show it
            currentDropzoneIndex++;
            if (currentDropzoneIndex < dropzones.length) {
                dropzones[currentDropzoneIndex].parentElement.style.display = 'flex';
            }
        } else {
            wrongDrops++;
        }

        pointCounter.textContent = `${rightDrops}`;
        errCounter.textContent = `${wrongDrops}`;
        score.textContent = `= ${rightDrops / wrongDrops * 100}`;
        if (score.textContent= `= infinity`){
             score.textContent=`= 1500`
        }
        dropzone.classList.remove('hovered');
    });
});

function hideAllDropzones() {
    dropzones.forEach(dropzone => {
        dropzone.parentElement.style.display = 'none';
    });
}

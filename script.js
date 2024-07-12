const arrayContainer = document.getElementById('array-container');
let array = [];

function generateRandomArray() {
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value*2}px`;
        arrayContainer.appendChild(bar);
    });
}
function openInputDialog() {
    document.getElementById('dialog').style.display = 'block';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

function renderInputArray() {
    const input = document.getElementById('arrayInput').value;
    array = input.split(',').map(Number);
    renderArray();
    closeDialog();
}
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            renderArray();
            await delay(200);
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            renderArray();
            await delay(200);
        }
        array[j + 1] = key;
        renderArray();
        await delay(200);
    }
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
                await delay(200);
            }
        }
    }
}

async function sortArray(algorithm) {
    switch (algorithm) {
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'bubble':
            await bubbleSort();
            break;
        default:
            console.error('Invalid sorting algorithm.');
    }
}

generateRandomArray();

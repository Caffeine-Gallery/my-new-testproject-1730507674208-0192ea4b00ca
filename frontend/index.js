import { backend } from 'declarations/backend';

let currentInput = '';
let firstNumber = null;
let operator = null;
const display = document.getElementById('display');
const loading = document.getElementById('loading');

document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.textContent;
        display.value = currentInput;
    });
});

document.querySelectorAll('.op').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput !== '') {
            if (firstNumber === null) {
                firstNumber = parseFloat(currentInput);
                operator = button.textContent;
                currentInput = '';
            } else {
                calculate();
                operator = button.textContent;
            }
        }
    });
});

document.getElementById('equals').addEventListener('click', calculate);

document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    firstNumber = null;
    operator = null;
    display.value = '';
});

async function calculate() {
    if (firstNumber !== null && currentInput !== '' && operator) {
        const secondNumber = parseFloat(currentInput);
        loading.classList.remove('hidden');
        try {
            let result;
            switch (operator) {
                case '+':
                    result = await backend.add(firstNumber, secondNumber);
                    break;
                case '-':
                    result = await backend.subtract(firstNumber, secondNumber);
                    break;
                case '*':
                    result = await backend.multiply(firstNumber, secondNumber);
                    break;
                case '/':
                    result = await backend.divide(firstNumber, secondNumber);
                    break;
            }
            display.value = result;
            firstNumber = result;
            currentInput = '';
        } catch (error) {
            display.value = 'Error';
        } finally {
            loading.classList.add('hidden');
        }
    }
}

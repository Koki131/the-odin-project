

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#result");



let sum = 0;

let count = 0;
let decimalCount = 0;
let plusMinusCount = 0;
let arr = ['', '', ''];
let op = '';
let isOp = false;
let str = "";



function Calculator() {

    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '/': (a, b) => a / b,
        '*': (a, b) => a * b,
        'mod': (a, b) => a % b,
        'pow': (a, b) => a ** b,
        '': (a, b) => 0
    };

}

let calculator = new Calculator();

buttons.forEach(button => {



    button.addEventListener("click", function() {

        

        if (button.textContent === 'C') {
            
            display.textContent = 0;
            op = '';
            count = 0;
            decimalCount = 0;
            
            for (let i = 0; i < arr.length; i++) {
                arr[i] = '';
            }
            
            isOp = false;
        }
        
        if (button.textContent === '=') {

            let calc = calculator.methods[arr[1]](+arr[0], +arr[2]);
            let fixedDecimal = Number(calc).toFixed(3);
            

            sum = fixedDecimal; 

            display.textContent = sum;
            sum = 0;
            op = '';
            count = 0;
            decimalCount = 0;
            
            for (let i = 0; i < arr.length; i++) {
                arr[i] = '';
            }
            
            isOp = false;
        }

        if (count == 0) {
            
            if (!isOp && (!isNaN(button.textContent) || button.textContent === '.' || button.textContent === '±') ) {

                preventDecimal(button, 0); 


            } else if (button.textContent != '=' && arr[0] != '' && !isOp && isNaN(button.textContent)) {
    
                arr[1] = button.textContent;
                decimalCount = 0;
    
                isOp = true;
    
            } else if (arr[0] != '' && isOp && (!isNaN(button.textContent) || button.textContent === '.')) {
    
                preventDecimal(button, 2); 

                
    
            } 

        } else {
            
            if (!arr[2].includes('.') && button.textContent === '.') {

                decimalCount = 0;
            
            }


            if (!isNaN(button.textContent) || button.textContent === '.') {

                preventDecimal(button, 2); 
            
            }
 
        }
       

        

        if (button.textContent != '=') {

            display.textContent = arr[0] + ' ' + arr[1] + ' ' + arr[2];
        
        }
        
 

        if (button.textContent != '=' && arr[2] != '' && (isNaN(button.textContent) && button.textContent != '.' && button.textContent != '±')) {

            
            let calc = calculator.methods[arr[1]](+arr[0], +arr[2]);
            let fixedDecimal = Number(calc).toFixed(3);

            arr[0] = fixedDecimal;
            sum = fixedDecimal;

            arr[2] = '';

            op = button.textContent;

            arr[1] = op;

            
            isOp = false;
            count++;
            display.textContent = sum;



        }

        

    });
    
});


function preventDecimal(button, index) {
    
    addPlusMinus(button, index);

    if (button.textContent === '.' && arr[index].includes('.')) {

        arr[index].replace('.', '.');
    
    } else {
      
        if (arr[index].includes('.')) {

            if (decimalCount < 6) {

                decimalCount++;
                arr[index] += button.textContent;


            } else {

                alert("Maximum 6 decimal points allowed");

            }
        
        } else {
            if (button.textContent != '±') {
                arr[index] += button.textContent;
            }
            

        
        }

        
    
    }
}

 
function addPlusMinus(button, index) {

    if (button.textContent === '±') {

        if (!arr[index].includes('-') && (isNaN(arr[index].charAt(0)) || arr[index].charAt(0) === '')) {

            arr[index] = arr[index].substring(1);
            arr[index] = '-' + arr[index];
        
        }
        
        if (!arr[index].includes('-') && (!isNaN(arr[index].charAt(0)))) {

            arr[index] = '-' + arr[index];

        }

        if (plusMinusCount % 2 === 0) {

            arr[index] = arr[index].replace('-', '+');


        } else {

            arr[index] = arr[index].replace('+', '-');
            plusMinusCount = 1;

        }

        plusMinusCount++;
    }
}


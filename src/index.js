function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    
    // Передалаем в ОПЗ

    var arr = [];
    var Out = '';
    var number;

    function Prioritet(a) {
        switch(a) {
            case '*': return 3;
            case '/': return 3;
            case '+': return 2;
            case '-': return 2;
            case '(': return 1;            
        }
        return 0;
    }



    for (var i = 0; i < str.length; i++) {

        if (str[i] === ' ') continue;

        if (str[i] === '(' ) {

            arr.push('(');
            continue;
        }

        if (str[i] === ')' ) {   
            
            if (arr.length === 0) {
                throw new Error('ExpressionError: Brackets must be paired');               
            }

            while(arr[arr.length - 1] !== '(') {

                // если уже достали ласт элемент, а открывающей скобки нету
                if ( arr.length  === 1)  throw new Error('ExpressionError: Brackets must be paired');                   
                
                Out +=  arr.pop();                
            }
            arr.pop(); // достаем открывающую скобку
            continue;
        }

        if (str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/') {

            while (arr.length !== 0 && ( Prioritet(arr[arr.length - 1]) >=  Prioritet(str[i])  ) ) {

                Out += arr.pop();
            }

            arr.push(str[i]);
            continue;
        }   
        
        if ( (str[i+1] !== undefined && str[i+1] !== ' ' && str[i+1] >= 0)  &&  ( str[i+2] !== undefined && str[i+2] !== ' ' && str[i+2] >= 0  )  ) {

            number = (str[i] + str[i+1] + str[i+2]) + ' ';
            i += 2;

        } else  if ( (str[i+1] !== undefined && str[i+1] !== ' ' && str[i+1] >= 0) ){

            number = (str[i] + str[i+1]) + ' ';
            i++;

        } else {    // однозначное
            number = str[i] + ' ';
        }

        Out += number;
        continue;
    }
    // Достаем оставшиеся знаки из стека
    while (arr.length !== 0) {

        if (arr[arr.length - 1] === '(')
            throw new Error('ExpressionError: Brackets must be paired');
        Out += arr.pop();
    }

    var n2, n1, result;

    for (let i = 0; i < Out.length; i++) {

        if (Out[i] === ' ') continue;

        if ( Out[i] >= 0 ) {  // Проверка на число

            if (Out[i + 1] >= 0 && Out[i+1] !== ' ' && Out[i+2] >= 0 && Out[i+2] !== ' ' ) {

                number = ( Out[i] + Out[i+1] + Out[i+2] ) * 1;
                i += 2;
            } else if (Out[i + 1] >= 0) {
                number = ( Out[i] + Out[i+1] ) * 1;
                i++;
            } else {
                number = Out[i]  * 1;
            }
            arr.push(number);

        } else {
            
            n2 = arr.pop();
            n1 = arr.pop();

            switch(Out[i]) {
                case '+': result = n1 + n2; break;
                case '-': result = n1 - n2; break;
                case '*': result = n1 * n2; break;
                case '/': if (n2 === 0) throw new Error('TypeError: Division by zero.');result = n1 / n2; break;
                default: console.log('Error!');
            }
            // Вовзращаем результат в стек
            arr.push(result);            
        }
    }   
    return arr[0];
}

module.exports = {
    expressionCalculator
}
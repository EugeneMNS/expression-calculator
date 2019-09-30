function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    
    // Передалаем в ОПЗ

    //var str = '1 + 2) * 3';

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

        if (str[i] === '(') {

            arr.push('(');
            continue;
        }

        if (str[i] === ')') {            

            while(arr[arr.length - 1] !== '(') {

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
        
        // Если это число
        // двузначное
        if (str[i+1] !== undefined && str[i+1]){
            //console.log('    ' + i +  '    ' + str[i]);
            number = (str[i] + str[i+1]) + ' ';
            i++;
        } else {    // однозначное
            //console.log(i +  '    ' + str[i]);
            number = str[i] + ' ';
        }

        Out += number;
        continue;
    }
    // Достаем оставшиеся знаки из стека
    while (arr.length !== 0) {
        Out += arr.pop();
    }

    //console.log(Out);

    var n2, n1, result;

    for (let i = 0; i < Out.length; i++) {

        if (Out[i] === ' ') continue;

        if ( Out[i] >= 0 ) {  // Проверка на число

            //console.log(Out[i] + '    ' +  Out[ i + 1 ]);
            if (Out[i + 1] >= 0) {
                number = ( Out[i] + Out[i+1] ) * 1;
                i++;
            } else {
                number = Out[i]  * 1;
            }
            //console.log('number -   ' + number);
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
    //console.log(Out);
    //console.log(arr);
    return arr[0];
}

module.exports = {
    expressionCalculator
}
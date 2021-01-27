import peg from 'pegjs';
import { grammar } from '../files/MathGrammar.json';

const precision = 12;
const pegParser = peg.generate(grammar);

export const allDigits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E',
    'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const buildExpression = (str) => {
    try {
        if (!str) return '';
        const expression = pegParser.parse(str);
        return expression;
    } catch (ex) {
        return 'Parse Error';
    }
};

const roundPrecision = (num) => {
    return parseFloat(num.toPrecision(precision));
}

//Convert string to base 10 float
const parseBaseFloat = (str, radix) => {
    const baseDigits = allDigits.slice(0, radix + 1);
    
    for (const c of str) {
        if (!baseDigits.includes(c) && c !== '.' && c !== '-') return NaN;
    }
    var parts = str.split(".");
    if (parts.length > 1)
    {
        const left = parseInt(parts[0], radix);
        const right = parseInt(parts[1], radix) / Math.pow(radix, parts[1].length) * (str[0] === '-' ? -1 : 1);
        return left + right;
    }
    return roundPrecision(parseInt(parts[0], radix));
}

const calculateExpression = (expression, base) => {
    let result = 0;
    if (typeof expression === 'object') {
        const left = parseBaseFloat(calculateExpression(expression.left, base), base);
        const right = parseBaseFloat(calculateExpression(expression.right, base), base);
        
        switch (expression.operator) {
            case '^':
                result = Math.pow(left, right);
                break;
            case '*':
                result = left * right;
                break;
            case '%':
                result = left % right;
                break;
            case '/':
                result = left / right;
                break;
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
        }

    } else if (expression === 'π' || expression === '-π')
        result = Math.PI * (expression[0] === '-' ? -1 : 1);
    else if (expression === 'e' || expression === '-e')
        result = Math.E * (expression[0] === '-' ? -1 : 1);
    else
        result = parseBaseFloat(expression, base);

    if (isNaN(result)) return 'NaN';
    
    return roundPrecision(result).toString(base).toUpperCase();
};

export const calculate = (str, base) => {
    try {
        if (!str) return '';

        str = str.replace(/ /g, ''); //Get rid of whitespace
        const expression = buildExpression(str);
        if (expression === 'Parse Error') return expression;
        
        const result = calculateExpression(expression, base);
        return result;
    } catch (ex) {
        return 'Calculate Error';
    }
}

export const convertBase = (str, fromBase, toBase) => {
    if (!str) return '';

    const baseTenNum = parseBaseFloat(str, fromBase);
    const newNumberStr = roundPrecision(baseTenNum).toString(toBase).toUpperCase();
    return newNumberStr;
}
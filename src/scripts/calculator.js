import peg from 'pegjs';
import { grammar } from '../files/MathGrammar.json';

const precision = 12;
const pegParser = peg.generate(grammar);

const buildExpression = (str) => {
    try {
        if (!str) return '';
        const expression = pegParser.parse(str);
        return expression;
    } catch (ex) {
        console.log(ex);
        return 'Parse Error';
    }
};

const roundPrecision = (num) => {
    return parseFloat(num.toPrecision(precision));
}

//Convert string to base 10 float
const parseBaseFloat = (str, radix) => {
    var parts = str.split(".");
    if (parts.length > 1)
    {
        return roundPrecision(parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length));
    }
    return roundPrecision(parseInt(parts[0], radix));
}

const calculateExpression = (expression, base) => {
    if (typeof expression === 'object') {
        const left = parseBaseFloat(calculateExpression(expression.left, base), base);
        const right = parseBaseFloat(calculateExpression(expression.right, base), base);

        switch (expression.operator) {
            case '^':
                return roundPrecision(Math.pow(left, right)).toString(base).toUpperCase();
            case '*':
                return roundPrecision(left * right).toString(base).toUpperCase();
            case '%':
                return roundPrecision(left % right).toString(base).toUpperCase();
            case '/':
                return roundPrecision(left / right).toString(base).toUpperCase();
            case '+':
                return roundPrecision(left + right).toString(base).toUpperCase();
            case '-':
                return roundPrecision(left - right).toString(base).toUpperCase();
        }

    } else if (expression === 'π')
        return Math.PI.toString(base).toUpperCase();
    else if (expression === 'e')
        return Math.E.toString(base).toUpperCase();
    else
        return expression;
};

export const calculate = (str, base) => {
    try {
        if (!str) return '';

        str = str.replace(/ /g, ''); //Get rid of whitespace
        const expression = buildExpression(str);
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
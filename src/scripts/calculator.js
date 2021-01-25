import peg from 'pegjs';
import { grammar } from '../files/MathGrammar.json';

const precision = 12;
const pegParser = peg.generate(grammer);

const buildExpression = (str) => {
    expression = pegParser.parse(str);
    return expression;
};

//Convert string to base 10 float
const parseBaseFloat = (str, radix) => {
    var parts = str.split(".");
    if (parts.length > 1)
    {
        return Math.parseFloat((parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length)).toPrecision(precision));
    }
    return Math.parseFloat((parseInt(parts[0], radix)).toPrecision(precision));
}

const calculateExpression = (expression, base) => {
    if (typeof expression === 'object') {
        left = parseBaseFloat(calculateExpression(expression.left, base), base);
        right = parseBaseFloat(calculateExpression(expression.right, base), base);

        switch (expression.operation) {
            case '^':
                return Math.pow(left, right).toString(base).toUpperCase();
            case '*':
                return (left * right).toString(base).toUpperCase();
            case '%':
                return (left % right).toString(base).toUpperCase();
            case '/':
                return (left / right).toString(base).toUpperCase();
            case '+':
                return (left + right).toString(base).toUpperCase();
            case '-':
                return (left - right).toString(base).toUpperCase();
        }

    } else if (expression === 'π')
        return Math.PI.toString(base).toUpperCase();
    else if (expression === 'e')
        return Math.E.toString(base).toUpperCase();
    else
        return expression;
};

export const calculate = (str, base) => {
    str = str.replace(/ /g, ''); //Get rid of whitespace
    const expression = buildExpression(str);
    const result = calculateExpression(expression, base);
    return result;
}

export const convertBase = (str, fromBase, toBase) => {
    const baseTenNum = parseFloat(str, fromBase);
    const newNumberStr = baseTenNum.toString(toBase).toUpperCase();
    return newNumberStr;
}
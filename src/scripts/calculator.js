import peg from 'pegjs';
import { grammar } from '../files/MathGrammar.json';

const precision = 12;

const buildExpression = (str) => {
    const pegParser = peg.generate(grammar);
    expression = pegParser.parse(str);
    return expression;
};

//Convert string to base 10 float
const parseBaseFloat = (str, radix) => {
    var parts = str.split(".");
    if ( parts.length > 1 )
    {
        return Math.parseFloat((parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length)).toPrecision(precision));
    }
    return Math.parseFloat(parseInt(parts[0], radix)).toPrecision(precision));
}

export const calculate = (expresson) => {

};

export const convertBase = (str, fromBase, toBase) => {
    const baseTenNum = parseFloat(str, fromBase);
    const newNumberStr = baseTenNum.toString(toBase);
    return newNumberStr;
}
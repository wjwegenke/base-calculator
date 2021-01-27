expression = additive

additive
  = first:multiplicative rest:(('+' / '-') multiplicative)+ {
    return rest.reduce(function(memo, curr) {
        return {operator: curr[0], left: memo, right: curr[1]};
    }, first);
  }
  / multiplicative

multiplicative
  = first:exponent rest:(('*' / '%' / '/' / !'-') exponent)+ {
    return rest.reduce(function(memo, curr) {
        return {operator: curr[0] || '*', left: memo, right: curr[1]};
    }, first);
  }
  / exponent

exponent
  = first:primary rest:(('^') primary)+ {
    return rest.reduce(function(memo, curr) {
        return {operator: curr[0], left: memo, right: curr[1]};
    }, first);
  }
  / primary

primary
  = number
  / '(' additive:additive ')' { return additive; }

number
  = negative:'-'? digits:[0-9A-Z]* point:'.' decimals:[0-9A-Z]+ { return (negative || '') + (digits.length ? digits.join('') : '0') + point + decimals.join(''); }
  / negative:'-'? digits:[0-9A-Z]+ { return (negative || '') + digits.join(''); }
  / negative:'-'? symbol:[eπ] { return (negative || '') + symbol }
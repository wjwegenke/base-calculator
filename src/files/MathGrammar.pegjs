expression = additive

additive
  = first:multiplicative rest:(('+' / '-') multiplicative)+ {
    return rest.reduce(function(memo, curr) {
        return {operator: curr[0], left: memo, right: curr[1]};
    }, first);
  }
  / multiplicative

multiplicative
  = first:exponent rest:(('*' / '%' / '/' / '') exponent)+ {
    return rest.reduce(function(memo, curr) {
        if (curr.length === 0)
            return {operator: '*', left: memo, right: curr[0]};
        return {operator: curr[0], left: memo, right: curr[1]};
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
  = digits:[0-9A-Z]+ { return digits.join(''); }
  / digits:[0-9A-Z]+ point:'.' decimals:[0-9A-Z]+ { return digits.join('') + point + decimals.join(''); }
  / symbol:[eπ] { return symbol }
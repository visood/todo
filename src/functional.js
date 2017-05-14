var flatten = function(xss) {
    return [].concat.apply([], xss);
};

var filter = function(f, xs) {
    var ys = [];
    xs.forEach(function(x) {
        if (f(x)) {ys.push(x);}
    });
    return ys;
};

var unique = function(xs) {
    var uxs = [];
    xs.forEach(function(x) {
        if (uxs.indexOf(x) === -1) {uxs.push(x);}
    });
    return uxs;
};

module.exports = {
    "flatten" : flatten,
    "filter"  : filter,
    "unique"  : unique
};

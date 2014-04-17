

var array = [2, 4, 5, 6, 7, 4, 3, 3, 2, 2, 1, 5, 6];
var unique = [];
var unique = _.uniq(array);

var stooges = [
    {name: 'curly', age: 25},
    {name: 'moe', age: 21},
    {name: 'larry', age: 23}
];
var youngest = _.chain(stooges)
    .sortBy(function (stooge) {
        return stooge.age;
    })
    .map(function (stooge) {
        return stooge.name + ' is ' + stooge.age;
    })
    .first()
    .value();
console.log(youngest);
//=> "moe is 21"
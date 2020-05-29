const mp = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Historical Fiction",
    "Magical Realism",
    "Mystery",
    "Paranoid Fiction",
    "Philosophical",
    "Political",
    "Romance",
    "Saga",
    "Sattire",
    "Science Fiction",
    "Speculative",
    "Thriller",
    "Urban",
    "Western"
];
console.log(mp.findIndex((genre) => {
    return genre === "Adventure";
}
))

var ratings = new Array(21);
var row = 5;
for (let i = 0; i < row; i++) {
    ratings[i] = new Array(21);
}
for (let i = 0; i < row; i++) {
    for (let j = 0; j < 21; j++) {
        ratings[i][j] = Math.round(Math.random());
    }
}

var similarity_factor = function (i, j) {
    var numerator = 0;
    var denominator = 0;
    var xi_2 = 0;
    var yi_2 = 0;
    for (var k = 0; k < ratings.length; k++) {
        numerator += ratings[i][k] * ratings[j][k];
        xi_2 += ratings[i][k] * ratings[i][k];
        yi_2 += ratings[j][k] * ratings[j][k];
    }
    denominator = Math.sqrt(xi_2) * Math.sqrt(yi_2);
    return ((numerator / denominator).toFixed(3));
}
var cosine_similarity = new Array(row);
for (var i = 0; i < row; i++) {
    cosine_similarity[i] = new Array(row);
}
for (var i = 0; i < row; i++) {
    for (var j = 0; j < row; j++) {
        cosine_similarity[i][j] = similarity_factor(i, j);
    }
}

console.log(cosine_similarity);





const fs = require("fs");

const dataStr = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(dataStr);

const genreInput = process.argv.slice(2).at(0).toLocaleLowerCase();
/*
Results:
- Inception (2010) - 8.8
- Interstellar (2014) - 8.6

Top Picks by Genre:
- Action: The Dark Knight (9.0)
- Drama: The Dark Knight (9.0)
- Sci-Fi: Inception (8.8)
*/

const topPickByGenre = {};

data.forEach(function (movie) {
  // Loging movies list by specific genre
  if (movie.genre.map((str) => str.toLocaleLowerCase()).includes(genreInput)) {
    console.log(`- ${movie.title} (${movie.year}) - ${movie.rating}`);
  }

  // Picking Top Movie by Genre
  movie.genre.forEach(function (genre) {
    if (topPickByGenre[genre] === undefined) {
      topPickByGenre[genre] = { title: "", rating: 0 };
    }

    if (topPickByGenre[genre].rating < movie.rating) {
      topPickByGenre[genre].title = movie.title;
      topPickByGenre[genre].rating = movie.rating;
    }
  });
});

/*
{
  'Sci-Fi': { title: 'Inception', rating: 8.8 },
  Action: { title: 'The Dark Knight', rating: 9 },
  Drama: { title: 'The Dark Knight', rating: 9 },
  Mystery: { title: 'The Prestige', rating: 8.5 }
}

Top Picks by Genre:
- Action: The Dark Knight (9.0)
- Drama: The Dark Knight (9.0)
- Sci-Fi: Inception (8.8)
*/

console.log("Top Picks by Genre:");

for (let genre in topPickByGenre) {
  const { title, rating } = topPickByGenre[genre];
  console.log(`- ${genre}: ${title} (${rating})`);
}

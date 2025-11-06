const fs = require("fs");

const stopwords = new Set([
  "a",
  "an",
  "and",
  "the",
  "is",
  "are",
  "was",
  "were",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "as",
  "by",
  "this",
  "that",
  "it",
  "from",
  "or",
  "be",
  "has",
  "have",
  "had",
  "not",
  "but",
  "if",
  "so",
  "then",
  "their",
  "they",
  "there",
  "which",
  "who",
  "what",
  "when",
  "where",
  "how",
  "why",
  "you",
  "your",
]);

const dataStr = fs.readFileSync("data.json", "utf-8");
const posts = JSON.parse(dataStr);

/*
-----------------------------------------
        SOCIAL MEDIA POST ANALYZER
-----------------------------------------
Total Posts: 4
Unique Users: 3

Top Contributors:
1. Aarav - 2 posts
2. Sneha - 1 post
3. Riya - 1 post

Trending Hashtags:
- #JavaScript (3 times)
- #Coding (2 times)
- #NodeJS (1 time)
- #React (1 time)

Most Used Words (Excluding Stopwords):
- javascript (3)
- coding (2)
- practice (1)
- nodejs (1)
-----------------------------------------
*/

// key-value pair
// Hash-Map => Map(key-value), Object(key-value)
// Hash-Set => Set

/*
[
  "Arnav" : 
]
*/

const users = new Map();
posts.forEach(function ({ user }) {
  if (!users.has(user)) {
    users.set(user, 0);
  }
  users.set(user, users.get(user) + 1);
});

console.log(`
Total Posts: ${posts.length}
Unique Users: ${users.size}
`);

// Loop Map using For...of loop
// let count = 1;
// for (const keyValArr of users) {
//   const [key, value] = keyValArr;
//   console.log(`${count++}. ${key} - ${value} posts`);
// }

// Loop Map using ForEach
let count = 1;
users.forEach(function (value, key) {
  console.log(`${count++}. ${key} - ${value} posts`);
});

const hashtags = new Map();
posts.forEach(function ({ post }) {
  post.match(/#\w+/g).forEach(function (hashtag) {
    if (!hashtags.has(hashtag)) {
      hashtags.set(hashtag, 0);
    }
    hashtags.set(hashtag, hashtags.get(hashtag) + 1);
  });
});

hashtags.forEach(function (value, key) {
  console.log(`- ${key} (${value} times)`);
});

const stopWordsSet = new Set([
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can't",
  "cannot",
  "could",
  "couldn't",
  "did",
  "didn't",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn't",
  "has",
  "hasn't",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "mustn't",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "shouldn't",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "wasn't",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "weren't",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "won't",
  "would",
  "wouldn't",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
]);

const usedCount = new Map();
posts.forEach(function ({ post }) {
  post.match(/(?<=#?)[A-Za-z]+/g).forEach(function (word) {
    if (!stopWordsSet.has(word)) {
      if (!usedCount.has(word)) {
        usedCount.set(word, 0);
      }
      usedCount.set(word, usedCount.get(word) + 1);
    }
  });
});

Array.from(usedCount)
  .sort((a, b) => b.at(1) - a.at(1))
  .slice(0, 5)
  .forEach(function ([word, count]) {
    console.log(`-${word}(${count})`);
  });

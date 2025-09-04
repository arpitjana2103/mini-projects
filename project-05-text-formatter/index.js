const str =
  "    Welcome  to  the   JavaScript   World!!!   Learn,   Code Code Code,    Build.  ";

const formatWord = function (word) {
  return word
    .split("")
    .filter(function (ch) {
      const charCode = ch.toLowerCase().charCodeAt(0);
      return charCode >= 97 && charCode <= 122;
    })
    .join("");
};

const cleanedText = str
  .trim()
  .split(" ")
  .filter(function (ele) {
    return ele !== "";
  })
  .map(function (word) {
    return formatWord(word);
  })
  .join(" ");

const wordCount = cleanedText.split(" ").length;
const uniqueWordCount = new Set(cleanedText.split(" ")).size;
const totalCharacters = cleanedText.replaceAll(" ", "").length;
const includesJavaScript = cleanedText.includes("JavaScript");
const sentenceCase = cleanedText
  .split("")
  .map(function (ch, i) {
    if (i === 0) return ch.toUpperCase();
    else return ch.toLowerCase();
  })
  .join("");

const titleCase = cleanedText
  .split(" ")
  .map(function (word) {
    return word
      .split("")
      .map(function (ch, i) {
        if (i === 0) return ch.toUpperCase();
        else return ch.toLowerCase();
      })
      .join("");
  })
  .join(" ");

/*
-----------------------------------------
        TEXT FORMATTER & ANALYZER
-----------------------------------------
Original Text:
"    Welcome  to  the   JavaScript   World!!!   Learn,   Code, Code    Build.  "

Cleaned Text:
"Welcome to the JavaScript World Learn Code Code Build"

Statistics:
- Total Words: 9
- Unique Words: 8
- Total Characters (No Spaces): 50
- Does it include 'JavaScript'? Yes
- Sentence Case: "Welcome to the javascript world learn code build"
- Title Case: "Welcome To The Javascript World Learn Code Build"
-----------------------------------------

*/

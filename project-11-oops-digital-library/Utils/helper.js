const getRandomNumber = function (min, max) {
    const range = max - min;
    const value = Math.round(Math.random() * range) + min;
    return value;
};

exports.createId = function () {
    const alpha = String.fromCharCode(
        getRandomNumber(65, 90),
        getRandomNumber(65, 90),
        getRandomNumber(65, 90),
        getRandomNumber(65, 90)
    );
    const num = getRandomNumber(1000, 9999);
    return `${alpha}-${num}`;
};

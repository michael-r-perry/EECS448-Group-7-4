/**
 * gets UNIX timestamps of midnight tonight in seconds
 * @returns {number} UNIX timestamp
 */
function getUNIXMidnightTonight() {
    let t = new Date();
    t.setHours(24,0,0,0);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

/**
 * gets UNIX timestamps of midnight this morning in seconds
 * @returns {number} UNIX timestamp
 */
function getUNIXMidnightMorning() {
    let t = new Date();
    t.setHours(0,0,0,0);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

/**
 * gets UNIX timestamps of midnight seven days ago in seconds
 * @returns {number} UNIX timestamp
 */
function getUNIXFiveDaysAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setDate(t.getDate() - 7);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

/**
 * gets UNIX timestamps of midnight one month ago in seconds
 * @returns {number} UNIX timestamp
 */
function getUNIXOneMonthAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setMonth(t.getMonth() - 1);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

/**
 * gets UNIX timestamps of midnight three months ago in seconds
 * @returns {number} UNIX timestamp
 */
function getUNIXThreeMonthsAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setMonth(t.getMonth() - 3);
    return t.getTime() / 1000;
}

/**
 * gets UNIX timestamps of midnight six months ago in seconds
 * @returns {number} UNIX timestamp
 */
function getUNIXSixMonthsAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setMonth(t.getMonth() - 6);
    return t.getTime() / 1000;
}

/**
 * gets UNIX timestamps of midnight one year ago in seconds
 * @returns {number} UNIX timestamp
 */
function getUNIXOneYearAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setFullYear(t.getFullYear() - 1);
    return t.getTime() / 1000;
}

/**
 * converts UNIX timestamp in seconds to ISO date format string
 * @param {number} unix - UNIX timestamp in seconds
 * @returns {string} ISO date format
 */
function UNIXtoISOConversion(unix) {
    return new Date(unix * 1000).toISOString();
}

/**
 * gets today's date in YYYY-MM-DD format
 * @returns {string} current YYYY-MM-DD date
 */
function formatDate(date) {
    var fixDate = new Date(date),
        month = '' + (fixDate.getMonth() + 1),
        day = '' + fixDate.getDate(),
        year = fixDate.getFullYear();
    if(month.length < 2){
        month = '0' + month;
    }
    if(day.length < 2){
        day = '0' + day;
    }
    return [year, month, day].join('-');
}

/**
 * creates array of rgba value string of num size (repeating six colors)
 * @param {number} num - number of colors needed
 * @returns {Array.<string>} array of rgba values
 */
function CreateBackgroundColors(num) {
    let x = 0;
    let colors = [ 
        'rgba(0, 204, 58, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];
    let bgc = [];
    for (let i = 0; i < num; i++) {
        bgc.push(colors[x]);
        x++;
        if (x > 5) { x = 0; }
    }
    return bgc;
}

/**
 * creates array of rgba value string of num size (repeating six colors)
 * @param {number} num - number of colors needed
 * @returns {Array.<string>} array of rgba values
 */
function CreateBorderColors(num) {
    let x = 0;
    let colors = [
        'rgba(0, 204, 58,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];
    let bc = [];
    for (let i = 0; i < num; i++) {
        bc.push(colors[x]);
        x++;
        if (x > 5) { x = 0; }
    }
    return bc;
}

/**
 * gets the index of the Currency whose ticker is equal to the given ticker
 * @param {Array.<Currency>} currencies - watch list currencies
 * @param {string} ticker - ticker value to search
 * @returns {number} index of ticker
 */
function getIndexOfTicker(currencies, ticker) {
    for (let i = 0; i < currencies.length; i++) {
        if (currencies[i].getTicker() == ticker) {
            return i;
        }
    }
    return -1;
}

/**
 * Checks if the given ticker corresponds to a Currecy object in watch list
 * @param {Array.<Currency>} currencies - watch list currencies
 * @param {string} ticker - ticker value to search
 * @returns {boolean} is ticker in watch list
 */
function isTickerInWatchList(currencies, ticker) {
    for (let i = 0; i < currencies.length; i++) {
        if (currencies[i].getTicker() == ticker) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if ticker is a crypto by whether it contains a ':'
 * @param {string} ticker - ticker value to check
 * @returns {boolean} is ticker a crypto
 */
function isCrypto(ticker) {
    return ticker.includes(":");
}
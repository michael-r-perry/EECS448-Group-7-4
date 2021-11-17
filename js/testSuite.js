function runTest() {
    // Test 1 getUNIXMidnightTonight
    let t1 = getUNIXMidnightTonight();
    console.log("TEST 1: getUnixMidnightTonight should return UNIX midnight for tonight: " + new Date(t1 * 1000));

    // Test 2 getUNIXMidnightMorning
    let t2 = getUNIXMidnightMorning();
    console.log("TEST 2: getUNIXMidnightMorning should return UNIX midnight from this morning: " + new Date(t2 * 1000));

    // Test 3 getUNIXFiveDaysAgo
    let t3 = getUNIXFiveDaysAgo();
    console.log("TEST 3: getUNIXFiveDaysAgo should return UNIX midnight form morning 7 days ago: " + new Date(t3 * 1000));

    // Test 4 getUNIXOneMonthAgo
    let t4 = getUNIXOneMonthAgo();
    console.log("TEST 4: getUNIXOneMonthAgo should return UNIX midnight from morning 1 month ago: " + new Date(t4 * 1000));

    // Test 5 getUNIXThreeMonthsAgo
    let t5 = getUNIXThreeMonthsAgo();
    console.log("TEST 5: getUNIXThreeMonthsAgo should return UNIX midnight from morning 3 months ago: " + new Date(t5 * 1000));

    // Test 6 getUNIXSixMonthsAgo
    let t6 = getUNIXSixMonthsAgo();
    console.log("TEST 6: getUNIXSixMonthsAgo should return UNIX midnight from morning 6 months ago: " + new Date(t6 * 1000));

    // Test 7 getUNIXOneYearAgo
    let t7 = getUNIXOneYearAgo();
    console.log("TEST 7: getUNIXOneYearAgo should return UNIX midngith from morning 1 year ago: " + new Date(t7 * 1000));

    // Test 8 UNIXtoISOConversion
    console.log("TEST 8: UNIXtoISOConversion should return ISO string of midnight this morning: " + UNIXtoISOConversion(t2));

    // Test 9 formatDate
    console.log("TEST 9: formatDate should return YYYY-MM-DD format of todays date: " + formatDate(new Date));

    // Test 10 CreateBackgroundColors
    console.log("TEST 10: CreateBackgroundColors should return 10 colors if given parameter 10: " + (CreateBackgroundColors(10).length == 10));

    // Test 11 CreateBackgroundColors
    console.log("TEST 11: CreateBackgroundColors should return 12 colors if given parameter 12 and colors should repeat every 6: " + CreateBackgroundColors(12));

    // Test 12 CreateBorderColors
    console.log("TEST 12: CreateBorderColors should return 10 colors if given parameter 10: " + (CreateBorderColors(10).length == 10));

    // Test 13 CreateBorderColors
    console.log("TEST 13: CreateBorderColors should return 12 colors if given parameter 12 and colors should repeat every 6: " + CreateBorderColors(12));

    // Test 14 getIndexOfTicker
    let curs = [new Currency("AAPL"), new Currency("AMZN"), new Currency("TSLA")];
    console.log("TEST 14: Given curs = [new Currency('AAPL'), new Currency('AMZN'), new Currency('TSLA')]; then getIndexOfTicker(curs, 'TWTR') should return -1: " + (getIndexOfTicker(curs, 'TWTR') == -1));

    // Test 15 getIndexOfTicker
    console.log("TEST 15: Given curs = [new Currency('AAPL'), new Currency('AMZN'), new Currency('TSLA')]; then getIndexOfTicker(curs, 'AMZN') should return 1: " + (getIndexOfTicker(curs, 'AMZN') == 1));

    // Test 16 isTickerInWatchList
    console.log("TEST 16: Given curs = [new Currency('AAPL'), new Currency('AMZN'), new Currency('TSLA')]; then isTickerInWatchList(curs, 'AMZN') should return true: " + isTickerInWatchList(curs, 'AMZN'));

    // Test 17 isTickerInWatchList
    console.log("TEST 17: Given curs = [new Currency('AAPL'), new Currency('AMZN'), new Currency('TSLA')]; then isTickerInWatchList(curs, 'TWTR') should return false: " + !isTickerInWatchList(curs, 'TWTR'));

    // Test 18 isCrypto
    console.log("TEST 18: isCrypto should return true if the string parameter contains a ':' character: isCrypto('BINANCE:ETHUSDT'): " + isCrypto("BINANACE:ETHUSDT"));

    // Test 19 isCrypto
    console.log("TEST 19: isCrypto should return false if the string parameter does not contain a ':' character: isCrypto('BINANCE ETHUSDT'): " + isCrypto("BINANCE ETHUSDT"));

    // ENDING NOTES
    console.log("TEST SUITE NOTES: all other functionalities rely on api calls that we have limits on or UI manipulation that cannot be tested unless using the program");
}
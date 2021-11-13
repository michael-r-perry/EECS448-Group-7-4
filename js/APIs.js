// Stocks Section START

function APITodayQuoteStockData(ticker, callback) {
    axios.get('https://finnhub.io/api/v1/quote?symbol=' + ticker + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIIntradayStockData(ticker, callback) {
    console.log("APIIntradayStockData");
    let tonight = getUNIXMidnightTonight();
    let morning = getUNIXMidnightMorning();
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=' + ticker + '&resolution=5&from=' + morning + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIFiveDayStockData(ticker, callback) {
    console.log("APIFiveDayStockData");
    let tonight = getUNIXMidnightTonight();
    let weekAgo = getUNIXFiveDaysAgo();
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=' + ticker + '&resolution=30&from=' + weekAgo + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIOneMonthStockData(ticker, callback) {
    console.log("APIOneMonthStockData");
    let tonight = getUNIXMidnightTonight();
    let month = getUNIXOneMonthAgo();
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=' + ticker + '&resolution=D&from=' + month + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIThreeMonthStockData(ticker, callback) {
    console.log("APIThreeMonthStockData");
    let tonight = getUNIXMidnightTonight();
    let months = getUNIXThreeMonthsAgo();
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=' + ticker + '&resolution=D&from=' + months + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APISixMonthStockData(ticker, callback) {
    console.log("APISixMonthStockData");
    let tonight = getUNIXMidnightTonight();
    let months = getUNIXSixMonthsAgo();
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=' + ticker + '&resolution=D&from=' + months + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIOneYearStockData(ticker, callback) {
    console.log("APIOneYearStockData");
    let tonight = getUNIXMidnightTonight();
    let year = getUNIXOneYearAgo();
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=' + ticker + '&resolution=D&from=' + year + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

// Stocks Section END

// Crypto Section START

function APITodayQuoteCryptoData(ticker, callback) {
    let now = new Date.now();
    let morning = getUNIXMidnightMorning();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=1&from=' + morning + '&to=' + now + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            // Current "c", DayChange "d", Percent Change "dp", open "o"
            let current = response.data["c"].at(-1); // Last entry for closes
            let open = response.data["o"][0]; // First entry for opens
            let dayChange = current - open;
            let percentChange = (dayChange / open) * 100;
            callback({
                "c": current,
                "d": dayChange,
                "dp": percentChange,
                "o": open
            });
        })
        .catch(error => console.error(error));
}

function APIIntradayCryptoData(ticker, callback) {
    let tonight = getUNIXMidnightTonight();
    let morning = getUNIXMidnightMorning();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=5&from=' + morning + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIFiveDayCryptoData(ticker, callback) {
    let tonight = getUNIXMidnightTonight();
    let weekAgo = getUNIXFiveDaysAgo();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=30&from=' + weekAgo + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIOneMonthCryptoData(ticker, callback) {
    let tonight = getUNIXMidnightTonight();
    let month = getUNIXOneMonthAgo();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=D&from=' + month + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIThreeMonthCryptoData(ticker, callback) {
    let tonight = getUNIXMidnightTonight();
    let months = getUNIXThreeMonthsAgo();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=D&from=' + months + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APISixMonthCryptoData(ticker, callback) {
    let tonight = getUNIXMidnightTonight();
    let months = getUNIXSixMonthsAgo();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=D&from=' + months + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APIOneYearCryptoData(ticker, callback) {
    let tonight = getUNIXMidnightTonight();
    let year = getUNIXOneYearAgo();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=D&from=' + year + '&to=' + tonight + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

// Crypto Section END

// Market News Section START
function APIGetMarketNews(index, callback) {
    axios.get('https://finnhub.io/api/v1/news?category=general&minId=10'+ '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            let headline = response.data[index]["headline"];
            let image = response.data[index]["image"];
            let source = response.data[index]["source"];
            let summary = response.data[index]["summary"];
            let url = response.data[index]["url"];
            callback({
                "headline": headline,
                "image": image,
                "summary": summary,
                "source": source,
                "url": url,
            });
        })
        .catch(error => console.error(error));
}

// Market News Section END

// Gainers/Losers Section START

// Gainers/Losers Section END

///////////////////////////////////////////////////////////
// EXTRA FUNCTIONS: NEED TO BE DELETED BEFORE SUBMITTING //
///////////////////////////////////////////////////////////

/**
 * 
 * @param {*} callback 
 */
 function APITodayBasicAPPLData(callback) {
    axios.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

/**
 * 
 */
function APIIntradayAPPLData(callback) {
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=30&from=1631022248&to=1631627048&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APITodayBasicAMZNData(callback) {
    axios.get('https://finnhub.io/api/v1/quote?symbol=AMZN&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APITodayBasicTSLAData(callback) {
    axios.get('https://finnhub.io/api/v1/quote?symbol=TSLA&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APITodayBasicTMUSData(callback) {
    axios.get('https://finnhub.io/api/v1/quote?symbol=TMUS&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}

function APITodayBasicTWTRData(callback) {
    axios.get('https://finnhub.io/api/v1/quote?symbol=TWTR&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => console.error(error));
}
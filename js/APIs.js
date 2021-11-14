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

// Market News Section END

// Gainers/Losers Section START
function Gainers(index, callback){
    axios.get('https://financialmodelingprep.com/api/v3/stock/gainers?apikey=acfdeb7c7ae9b0f38163cbe9893f7673')
        .then(response => {
            console.log(response.data);
            let ticker = response.data[index]["ticker"];
            let changes = response.data[index]["changes"];
            let price = response.data[index]["price"];
            let changesPercentage = response.data[index]["changesPercentage"];
            let companyName = response.data[index]["companyName"];
            callback({
                "ticker": ticker,
                "changes": changes,
                "price": price,
                "changesPercentage": changesPercentage,
                "companyName": companyName,
            });
        })
        .catch(error => console.error(error));
}
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

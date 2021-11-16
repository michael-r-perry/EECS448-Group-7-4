let oldDate = new Date();
oldDate.setDate(oldDate.getDate() - 7);

let newDate = new Date();
oldDate.toISOString().split('T')[0];
newDate.toISOString().split('T')[0];


console.log(formatDate(oldDate));
console.log(formatDate(newDate));

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
    let now = Date.now();
    let morning = getUNIXMidnightMorning();
    axios.get('https://finnhub.io/api/v1/crypto/candle?symbol=' + ticker + '&resolution=1&from=' + morning + '&to=' + now + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            // Current "c", DayChange "d", Percent Change "dp", open "o"
            let current = response.data["c"].at(-1); // Last entry for closes
            let open = response.data["o"][0]; // First entry for opens
            let dayChange = Math.round((current - open) * 10000) / 10000;
            let percentChange = Math.round((dayChange / open) * 10000);
            percentChange = percentChange / 100;
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

// Company Info Section START
function APIGetTickerInfo(ticker, callback) {
    axios.get('https://finnhub.io/api/v1/stock/profile2?symbol=' + ticker + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            let industry = response.data["finnhubIndustry"];
            let url = response.data["weburl"];
            let logo = response.data["logo"];
            let name = response.data["name"];
            callback({
                "industry": industry,
                "logo": logo,
                "url": url,
                "name": name,
            });
        })
        .catch(error => console.error(error));
}

// Company Info Section END

// Market News Section START
function APIGetMarketNews(index, callback) {
    axios.get('https://finnhub.io/api/v1/news?category=general&minId=7001876'+ '&token=c5tho52ad3ifck7dg8fg')
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

function APIGetTickerNews(ticker, callback) {
    axios.get('https://finnhub.io/api/v1/company-news?symbol='+ ticker +'&from=' + formatDate(oldDate) + '&to=' + formatDate(newDate) + '&token=c5tho52ad3ifck7dg8fg')
        .then(response => {
            console.log(response.data);
            let headline = response.data[0]["headline"];
            let image = response.data[0]["image"];
            let source = response.data[0]["source"];
            let summary = response.data[0]["summary"];
            let url = response.data[0]["url"];
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
function Gainers(callback){
    axios.get('https://financialmodelingprep.com/api/v3/stock/gainers?apikey=acfdeb7c7ae9b0f38163cbe9893f7673')
        .then(response => {
            console.log(response.data);
            let ticker1 = response.data["mostGainerStock"][0]["ticker"];
            let changes1 = response.data["mostGainerStock"][0]["changes"];
            let price1 = response.data["mostGainerStock"][0]["price"];
            let changesPercentage1 = response.data["mostGainerStock"][0]["changesPercentage"];
            let companyName1 = response.data["mostGainerStock"][0]["companyName"];
            let ticker2 = response.data["mostGainerStock"][1]["ticker"];
            let changes2 = response.data["mostGainerStock"][1]["changes"];
            let price2 = response.data["mostGainerStock"][1]["price"];
            let changesPercentage2 = response.data["mostGainerStock"][1]["changesPercentage"];
            let companyName2 = response.data["mostGainerStock"][1]["companyName"];
            let ticker3 = response.data["mostGainerStock"][2]["ticker"];
            let changes3 = response.data["mostGainerStock"][2]["changes"];
            let price3 = response.data["mostGainerStock"][2]["price"];
            let changesPercentage3 = response.data["mostGainerStock"][2]["changesPercentage"];
            let companyName3 = response.data["mostGainerStock"][2]["companyName"];
            let ticker4 = response.data["mostGainerStock"][3]["ticker"];
            let changes4 = response.data["mostGainerStock"][3]["changes"];
            let price4 = response.data["mostGainerStock"][3]["price"];
            let changesPercentage4 = response.data["mostGainerStock"][3]["changesPercentage"];
            let companyName4 = response.data["mostGainerStock"][3]["companyName"];
            let ticker5 = response.data["mostGainerStock"][4]["ticker"];
            let changes5 = response.data["mostGainerStock"][4]["changes"];
            let price5 = response.data["mostGainerStock"][4]["price"];
            let changesPercentage5 = response.data["mostGainerStock"][4]["changesPercentage"];
            let companyName5 = response.data["mostGainerStock"][4]["companyName"];
            callback({
                "ticker1": ticker1,
                "changes1": changes1,
                "price1": price1,
                "changesPercentage1": changesPercentage1,
                "companyName1": companyName1,
                "ticker2": ticker2,
                "changes2": changes2,
                "price2": price2,
                "changesPercentage2": changesPercentage2,
                "companyName2": companyName2,
                "ticker3": ticker3,
                "changes3": changes3,
                "price3": price3,
                "changesPercentage3": changesPercentage3,
                "companyName3": companyName3,
                "ticker4": ticker4,
                "changes4": changes4,
                "price4": price4,
                "changesPercentage4": changesPercentage4,
                "companyName4": companyName4,
                "ticker5": ticker5,
                "changes5": changes5,
                "price5": price5,
                "changesPercentage5": changesPercentage5,
                "companyName5": companyName5,
            });
        })
        .catch(error => console.error(error));
}

function Losers(callback){
    axios.get('https://financialmodelingprep.com/api/v3/stock/losers?apikey=acfdeb7c7ae9b0f38163cbe9893f7673')
        .then(response => {
            console.log(response.data);
            let ticker6 = response.data["mostLoserStock"][0]["ticker"];
            let changes6 = response.data["mostLoserStock"][0]["changes"];
            let price6 = response.data["mostLoserStock"][0]["price"];
            let changesPercentage6 = response.data["mostLoserStock"][0]["changesPercentage"];
            let companyName6 = response.data["mostLoserStock"][0]["companyName"];
            let ticker7 = response.data["mostLoserStock"][1]["ticker"];
            let changes7 = response.data["mostLoserStock"][1]["changes"];
            let price7 = response.data["mostLoserStock"][1]["price"];
            let changesPercentage7 = response.data["mostLoserStock"][1]["changesPercentage"];
            let companyName7 = response.data["mostLoserStock"][1]["companyName"];
            let ticker8 = response.data["mostLoserStock"][2]["ticker"];
            let changes8 = response.data["mostLoserStock"][2]["changes"];
            let price8 = response.data["mostLoserStock"][2]["price"];
            let changesPercentage8 = response.data["mostLoserStock"][2]["changesPercentage"];
            let companyName8 = response.data["mostLoserStock"][2]["companyName"];
            let ticker9 = response.data["mostLoserStock"][3]["ticker"];
            let changes9 = response.data["mostLoserStock"][3]["changes"];
            let price9 = response.data["mostLoserStock"][3]["price"];
            let changesPercentage9 = response.data["mostLoserStock"][3]["changesPercentage"];
            let companyName9 = response.data["mostLoserStock"][3]["companyName"];
            let ticker10 = response.data["mostLoserStock"][4]["ticker"];
            let changes10 = response.data["mostLoserStock"][4]["changes"];
            let price10 = response.data["mostLoserStock"][4]["price"];
            let changesPercentage10 = response.data["mostLoserStock"][4]["changesPercentage"];
            let companyName10 = response.data["mostLoserStock"][4]["companyName"];
            callback({
                "ticker1": ticker6,
                "changes1": changes6,
                "price1": price6,
                "changesPercentage1": changesPercentage6,
                "companyName1": companyName6,
                "ticker2": ticker7,
                "changes2": changes7,
                "price2": price7,
                "changesPercentage2": changesPercentage7,
                "companyName2": companyName7,
                "ticker3": ticker8,
                "changes3": changes8,
                "price3": price8,
                "changesPercentage3": changesPercentage8,
                "companyName3": companyName8,
                "ticker4": ticker9,
                "changes4": changes9,
                "price4": price9,
                "changesPercentage4": changesPercentage9,
                "companyName4": companyName9,
                "ticker5": ticker10,
                "changes5": changes10,
                "price5": price10,
                "changesPercentage5": changesPercentage10,
                "companyName5": companyName10,
            });
        })
        .catch(error => console.error(error));
}
// Gainers/Losers Section END

// Search Section START

const CRYPTO_EXCHANGES = ["ZB","HUOBI","OKEX","POLONIEX","GEMINI","BITFINEX","BITMEX","BINANCE","BITTREX","FXPIG","KUCOIN","HITBTC","KRAKEN"];

function Search(input, callback) {
    if (isCrypto(input)) {
        let exchange = input.split(":")[0];
        if (CRYPTO_EXCHANGES.includes(exchange)) {
            axios.get('https://finnhub.io/api/v1/crypto/symbol?exchange=' + exchange + '&token=c5tho52ad3ifck7dg8fg')
                .then(response => {
                    console.log(response.data);
                    let found = false;
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i]["symbol"] == input) {
                            found = true;
                            callback({
                                "ticker": input
                            });
                        }
                    }
                    if (!found) {
                        alert("Not a valid crypto ticker for exchange: ", exchange);
                        callback();
                    }
                })
                .catch(error => console.error(error));
        } else {
            alert("Not a valid crypto exchange! Please you from the list provided: " + CRYPTO_EXCHANGES.toString());
            callback();
        }
    } else {
        axios.get('https://finnhub.io/api/v1/search?q=' + input +'&token=c5tho52ad3ifck7dg8fg')
            .then(response => {
                console.log(response.data);
                let ticker = response.data["result"][0]["symbol"];
                callback({
                    "ticker": ticker,
                })
            })
            .catch(error => console.error(error));
    }
}

// Search Section END

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

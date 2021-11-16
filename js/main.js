


/***************************************************
 * Properties
 ***************************************************/

let currencyHL;
let crypto1 = new Currency("BTC");
let crypto2 = new Currency("ETH");
let crypto3 = new Currency("LTC");
let crypto4 = new Currency("BNB");
let crypto5 = new Currency("XRP");
let currencies = [];
let news = [];
let graphNews = new News();
const BASE_WATCH_LIST = ["AAPL", "AMZN", "TSLA", "TMUS", "TWTR"];
let graphTimespan; // "1Day", "5Day", "1Month", "3Month", "6Month", "1Year"
let graphChart;

/***************************************************
 * Event Listener Functions
 ***************************************************/

// DOMContentLoaded
// Set up event listeners, then pull and initialize data for UI
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded test")

    // Event Listener for Graph Buttons
    document.getElementById("day-btn").addEventListener("click", (e) => handle1DayBtnClick(e));
    document.getElementById("five-day-btn").addEventListener("click", (e) => handle5DayBtnClick(e));
    document.getElementById("month-btn").addEventListener("click", (e) => handle1MonthBtnClick(e));
    document.getElementById("three-month-btn").addEventListener("click", (e) => handle3MonthBtnClick(e));
    document.getElementById("six-month-btn").addEventListener("click", (e) => handle6MonthBtnClick(e));
    document.getElementById("year-btn").addEventListener("click", (e) => handle1YearBtnClick(e));

    // Event Listener for Search Bar Button
    document.getElementById("searchBtn").addEventListener("click", (e) => (handleSearchBtnClick()));
    document.getElementById("searchBar").addEventListener("keydown", (e) => {
        if (e.key == "Enter") {handleSearchBtnClick()}
    });

    // Event Delegation for Watch List UL elements
    document.getElementById("watch-list").addEventListener("click", (e) => handleWatchListClick(e));

    // Event Listener for Add/Remove from Watch List Button
    document.getElementById("graph-list-status").addEventListener("click", (e) => handleToggleWatchListClick(e));

    // Currency Objects
    BASE_WATCH_LIST.map(ticker => addToWatchList(ticker)); // Adds each ticker to currencies and adds an li tag to the watchlist ul
    currencyHL = new Currency("AAPL");
    crypto1 = new Currency("BTC");
    crypto2 = new Currency("ETH");
    crypto3 = new Currency("LTC");
    crypto4 = new Currency("BNB");
    crypto5 = new Currency("XRP");
    graphTimespan = "1Day";
    updateCurrencyHLElements();
});

// Event Listener Function for 1 Day Button
/**
 * Handles a click on the 1 day button.
 * @param {*} e
 */
function handle1DayBtnClick(e) {
    console.log("1Day btn clicked!");
    if (graphTimespan != "1Day") {
        graphTimespan = "1Day";
        updateGraph();
    }
}

// Event Listener Function for 5 Day Button
/**
 * Handles a click on the 5 day button.
 * @param {*} e
 */
function handle5DayBtnClick(e) {
    console.log("5Day btn clicked!");
    if (graphTimespan != "5Day") {
        graphTimespan = "5Day";
        updateGraph();
    }
}

// Event Listener Function for 1 Month Button
/**
 * Handles a click on the 1 month button.
 * @param {*} e
 */
function handle1MonthBtnClick(e) {
    console.log("1Month btn clicked!");
    if (graphTimespan != "1Month") {
        graphTimespan = "1Month";
        updateGraph();
    }
}

// Event Listener Function for 3 Month Button
/**
 * Handles a click on the 3 month button.
 * @param {*} e
 */
function handle3MonthBtnClick(e) {
    console.log("3Month btn clicked!");
    if (graphTimespan != "3Month") {
        graphTimespan = "3Month";
        updateGraph();
    }
}

// Event Listener Function for 6 Month Button
/**
 * Handles a click on the 6 month button.
 * @param {*} e
 */
function handle6MonthBtnClick(e) {
    console.log("6Month btn clicked!");
    if (graphTimespan != "6Month") {
        graphTimespan = "6Month";
        updateGraph();
    }
}

// Event Listener Function for 1 Year Button
/**
 * Handles a click on the 1 year button.
 * @param {*} e
 */
function handle1YearBtnClick(e) {
    console.log("1Year btn clicked!");
    if (graphTimespan != "1Year") {
        graphTimespan = "1Year";
        updateGraph();
    }
}

// Event Listener Handler Function for Search Bar Button
/**
 * Handles a click on the search bar.
 * @param {*} e
 */
function handleSearchBtnClick() {
    console.log("searchBtn clicked or searchBar keydown == Enter!");
    let query = document.getElementById("searchBar").value;
    console.log(query);
    Search(query, function(data) {
        console.log("IN Search Callback");
        if (data)
        {
            if (currencyHL.getTicker() != data["ticker"]) {
                currencyHL = new Currency(data["ticker"]);
                updateCurrencyHLElements();
                document.getElementById("searchBar").value = "";
            } else {
                console.log("No change, same ticker");
                document.getElementById("searchBar").value = "";
            }
        }
    })
}

// Event Delegation Handler Function for WatchList Currency Buttons
/**
 * Handles a click on the watch list.
 * @param {*} e
 */
function handleWatchListClick(e) {
    let id;
    if (e.target && e.target.nodeName == "A")         { id = e.target.id; }
    else if (e.target && e.target.nodeName == "SPAN") { id = e.target.parentElement.id; }

    if (id) {
        console.log("Clicked " + id + " element");
        if (currencyHL.getTicker() != id) {
            currencyHL = new Currency(id);
            updateCurrencyHLElements();
        } else {
            console.log("No change, same ticker");
        }
    }
}

// Event Listener Function for Add to WatchList Buttons
/**
 * handles a click on one of the "add to watchlist" buttons
 * @param {*} e
 */
function handleToggleWatchListClick(e) {
    console.log("Clicked graph-list-status element");
    watchListToggle(currencyHL.getTicker());
}

/***************************************************
 * Highlighted Currency Functions
 ***************************************************/

function updateCurrencyHLElements() {
    updateGraphHeader();
    updateGraphInfo();
    updateGraph();
    updateCompanyNews();
    updateMarketNews();
    updateCryptoBar();
    updateGainers();
}

/***************************************************
 * Watch List Functions
 ***************************************************/

// WatchListToggle Function
function watchListToggle(ticker) {
    if (isTickerInWatchList(currencies, currencyHL.getTicker())) {
        console.log("This will remove ticker from watchlist");
        removeFromWatchList(ticker);
    } else {
        addToWatchList(ticker);
    }
}

// AddToWatchList Function
function addToWatchList(ticker) {
    currencies.push(new Currency(ticker));
    let index = getIndexOfTicker(currencies, ticker);
    if (isCrypto(currencies[index].getTicker())) {
        APITodayQuoteCryptoData(currencies[index].getTicker(), function(data) {
            currencies[index].setQuoteData(data);
            addWatchListElement(index);
        });
    } else {
        APITodayQuoteStockData(currencies[index].getTicker(), function(data) {
            currencies[index].setQuoteData(data);
            addWatchListElement(index);
        });
    }

}

function addWatchListElement(index) {
    // Create HTML tag to add to watchList UL tag
    let ticker = currencies[index].getTicker();
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.id = ticker;
    a.href = "#";
    let spans = [];
    for (let i = 0; i < 5; i++) {
        let spanSpace = document.createElement("span");
        let space
        if (i == 1 || i == 2) {
            space = document.createTextNode("\u2003");
        } else {
            space = document.createTextNode("\u2002");
        }
        spanSpace.appendChild(space);
        spans.push(spanSpace);
    }
    let spanName = document.createElement("span");
    let name = document.createTextNode(ticker);
    spanName.className = "stock-name";
    spanName.appendChild(name);
    let spanPrice = document.createElement("span");
    let price = document.createTextNode(currencies[index].getCurrentQuote());
    spanPrice.className = "stock-price";
    spanPrice.id = ticker + "-price";
    spanPrice.appendChild(price);
    let spanChangeUSD = document.createElement("span");
    let changeUSD = document.createTextNode(currencies[index].getDayChange());
    spanChangeUSD.className = "stock-change-usd";
    spanChangeUSD.id = ticker + "-change-usd";
    spanChangeUSD.appendChild(changeUSD);
    let spanChangePercent = document.createElement("span");
    let changePercent = document.createTextNode(currencies[index].getDayPercentChange());
    spanChangePercent.className = "stock-change-percent";
    spanChangePercent.id = ticker + "-change-percent";
    spanChangePercent.appendChild(changePercent);
    if (currencies[index].getDayChange() < 0) { // RED
        spanChangeUSD.style.color = "#FF0D2C";
        spanChangePercent.style.color = "#FF0D2C";
    } else {                                    // GREEN
        spanChangeUSD.style.color = "#00CC3A";
        spanChangePercent.style.color = "#00CC3A";
    }
    let spanTimescale = document.createElement("span");
    let timescale = document.createTextNode("today");
    spanTimescale.className = "stock-timescale";
    spanTimescale.appendChild(timescale);
    a.appendChild(spans[0]);
    a.appendChild(spanName);
    a.appendChild(spans[1]);
    a.appendChild(spanPrice);
    a.appendChild(spans[2]);
    a.appendChild(spanChangeUSD);
    a.appendChild(spans[3]);
    a.appendChild(spanChangePercent);
    a.appendChild(spans[4]);
    a.appendChild(spanTimescale);
    li.appendChild(a);
    let watchlist = document.getElementById("watch-list");
    watchlist.appendChild(li);
    // Changes graph-list-status to remove currencyHL from list.
    document.getElementById("graph-list-status").innerText = "\u2002REMOVE FROM LIST\u2002";
}

// RemoveWatchListElement Function
function removeFromWatchList(ticker) {
    let index = getIndexOfTicker(currencies, ticker);
    currencies.splice(index, 1);
    removeWatchListElement(ticker);
}

function removeWatchListElement(ticker) {
    // Remove Watch List tag from HTML
    document.getElementById(ticker).parentElement.remove();
    // Changes graph-list-status to add currencyHL to list.
    document.getElementById("graph-list-status").innerText = "\u2002ADD TO LIST\u2002";
}

function updateWatchList() {
    for (let i = 0; i < currencies.length; i++) {
        if (isCrypto(currencyHL.getTicker())) {
            APITodayQuoteCryptoData(currencies[i].getTicker(), function(data) {
                currencies[i].setQuoteData(data);
                updateWatchListElement(i);
            });
        } else {
            APITodayQuoteStockData(currencies[i].getTicker(), function(data) {
                currencies[i].setQuoteData(data);
                updateWatchListElement(i);
            });
        }

    }
}

function updateWatchListElement(index) {
    let ticker = currencies[index].getTicker();
    document.getElementById(ticker + "-price").innerText = currencies[index].getCurrentQuote();
    document.getElementById(ticker + "-change-usd").innerText = currencies[index].getDayChange();
    document.getElementById(ticker + "-change-percent").innerText = currencies[index].getDayPercentChange();
}

/***************************************************
 * Graph Section Functions
 ***************************************************/

// Update Graph Header Function
function updateGraphHeader() {
    if (isCrypto(currencyHL.getTicker())) {
        APITodayQuoteCryptoData(currencyHL.getTicker(), function(data) {
            currencyHL.setQuoteData(data);
            updateGraphHeaderElements();
        });
    } else {
        APITodayQuoteStockData(currencyHL.getTicker(), function(data) {
            currencyHL.setQuoteData(data);
            updateGraphHeaderElements();
        });
    }
}

function updateGraphHeaderElements() {
    document.getElementById("graph-stock-name").innerText = currencyHL.getTicker();
    document.getElementById("graph-price").innerText = currencyHL.getCurrentQuote();
    document.getElementById("graph-change-usd").innerText = currencyHL.getDayChange();
    document.getElementById("graph-change-percent").innerText = currencyHL.getDayPercentChange();
    if (currencyHL.getDayChange() < 0) {
        document.getElementById("graph-change-usd").style.color = "#FF0D2C";
        document.getElementById("graph-change-percent").style.color = "#FF0D2C";
    } else {
        document.getElementById("graph-change-usd").style.color = "#00CC3A";
        document.getElementById("graph-change-percent").style.color = "#00CC3A";
    }
    if (isTickerInWatchList(currencies, currencyHL.getTicker())) {
        document.getElementById("graph-list-status").innerText = "\u2002REMOVE FROM LIST\u2002";
    } else {
        document.getElementById("graph-list-status").innerText = "\u2002ADD TO LIST\u2002";
    }
}

// Update Graph Info Section
function updateGraphInfo() {
    if (!isCrypto(currencyHL.getTicker())) {
        APIGetTickerInfo(currencyHL.getTicker(), function(data) {
            currencyHL.setTickerInfo(data);
            updateTickerInfo();
        });
    }
}

function updateTickerInfo() {
    document.getElementById("graph-info-name").innerText = currencyHL.getName();
    document.getElementById("graph-info-logo").src = currencyHL.getLogo();
    document.getElementById("graph-info-industry").innerText = currencyHL.getIndustry();
    document.getElementById("graph-info-url").href = currencyHL.getUrl();
}

// Update Graph Function
function updateGraph() {
    // Has to check which timespan and whether cyprto or stock
    if (graphTimespan == "1Day") {
        if (isCrypto(currencyHL.getTicker())) {
            APIIntradayCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneDayTimeSeriesData(data);
                console.log("updateGraph 1Day function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        } else {
            APIIntradayStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneDayTimeSeriesData(data);
                console.log("updateGraph 1Day function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "5Day") {
        if (isCrypto(currencyHL.getTicker())) {
            APIFiveDayCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setFiveDayTimeSeriesData(data);
                console.log("updateGraph 5Day function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        } else {
            APIFiveDayStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setFiveDayTimeSeriesData(data);
                console.log("updateGraph 5Day function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "1Month") {
        if (isCrypto(currencyHL.getTicker())) {
            APIOneMonthCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneMonthTimeSeriesData(data);
                console.log("updateGraph 1Month function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        } else {
            APIOneMonthStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneMonthTimeSeriesData(data);
                console.log("updateGraph 1Month function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "3Month") {
        if (isCrypto(currencyHL.getTicker())) {
            APIThreeMonthCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setThreeMonthTimeSeriesData(data);
                console.log("updateGraph 3Month function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        } else {
            APIThreeMonthStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setThreeMonthTimeSeriesData(data);
                console.log("updateGraph 3Month function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "6Month") {
        if (isCrypto(currencyHL.getTicker())) {
            APISixMonthCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setSixMonthTimeSeriesData(data);
                console.log("updateGraph 6Month function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        } else {
            APISixMonthStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setSixMonthTimeSeriesData(data);
                console.log("updateGraph 6Month function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "1Year") {
        if (isCrypto(currencyHL.getTicker())) {
            APIOneYearStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneYearTimeSeriesData(data);
                console.log("updateGraph 1Year function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        } else {
            APIOneYearStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneYearTimeSeriesData(data);
                console.log("updateGraph 1Year function!");
                console.log(currencyHL.getOneDayTimeSeriesData());
                updateGraphElements();
            });
        }
    }
}

function updateGraphElements() {
    let ctx = document.getElementById("graph-canvas").getContext("2d");

    // If the graph has been initialized, destroy previous graph before new data
    if (graphChart) {
        graphChart.destroy();
    }

    let data;
    if (graphTimespan == "1Day") {
        data = currencyHL.getOneDayTimeSeriesData();
    } else if (graphTimespan == "5Day") {
        data = currencyHL.getFiveDayTimeSeriesData();
    } else if (graphTimespan == "1Month") {
        data = currencyHL.getOneMonthTimeSeriesData();
    } else if (graphTimespan == "3Month") {
        data = currencyHL.getThreeMonthTimeSeriesData();
    } else if (graphTimespan == "6Month") {
        data = currencyHL.getSixMonthTimeSeriesData();
    } else if (graphTimespan == "1Year") {
        data = currencyHL.getOneYearTimeSeriesData();
    }

    graphChart = new Chart(ctx, {
        type: 'line',
        options: {
            scales: {
            xAxes: [{
                type: 'time',
            }]
            }
        },
        data: data
    });
}
let gainer = [];
function updateGainers(){
gainer.push(new marketData());
gainer.push(new marketData());
gainer.push(new marketData());
Gainers(0,function(data) {
    gainer[0].setMarketData(data);
    updateGainerHTML(0)
  });
}
function updateGainerHTML(index){
   if(index == 0){
     document.getElementById("stock-name1").innerText = gainer[index].getTicker();
   }
}

/***************************************************
 * Search Bar Functions
 ***************************************************/

// SearchHandle Function

/***************************************************
 * Market News Functions
 ***************************************************/
function updateCompanyNews(){
    APIGetTickerNews(currencyHL.getTicker() ,function(data) {
        graphNews.setNews(data);
        updateCompanyNewsElement();
    });
}

function updateCompanyNewsElement(){
    document.getElementById("graph-news-headline").innerText = graphNews.getHeadline();
    document.getElementById("graph-news-img").src = graphNews.getImage();
    //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
    document.getElementById("graph-news-summary").innerText = graphNews.getSummary();
    document.getElementById("graph-news-link").href = graphNews.getUrl();
}

function updateMarketNews(){
    news.push(new News());
    news.push(new News());
    news.push(new News());
    news.push(new News());
    news.push(new News());
    APIGetMarketNews(0 ,function(data) {
        news[0].setNews(data);
        updateNewsElement(0);
    });
    APIGetMarketNews(1 ,function(data) {
        news[1].setNews(data);
        updateNewsElement(1);
    });
    APIGetMarketNews(2 ,function(data) {
        news[2].setNews(data);
        updateNewsElement(2);
    });
    APIGetMarketNews(3 ,function(data) {
        news[3].setNews(data);
        updateNewsElement(3);
    });
    APIGetMarketNews(4 ,function(data) {
        news[4].setNews(data);
        updateNewsElement(4);
    });
    console.log(news);
}

function updateNewsElement(index){
    if (index == 0){
        document.getElementById("news1-headline").innerText = news[index].getHeadline();
        document.getElementById("news1-img").src = news[index].getImage();
        //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
        document.getElementById("news1-summary").innerText = news[index].getSummary();
        document.getElementById("news1-url").href = news[index].getUrl();
    }
    if (index == 1){
        document.getElementById("news2-headline").innerText = news[index].getHeadline();
        document.getElementById("news2-img").src = news[index].getImage();
        //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
        document.getElementById("news2-summary").innerText = news[index].getSummary();
        document.getElementById("news2-url").href = news[index].getUrl();
    }
    if (index == 2){
        document.getElementById("news3-headline").innerText = news[index].getHeadline();
        document.getElementById("news3-img").src = news[index].getImage();
        //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
        document.getElementById("news3-summary").innerText = news[index].getSummary();
        document.getElementById("news3-url").href = news[index].getUrl();
    }
    if (index == 3){
        document.getElementById("news4-headline").innerText = news[index].getHeadline();
        document.getElementById("news4-img").src = news[index].getImage();
        //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
        document.getElementById("news4-summary").innerText = news[index].getSummary();
        document.getElementById("news4-url").href = news[index].getUrl();
    }
    if (index == 4){
        document.getElementById("news5-headline").innerText = news[index].getHeadline();
        document.getElementById("news5-img").src = news[index].getImage();
        //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
        document.getElementById("news5-summary").innerText = news[index].getSummary();
        document.getElementById("news5-url").href = news[index].getUrl();
    }
}

/***************************************************
 * Crypto Bar Functions
 ***************************************************/
function updateCryptoBar(){
    APITodayQuoteCryptoData("BINANCE:BTCUSDT", function(data) {
        crypto1.setQuoteData(data);
        updateCryptoPrice(1);
    });
    APITodayQuoteCryptoData("BINANCE:ETHUSDT", function(data) {
        crypto2.setQuoteData(data);
        updateCryptoPrice(2);
    });
    APITodayQuoteCryptoData("BINANCE:LTCUSDT", function(data) {
        crypto3.setQuoteData(data);
        updateCryptoPrice(3);
    });
    APITodayQuoteCryptoData("BINANCE:BNBBUSD", function(data) {
        crypto4.setQuoteData(data);
        updateCryptoPrice(4);
    });
    APITodayQuoteCryptoData("BINANCE:XRPUSDT", function(data) {
        crypto5.setQuoteData(data);
        updateCryptoPrice(5);
    });
}

function updateCryptoPrice(num){
    var coinIndicator = "coin" + num;
    var coinPrice = coinIndicator + "-price";
    var coinPercent = coinIndicator + "-percent";
    var newPrice;
    var newPercent;
    if(num == 1){
        newPrice = crypto1.getCurrentQuote();
        newPercent = crypto1.getDayPercentChange();
        if(crypto1.getDayPercentValue() > 0){
            document.getElementById("coin1-percent").style.color = "#00CC3A";
        }
        else {
            document.getElementById("coin1-percent").style.color = "#FF0D2C";
        }
    }
    else if(num == 2){
        newPrice = crypto2.getCurrentQuote();
        newPercent = crypto2.getDayPercentChange();
        if(crypto2.getDayPercentValue() > 0){
            document.getElementById("coin2-percent").style.color = "#00CC3A";
        }
        else {
            document.getElementById("coin2-percent").style.color = "#FF0D2C";
        }
    }
    else if(num == 3){
        newPrice = crypto3.getCurrentQuote();
        newPercent = crypto3.getDayPercentChange();
        if(crypto3.getDayPercentValue() > 0){
            document.getElementById("coin3-percent").style.color = "#00CC3A";
        }
        else {
            document.getElementById("coin3-percent").style.color = "#FF0D2C";
        }
    }
    else if(num == 4){
        newPrice = crypto4.getCurrentQuote();
        newPercent = crypto4.getDayPercentChange();
        if(crypto4.getDayPercentValue() > 0){
            document.getElementById("coin4-percent").style.color = "#00CC3A";
        }
        else {
            document.getElementById("coin4-percent").style.color = "#FF0D2C";
        }
    }
    else if(num == 5){
        newPrice = crypto5.getCurrentQuote();
        newPercent = crypto5.getDayPercentChange();
        if(crypto5.getDayPercentValue() > 0){
            document.getElementById("coin5-percent").style.color = "#00CC3A";
        }
        else {
            document.getElementById("coin5-percent").style.color = "#FF0D2C";
        }
    }
    document.getElementById(coinPrice).innerText = newPrice;
    document.getElementById(coinPercent).innerText = newPercent;
}

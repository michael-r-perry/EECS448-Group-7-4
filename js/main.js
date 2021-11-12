


/***************************************************
 * Properties
 ***************************************************/

let currencyHL;
let currencyWL1;
let currencyWL2;
let currencyWL3;
let currencyWL4;
let currencyWL5;
let currencies = [];
const BASE_WATCH_LIST = ["AAPL", "AMZN", "TSLA", "TMUS", "TWTR"];
let graphTimespan; // "1Day", "5Day", "1Month", "3Month", "6Month", "1Year"
let graphChart;
const CRYPTO_EXCHANGES = ["ZB","HUOBI","OKEX","POLONIEX","GEMINI","BITFINEX","BITMEX","BINANCE","BITTREX","FXPIG","COINBASE","KUCOIN","HITBTC","KRAKEN"];

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
    document.getElementById("searchBtn").addEventListener("click", (e) => handleSearchBtnClick(e));
    document.getElementById("searchBar").addEventListener("keydown", (e) => {
        if (e.key == "Enter") { handleSearchBtnClick(e) }
    });

    // Event Delegation for Watch List UL elements
    document.getElementById("watch-list").addEventListener("click", (e) => handleWatchListClick(e));

    // Event Listener for Add/Remove from Watch List Button
    document.getElementById("graph-list-status").addEventListener("click", (e) => handleToggleWatchListClick(e));

    // Currency Objects
    BASE_WATCH_LIST.map(ticker => addToWatchList(ticker)); // Adds each ticker to currencies and adds an li tag to the watchlist ul
    currencyHL = new Currency("AAPL");
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
function handleSearchBtnClick(e) {
    console.log("searchBtn clicked or searchBar keydown == Enter!");
    browse(AAPL);
}

// Event Delegation Handler Function for WatchList Currency Buttons
/**
 * Handles a click on the watch list.
 * @param {*} e 
 */
function handleWatchListClick(e) {
    let id;
    if(e.target && e.target.nodeName == "A")          { id = e.target.id; }
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
    updateGraph();
}

function updateColors() {
    if(currencyHL.getDayChange() > -0.00001){
        document.getElementById("graph-change-usd").style.color = "#00CC3A";
        document.getElementById("graph-change-percent").style.color = "#00CC3A";
    }
    else {
        document.getElementById("graph-change-usd").style.color = "#FF0D2C";
        document.getElementById("graph-change-percent").style.color = "#FF0D2C";
    }
    if(currencyWL1.getDayChange() > 0){
        document.getElementById("watch1-change-usd").style.color = "#00CC3A";
        document.getElementById("watch1-change-percent").style.color = "#00CC3A";
    }
    else {
        document.getElementById("watch1-change-usd").style.color = "#FF0D2C";
        document.getElementById("watch1-change-percent").style.color = "#FF0D2C";
    }
    if(currencyWL2.getDayChange() > 0){
        document.getElementById("watch2-change-usd").style.color = "#00CC3A";
        document.getElementById("watch2-change-percent").style.color = "#00CC3A";
    }
    else {
        document.getElementById("watch2-change-usd").style.color = "#FF0D2C";
        document.getElementById("watch2-change-percent").style.color = "#FF0D2C";
    }
    if(currencyWL3.getDayChange() > 0){
        document.getElementById("watch3-change-usd").style.color = "#00CC3A";
        document.getElementById("watch3-change-percent").style.color = "#00CC3A";
    }
    else {
        document.getElementById("watch3-change-usd").style.color = "#FF0D2C";
        document.getElementById("watch3-change-percent").style.color = "#FF0D2C";
    }
    if(currencyWL4.getDayChange() > 0){
        document.getElementById("watch4-change-usd").style.color = "#00CC3A";
        document.getElementById("watch4-change-percent").style.color = "#00CC3A";
    }
    else {
        document.getElementById("watch4-change-usd").style.color = "#FF0D2C";
        document.getElementById("watch4-change-percent").style.color = "#FF0D2C";
    }
    if(currencyWL5.getDayChange() > 0){
        document.getElementById("watch5-change-usd").style.color = "#00CC3A";
        document.getElementById("watch5-change-percent").style.color = "#00CC3A";
    }
    else {
        document.getElementById("watch5-change-usd").style.color = "#FF0D2C";
        document.getElementById("watch5-change-percent").style.color = "#FF0D2C";
    }
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
    APITodayQuoteStockData(currencies[index].getTicker(), function(data) {
        currencies[index].setQuoteData(data);
        addWatchListElement(index);
    });
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
        APITodayQuoteStockData(currencies[i].getTicker(), function(data) {
            currencies[i].setQuoteData(data);
            updateWatchListElement(i);
        });
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
    APITodayQuoteStockData(currencyHL.getTicker(), function(data) {
        currencyHL.setQuoteData(data);
        updateGraphHeaderElements();
    });
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

// Update Graph Function
function updateGraph() {
    if (graphTimespan == "1Day") {
        APIIntradayStockData(currencyHL.getTicker(), function(data) {
            currencyHL.setOneDayTimeSeriesData(data);
            console.log("updateGraph 1Day function!");
            console.log(currencyHL.getOneDayTimeSeriesData());
            updateGraphElements();
        });
    } else if (graphTimespan == "5Day") {
        APIFiveDayStockData(currencyHL.getTicker(), function(data) {
            currencyHL.setFiveDayTimeSeriesData(data);
            console.log("updateGraph 5Day function!");
            console.log(currencyHL.getOneDayTimeSeriesData());
            updateGraphElements();
        });
    } else if (graphTimespan == "1Month") {
        APIOneMonthStockData(currencyHL.getTicker(), function(data) {
            currencyHL.setOneMonthTimeSeriesData(data);
            console.log("updateGraph 1Month function!");
            console.log(currencyHL.getOneDayTimeSeriesData());
            updateGraphElements();
        });
    } else if (graphTimespan == "3Month") {
        APIThreeMonthStockData(currencyHL.getTicker(), function(data) {
            currencyHL.setThreeMonthTimeSeriesData(data);
            console.log("updateGraph 3Month function!");
            console.log(currencyHL.getOneDayTimeSeriesData());
            updateGraphElements();
        });
    } else if (graphTimespan == "6Month") {
        APISixMonthStockData(currencyHL.getTicker(), function(data) {
            currencyHL.setSixMonthTimeSeriesData(data);
            console.log("updateGraph 6Month function!");
            console.log(currencyHL.getOneDayTimeSeriesData());
            updateGraphElements();
        });
    } else if (graphTimespan == "1Year") {
        APIOneYearStockData(currencyHL.getTicker(), function(data) {
            currencyHL.setOneYearTimeSeriesData(data);
            console.log("updateGraph 1Year function!");
            console.log(currencyHL.getOneDayTimeSeriesData());
            updateGraphElements();
        });
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

/***************************************************
 * Search Bar Functions
 ***************************************************/

// SearchHandle Function



/***************************************************
 * Properties
 ***************************************************/

let currencyHL;
let currencyWL1;
let currencyWL2;
let currencyWL3;
let currencyWL4;
let currencyWL5;
let currencies;
let BASE_WATCH_LIST = ["AAPL", "AMZN", "TSLA", "TMUS", "TWTR"];

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
    currencyHL = new Currency("AAPL");
    currencyWL1 = new Currency("AMZN");
    currencyWL2 = new Currency("AAPL");
    currencyWL3 = new Currency("TSLA");
    currencyWL4 = new Currency("TMUS");
    currencyWL5 = new Currency("TWTR");
    updateCurrencyHLElements();
    currencies = BASE_WATCH_LIST.map(ticker => new Currency(ticker));
    //currencies.map((c,i) => addToWatchList(i));

});

// Event Listener Function for 1 Day Button
/**
 * Handles a click on the 1 day button.
 * @param {*} e
 */
function handle1DayBtnClick(e) {
    console.log("1Day btn clicked!");
}

// Event Listener Function for 5 Day Button
/**
 * Handles a click on the 5 day button.
 * @param {*} e
 */
function handle5DayBtnClick(e) {
    console.log("5Day btn clicked!");
}

// Event Listener Function for 1 Month Button
/**
 * Handles a click on the 1 month button.
 * @param {*} e
 */
function handle1MonthBtnClick(e) {
    console.log("1Month btn clicked!");
}

// Event Listener Function for 3 Month Button
/**
 * Handles a click on the 3 month button.
 * @param {*} e
 */
function handle3MonthBtnClick(e) {
    console.log("3Month btn clicked!");
}

// Event Listener Function for 6 Month Button
/**
 * Handles a click on the 6 month button.
 * @param {*} e
 */
function handle6MonthBtnClick(e) {
    console.log("6Month btn clicked!");
}

// Event Listener Function for 1 Year Button
/**
 * Handles a click on the 1 year button.
 * @param {*} e
 */
function handle1YearBtnClick(e) {
    console.log("1Year btn clicked!");
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
    }
}

// Event Listener Function for Add to WatchList Buttons
/**
 * handles a click on one of the "add to watchlist" buttons
 * @param {*} e
 */
function handleToggleWatchListClick(e) {
    console.log("Clicked graph-list-status element");
    addToWatchList(0);
}

/***************************************************
 * Highlighted Currency Functions
 ***************************************************/

function updateCurrencyHLElements() {
    updateGraphHeader();
    updateGraph();
    updateWatchList();
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

// AddToWatchList Function
function addToWatchList(index) {
    console.log("Index: ", index);
    console.log(currencies);
    APITodayQuoteStockData(currencies[index].getTicker(), function(data) {
        currencies[index].setQuoteData(data);
        addWatchListElement(index);
    });
}

function addWatchListElement(index) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.id = currencies[index].getTicker();
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
    let name = document.createTextNode(currencies[index].getTicker());
    spanName.className = "stock-name";
    spanName.appendChild(name);
    let spanPrice = document.createElement("span");
    let price = document.createTextNode(currencies[index].getCurrentQuote());
    spanPrice.className = "stock-price";
    spanPrice.appendChild(price);
    let spanChangeUSD = document.createElement("span");
    let changeUSD = document.createTextNode(currencies[index].getDayChange());
    spanChangeUSD.className = "stock-change-usd";
    spanChangeUSD.appendChild(changeUSD);
    let spanChangePercent = document.createElement("span");
    let changePercent = document.createTextNode(currencies[index].getDayPercentChange());
    spanChangePercent.className = "stock-change-percent";
    spanChangePercent.appendChild(changePercent);
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
}

function updateWatchList() {
    APITodayBasicAMZNData( function(data) {
        currencyWL1.setQuoteData(data);
        updateColors();
        updateWatchListElements();
    });
    APITodayBasicAPPLData( function(data) {
        currencyWL2.setQuoteData(data);
        updateColors();
        updateWatchListElements();
    });
    APITodayBasicTSLAData( function(data) {
        currencyWL3.setQuoteData(data);
        updateColors();
        updateWatchListElements();
    });
    APITodayBasicTMUSData( function(data) {
        currencyWL4.setQuoteData(data);
        updateColors();
        updateWatchListElements();
    });
    APITodayBasicTWTRData( function(data) {
        currencyWL5.setQuoteData(data);
        updateColors();
        updateWatchListElements();
    });
}

function updateWatchListElements() {
    document.getElementById("watch1-name").innerText = currencyWL1.getTicker();
    document.getElementById("watch1-price").innerText = currencyWL1.getCurrentQuote();
    document.getElementById("watch1-change-usd").innerText = currencyWL1.getDayChange();
    document.getElementById("watch1-change-percent").innerText = currencyWL1.getDayPercentChange();

    document.getElementById("watch2-name").innerText = currencyWL2.getTicker();
    document.getElementById("watch2-price").innerText = currencyWL2.getCurrentQuote();
    document.getElementById("watch2-change-usd").innerText = currencyWL2.getDayChange();
    document.getElementById("watch2-change-percent").innerText = currencyWL2.getDayPercentChange();

    document.getElementById("watch3-name").innerText = currencyWL3.getTicker();
    document.getElementById("watch3-price").innerText = currencyWL3.getCurrentQuote();
    document.getElementById("watch3-change-usd").innerText = currencyWL3.getDayChange();
    document.getElementById("watch3-change-percent").innerText = currencyWL3.getDayPercentChange();

    document.getElementById("watch4-name").innerText = currencyWL4.getTicker();
    document.getElementById("watch4-price").innerText = currencyWL4.getCurrentQuote();
    document.getElementById("watch4-change-usd").innerText = currencyWL4.getDayChange();
    document.getElementById("watch4-change-percent").innerText = currencyWL4.getDayPercentChange();

    document.getElementById("watch5-name").innerText = currencyWL5.getTicker();
    document.getElementById("watch5-price").innerText = currencyWL5.getCurrentQuote();
    document.getElementById("watch5-change-usd").innerText = currencyWL5.getDayChange();
    document.getElementById("watch5-change-percent").innerText = currencyWL5.getDayPercentChange();
}

// RemoveWatchListElement Function

/***************************************************
 * Graph Section Functions
 ***************************************************/

// Update Graph Header Function
function updateGraphHeader() {
    APITodayBasicAPPLData( function(data) {
        currencyHL.setQuoteData(data);
        updateGraphHeaderElements();
    });
}

function updateGraphHeaderElements() {
    document.getElementById("graph-stock-name").innerText = currencyHL.getTicker();
    document.getElementById("graph-price").innerText = currencyHL.getCurrentQuote();
    document.getElementById("graph-change-usd").innerText = currencyHL.getDayChange();
    document.getElementById("graph-change-percent").innerText = currencyHL.getDayPercentChange();
}

// Update Graph Function
function updateGraph() {
    APIIntradayAPPLData( function(data) {
        currencyHL.setOneDayTimeSeriesData(data);
        console.log("updateGraph function!");
        console.log(currencyHL.getOneDayTimeSeriesData());
        updateGraphElements();
    })
}

function updateGraphElements() {
    var ctx = document.getElementById("graph-canvas").getContext("2d");

    var myChart = new Chart(ctx, {
        type: 'line',
        options: {
            scales: {
            xAxes: [{
                type: 'time',
            }]
            }
        },
        data: currencyHL.getOneDayTimeSeriesData()
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

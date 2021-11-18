


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
let news;
let graphNews = new News();
const BASE_WATCH_LIST = ["AAPL", "AMZN", "TSLA", "TMUS", "TWTR"];
let graphTimespan; // "1Day", "5Day", "1Month", "3Month", "6Month", "1Year"
let graphChart;
let email = "michaelp018@gmail.com";
let isEmailSent = false;

/***************************************************
 * Event Listener Functions
 ***************************************************/

// DOMContentLoaded
// Set up event listeners, then pull and initialize data for UI
document.addEventListener("DOMContentLoaded", () => {
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

    // Event Listener for Gainer/Loser List


    // Currency Objects
    BASE_WATCH_LIST.map(ticker => addToWatchList(ticker)); // Adds each ticker to currencies and adds an li tag to the watchlist ul
    currencyHL = new Currency("AAPL");
    crypto1 = new Currency("BTC");
    crypto2 = new Currency("ETH");
    crypto3 = new Currency("LTC");
    crypto4 = new Currency("BNB");
    crypto5 = new Currency("XRP");
    graphTimespan = "1Day";
    updateMarketNews();
    updateCryptoBar();
    updateGainersLosers();
    updateCurrencyHLElements();

    // Email Notfication Check Interval
    let emailCheckTimer = setInterval(function() { handleEmailNotification(); }, 240 * 1000);
});

//
function setEmail(){
    let tempEmail = prompt("Please enter your email:", "johndoe@aol.com");
    if (tempEmail != null && tempEmail != "") {
        email = tempEmail;
    }
}

//
function handleGainerClick(index){
    if(index == 1){
        currencyHL = new Currency(gainer.getTicker(1));
        updateCurrencyHLElements();
    }
    if(index == 2){
        currencyHL = new Currency(gainer.getTicker(2));
        updateCurrencyHLElements();
    }
    if(index == 3){
        currencyHL = new Currency(gainer.getTicker(3));
        updateCurrencyHLElements();
    }
    if(index == 4){
        currencyHL = new Currency(gainer.getTicker(4));
        updateCurrencyHLElements();
    }
    if(index == 5){
        currencyHL = new Currency(gainer.getTicker(5));
        updateCurrencyHLElements();
    }
}

function handleLoserClick(index){
    if(index == 1){
        currencyHL = new Currency(loser.getTicker(1));
        updateCurrencyHLElements();
    }
    if(index == 2){
        currencyHL = new Currency(loser.getTicker(2));
        updateCurrencyHLElements();
    }
    if(index == 3){
        currencyHL = new Currency(loser.getTicker(3));
        updateCurrencyHLElements();
    }
    if(index == 4){
        currencyHL = new Currency(loser.getTicker(4));
        updateCurrencyHLElements();
    }
    if(index == 5){
        currencyHL = new Currency(loser.getTicker(5));
        updateCurrencyHLElements();
    }
}

// Event Listener Function for 1 Day Button
/**
 * Handles a click on the 1 day button.
 * @param {*} e
 */
function handle1DayBtnClick(e) {
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
    let query = document.getElementById("searchBar").value;
    Search(query, function(data) {
        if (data)
        {
            if (currencyHL.getTicker() != data["ticker"]) {
                currencyHL = new Currency(data["ticker"]);
                updateCurrencyHLElements();
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
        if (currencyHL.getTicker() != id) {
            currencyHL = new Currency(id);
            updateCurrencyHLElements();
        }
    }
}

// Event Listener Function for Add to WatchList Buttons
/**
 * handles a click on one of the "add to watchlist" buttons
 * @param {*} e
 */
function handleToggleWatchListClick(e) {
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
}

/***************************************************
 * Watch List Functions
 ***************************************************/

// WatchListToggle Function
function watchListToggle(ticker) {
    if (isTickerInWatchList(currencies, currencyHL.getTicker())) {
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
    let price = document.createTextNode("$" + currencies[index].getCurrentQuote());
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
    document.getElementById("graph-price").innerText = "$" + currencyHL.getCurrentQuote();
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
    if(isCrypto(currencyHL.getTicker())){
        document.getElementById("graph-info-name").style.visibility = "hidden";
        document.getElementById("graph-info-logo").style.visibility = "hidden";
        document.getElementById("graph-info-industry").style.visibility = "hidden";
        document.getElementById("graph-info-url").style.visibility = "hidden";
    }
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
    document.getElementById("graph-info-name").style.visibility = "visible";
    document.getElementById("graph-info-logo").style.visibility = "visible";
    document.getElementById("graph-info-industry").style.visibility = "visible";
    document.getElementById("graph-info-url").style.visibility = "visible";
}

// Update Graph Function
function updateGraph() {
    // Has to check which timespan and whether cyprto or stock
    if (graphTimespan == "1Day") {
        if (isCrypto(currencyHL.getTicker())) {
            APIIntradayCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneDayTimeSeriesData(data);
                updateGraphElements();
            });
        } else {
            APIIntradayStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneDayTimeSeriesData(data);
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "5Day") {
        if (isCrypto(currencyHL.getTicker())) {
            APIFiveDayCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setFiveDayTimeSeriesData(data);
                updateGraphElements();
            });
        } else {
            APIFiveDayStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setFiveDayTimeSeriesData(data);
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "1Month") {
        if (isCrypto(currencyHL.getTicker())) {
            APIOneMonthCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneMonthTimeSeriesData(data);
                updateGraphElements();
            });
        } else {
            APIOneMonthStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneMonthTimeSeriesData(data);
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "3Month") {
        if (isCrypto(currencyHL.getTicker())) {
            APIThreeMonthCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setThreeMonthTimeSeriesData(data);
                updateGraphElements();
            });
        } else {
            APIThreeMonthStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setThreeMonthTimeSeriesData(data);
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "6Month") {
        if (isCrypto(currencyHL.getTicker())) {
            APISixMonthCryptoData(currencyHL.getTicker(), function(data) {
                currencyHL.setSixMonthTimeSeriesData(data);
                updateGraphElements();
            });
        } else {
            APISixMonthStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setSixMonthTimeSeriesData(data);
                updateGraphElements();
            });
        }
    } else if (graphTimespan == "1Year") {
        if (isCrypto(currencyHL.getTicker())) {
            APIOneYearStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneYearTimeSeriesData(data);
                updateGraphElements();
            });
        } else {
            APIOneYearStockData(currencyHL.getTicker(), function(data) {
                currencyHL.setOneYearTimeSeriesData(data);
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

let gainer = new marketData();
let loser = new marketData();

function updateGainers(){
    Gainers(function(data) {
        gainer.setMarketData(data);
    });
}

function updateLosers(){
    Losers(function(data) {
        loser.setMarketData(data);
    });
}

function updateGainersLosers(){
    updateGainers();
    updateLosers();
    setTimeout(() => {
        updateGainerLoserHTML()
    }, 4000);
}

function updateGainerLoserHTML(){
    document.getElementById("stock-name1").innerText = "1: " + gainer.getTicker(1);
    document.getElementById("stock-price1").innerText = "$" + gainer.getPrice(1);
    document.getElementById("stock-percent1").innerText = "(" +  gainer.getChangesPercentage(1) + "%)";
    document.getElementById("stock-name2").innerText = "2: " + gainer.getTicker(2);
    document.getElementById("stock-price2").innerText = "$" + gainer.getPrice(2);
    document.getElementById("stock-percent2").innerText = "(" +  gainer.getChangesPercentage(2) + "%)";
    document.getElementById("stock-name3").innerText = "3: " + gainer.getTicker(3);
    document.getElementById("stock-price3").innerText = "$" + gainer.getPrice(3);
    document.getElementById("stock-percent3").innerText = "(" +  gainer.getChangesPercentage(3) + "%)";
    document.getElementById("stock-name4").innerText = "4: " + gainer.getTicker(4);
    document.getElementById("stock-price4").innerText = "$" + gainer.getPrice(4);
    document.getElementById("stock-percent4").innerText = "(" +  gainer.getChangesPercentage(4) + "%)";
    document.getElementById("stock-name5").innerText = "5: " + gainer.getTicker(5);
    document.getElementById("stock-price5").innerText = "$" + gainer.getPrice(5);
    document.getElementById("stock-percent5").innerText = "(" + gainer.getChangesPercentage(5) + "%)";
    document.getElementById("stock-name6").innerText = "1: " + loser.getTicker(1);
    document.getElementById("stock-price6").innerText = "$" + loser.getPrice(1);
    document.getElementById("stock-percent6").innerText = "(" + loser.getChangesPercentage(1) + "%)";
    document.getElementById("stock-name7").innerText = "2: " + loser.getTicker(2);
    document.getElementById("stock-price7").innerText = "$" + loser.getPrice(2);
    document.getElementById("stock-percent7").innerText = "(" +  loser.getChangesPercentage(2) + "%)";
    document.getElementById("stock-name8").innerText = "3: " + loser.getTicker(3);
    document.getElementById("stock-price8").innerText = "$" + loser.getPrice(3);
    document.getElementById("stock-percent8").innerText = "(" +  loser.getChangesPercentage(3) + "%)";
    document.getElementById("stock-name9").innerText = "4: " + loser.getTicker(4);
    document.getElementById("stock-price9").innerText = "$" + loser.getPrice(4);
    document.getElementById("stock-percent9").innerText = "(" +  loser.getChangesPercentage(4) + "%)";
    document.getElementById("stock-name10").innerText = "5: " + loser.getTicker(5);
    document.getElementById("stock-price10").innerText = "$" + loser.getPrice(5);
    document.getElementById("stock-percent10").innerText = "(" +  loser.getChangesPercentage(5) + "%)";
}

/***************************************************
 * Search Bar Functions
 ***************************************************/

// SearchHandle Function

/***************************************************
 * Market News Functions
 ***************************************************/
function updateCompanyNews(){
    if(isCrypto(currencyHL.getTicker())){
        document.getElementById("graph-news-header").style.visibility = "hidden";
        document.getElementById("graph-news-headline").style.visibility = "hidden";
        document.getElementById("graph-news-img").style.visibility = "hidden";
        document.getElementById("graph-news-link").style.visibility = "hidden";
    }
    APIGetTickerNews(currencyHL.getTicker() ,function(data) {
        graphNews.setNews(data);
        updateCompanyNewsElement();
    });
}

function updateCompanyNewsElement(){
    document.getElementById("graph-news-header").style.visibility = "visible";
    document.getElementById("graph-news-headline").style.visibility = "visible";
    document.getElementById("graph-news-img").style.visibility = "visible";
    document.getElementById("graph-news-link").style.visibility = "visible";
    document.getElementById("graph-news-headline").innerText = graphNews.getHeadline();
    document.getElementById("graph-news-img").src = graphNews.getImage();
    //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
    //document.getElementById("graph-news-summary").innerText = graphNews.getSummary();
    document.getElementById("graph-news-link").href = graphNews.getUrl();
}

function updateMarketNews(){
    news = new News();
    APIGetMarketNews(function(data) {
        news.setNews(data);
        updateNewsElement();
    });
}

function updateNewsElement(){
    document.getElementById("news1-headline").innerText = news.getHeadline(1);
    document.getElementById("news1-img").src = news.getImage(1);
    //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
    document.getElementById("news1-summary").innerText = news.getSummary(1);
    document.getElementById("news1-url").href = news.getUrl(1);


    document.getElementById("news2-headline").innerText = news.getHeadline(2);
    document.getElementById("news2-img").src = news.getImage(2);
    //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
    document.getElementById("news2-summary").innerText = news.getSummary(2);
    document.getElementById("news2-url").href = news.getUrl(2);


    document.getElementById("news3-headline").innerText = news.getHeadline(3);
    document.getElementById("news3-img").src = news.getImage(3);
    //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
    document.getElementById("news3-summary").innerText = news.getSummary(3);
    document.getElementById("news3-url").href = news.getUrl(3);

    document.getElementById("news4-headline").innerText = news.getHeadline(4);
    document.getElementById("news4-img").src = news.getImage(4);
    //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
    document.getElementById("news4-summary").innerText = news.getSummary(4);
    document.getElementById("news4-url").href = news.getUrl(4);

    document.getElementById("news5-headline").innerText = news.getHeadline(5);
    document.getElementById("news5-img").src = news.getImage(5);
    //document.getElementById(newsSelector + "-source").innerText = news[index].getSource();
    document.getElementById("news5-summary").innerText = news.getSummary(5);
    document.getElementById("news5-url").href = news.getUrl(5);
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
    document.getElementById(coinPrice).innerText = "$" + newPrice;
    document.getElementById(coinPercent).innerText = newPercent;
}

/***************************************************
 * Email Notification Functions
 ***************************************************/

function handleEmailNotification() {
    let t = new Date();
    if (t.getHours() >= 15 && !isEmailSent) {
        sendWatchListEmail(currencies, email);
        isEmailSent = true;
    }
    if (t.getHours() < 15 && isEmailSent) {
        isEmailSent = false;
    }
}
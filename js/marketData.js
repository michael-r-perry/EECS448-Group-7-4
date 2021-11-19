// For the Gainers/Loosers Top 10 and Market Data from polygon.io
class marketData{
    /**
     * Initializes members
     * @returns none
     */
    constructor(){
        this.ticker1 = "";
        this.changes1 = "";
        this.price1 = "";
        this.changesPercentage1 = "";
        this.companyName1 = "";
        this.ticker2 = "";
        this.changes2 = "";
        this.price2 = "";
        this.changesPercentage2 = "";
        this.companyName2 = "";
        this.ticker3 = "";
        this.changes3 = "";
        this.price3 = "";
        this.changesPercentage3 = "";
        this.companyName3 = "";
        this.ticker4 = "";
        this.changes4 = "";
        this.price4 = "";
        this.changesPercentage4 = "";
        this.companyName4 = "";
        this.ticker5 = "";
        this.changes5 = "";
        this.price5 = "";
        this.changesPercentage5 = "";
        this.companyName5 = "";
    }

    /**
     * set's market news data from Finnhub API to members
     * @params {Object} marketData - market news data from Finnhub API
     * @returns none
     */
    setMarketData(marketData){
        this.ticker1 = marketData["ticker1"];
        this.changes1 = marketData["changes1"];
        this.price1 = marketData["price1"];
        this.changesPercentage1 = marketData["changesPercentage1"];
        this.companyName1 = marketData["companyName1"];
        this.ticker2 = marketData["ticker2"];
        this.changes2 = marketData["changes2"];
        this.price2 = marketData["price2"];
        this.changesPercentage2 = marketData["changesPercentage2"];
        this.companyName2 = marketData["companyName2"];
        this.ticker3 = marketData["ticker3"];
        this.changes3 = marketData["changes3"];
        this.price3 = marketData["price3"];
        this.changesPercentage3 = marketData["changesPercentage3"];
        this.companyName3 = marketData["companyName3"];
        this.ticker4 = marketData["ticker4"];
        this.changes4 = marketData["changes4"];
        this.price4 = marketData["price4"];
        this.changesPercentage4 = marketData["changesPercentage4"];
        this.companyName4 = marketData["companyName4"];
        this.ticker5 = marketData["ticker5"];
        this.changes5 = marketData["changes5"];
        this.price5 = marketData["price5"];
        this.changesPercentage5 = marketData["changesPercentage5"];
        this.companyName5 = marketData["companyName5"];
    }

    /**
     * Finds which ticker and returns this.ticker#
     * @params {number} index - index of ticker to get
     * @returns {string} this.ticker#
     */
    getTicker(index){
        if(index == 1){
            return this.ticker1;
        }
        if(index == 2){
            return this.ticker2;
        }
        if(index == 3){
            return this.ticker3;
        }
        if(index == 4){
            return this.ticker4;
        }
        if(index == 5){
            return this.ticker5;
        }
    }

    /**
     * Finds which changes and returns this.changes#
     * @params {number} index - index of changes to get
     * @returns {string} this.changes#
     */
    getChanges(index){
        if(index == 1){
            return this.changes1;
        }
        if(index == 2){
            return this.changes2;
        }
        if(index == 3){
            return this.changes3;
        }
        if(index == 4){
            return this.changes4;
        }
        if(index == 5){
            return this.changes5;
        }
    }

    /**
     * Finds which price and returns this.price#
     * @params {number} index - index of price to get
     * @returns {string} this.price#
     */
    getPrice(index){
        if(index == 1){
            return this.price1;
        }
        if(index == 2){
            return this.price2;
        }
        if(index == 3){
            return this.price3;
        }
        if(index == 4){
            return this.price4;
        }
        if(index == 5){
            return this.price5;
        }
    }
    /**
     * Finds which change percentage and returns this.changePercentage#
     * @params {number} index - index of change percentage to get
     * @returns {string} this.changePercentage#
     */
    getChangesPercentage(index){
        if(index == 1){
            return this.changesPercentage1;
        }
        if(index == 2){
            return this.changesPercentage2;
        }
        if(index == 3){
            return this.changesPercentage3;
        }
        if(index == 4){
            return this.changesPercentage4;
        }
        if(index == 5){
            return this.changesPercentage5;
        }
    }
}

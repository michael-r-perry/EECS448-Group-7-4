// For the Gainers/Loosers Top 10 and Market Data from polygon.io
class marketData{
    constructor() {
        this.ticker = "";
        this.changes = "";
        this.price = "";
        this.changesPercentage = "";
        this.companyName = "";
    }
    setMarketData(marketData){
        this.ticker = marketData["ticker"];
        this.changes = marketData["changes"];
        this.price = marketData["price"];
        this.changesPercentage = marketData["changesPercentage"];
        this.companyName = marketData["companyName"];
    }
    getTicker(){
        return this.ticker;
    }
    getChanges(){
        return this.changes;
    }
    getPrice(){
        return this.getPrice();
    }
    getChangesPercentage(){
        return this.changesPercentage;
    }
    getCompanyName(){
        return this.companyName;
    }
}

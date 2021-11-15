class Currency {
    constructor(ticker) {
        this.ticker = ticker;
        this.CurrentQuote = 0.0;
        this.DayChange = 0.0;
        this.DayPercentChange = 0.0;
        this.DayOpen = 0.0;
        this.OneDayTimeSeries = [];
        this.FiveDayTimeSeries = [];
        this.OneMonthTimeSeries = [];
        this.ThreeMonthTimeSeries = [];
        this.SixMonthTimeSeries = [];
        this.OneYearTimeSeries = [];
        this.industry = "";
        this.logo = "";
        this.name = "";
        this.url = "";
    }

    /**
     * 
     * @param {*} ticker 
     */
    setTicker(ticker) {
        this.ticker = ticker;
    }

    /**
     * 
     * @returns 
     */
    getTicker() {
        return this.ticker;
    }

    /**
     * 
     * @returns 
     */
    getCurrentQuote() {
        return this.CurrentQuote;
    }

    getDayChange() {
        return this.DayChange;
    }

    getDayPercentValue() {
        return this.DayPercentChange;
    }

    getDayPercentChange() {
        let temp = "(" +this.DayPercentChange + "%)";
        return temp;
    }

    getUrl() {
        return this.url;
    }
    getName() {
        return this.name;
    }
    getLogo() {
        return this.logo;
    }
    getIndustry() {
        return this.industry;
    }

    setTickerInfo(data) {
        this.industry = data["industry"];
        this.url = data["url"];
        this.name = data["name"];
        this.logo = data["logo"];
    }

    /**
     * 
     */
    setQuoteData(newData) {
        this.CurrentQuote = newData["c"];
        this.DayChange = newData["d"];
        this.DayPercentChange = newData["dp"];
        this.DayOpen = newData["o"];
    }

    setOneDayTimeSeriesData(data) {
        let closes = data["c"];
        let times = data["t"];
        let isos = times.map(t => UNIXtoISOConversion(t));
        let gData = closes.map((c, i) => {return {t:isos[i], y:c}});
        let bgc = CreateBackgroundColors(gData.length);
        let bc = CreateBorderColors(gData.length);
        this.OneDayTimeSeries = {
            labels: isos,
            datasets: [{
            label: this.ticker,
            data: gData,
            backgroundColor: bgc,
            borderColor: bc,
            borderWidth: 1
            }]
        };
    }

    /**
     * 
     * @returns 
     */
    getOneDayTimeSeriesData() {
        return this.OneDayTimeSeries;
    }

    setFiveDayTimeSeriesData(data) {
        let closes = data["c"];
        let times = data["t"];
        let isos = times.map(t => UNIXtoISOConversion(t));
        let gData = closes.map((c, i) => {return {t:isos[i], y:c}});
        let bgc = CreateBackgroundColors(gData.length);
        let bc = CreateBorderColors(gData.length);
        this.FiveDayTimeSeries = {
            labels: isos,
            datasets: [{
            label: this.ticker,
            data: gData,
            backgroundColor: bgc,
            borderColor: bc,
            borderWidth: 1
            }]
        };
    }

    /**
     * 
     * @returns 
     */
    getFiveDayTimeSeriesData() {
        // Redo once APIs.js has been updated
        // this.FiveDayTimeSeries = APIs.getHistoricData()
        return this.FiveDayTimeSeries;
    }

    setOneMonthTimeSeriesData(data) {
        let closes = data["c"];
        let times = data["t"];
        let isos = times.map(t => UNIXtoISOConversion(t));
        let gData = closes.map((c, i) => {return {t:isos[i], y:c}});
        let bgc = CreateBackgroundColors(gData.length);
        let bc = CreateBorderColors(gData.length);
        this.OneMonthTimeSeries = {
            labels: isos,
            datasets: [{
            label: this.ticker,
            data: gData,
            backgroundColor: bgc,
            borderColor: bc,
            borderWidth: 1
            }]
        };
    }

    /**
     * 
     * @returns 
     */
    getOneMonthTimeSeriesData() {
        // Redo once APIs.js has been updated
        // this.OneMonthTimeSeries = APIs.getHistoricData()
        return this.OneMonthTimeSeries;
    }

    setThreeMonthTimeSeriesData(data) {
        let closes = data["c"];
        let times = data["t"];
        let isos = times.map(t => UNIXtoISOConversion(t));
        let gData = closes.map((c, i) => {return {t:isos[i], y:c}});
        let bgc = CreateBackgroundColors(gData.length);
        let bc = CreateBorderColors(gData.length);
        this.ThreeMonthTimeSeries = {
            labels: isos,
            datasets: [{
            label: this.ticker,
            data: gData,
            backgroundColor: bgc,
            borderColor: bc,
            borderWidth: 1
            }]
        };
    }

    /**
     * 
     * @returns 
     */
    getThreeMonthTimeSeriesData() {
        // Redo once APIs.js has been updated
        // this.ThreeMonthTimeSeries = APIs.getHistoricData()
        return this.ThreeMonthTimeSeries;
    }

    setSixMonthTimeSeriesData(data) {
        let closes = data["c"];
        let times = data["t"];
        let isos = times.map(t => UNIXtoISOConversion(t));
        let gData = closes.map((c, i) => {return {t:isos[i], y:c}});
        let bgc = CreateBackgroundColors(gData.length);
        let bc = CreateBorderColors(gData.length);
        this.SixMonthTimeSeries = {
            labels: isos,
            datasets: [{
            label: this.ticker,
            data: gData,
            backgroundColor: bgc,
            borderColor: bc,
            borderWidth: 1
            }]
        };
    }

    /**
     * 
     * @returns 
     */
    getSixMonthTimeSeriesData() {
        // Redo once APIs.js has been updated
        // this.SixMonthTimeSeries = APIs.getHistoricData()
        return this.SixMonthTimeSeries;
    }

    setOneYearTimeSeriesData(data) {
        let closes = data["c"];
        let times = data["t"];
        let isos = times.map(t => UNIXtoISOConversion(t));
        let gData = closes.map((c, i) => {return {t:isos[i], y:c}});
        let bgc = CreateBackgroundColors(gData.length);
        let bc = CreateBorderColors(gData.length);
        this.OneYearTimeSeries = {
            labels: isos,
            datasets: [{
            label: this.ticker,
            data: gData,
            backgroundColor: bgc,
            borderColor: bc,
            borderWidth: 1
            }]
        };
    }

    /**
     * 
     * @returns 
     */
    getOneYearTimeSeriesData() {
        // Redo once APIs.js has been updated
        // this.OneYearTimeSeries = APIs.getHistoricData()
        return this.OneYearTimeSeries;
    }
}
/** Class that represents and holds ticker/crypto data */
class Currency {
    /**
     * Initializes members and set's ticker to this.ticker
     * @params {string} ticker
     * @returns none
     */
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
     * Set's ticker to this.ticker
     * @params {string} ticker
     * @returns none
     */
    setTicker(ticker) {
        this.ticker = ticker;
    }

    /**
     * @params N/A
     * @returns {string} this.ticker
     */
    getTicker() {
        return this.ticker;
    }

    /**
     * @params N/A
     * @returns {string} this.CurrentQuote
     */
    getCurrentQuote() {
        return this.CurrentQuote;
    }

    /**
     * @params N/A
     * @returns {string} this.DayChange
     */
    getDayChange() {
        return this.DayChange;
    }

    /**
     * @params N/A
     * @returns {string} this.DayPercentChange
     */
    getDayPercentValue() {
        return this.DayPercentChange;
    }

    /**
     * @params N/A
     * @returns {string} formatted this.DayPercentChange
     */
    getDayPercentChange() {
        let temp = "(" +this.DayPercentChange + "%)";
        return temp;
    }

    /**
     * @params N/A
     * @returns {string} this.url
     */
    getUrl() {
        return this.url;
    }

    /**
     * @params N/A
     * @returns {string} this.name
     */
    getName() {
        return this.name;
    }

    /**
     * @params N/A
     * @returns {string} this.logo
     */
    getLogo() {
        return this.logo;
    }

    /**
     * @params N/A
     * @returns {string} this.industry
     */
    getIndustry() {
        return this.industry;
    }

    /**
     * Formats data from company API call and set's it to corresponding members
     * @params {Object} data - response from company API call
     * @returns None
     */
    setTickerInfo(data) {
        this.industry = data["industry"];
        this.url = data["url"];
        this.name = data["name"];
        this.logo = data["logo"];
    }

    /**
     * Formats data from quote API call and set's it to corresponding members
     * @params {Object} newData - response from quote API call
     * @returns None
     */
    setQuoteData(newData) {
        this.CurrentQuote = newData["c"];
        this.DayChange = newData["d"];
        this.DayPercentChange = newData["dp"];
        this.DayOpen = newData["o"];
    }

    /**
     * Formats data from candle API call and set's it to this.OneDayTimeSeries
     * @params {Object} data - response from candle API call
     * @returns {Object} this.OneDayTimeSeries (Format for data in ChartJS)
     */
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
     * @params N/A
     * @returns {Object} this.OneDayTimeSeries (Format for data in ChartJS)
     */
    getOneDayTimeSeriesData() {
        return this.OneDayTimeSeries;
    }

    /**
     * Formats data from candle API call and set's it to this.FiveDayTimeSeries
     * @params {Object} data - response from candle API call
     * @returns {Object} this.FiveDayTimeSeries (Format for data in ChartJS)
     */
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
     * @params N/A
     * @returns {Object} this.FiveDayTimeSeries (Format for data in ChartJS)
     */
    getFiveDayTimeSeriesData() {
        return this.FiveDayTimeSeries;
    }

    /**
     * Formats data from candle API call and set's it to this.OneMonthTimeSeries
     * @params {Object} data - response from candle API call
     * @returns {Object} this.OneMonthTimeSeries (Format for data in ChartJS)
     */
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
     * @params N/A
     * @returns {Object} this.OneMonthTimeSeries (Format for data in ChartJS)
     */
    getOneMonthTimeSeriesData() {
        return this.OneMonthTimeSeries;
    }

    /**
     * Formats data from candle API call and set's it to this.ThreeMonthTimeSeries
     * @params {Object} data - response from candle API call
     * @returns {Object} this.ThreeMonthTimeSeries (Format for data in ChartJS)
     */
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
     * @params N/A
     * @returns {Object} this.ThreeMonthTimeSeries (Format for data in ChartJS)
     */
    getThreeMonthTimeSeriesData() {
        return this.ThreeMonthTimeSeries;
    }

    /**
     * Formats data from candle API call and set's it to this.SixMonthTimeSeries
     * @params {Object} data - response from candle API call
     * @returns {Object} this.SixMonthTimeSeries (Format for data in ChartJS)
     */
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
     * @params N/A
     * @returns {Object} this.SixMonthTimeSeries (Format for data in ChartJS)
     */
    getSixMonthTimeSeriesData() {
        return this.SixMonthTimeSeries;
    }

    /**
     * Formats data from candle API call and set's it to this.OneYearTimeSeries
     * @params {Object} data - response from candle API call
     * @returns {Object} this.OneYearTimeSeries (Format for data in ChartJS)
     */
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
     * @params N/A
     * @returns {Object} this.OneYearTimeSeries (Format for data in ChartJS)
     */
    getOneYearTimeSeriesData() {
        return this.OneYearTimeSeries;
    }
}
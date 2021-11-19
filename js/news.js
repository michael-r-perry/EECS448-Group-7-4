class News {
    /**
     * Initializes members
     * @returns none
     */
    constructor(){
        this.headline1 = "";
        this.image1 = "";
        this.source1 = "";
        this.summary1 = "";
        this.url1 = "";
        this.headline2 = "";
        this.image2 = "";
        this.source2 = "";
        this.summary2 = "";
        this.url2 = "";
        this.headline3 = "";
        this.image3 = "";
        this.source3 = "";
        this.summary3 = "";
        this.url3 = "";
        this.headline4 = "";
        this.image4 = "";
        this.source4 = "";
        this.summary4 = "";
        this.url4 = "";
        this.headline5 = "";
        this.image5 = "";
        this.source5 = "";
        this.summary5 = "";
        this.url5 = "";
    }

    /**
     * set's market news data from Finnhub API to members
     * @params {Object} marketData - market news data from Finnhub API
     * @returns none
     */
    setNews(newsData){
        this.headline1 = newsData["headline1"];
        this.image1 = newsData["image1"];
        this.source1 = newsData["source1"];
        this.summary1 = newsData["summary1"];
        this.url1 = newsData["url1"];
        this.headline2 = newsData["headline2"];
        this.image2 = newsData["image2"];
        this.source2 = newsData["source2"];
        this.summary2 = newsData["summary2"];
        this.url2 = newsData["url2"];
        this.headline3 = newsData["headline3"];
        this.image3 = newsData["image3"];
        this.source3 = newsData["source3"];
        this.summary3 = newsData["summary3"];
        this.url3 = newsData["url3"];
        this.headline4 = newsData["headline4"];
        this.image4 = newsData["image4"];
        this.source4 = newsData["source4"];
        this.summary4 = newsData["summary4"];
        this.url4 = newsData["url4"];
        this.headline5 = newsData["headline5"];
        this.image5 = newsData["image5"];
        this.source5 = newsData["source5"];
        this.summary5 = newsData["summary5"];
        this.url5 = newsData["url5"];
    }

    /**
     * Finds which headline and returns this.headline#
     * @params {number} index - index of headline to get
     * @returns {string} this.headline#
     */
    getHeadline(index){
        if(index == 1){
            return this.headline1;
        }
        else if(index == 2){
            return this.headline2;
        }
        else if(index == 3){
            return this.headline3;
        }
        else if(index == 4){
            return this.headline4;
        }
        else if(index == 5){
            return this.headline5;
        }
    }

    /**
     * Finds which image and returns this.image#
     * @params {number} index - index of image to get
     * @returns {string} this.image#
     */
    getImage(index){
        if(index == 1){
            return this.image1;
        }
        else if(index == 2){
            return this.image2;
        }
        else if(index == 3){
            return this.image3;
        }
        else if(index == 4){
            return this.image4;
        }
        else if(index == 5){
            return this.image5;
        }
    }

    /**
     * Finds which source and returns this.source#
     * @params {number} index - index of source to get
     * @returns {string} this.source#
     */
    getSource(index){
        if(index == 1){
            return this.source1;
        }
        else if(index == 2){
            return this.source2;
        }
        else if(index == 3){
            return this.source3;
        }
        else if(index == 4){
            return this.source4;
        }
        else if(index == 5){
            return this.source5;
        }
    }

    /**
     * Finds which summary and returns this.summary#
     * @params {number} index - index of summary to get
     * @returns {string} this.summary#
     */
    getSummary(index){
        if(index == 1){
            return this.summary1;
        }
        else if(index == 2){
            return this.summary2;
        }
        else if(index == 3){
            return this.summary3;
        }
        else if(index == 4){
            return this.summary4;
        }
        else if(index == 5){
            return this.summary5;
        }
    }

    /**
     * Finds which url and returns this.url#
     * @params {number} index - index of url to get
     * @returns {string} this.url#
     */
    getUrl(index){
        if(index == 1){
            return this.url1;
        }
        else if(index == 2){
            return this.url2;
        }
        else if(index == 3){
            return this.url3;
        }
        else if(index == 4){
            return this.url4;
        }
        else if(index == 5){
            return this.url5;
        }
    }
}

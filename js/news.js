class News {
    constructor(){
        this.headline = "";
        this.image = "";
        this.source = "";
        this.summary = "";
        this.url = "";
    }

    setNews(newsData){
        this.headline = newsData["headline"];
        this.image = newsData["image"];
        this.source = newsData["source"];
        this.summary = newsData["summary"];
        this.url = newsData["url"];
    }

    getHeadline(){
        return this.headline;
    }

    getImage(){
        return this.image;
    }

    getSource(){
        return this.source;
    }

    getSummary(){
        return this.summary;
    }

    getUrl(){
        return this.url;
    }
}

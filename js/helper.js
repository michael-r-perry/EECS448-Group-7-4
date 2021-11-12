function getUNIXMidnightTonight() {
    let t = new Date();
    t.setHours(24,0,0,0);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

function getUNIXMidnightMorning() {
    let t = new Date();
    t.setHours(0,0,0,0);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

function getUNIXFiveDaysAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setDate(t.getDate() - 7);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

function getUNIXOneMonthAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setMonth(t.getMonth() - 1);
    return t.getTime() / 1000; // UNIX Format for Finnhub
}

function getUNIXThreeMonthsAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setMonth(t.getMonth() - 3);
    return t.getTime() / 1000;
}

function getUNIXSixMonthsAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setMonth(t.getMonth() - 6);
    return t.getTime() / 1000;
}

function getUNIXOneYearAgo() {
    let t = new Date();
    t.setHours(0,0,0,0);
    t.setFullYear(t.getFullYear() - 1);
    return t.getTime() / 1000;
}

function UNIXtoISOConversion(unix) {
    return new Date(unix * 1000).toISOString();
}

function CreateBackgroundColors(num) {
    let x = 0;
    let colors = [ 
        'rgba(0, 204, 58, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];
    let bgc = [];
    for (let i = 0; i < num; i++) {
        bgc.push(colors[x]);
        x++;
        if (x > 5) { x = 0; }
    }
    return bgc;
}

function CreateBorderColors(num) {
    let x = 0;
    let colors = [
        'rgba(0, 204, 58,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];
    let bc = [];
    for (let i = 0; i < num; i++) {
        bc.push(colors[x]);
        x++;
        if (x > 5) { x = 0; }
    }
    return bc;
}

function getIndexOfTicker(currencies, ticker) {
    for (let i = 0; i < currencies.length; i++) {
        if (currencies[i].getTicker() == ticker) {
            return i;
        }
    }
    return 0;
}
function sendWatchListEmail(currencies, email) {
    let date = formatDate(new Date());
    let curMessages = currencies.map(cur => "<p>--" + cur.getTicker() + ":<br>----Close: $" + cur.getCurrentQuote() + "<br>----Day Change: " + cur.getDayChange() + "<br>----Day Percent Change: " + cur.getDayPercentChange() + "<br><p>");
    let message = curMessages.join("");
    let templateParams = {
        email_to: email,
        message: message,
        date: date
    };
     
    emailjs.send('service_ipf85ib', 'watchlist_overview', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
}
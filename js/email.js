function sendWatchListEmail(currencies, email) {
    let curMessages = currencies.map(cur => "--" + cur.getTicker() + ":\n----Close: " + cur.getCurrentQuote() + "\n----Day Change: " + cur.getDayChange() + "\n----Day Percent Change: " + cur.getDayPercentChange() + "\n");
    let message = curMessage.join("");
    let templateParams = {
        email_to: email,
        message: message
    };
     
    emailjs.send('service_ipf85ib', 'watchlist_overview', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
}
'use strict';
var moment = require('moment');

module.exports = function(app) {

    app.get('/:time', function(req, res) {
        var date = req.params.time;
        var unix = null;
        var natural = null;
        
        // Check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = toNat(unix);
        } 
        
        // Check for initial natural time
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = toUnix(date);
            natural = toNat(unix);
        }
        
        //res.send(JSON.stringify("Query"));
        res.send(JSON.stringify({ "unix": unix, "natural": natural }));
        
    });
    
    function toUnix(date) {
        return moment(date, "MMMM D, YYYY").format("X");
    }
    
    function toNat(unix) {
        return moment.unix(unix).format("MMMM D, YYYY");
    }
    
    
    
};
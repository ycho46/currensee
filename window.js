/* global $ */
const rp = require('request-promise')
const parseString = require('xml2js').parseString; //https://www.npmjs.com/package/xml2js
const remote = require('electron').remote;
const app = remote.app;
// 
//log.info('running window')

// Run this function after the page has loaded

//URL to scrap currency value rates against EUR
url = `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

//map to contain all rates.
let map = new Object(); // or var map = {};

$(() => {
    rp(url)
    .then(function(xml) {
        parseString(xml, function (err, result) {

            
            for(curr in result['gesmes:Envelope'].Cube[0].Cube[0].Cube) {
                map[result['gesmes:Envelope'].Cube[0].Cube[0].Cube[curr].$.currency] = result['gesmes:Envelope'].Cube[0].Cube[0].Cube[curr].$.rate;
            }
//            prints all contents of map
//            for(k in map) {
//                app.console.log(k + " " + map[k]);
//            }
        });
    })
    .catch(function(err) {
      //handle error
    })
    
    $('#number-input').bind('input propertychange', function() {
        const num = this.value;
        const usd = Number(map['USD'] * num).toFixed(2);
        $('#usd').text(usd);
        const jpy = Number(map['JPY'] * num).toFixed(2);
        $('#jpy').text(jpy);   
        const gbp = Number(map['GBP'] * num).toFixed(2);
        $('#gbp').text(gbp);
        const cny = Number(map['CNY'] * num).toFixed(2);
        $('#cny').text(cny);
    })
    $('#text-input').focus() // focus input box
});

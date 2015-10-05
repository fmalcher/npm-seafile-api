var config = require('./config');
var Seafile = require('./seafile');
var sf = new Seafile(config.url, config.token);

sf.listAccounts({}, function(err, accounts){
    if(err) console.error('Error:', err);
    console.log(accounts);
});

var config = require('./config');
var Seafile = require('./seafile');
var sf = new Seafile(config.url, config.token);

sf.listAccounts({}, function(err, accounts){
    if(err) console.error('Error:', err);
    console.log(accounts);
});

/*sf.createAccount({email: 'test111@schnell-mal.de', password: 'abcdefg'} , function(err){
    console.log(err);
});*/

/*sf.updateAccount({email: 'test111@schnell-mal.de', name: 'Heinz'} , function(err, body){
    console.log(body);
});*/

sf.deleteAccount('test@schnell-mal.de', function(err, body, code){
    console.log(body);

    sf.listAccounts({}, function(err, accounts){
        if(err) console.error('Error:', err);
        console.log(accounts);
    });

});

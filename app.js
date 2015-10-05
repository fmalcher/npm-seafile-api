var config = require('./config');
var Seafile = require('./seafile');
var sf = new Seafile(config.url, config.token);

sf.getAccountInfo('fmalcher@hftl.club', function(err, accounts){
    if(err) console.error('Error:', err);
    console.log(accounts);
});

/*sf.createAccount({email: 'fmalcher@hftl.club', password: 'abcdefg'} , function(err, data){
    console.log(err, data);
});*/

/*sf.updateAccount({email: 'test111@schnell-mal.de', name: 'Heinz'} , function(err, body){
    console.log(body);
});*/

/*sf.deleteAccount('test@schnell-mal.de', function(err, body, code){
    console.log(body);

    sf.listAccounts({}, function(err, accounts){
        if(err) console.error('Error:', err);
        console.log(accounts);
    });

});*/

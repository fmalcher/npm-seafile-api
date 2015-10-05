var request = require('request');


var sfClient = module.exports = function(url, token) {
    this.apiUrl = url + '/api2/';
    this.token = token;

    this.call = function(action, method, body, qs, callback) {
        //no params given, assume last function param as callback function
        if (typeof qs == 'function') {
            callback = qs;
            qs = {};
        } else if (typeof body == 'function') {
            callback = body;
            body = {};
        }

        var options = {
            url: this.apiUrl + action + '/',
            method: method,
            headers: {
                'Authorization': 'Token ' + this.token,
                'Accept': 'application/json'
            }
        }

        if (body) options.form = body;
        if (qs) options.qs = qs;



        request(options, function(err, res, body) {
            if(IsJsonString(body)) body = JSON.parse(body);

            if (err) {
                if ('code' in err && err.code == 'ECONNREFUSED') {
                    return callback(new Error('Cannot connect to Seafile Web API'));
                } else {
                    return callback(err);
                }

            } else if (res.statusCode >= 400) {
                return callback(new Error(res.statusCode + ' Error occured'), res.statusCode, body);

            } else {
                return callback(null, res.statusCode, body);
            }
        });
    }




    this.listAccounts = function(params, callback) {
        var qs = {};

        if (params.start !== null) qs.start = params.start;
        if (params.limit !== null) qs.limit = params.limit;
        if (params.scope !== null) qs.scope = params.scope;

        this.call('accounts', 'GET', null, qs, function(err, code, data) {
            if (err) return callback(err);
            console.log(code);
            return callback(null, data);
        });
    }
}


/*
module.exports.createAccount = function(email, password, is_staff, is_active, callback) {
    if (!is_staff) is_staff = 0;
    if (!is_active) is_active = 0;

    var body = {
        password: password,
        is_staff: is_staff,
        is_active: is_active
    }

    requestApi('accounts/' + email, 'PUT', body, null, function(err) {
        if (err) return callback(err);
        return callback();
    });
}*/

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

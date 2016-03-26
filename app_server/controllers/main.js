var request = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "http://loveinouter.space:3000";
}

var _showError = function(req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic', {
        title: title,
        content: content
    });
};

var renderHomepage = function(req, res, spell) {
    res.render('index', {
        title: 'MacroFireball - a simple spell macro generator',
        pageHeader: {
            title: "MacroFireball",
            status: "ALPHA",
            strapline: "A simple spell macro generator for roll20.net"
        },
        response: spell
    });
}

/* GET home page */
module.exports.index = function(req, res) {
    var options, path;
    if (req.query['name'] === undefined) {
        renderHomepage(req, res, undefined);
        return;
    }
    path = "/api/spells/list/" + req.query['name'];
    options = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        options,
        function(err, response, body) {
            if (response.statusCode === 200) {
                var data = body;
                renderHomepage(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* About page */
module.exports.about = function(req, res) {
    res.render('generic', {
        title: 'About',
        content: "About this project"});
};

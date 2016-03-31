var mongoose = require('mongoose');
var Spll = mongoose.model('Spells');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.spellGetOne = function(req, res) {
    if (req.params && req.params.spellid) {
        Spll
            .findById(req.params.spellid)
            .exec(function(err, spell) {
                if (!spell) {
                    sendJsonResponse(res, 404, {
                        "message": "spellid not found"
                    });
                    return;
                }
                else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, spell);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No spellid in request"
        });
    }
};

module.exports.spellsListByName = function(req, res) {
    if (req.params && req.params.spellname) {
        Spll
            .find({'name': {$regex: new RegExp('^' + req.params.spellname, 'i')}})
            .exec(function(err, spell) {
                if (!spell || spell.length === 0) {
                    sendJsonResponse(res, 404, {
                        "message": "no spells found with that name"
                    });
                    return;
                }
                else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, spell);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No spellname in request"
        });
    }
};

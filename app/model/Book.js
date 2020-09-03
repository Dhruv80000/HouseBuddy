var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookhouseSchema = new Schema({

    tname: { type: String},
    temail: { type: String},
    tmobile: { type: String},
    oname: { type: String},
    oemail: { type: String},
    omobile: { type: String},

});

module.exports = mongoose.model('Book', bookhouseSchema);
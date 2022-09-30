const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let serviceSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    details: {
        type: String
    },
    topicImage: {
        type: Object
    },
    bidStatus: {
        type: Array
    }
}, {
    collection: "services"
})

module.exports = mongoose.model('Service', serviceSchema)
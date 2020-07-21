// Any handle-Bars helpers
const moment = require('moment')

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
}

// to use moment now, need to register it with handlebars 
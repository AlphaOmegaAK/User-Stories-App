// Any handle-Bars helpers
const moment = require('moment')

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  },
  editIcon: function (postUser, loggedUser, postId, floating = true) {
    if (postUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/posts/edit${postId}" class="btn-floating halfway-fab  blue"><i class="fas fa-edit"></i></a>`
      }
    } else {
      return ""
    }
  }

};



// to use moment now, need to register it with handlebars 
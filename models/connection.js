var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://admin:UEG6h4itcrphgbig@cluster0.r0nfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  options,
  function (err) {
    console.log(err);
  }
)

module.exports = mongoose
var express = require('express');
var router = express.Router();

var uid2 = require('uid2')
var bcrypt = require('bcrypt');

var userModel = require('../models/users')
var articleModel = require('../models/articleW');


router.post('/sign-up', async function (req, res, next) {

  var error = []
  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if (data != null) {
    error.push('utilisateur déjà présent')
  }

  if (req.body.usernameFromFront == ''
    || req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }


  if (error.length == 0) {

    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
    })

    saveUser = await newUser.save()


    if (saveUser) {
      result = true
      token = saveUser.token
    }
  }


  res.json({ result, saveUser, error, token })
})



router.post('/sign-in', async function (req, res, next) {

  var result = false
  var user = null
  var error = []
  var token = null

  if (req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    })


    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }

    } else {
      error.push('email incorrect')
    }
  }


  res.json({ result, user, error, token })

})

router.post('/saveuserwishlist', async function (req, res, next) {

  var error = []
  var result = false;

  var user = await userModel.findOne({
    token: req.body.token,
  })

  if (user) {

    var newWishlist = [];

    for (let i = 0; i < req.body.wishList.length; i++) {
      let articleInDb = await articleModel.findOne({ title: req.body.wishList[i].title });
      if (articleInDb) {
        newWishlist.push(articleInDb.id);
      } else {
        var newArticle = new articleModel({
          source: req.body.wishList[i].source,
          author: req.body.wishList[i].author,
          title: req.body.wishList[i].title,
          description: req.body.wishList[i].description,
          url: req.body.wishList[i].url,
          urlToImage: req.body.wishList[i].urlToImage,
          publishedAt: req.body.wishList[i].publishedAt,
          content: req.body.wishList[i].content,
        })
        var savedArticle = await newArticle.save();
        newWishlist.push(savedArticle.id);
      }
    }

    user.wishlist = newWishlist;
    await user.save();

    result = true;

  } else {
    error.push("pas de user dans base de donnée")
  }

  res.json({ result, error })
})

router.get('/userwishlist/:token', async function (req, res, next) {

  var error = []
  var wishList = [];
  var result = false;

  let user = await userModel.findOne({ token: req.params.token }).populate('wishlist');

  if (user) {
    result = true;
    wishList = user.wishlist;

  } else {

    error.push("pas de user dans base de donnée");

  }

  res.json({ result, error, wishList });
  //dans le front : /userwishlist/qsdfvrqeYUEhfgsèd§_

});



module.exports = router;

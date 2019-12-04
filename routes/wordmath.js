var express = require('express');
var router = express.Router();
var w2v = require( 'word2vec' );
console.log("loading model")

models = [null, null, null]
w2v.loadModel( './routes/glove.twitter.27B.50d.txt', function( error, model ) {
  models[0] = model
  console.log("Loaded twitter");
});

w2v.loadModel( './routes/GoogleNews-vectors-negative300.txt', function( error, model ) {
  models[1] = model
  console.log("Loaded Google News");
});

w2v.loadModel( './routes/glove.6B.200d.txt', function( error, model ) {
  models[2] = model
  console.log("Loaded Wikipedia");
});

function compute(model, pos, neg) {
  if (model === null) return null;
  if (pos.length == 0 && neg.length == 0) return null;
  let first = pos.length > 0 ? pos[0] : neg[0]
  let template = model.getVector(first).values.map(_ => 0)
  let pos_vec = pos.map(p => model.getVector(p).values)
  let neg_vec = neg.map(p => model.getVector(p).values)
  let pos_acc = pos_vec.reduce((a, b) => a.map((p, i) => p + b[i]), template)
  let neg_acc = neg_vec.reduce((a, b) => a.map((p, i) => p - b[i]), template)
  let V = pos_acc.map((p, i) => p + neg_acc[i])
  words = model.getNearestWords(V, 7).map(r => r.word).filter(r => !pos.includes(r) && !neg.includes(r))
  return words;
}

router.get('/', function (req, res, next) {
  let eq = req.query.eq
  let split_plus = eq.split("+")
  let split_full = split_plus.map(s => s.split("-").map(m => m.trim()))
  let pos = []
  let neg = []
  for (let i = 0; i < split_full.length; i++) {
    pos.push(split_full[i][0])
    for (let j = 1; j < split_full[i].length; j++) {
      neg.push(split_full[i][j])
    }
  }
  result = models.map(model => compute(model, pos, neg))

  console.log("result: ", JSON.stringify(result))

  if (result.some(r => r === null)) {
    res.send({ error: "unable to execute" })
  } else {
    res.send({
      twitter: result[0],
      google_news: result[1],
      wikipedia: result[2]
    })
  }
})

module.exports = router;

/* GET home page */
module.exports.index = function(req, res){
  res.render('index', { title: 'MacroFireball' });
};

/* About page */
module.exports.about = function(req, res){
  res.render('generic', { title: 'About' });
};

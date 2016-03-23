/* GET home page */
module.exports.index = function(req, res){
  res.render('index', {
      title: 'MacroFireball - a simple spell macro generator',
      pageHeader: {
          title: "MacroFireball",
          strapline: "A simple spell macro generator for roll20.net"
      },
      macro: "&{template:DnD35StdRoll} {{spellflag=true}} {{name= @{character_name} casts Doom on @{target|token_name} }} {{School:=Necromancy (Fear, Mind affecting)}} {{Level: =Cleric 1}} {{Cmpnts:=V, S, DF}} {{Casting Time:= 1 std action}} {{Range:= Medium ([[100+10*@{casterlevel}]]ft)}} {{Target:= 1 living creature}} {{Duration:= [[@{casterlevel}]] min.}} {{Saving Throw:= Will negates (DC=[[@{spelldc1}]]) }} {{Spell Resist.:= Yes }} {{Caster level check: = [[1d20+@{casterlevel}+@{spellpen}]] vs spell resistance.}} {{compcheck= Conc:[[{1d20 +[[@{concentration}]] }>?{Concentration DC=15+Spell Level or 10+Damage Received|16}]] }} {{succeedcheck=Success! She casts her spell!}} {{failcheck=She fails :( }} {{notes=Target is filled with a feeling of horrible dread that causes it to become shaken (-2 on attack rolls, saves, skill checks, ability checks).}}"
    });
};

/* About page */
module.exports.about = function(req, res){
  res.render('generic', { title: 'About' });
};

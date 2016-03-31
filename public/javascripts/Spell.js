//TODO "\" must be converted into "\\" for json parsing
//TODO Unit conversion from ft. to meters?
//TODO May be taken from an external file for better maintainance
var spell_tempate = "&{template:DnD35StdRoll} {{spellflag=true}} {{name=@{character_name} }} {{subtags=casts %%NAME%%}} {{School:= %%SCHOOL%%}} {{Cmpnts:= %%COMPONENTS%% }} {{Casting Time:= %%CASTING_TIME%%}} {{Range:= %%RANGE%%}} {{Target:= %%TARGET%% }} {{Duration:= %%DURATION%% }} {{Saving Throw:= %%ST%% }} {{Spell Resist.:= %%SR%% }} {{Caster level check: = [[1d20+@{casterlevel%%CASTERTYPE%%}+@{spellpen}]] vs spell resistance.}} {{compcheck= Conc:[[{1d20 +[[@{concentration}]] }>?{Concentration DC=15+Spell Level or 10+Damage Received|16}]] }} {{succeedcheck=Success!}} {{failcheck=Fail :( }} {{notes= %%DESCRIPTION%%  }}";

function Spell(t_json, caster_type) {
    this.json = JSON.parse(t_json);
    this.caster_type = caster_type;
    //json should already be a parsed JSON object

    this.name = this.json.name;
    this.school = this.json.school;
    this.components = [];
    this.casting_time = this.json.casting_time;
    //TODO Corrupt level?
    this.description = this.json.description;
    this.range = this.json.range;
    this.target = this.json.target;
    this.duration = this.json.duration;
    this.saving_throw = this.json.saving_throw;
    this.spell_resistance = this.json.spell_resistance;
}

Spell.prototype.getName = function() {
    return this.name;
}

Spell.prototype.getSchool = function() {
    return this.school;
}


Spell.prototype.getComponents = function(t_spell) {
    var components = [];
    var i = 0;
    for (var key in t_spell) {
        if (key.indexOf("component") > -1) {
            if (t_spell[key] === "") {
                continue;
            }
            if (key === "extra_components") {
                components.push(" " + t_spell[key]);
                continue;
            }
            if (t_spell[key]) {
                var tmp = key.split("_");
                var cmpt = "";
                for (var j = 0; j < tmp.length - 1; j++) {
                    cmpt = cmpt + tmp[j][0];
                    cmpt = cmpt.toUpperCase();
                }
                //TODO should check first for "xp", not then
                if (tmp[0] === "xp") {
                    cmpt = "XP";
                }
                components.unshift(" " + cmpt);
            }
        }
    }
    return components;
}

Spell.prototype.getCastingTime = function() {
    return this.casting_time;
}

Spell.prototype.getDescription = function() {
    //TODO try to roll dices!
    return this.description;
}

Spell.prototype.getRange = function(range) {
    if (range !== null) {
        //TODO Use casterlevel with roll20 variable
        if ((index = range.indexOf("Close")) > -1) {
            return range.substr(0, index - 1) + " Close ([[25 + 5 * (floor(@{casterlevel" + this.caster_type + "} / 2))]] ft. " + range.substr(range.indexOf(")"), range.length - 1);
        } else if ((index = range.indexOf("Medium")) > -1) {
            return range.substr(0, index - 1) + " Medium ([[100 + 10 * @{casterlevel" + this.caster_type + "}]] ft. " + range.substr(range.indexOf(")"), range.length - 1);
        } else if ((index = range.indexOf("Long")) > -1) {
            return range.substr(0, index - 1) + " Long ([[400 + 20 * @{casterlevel" + this.caster_type + "}]] ft. " + range.substr(range.indexOf(")"), range.length - 1);
        } else if (range.indexOf("level") > -1) {
            var numbers = range
                .match(/^\d+|\d+\b|\d+(?=\w)/g)
                .map(function(v) { return +v; });
            var unit = "ft.";
            numbers = numbers.reverse();
            if (numbers.length === 1) {
                numbers.unshift(0);
            }

            if (range.indexOf("mile") > -1) {
                unit = "miles";
            }
            var sub_index = range.indexOf(";");
            if (sub_index < 0) {
                sub_index = range.length;
            }

            numbers[2] = 1;
            if (match = range.match(/((\/)(\d))/g)) {
                numbers[2] = match.toString()
                    .match(/\d+\.\d+|\d+\b|\d+(?=\w)/g)
                    .map(function(v) { return +v; }).pop();
            }

            var radius = (range.indexOf("radius") > -1) ? " radius" : "";

            return range.substr(0, range.indexOf(numbers[1]) - 1) + " ([[" + numbers[0] + " + " + numbers[1] + " * floor(@{casterlevel" + this.caster_type + "} / " + numbers[2] + ")]] " + unit + range.substr(sub_index, range.length - 1) + radius;
        } else {
            return range;
        }
    } else {
        return "";
    }
}

Spell.prototype.getTarget = function() {
    //TODO per level?
    return this.target;
}

Spell.prototype.getDuration = function() {
    //TODO per level?
    return this.duration;
}

Spell.prototype.getSavingThrow = function() {
    //TODO NULL?
    return this.saving_throw;
}

Spell.prototype.getSpellResistance = function() {
    //TODO NULL?
    return this.spell_resistance;
}

Spell.prototype.getCasterType = function() {
    return this.caster_type;
}

function replace(spell_tempate, spell) {
    var spell_template_def;
    spell_template_def = spell_tempate.replace("%%NAME%%", spell.getName());
    spell_template_def = spell_template_def.replace("%%SCHOOL%%", spell.getSchool());
    spell_template_def = spell_template_def.replace("%%COMPONENTS%%", spell.getComponents(spell.json));
    spell_template_def = spell_template_def.replace("%%CASTING_TIME%%", spell.getCastingTime());
    spell_template_def = spell_template_def.replace("%%DESCRIPTION%%", spell.getDescription());
    spell_template_def = spell_template_def.replace("%%RANGE%%", spell.getRange(spell.json.range));
    spell_template_def = spell_template_def.replace("%%TARGET%%", spell.getTarget());
    spell_template_def = spell_template_def.replace("%%DURATION%%", spell.getDuration());
    spell_template_def = spell_template_def.replace("%%ST%%", spell.getSavingThrow());
    spell_template_def = spell_template_def.replace("%%SR%%", spell.getSpellResistance());
    spell_template_def = spell_template_def.replace("%%CASTERTYPE%%", spell.getCasterType());

    return spell_template_def;
}

function printMacro(json) {
    var spell = new Spell(JSON.stringify(json), 2);
    var macro = replace(spell_tempate, spell);
    console.log(json);
    document.write(macro);
}

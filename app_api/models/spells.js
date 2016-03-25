var mongoose = require('mongoose');

var spellSchema = new mongoose.Schema({
    arcane_focus_component: {type: Boolean, "default": false},
    area: String,
    casting_time: String,
    corrupt_component: {type: Boolean, "default": false},
    corrupt_level: Number,
    description: String,
    divine_focus_component: {type: Boolean, "default": false},
    dnd_id: Number,
    duration: String,
    effect: String,
    extra_components: String,
    material_component: {type: Boolean, "default": false},
    meta_breath_component: {type: Boolean, "default": false},
    name: String,
    page: Number,
    range: String,
    rulebook_name: String,
    saving_throw: String,
    school: String,
    somatic_component: {type: Boolean, "default": false},
    spell_resistance: String,
    sub_school: String,
    target: String,
    true_name_component: {type: Boolean, "default": false},
    verbal_component: {type: Boolean, "default": false},
    xp_component: {type: Boolean, "default": false},
    edition: String
});

mongoose.model('Spells', spellSchema);
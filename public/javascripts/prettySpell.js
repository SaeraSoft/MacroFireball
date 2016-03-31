function escapeJSON(a) {
    // replace \n and \r with \\n and \\r
    a = a.replace(/\n/g, "\\n");
    a = a.replace(/\r/g, "\\r");

    // replace \" with \\\"
    a = a.replace(/\"/g, "\\\"");

    // replace again quotes for keys
    a = a.replace(/{\\\"/g, "{\"");
    a = a.replace(/\\\":\\\"/g, "\":\"");
    a = a.replace(/\\\",\\\"/g, "\",\"");
    a = a.replace(/\\\"}/g, "\"}");
    
    return a;
}

function capitalize(str) {
    str = str.replace("_", " ");
    return str[0].toUpperCase() + str.substr(1, str.length);
}

function printPrettySpell(spell) {
    var json = JSON.parse(JSON.stringify(spell));
    
    for (key in json) {
        switch (key) {
            case "_id":
                break;
            default:
                $("#" + json._id).append("<strong>" + capitalize(key) + ": </strong>" + json[key] + "<br />");
                break;
        }
    }
    
    console.log(json.name);
}
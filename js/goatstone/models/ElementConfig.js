/*
 * ElementConfig.js
 * */

define(["backbone" ], function (Backbone) {

    var ElementConfigModel = Backbone.Model.extend({
        defaults: {
            "type": "h1",
//            "name": "Shared Info",
//            "element": "div",
//            "property": "color",
//            "value": "red",
            "text": "hello default",
            "color": "default",
            "background-color": "cyan"
        }
    });

    var elementConfigModel = new ElementConfigModel();

    return elementConfigModel;
});
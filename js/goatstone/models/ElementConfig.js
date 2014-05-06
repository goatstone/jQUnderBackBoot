/*
 * ItemView.js // SelectedItems
 * */

define(["backbone" ], function (Backbone) {
    var ElementConfigModel = Backbone.Model.extend({
        defaults: {
            name: "Shared Info",
            selectionMode: "element",
            element: "div",
            property: "color",
            properties: {"color": "green", "backgroundColor": "red", "text": "hello el" },
            value: "red",
            text: "hello html",
            dummyProp: 0
        }
    });


    return ElementConfigModel
});
/**
 * main.js
 * Created by goat on 4/23/14.
 */

// G : the GLOBAL
var G = (G) ? G : {};

$('document').ready(function () {

    var ElementConfigModel = Backbone.Model.extend({
        defaults: {
            name: "Shared Info",
            selectionMode: "element",
            element: "div",
            property: "color",
//            properties: [
//                {"color": "green"},
//                {"background-color": "blue"},
//                {"text": "hello elm"}
//            ],
            properties:
                {"color": "green", "backgroundColor": "red", "text": "hello el" },
            value: "red",
            text: "hello html",
            dummyProp:0
        }
    });

    var List = Backbone.Collection.extend({
        model: ElementConfigModel
    });

    var elementConfigModel = new ElementConfigModel();
    elementConfigModel.set("name", "G Model !!!")
    elementConfigModel.bind('change', function () {
        console.log("G model changed !!!!!! ")
    })

    var mainView = new G.MainView({model: elementConfigModel, a: 2});

    // TODO : get focus this to work in the SearchPanelView
    $( '#user_input').focus();
});

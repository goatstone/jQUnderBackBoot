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
            value: "red"
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

    var mainView = new G.MainView({model:elementConfigModel,a:2});

});

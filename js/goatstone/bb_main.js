/**
 * main.js
 * Created by goat on 4/23/14.
 */

// G : the GLOBAL
var G = (G) ? G : {};

$('document').ready(function () {

    var Item = Backbone.Model.extend({
        defaults: {
            name: "Shared Info",
            selectionMode: "element",
            element: "div",
            property: "color",
            value: "red"
        }
    });

    var List = Backbone.Collection.extend({
        model: Item
    });

    var item1 = new Item();
    item1.set("name", "G Model !!!")
    item1.bind('change', function () {
        console.log("G model changed !!!!!! ")
    })

    var mainView = new G.MainView({model:item1});

});

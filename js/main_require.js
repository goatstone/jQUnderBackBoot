//the require library is configuring paths
require.config({
    paths: {
        //tries to load jQuery from Google's CDN first and falls back
        //to load locally
        "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
            "libs/jquery/jquery"],
        "underscore": "../bower_components/underscore/underscore-min",
        "backbone": "../bower_components/backbone/backbone-min",
        "element_config_model":"./goatstone/models/ElementConfig"
    },
    shim: {
        "backbone": {
            //loads dependencies first
            deps: ["jquery", "underscore"],
            //custom export name, this would be lowercase otherwise
            exports: "Backbone"
        }
    },
    //how long the it tries to load a script before giving up, the default is 7
    waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['jquery', 'underscore', 'backbone', 'goatstone/app'], function(jquery, _, Backbone, App){

    //    console.log(G)
    var ElementConfigModel = Backbone.Model.extend({
        defaults: {
            name: "Shared Info",
            selectionMode: "element",
            element: "div",
            property: "color",
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

    new App( );
});
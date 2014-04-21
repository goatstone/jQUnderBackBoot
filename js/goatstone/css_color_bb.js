(function ($) {

    // search color results
    var Color = Backbone.Model.extend({
        defaults: {
            name: 'blue',
            hexVal: '#00f'
        }
    });

    var Colors = Backbone.Collection.extend({
        model: Color
    });

    var ColorView = Backbone.View.extend({
        el: $('#search_color'),
        events: {
            'keyup #query': 'addItem',
            'keyup #query': 'searchColors'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

            this.$queryInput = $(this.el).find('#query');
            this.$display = $(this.el).find('#color_names');

            this.collection = new Colors();
//            this.collection.bind('add', this.appendItem); // collection event binder
            this.collection.bind('set', this.appendItem   ); // collection event binder
            this.render();
            this.$queryInput.focus();
        },

        render: function () {
            var self = this;
//            _(this.collection.models).each(function(item){ // in case collection is not empty
//                self.appendItem(item);
//            }, this);
        },
        searchColors: function () {
            var query = this.$queryInput.val();
            var newArr = _.filter(G.cssColors, function (el) {
                return new RegExp(query).test(el[0]);
            });
            console.log("newArr");
            console.log(newArr);
//            this.collection.add(newArr);
            this.collection.add(new Color()) ;
            this.collection.set(newArr);
        },
        addItem: function () {
            var query = this.$queryInput.val();
            console.log(query);

            var color = new Color();
            color.set({
                name: "red",
                hexVal: "#f00"
            });
            console.log(color.get("color"))
            this.collection.add(color); // add item to collection; view is updated via event 'add'
        },
        appendItem: function (color) {
            console.log(color.get("appendItem"))
            this.$display.append("<li>" + color.get("name") + "</li>");
        }
    });

    var listView = new ColorView();
})(jQuery);
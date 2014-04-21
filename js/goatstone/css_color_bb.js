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
            _.bindAll(this, 'render', 'addItem', 'resetDisplay');
            this.$queryInput = $(this.el).find('#query');
            this.$display = $(this.el).find('#color_names');

            this.collection = new Colors();
//            this.collection.bind('add', this.appendItem); // collection event binder
            this.collection.bind('reset', this.resetDisplay); // collection event binder
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
            var arr2 = [];
            newArr.forEach(function (e) {
                arr2.push({name: e[0], hexVal: e[1]})
            })

            var nA = [
                {name: "green", hexValue: "#0f0f"},
                {name: "yellow", hexValue: "#0ff"}
            ];
//            this.collection.add(new Color()) ;
//            this.collection.remove( Color);
            console.log(this.collection)
            this.collection.reset(arr2);
        },
        addItem: function () {
            var query = this.$queryInput.val();
            var color = new Color();
            color.set({
                name: "red",
                hexVal: "#f00"
            });
            console.log(color.get("color"))
            this.collection.add(color); // add item to collection; view is updated via event 'add'
        },
        resetDisplay: function () {
            this.render();
            self = this;
//            console.log(" - - -  - ")
//            console.log(this.$display)
            $('#color_names').html("");
            _(this.collection.models).each(function (item) { // in case collection is not empty
                this.$display.append('<div style="background-color:' + item.get("name") + '">'
                    + item.get("name") + "</div>" );

            }, this);
        }
    });

    var colorView = new ColorView();
})(jQuery);
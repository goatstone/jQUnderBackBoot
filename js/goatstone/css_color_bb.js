(function ($) {

    // search color results
    var Color = Backbone.Model.extend({
        defaults: {
            name: 'blue',
            r: 0,
            g: 0,
            b :255
        }
    });

    var Colors = Backbone.Collection.extend({
        model: Color
    });

    var ColorView = Backbone.View.extend({
        el: $('#search_color'),
        events: {
            'keyup #query': 'searchColors'
        },

        initialize: function () {
            _.bindAll(this, 'render' );

            this.$queryInput = $(this.el).find('#query');
            this.$display = $(this.el).find('#color_names');

            this.collection = new Colors();
            this.collection.bind('reset', this.render); // collection event binder
            this.$queryInput.focus();
            this.collection.reset(css_colors_names);
        },
        render: function () {
             var $this = this;
            $('#color_names').html("");

            _(this.collection.models).each(function (color) { // in case collection is not empty
                var divEl = $("<div>");
                divEl.css ({"background-color":color.get("name") });
                divEl.text( color.get("name") )
                $this.$display.append(divEl);
            }, this);
        },
        searchColors: function () {
            var query = this.$queryInput.val();
            var newArr = [];
            newArr = _.filter(css_colors_names, function (el) {
                return new RegExp(query).test(el.name);
            });
            this.collection.reset(newArr);
        }
     });

    var colorView = new ColorView();

})(jQuery);
(function ($) {
    var Element = Backbone.Model.extend({
        defaults: {
            name: 'paragraph',
            tag: '<p>'
        }
    });

    var Elements = Backbone.Collection.extend({
        model: Element
    });

    var ElementView = Backbone.View.extend({
        tagName: 'li', // name of (orphan) root tag in this.el
        events: {
            'click ': 'onClick'
        },
        onClick: function (e) {
            console.log("ElementView : onClick")
            console.log(this.model.get("name"));
            console.log(this.model.get("tag"));
            G.elmConfig.setElm("tag",this.model.get("tag"))
            console.log(G.elmConfig.getTag());

        },
        initialize: function () {
            _.bindAll(this, 'render', 'onClick');
        },
        render: function () {
            $(this.el).html(this.model.get('name'));
            return this;
        }
    });
    var ElementsView = Backbone.View.extend({
        el: $('body'),
//        events: {
//            'click button#add': 'addItem'
//        },
        appendItem: function (item) {
            var elementView = new ElementView({
                model: item
            });
            $('ul', this.el).append(elementView.render().el);
        },
        initialize: function () {
            _.bindAll(this, 'render');
            this.collection = new Elements();
            // this.collection.bind('add', this.appendItem); // collection event binder
            //            this.collection.bind('reset', this.render); // collection event binder
            this.collection.reset(jsonHTML_Elms);
            this.render();
        },
        render: function () {

            var self = this;
            $(this.el).append("<ul></ul>");

            _(this.collection.models).each(function (item) { // in case collection is not empty
                console.log("el")
                console.log(item.get("name"))
                console.log(item.get("tag"))
                var elementView = new ElementView({
                    model: item
                });
                $('ul', this.el).append(elementView.render().el);
            }, this);
        },

        addItem: function () {
            console.log("add item")
//            this.counter++;
//            var item = new Item();
//            item.set({
//                part2: item.get('part2') + this.counter // modify item defaults
//            });
//            this.collection.add(item); // add item to collection; view is updated via event 'add'
        }
    });

    var elementsView = new ElementsView();

})(jQuery);
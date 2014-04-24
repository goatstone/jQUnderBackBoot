/*
 * ElementView.js
 * */

var G = (G) ? G : {};

(function ($) {
    var Element = Backbone.Model.extend({
        defaults: {
            name: 'paragraph',
            tag: '<p>'
        }
    });
//
    var Elements = Backbone.Collection.extend({
        model: Element
    });
//
    var ElementView = Backbone.View.extend({
        tagName: 'li', // name of (orphan) root tag in this.el
        events: {
            'click ': 'onClick'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'onClick');
        },
        onClick: function (e) {
            console.log("ElementView : onClick")
            console.log(this.model.get("name"));
            console.log(this.model.get("tag"));
//            G.elmConfig.setElm("tag", this.model.get("tag"))
            console.log(G.elmConfig.getTag());

        },
        render: function () {
            $(this.el).html(this.model.get('name'));
            return this;
        }
    });

    var ElementViews = Backbone.View.extend({
        el: $('#elements_view'),
        x: 300,
        y: 200,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            $this = this;
            _.bindAll(this, 'render');
//            this.model.bind('change', function () {
//                $this.render();
//            })
//            var padding = 40;
//            this.x = $(window).width() - ( $(this.el).width() + parseInt($(this.el).css("padding-right"), 10) + padding );
//            this.y = $(window).height() - ( $(this.el).height() + parseInt($(this.el).css("padding-top"), 10) + padding  );
        },
//        setOffset: function (offSets) {
//            this.offSetX = offSets.x - this.x;
//            this.offSetY = offSets.y - this.y;
//        },
//        move: function (e) {
//            this.x = e.clientX - this.offSetX;
//            this.y = e.clientY - this.offSetY;
//            this.render();
//        },
        render: function () {
            var str = "element views";
            $(this.el).html('<span>' + str + '</span>')
                .css({ top: this.y, left: this.x});

//            _(this.collection.models).each(function (item) {
//                console.log("el")
//                console.log(item.get("name"))
////                console.log(item.get("tag"))
//                var elementView = new ElementView({
//                    model: item
//                });
//                $('ul', this.el).append(elementView.render().el);
//            }, this);

            return this;
        }
    });
    G.Element = Element;
    G.ElementView = ElementView;
    G.ElementViews = ElementViews;

    //    var ElementsView = Backbone.View.extend({
//        el: $('body'),
////        events: {
////            'click button#add': 'addItem'
////        },
//        appendItem: function (item) {
//            var elementView = new ElementView({
//                model: item
//            });
//            $('ul', this.el).append(elementView.render().el);
//        },
//        initialize: function () {
//            _.bindAll(this, 'render');
//            this.collection = new Elements();
//            // this.collection.bind('add', this.appendItem); // collection event binder
//            //            this.collection.bind('reset', this.render); // collection event binder
//            this.collection.reset(G.jsonHTML_Elms);
//            this.render();
//        },
//        render: function () {
//
//            var self = this;
//            $(this.el).append("<ul></ul>");
//
//            _(this.collection.models).each(function (item) { // in case collection is not empty
//                console.log("el")
//                console.log(item.get("name"))
//                console.log(item.get("tag"))
//                var elementView = new ElementView({
//                    model: item
//                });
//                $('ul', this.el).append(elementView.render().el);
//            }, this);
//        },
//
//        addItem: function () {
//            console.log("add item")
////            this.counter++;
////            var item = new Item();
////            item.set({
////                part2: item.get('part2') + this.counter // modify item defaults
////            });
////            this.collection.add(item); // add item to collection; view is updated via event 'add'
//        }
//    });

//    var elementsView = new ElementsView();


})(jQuery, G);
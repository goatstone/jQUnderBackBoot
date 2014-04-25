/*
 * ElementView.js
 * */

var G = (G) ? G : {};

(function ($) {

    var elmJSON = [
        { name: 'div',
            tag: '<div>'},
        { name: 'span',
            tag: '<span>'},
        { name: 'paragraph',
            tag: '<p>'},
        { name: 'h1',
            tag: '<h1>'},
        { name: 'h2',
            tag: '<h2>'},
        { name: 'h3',
            tag: '<h3>'}
    ]
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
        tagName: 'li',
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

        },
        render: function () {
            $(this.el).html(this.model.get('name'));
            return this;
        }
    });

    var ElementsView = Backbone.View.extend({
        el: $('#elements_view'),   //elements_view
        x: 300,
        y: 200,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            $this = this;
            _.bindAll(this, 'render');
            console.log(this)
        },
        render: function () {
            var $this = this;
            console.log("render elementview")
            var str = "element views" + this.collection.models[0].get("name");
            _(this.collection.models).each(function (e) { // in case collection is not empty
//                console.log(e.get("name"));
                var elmv = new ElementView({model: e});
                $($this.el).append(elmv.render().el)
//                $($this.el).append("x x xx x x");
//                str += e.get("name") + "<br>";
            });
            //                        + this.model.get("name")
            $(this.el).append('<br>aa<span>' + str + '</span>');
            $(this.el).css({ top: this.y, left: this.x});

            return this;
        }
    });

//    G.ElementView = ElementView;
    G.getElementsView = function () {
        var e = new Element();
        var es = new Elements(elmJSON);
        es.add(e);
        return new ElementsView({collection: es});

    }

})(jQuery, G);
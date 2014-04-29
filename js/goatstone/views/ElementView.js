/*
 * ElementView.js
 * */

define(["backbone" ], function (Backbone) {

    // gets set by arg from MainView
    var elementConfigModel;

    var elmJSON = [
        { name: 'div',
            tag: '<div>'},
        { name: 'span',
            tag: '<span>'},
        { name: 'p',
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
        tagName: 'button',
        events: {
            'click ': 'onClick'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'onClick');

        },
        onClick: function (e) {
            elementConfigModel.set("element", this.model.get("name"));
            return false;
        },
        render: function () {
            $(this.el).html(this.model.get('name'));
            return this;
        }
    });

    var ElementsView = Backbone.View.extend({
        el: $('#elements_view'),
        x: 20,
        y: 220,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            var $this = this;
            _.bindAll(this, 'render', 'setOffset', 'move');
            elementConfigModel = this.model;
        },
        setOffset: function (offSets) {
            this.offSetX = offSets.x - this.x;
            this.offSetY = offSets.y - this.y;
        },
        move: function (e) {
            this.x = e.clientX - this.offSetX;
            this.y = e.clientY - this.offSetY;
            this.render();
        },
        render: function () {
            var $this = this;
            var str = "";
            $($this.el).html("");
            _(this.collection.models).each(function (e) {
                var elmv = new ElementView({model: e});
                $($this.el).append(elmv.render().el)
            });
            $(this.el).css({ top: this.y, left: this.x});

            return this;
        }
    });
    return ElementsView
});

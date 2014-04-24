/*
 * ItemView.js
 * */

var G = (G) ? G : {};

(function ($) {

    var ItemView = Backbone.View.extend({
        el: $('#item_view'),
        x: 300,
        y: 200,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            _.bindAll(this, 'render', 'move', 'setOffset');
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
            $(this.el).html('<span>' + this.model.name + '</span>')
                .css({ top: this.y, left: this.x});
            return this;
        }
    });

    G.ItemView = ItemView;

})(jQuery, G);
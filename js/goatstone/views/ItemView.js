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
            $this = this;
            _.bindAll(this, 'render', 'move', 'setOffset');
            this.model.bind('change', function () {
                $this.render();
            })
            var padding = 40;
//            var newX = $(window).width() - ( $(this.el).width() + parseInt($(this.el).css("padding-right"), 10)  );
//            var newY = $(window).height() - ( $(this.el).height() + parseInt($(this.el).css("padding-top"), 10)  );
//            newX = newX - 40; // padding
//            newY = newY - 40; // padding
            this.x = $(window).width() - ( $(this.el).width() + parseInt($(this.el).css("padding-right"), 10) + padding );
            this.y = $(window).height() - ( $(this.el).height() + parseInt($(this.el).css("padding-top"), 10) + padding  );
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
            var str =
                "Selection Mode: " + this.model.get("selectionMode") + "<br> " +
                "Element: " + this.model.get("element") + "<br> " +
                "Property: " + this.model.get("property") + "<br> " +
                "Value: " + this.model.get("value") + "<br> ";

            this.model.get("element");
            $(this.el).html('<span>' + str + '</span>')
                .css({ top: this.y, left: this.x});
            return this;
        }
    });

    G.ItemView = ItemView;

})(jQuery, G);
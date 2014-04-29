/*
 * ItemView.js // SelectedItems
 * */

//var G = (G) ? G : {};

//(function ($) {
define(["backbone" ], function (Backbone) {

    var ItemView = Backbone.View.extend({
        el: $('#item_view'),
        x: 300,
        y: 200,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            var $this = this;
            _.bindAll(this, 'render', 'move', 'setOffset');

            this.model.bind('change', function () {
                console.log("iv model change...")
                $this.render();
            });

            var padding = 40;
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
                "Value: " + this.model.get("value") + "<br> " +

                "text . . .: " + this.model.get("properties").text + "<br> ";


            this.model.get("element");
            $(this.el).html('<span>' + str + '</span>')
                .css({ top: this.y, left: this.x});
            return this;
        }
    });

    return ItemView;
});

//    G.ItemView = ItemView;

//})(jQuery, G);
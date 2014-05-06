/*
 * ItemView.js // SelectedItems
 * */

define(["backbone", "element_config_model" ], function (Backbone, elementConfigModel) {

    var ItemView = Backbone.View.extend({
        el: $('#item_view'),
        x: 300,
        y: 200,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            var $this = this;
            _.bindAll(this, 'render', 'move', 'setOffset');

            elementConfigModel.bind('change', function () {
                console.log("element_config_model model change...");
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
                "Selection Mode: " + elementConfigModel.get("selectionMode") + "<br> " +
                "Element: " + elementConfigModel.get("element") + "<br> " +
                "Property: " + elementConfigModel.get("property") + "<br> " +
                "Value: " + elementConfigModel.get("value") + "<br> " +

                "text . . .: " + elementConfigModel.get("properties").text + "<br> ";

            $(this.el).html('<span>' + str + '</span>')
                .css({ top: this.y, left: this.x});
            return this;
        }
    });

    return ItemView;
});
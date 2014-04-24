/* MainView.js
 * */

var G = (G) ? G : {};

(function ($) {

    var MainView = Backbone.View.extend({
        el: $('body'),
        events: {
            'mousedown #item_view': 'onMouseDownItemView',
            'mousedown #search_panel_view': 'onMouseDownSearchPanelView',
            'mousemove': 'onMove',
            'mouseup': 'onMouseUp'
        },
        isDragging: false,
        selectedView: null,
        initialize: function () {

            _.bindAll(this, 'render', "onMouseUp",
                "onMove", "onMouseDownItemView", "onMouseDownSearchPanelView");

            this.$display = $('#main_display');
            this.$display.height($(document).height());

            this.$itemView = new G.ItemView({
                model: {name: "Item View"}
            });

            this.$searchPanelView = new G.SearchPanelView({
                model: {name: "Search Panel"}
            });

            $(this.el).append(this.$itemView.render().el);
            $(this.el).append(this.$searchPanelView.render().el);

        },
        onMouseDownSearchPanelView: function (e) {
            this.selectedView = this.$searchPanelView;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});

        },
        onMouseDownItemView: function (e) {
            this.selectedView = this.$itemView;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});
        },
        onMouseUp: function () {
            this.selectedView = null;
        },
        onMove: function (e) {

            if (this.selectedView != null) {
                this.selectedView.move(e);
            }
        }
    });

    G.MainView = MainView;

})(jQuery, G);



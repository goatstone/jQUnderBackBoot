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
            'mouseup': 'onMouseUp',
            'mouseout': 'onMouseOut',
            'mouseover': 'onMouseOver'
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
            this.selectedView = this.$itemView;
            $(this.el).append(this.$itemView.render().el);
            $(this.el).append(this.$searchPanelView.render().el);

        },
        onMouseDownSearchPanelView: function (e) {
            console.log("onMouseDownSearchPanelView");
            this.isDragging = true;
            this.selectedView = this.$searchPanelView;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});

        },
        onMouseDownItemView: function (e) {
            console.log("onMouseDownItemView");
            this.isDragging = true;
            // selectedElement
            this.selectedView = this.$itemView;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});
        },
        onMouseOver: function () {
            console.log("on mouse over");
        },
        onResize: function () {
            this.render();
        },
        onMouseUp: function () {
            this.isDragging = false;
        },
        onMove: function (e) {
            console.log("onMove");

            if (this.isDragging) {
                if (this.selectedView != null) {
                    this.selectedView.move(e);
                }
            }
        },
        render: function () {
            var $this = this;
        }
    });

    $(window).resize(function () {
        colorView.onResize();
    })

    G.MainView = MainView;

})(jQuery, G);


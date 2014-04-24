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
        selectedView: null,
        initialize: function () {

            console.log(this.model.get("name"));

            _.bindAll(this, 'render', "onMouseUp",
                "onMove", "onMouseDownItemView", "onMouseDownSearchPanelView");

            this.$display = $('#main_display');
            this.$display.height($(document).height());

            this.$itemView = new G.ItemView({model: this.model});
            this.$searchPanelView = new G.SearchPanelView({model: this.model});

//            var elementView = new G.ElementView();
            var element = new G.Element();
            this.$elementViews = new G.ElementViews({model:element});

            $(this.el).append(this.$itemView.render().el);
            $(this.el).append(this.$searchPanelView.render().el);
            $(this.el).append(this.$elementViews.render().el);

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



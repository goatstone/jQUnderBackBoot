/* MainView.js
 * */


// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'],
    function   ($,        canvas,   sub) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
//    });

    var MainView = Backbone.View.extend({
        el: $('body'),
        events: {
            'mousedown #item_view': 'onMouseDownItemView',
            'mousedown #search_panel_view': 'onMouseDownSearchPanelView',
            'mousedown #elements_view': 'onMouseDownElementsView',
            'mousedown #html_el_view': 'onMouseDownHTML_ElView',
            'mousemove': 'onMove',
            'mouseup': 'onMouseUp'
        },
        selectedView: null,
        initialize: function () {

            _.bindAll(this, 'render', "onMouseUp",
                "onMove", "onMouseDownItemView", "onMouseDownSearchPanelView",
                "onMouseDownElementsView", "onMouseDownHTML_ElView");

            this.$display = $('#main_display');
            this.$display.height($(document).height());

            this.$itemView = new G.ItemView({model: this.model});
            this.$searchPanelView = new G.SearchPanelView({model: this.model});
            this.$elementView = G.getElementsView(this.model); // Factory
            this.$hTML_ElView = G.getHTML_ElView(this.model);

            $(this.el).append(this.$itemView.render().el);
            $(this.el).append(this.$searchPanelView.render().el);
            $(this.el).append(this.$elementView.render().el);
            $(this.el).append(this.$hTML_ElView.render().el);

        },
        onMouseDownHTML_ElView: function(e){
            console.log("onMouseDownHTML_ElView");
            this.selectedView = this.$hTML_ElView;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});
        },
        onMouseDownElementsView: function (e) {
            this.selectedView = this.$elementView;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});
        },
        onMouseDownSearchPanelView: function (e) {
            console.log(e.target.getAttribute("id") )
            // TODO : bug, on select option, View moves into corner, next line fixes this
            if(e.target.getAttribute("id") === "prop_select")return;
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

    });


//var G = (G) ? G : {};

//(function ($) {


//})(jQuery, G);



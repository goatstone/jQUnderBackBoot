/*
 app.js
 * */

define(["backbone", "./views/ItemView", "./views/SelectorView", "./views/HTML_ElView",
        "./views/ElementView", "element_config_model"],
    function (Backbone, ItemView, SelectorView, HTML_ElView, ElementView, elementConfigModel) {

        var App = Backbone.View.extend({
            el: $('body'),
            events: {
                'mousedown #item_view': 'onMouseDownItemView',
                'mousedown #selector_view': 'onMouseDownSearchPanelView',
                'mousedown #html_el_view': 'onMouseDownHTML_ElView',
                'mousemove': 'onMove',
                'mouseup': 'onMouseUp'
            },
            selectedView: null,
            initialize: function () {

                _.bindAll(this, 'render', "onMouseUp",
                    "onMove", "onMouseDownItemView", "onMouseDownSearchPanelView",
                    "onMouseDownHTML_ElView");

                this.$display = $('#main_display');
                this.$display.height($(document).height());
                this.$itemView = new ItemView();
                this.$searchPanelView = new SelectorView();
                this.$hTML_ElView = new HTML_ElView();

                $(this.el).append(this.$itemView.render().el);
                $(this.el).append(this.$searchPanelView.render().el);
                $(this.el).append(this.$hTML_ElView.render().el);

            },
            onMouseDownHTML_ElView: function (e) {
                console.log("onMouseDownHTML_ElView");
                this.selectedView = this.$hTML_ElView;
                this.selectedView.setOffset({x: e.clientX, y: e.clientY});
            },
            onMouseDownSearchPanelView: function (e) {
                if ($(e.target).is("select")) {
                    return;
                }
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

        return App;

    });
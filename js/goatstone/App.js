define(["backbone", "views/ItemView", "views/SearchPanelView", "views/HTML_ElView", "views/ElementView"],
    function (Backbone, ItemView, SearchPanelView, HTML_ElView, ElementView) {

        var App = Backbone.View.extend({
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

                this.$itemView = new ItemView({model: this.model});
                this.$searchPanelView = new SearchPanelView({model: this.model});

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
//                var elementConfigModel;
//                elementConfigModel = elementConfigModelArg;
                var es = new Elements(elmJSON);
//        return new ElementsView({"collection": es, "model": elementConfigModel});
                this.$elementView = new ElementView({"collection": es, model: this.model});

//                elementConfigModel = elementConfigModelArg;
//        var es = new Elements(elmJSON);
//        return new ElementsView({"collection": es, "model": elementConfigModel});
//
                this.$hTML_ElView = new HTML_ElView({model: this.model});
//
                $(this.el).append(this.$itemView.render().el);
                $(this.el).append(this.$searchPanelView.render().el);
                $(this.el).append(this.$elementView.render().el);
                $(this.el).append(this.$hTML_ElView.render().el);

            },
            onMouseDownHTML_ElView: function (e) {
                console.log("onMouseDownHTML_ElView");
                this.selectedView = this.$hTML_ElView;
                this.selectedView.setOffset({x: e.clientX, y: e.clientY});
            },
            onMouseDownElementsView: function (e) {
                this.selectedView = this.$elementView;
                this.selectedView.setOffset({x: e.clientX, y: e.clientY});
            },
            onMouseDownSearchPanelView: function (e) {
                console.log(e.target.getAttribute("id"))
                // TODO : bug, on select option, View moves into corner, next line fixes this
                if (e.target.getAttribute("id") === "prop_select")return;
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

//    G.MainView = MainView;

//    var App = Backbone.View.extend({
//        initialize: function(){
//            console.log("it's working!");
//        }
//    });
        return App;
//
    });
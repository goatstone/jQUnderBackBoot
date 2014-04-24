/* css_color_bb.js
 * */

var G = (G) ? G : {};

(function ($) {

    var MainView = Backbone.View.extend({
        el: $('body'),
        events: {
//            'mousedown #search_color': 'onMouseDownSearchColor',
            'mousedown #search_color': 'onMouseDownSearchColor',
            'mousedown #item_view': 'onMouseDownItemView',
            'mousedown #search_panel_view': 'onMouseDownSearchPanelView',
//            'mousedown': 'onMouseDown',
            'mousemove': 'onMove',
            'mouseup': 'onMouseUp',
            'mouseout': 'onMouseOut',
            'mouseover': 'onMouseOver'
        },
        isDragging: false,
        xOffSet: 0,
        yOffSet: 0,
        mode: "elements",
        selectedView: null,
        initialize: function () {
            _.bindAll(this, 'render', "onMouseOut", "onMouseUp",
                "onMouseDown", "onMove", "onMouseDownItemView", "onMouseDownSearchPanelView");

            this.$queryInput = $(this.el).find('#query');

            this.$display = $('#main_display');
            this.$display.height($(document).height());
            this.$queryPanel2 = $("#search_color");

            this.$itemView = new G.ItemView({
                model: {name: "Item View"}
            });

            this.$searchPanelView = new G.SearchPanelView({
                model: {name: "Search Panel"}
            });
//            this.collection = new Colors();
//            this.collection.bind('reset', this.render); // collection event binder
//            this.collection.reset(css_colors_names);
//            this.collection.reset(G.css_colors_names);
//            this.$queryInput.focus();

            this.selectedView = this.$itemView;
//            this.selectedElm = this.$queryPanel2;

            $(this.el).append(this.$itemView.render().el);
            $(this.el).append(this.$searchPanelView.render().el);

        },
        onMouseDownSearchPanelView: function(e){
          console.log("onMouseDownSearchPanelView");
            this.isDragging = true;

            this.selectedView = this.$searchPanelView;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});

        },
        onMouseDownSearchColor: function (e) {
            console.log("onMouseDownSearchColor");

            this.selectedView = null;
            this.selectedElm = this.$queryPanel2;

            this.isDragging = true;
            var yOffSet = 0;
            var offSetDiv = this.$queryPanel2.offset();
            this.xOffSet = e.clientX - offSetDiv.left;
            this.yOffSet = e.clientY - offSetDiv.top;
        },
        onMouseDownItemView: function (e) {
            console.log("onMouseDownItemView");
            this.isDragging = true;
            // selectedElement
            this.selectedView = this.$itemView;
            this.selectedElm = null;
            //var offSetDiv = this.$queryPanel2.offset();
            // selectedView.getX()
            this.xOffSet = e.clientX;
            this.yOffSet = e.clientY;
            this.selectedView.setOffset({x: e.clientX, y: e.clientY});

        },
        onMouseOver: function () {
            console.log("on mouse over");
        },
        onResize: function () {
            this.render();
        },
        onMouseOut: function () {
            this.$queryInput.focus();
        },
        onMouseUp: function () {
            this.isDragging = false;
            this.$queryInput.focus();

        },
        onMouseDown: function (e) {
            console.log("onMouseDown");
            this.selectedView = this.$queryPanel2;
            this.isDragging = true;
            var yOffSet = 0;
            var offSetDiv = this.$queryPanel2.offset();
            this.xOffSet = e.clientX - offSetDiv.left;
            this.yOffSet = e.clientY - offSetDiv.top;

            this.selectedView.setOffset({x: this.xOffSet, y: this.yOffSet});

        },
        onMove: function (e) {
            console.log("onMove");
//            console.log(this.isDragging);

            if (this.isDragging) {
                var offSet = 20;
                var xOffSet = 0;
                // move selectedView
//                this.$queryPanel2.css({"left": e.clientX - this.xOffSet });
//                this.$queryPanel2.css({"top": e.clientY - this.yOffSet });
//                this.selectedElm = null;
//                this.selectedView = this.$queryPanel2;
                if (this.selectedElm != null) {
                    this.selectedElm.css({"left": e.clientX - this.xOffSet });
                    this.selectedElm.css({"top": e.clientY - this.yOffSet });
//                    this.selectedElm.move();
                }
                if (this.selectedView != null) {
                    this.selectedView.move(e);
//                    this.selectedView.css({"left": e.clientX - this.xOffSet });
//                    this.selectedView.css({"top": e.clientY - this.yOffSet });
                }
            }
        },
        render: function () {
            var $this = this;
            this.$display.html("els");
            this.$display, css({"background-color": "red"})
        }
    });

    $(window).resize(function () {
        colorView.onResize();
    })

//    G.colorView = new ColorView();
    G.MainView = MainView;

})(jQuery, G);

function renderElements() {
    var $this = this;
    this.$display.html("els");
//    this.$display.append("hello");
}
function renderProps() {
    var $this = this;
    this.$display.html("props");
//    this.$display.append("hello");
}

function renderColors() {
    var $this = this;
    this.$display.html("");
    var i = 1;
    var j = 0; //x
    var k = 0; //y
    var wInc = 51;
    var hInc = 50;
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var rowCount = 15;
    var pixelCount = 0;
    var tileCount = 0;
    var pixelPerTile = 0;
    var tileSideDim = 0;
    var colCount = 0

    pixelCount = screenWidth * screenHeight;
    tileCount = this.collection.length;
    pixelPerTile = pixelCount / tileCount;
    tileSideDim = Math.floor(Math.sqrt(pixelPerTile));
    rowCount = Math.floor(screenWidth / tileSideDim);
    colCount = Math.ceil(tileCount / rowCount);

    wInc = Math.floor(screenWidth / rowCount);
    hInc = Math.floor(screenHeight / colCount);
    _(this.collection.models).each(function (color) { // in case collection is not empty
        var divEl = $("<div>");
        var top = 0, left = 0;
        left = wInc * (j);
        top = hInc * (k);

        divEl.css(
            {
                "background-color": color.get("name"),
                "left": left,
                "top": top,
                "width": wInc,
                "height": hInc
            });
        if (i % rowCount === 0) { // make a new row
            k++;
            j = 0;
        } else {
            j++;
        }
        i++;

//                divEl.text(color.get("name"))
        $this.$display.append(divEl);
    }, this);
}

/* css_color_bb.js
 * */

var G = (G) ? G : {};

(function ($) {

    // search color results
    var Color = Backbone.Model.extend({
        defaults: {
            name: 'blue',
            r: 0,
            g: 0,
            b: 255
        }
    });

    var Colors = Backbone.Collection.extend({
        model: Color
    });
    var ColorView = Backbone.View.extend({
        el: $('body'),
        events: {
            'mousedown': 'onMouseDown',
            'mousemove': 'onMove',
            'mouseup': 'onMouseUp',
            'mouseout': 'onMouseOut',
            'keyup #query': 'searchColors',
            'click input[name=selection_mode]': 'selectMode'

        },
        isDragging: false,
        xOffSet: 0,
        yOffSet: 0,
        mode: "elements",
        selectMode: function (e) {
            console.log("selectMode");
            console.log(e);
            this.mode = e.currentTarget.value;
            console.log(this.mode);
            this.render();

        },
        onResize: function () {
            this.render();
        },
        render: function () {
            if (this.mode === "elements") {
                renderElements.apply(this);
            }
            else if (this.mode === "props") {
                renderProps.apply(this);
            }
            else if (this.mode === "vals") {
                renderColors.apply(this);
            }
        },
        searchColors: function (e) {
            if (this.mode !== "vals") {
//                return;
            }
            e.stopPropagation();
            e.preventDefault();
            console.log(e)
            var query = this.$queryInput.val();
            var newArr = [];
            newArr = _.filter(G.css_colors_names, function (el) {
                return new RegExp(query).test(el.name);
            });
            this.collection.reset(newArr);
            return false;
        },
        initialize: function () {
            _.bindAll(this, 'render', "onMouseOut", "onMouseUp",
                "onMouseDown", "onMove", "searchColors", "selectMode");

            this.$queryInput = $(this.el).find('#query');
//            this.$display = $('#color_names');
            this.$display = $('#main_display');
            this.$queryPanel2 = $("#search_color");

            this.collection = new Colors();
            this.collection.bind('reset', this.render); // collection event binder
//            this.collection.reset(css_colors_names);
            this.collection.reset(G.css_colors_names);
            this.$queryInput.focus();
        },
        onMouseOut: function () {
            this.$queryInput.focus();
        },
        onMouseUp: function () {
            this.isDragging = false;
            this.$queryInput.focus();

        },
        onMouseDown: function (e) {
            this.isDragging = true;
            var yOffSet = 0;
            var offSetDiv = this.$queryPanel2.offset();
            this.xOffSet = e.clientX - offSetDiv.left;
            this.yOffSet = e.clientY - offSetDiv.top;
        },
        onMove: function (e) {
            console.log("onMove");
            console.log(this.isDragging);

            if (this.isDragging) {
                var offSet = 20;
                var xOffSet = 0;
                this.$queryPanel2.css({"left": e.clientX - this.xOffSet });
                this.$queryPanel2.css({"top": e.clientY - this.yOffSet });

            }
        }
    });

    $(window).resize(function () {
        colorView.onResize();
    })

//    G.colorView = new ColorView();
    G.ColorView = ColorView;

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

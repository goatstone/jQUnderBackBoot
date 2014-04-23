/* css_color_bb.js
 * */

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
            'keyup #query': 'searchColors'
        },
        isDragging: false,
        xOffSet: 0,
        yOffSet: 0,
        onResize: function () {
            this.render();
        },
        initialize: function () {
            _.bindAll(this, 'render', "onMouseOut" ,"onMouseUp" ,"onMouseDown", "onMove", "searchColors");

            this.$queryInput = $(this.el).find('#query');
            this.$display = $('#color_names');
            this.$queryPanel = $("#search_color");

            this.collection = new Colors();
            this.collection.bind('reset', this.render); // collection event binder
            this.collection.reset(css_colors_names);
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
            var offSetDiv = this.$queryPanel.offset();
            this.xOffSet = e.clientX - offSetDiv.left;
            this.yOffSet = e.clientY - offSetDiv.top;
        },
        onMove: function (e) {
            if (this.isDragging) {
                var offSet = 20;
                var xOffSet = 0;
                this.$queryPanel.css({"left": e.clientX - this.xOffSet });
                this.$queryPanel.css({"top": e.clientY - this.yOffSet });

            }
        },
        render: function () {
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
        },
        searchColors: function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log(e)
            var query = this.$queryInput.val();
            var newArr = [];
            newArr = _.filter(css_colors_names, function (el) {
                return new RegExp(query).test(el.name);
            });
            this.collection.reset(newArr);
            return false;
        }
    });

    $(window).resize(function () {
        colorView.onResize();
    })

    colorView = new ColorView();

})(jQuery);

var colorView;
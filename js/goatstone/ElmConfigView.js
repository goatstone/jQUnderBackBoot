/*
 * ElmConfigView.js
 * */
/* css_color_bb.js
 * */

(function ($) {

    // search color results
//    var Color = Backbone.Model.extend({
//        defaults: {
//            name: 'blue',
//            r: 0,
//            g: 0,
//            b: 255
//        }
//    });
//
//    var Colors = Backbone.Collection.extend({
//        model: Color
//    });
    var ElmConfigView = Backbone.View.extend({
        el: $('body'),
        events: {
            'mousedown #elm_config': 'onMouseDown',
            'mousemove': 'onMove',
            'mouseup': 'onMouseUp',
            'mouseout': 'onMouseOut',
//            'keyup #query': 'searchColors',
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
//        onResize: function () {
//            this.render();
//        },
        render: function () {
//            this.$display.html("els");

        },
//        searchColors: function (e) {
//            if (this.mode !== "vals") {
////                return;
//            }
//            e.stopPropagation();
//            e.preventDefault();
//            console.log(e)
//            var query = this.$queryInput.val();
//            var newArr = [];
//            newArr = _.filter(css_colors_names, function (el) {
//                return new RegExp(query).test(el.name);
//            });
//            this.collection.reset(newArr);
//            return false;
//        },
        initialize: function () {
            _.bindAll(this, 'render', "onMouseOut", "onMouseUp",
                "onMouseDown", "onMove"   );
//            this.$queryInput = $(this.el).find('#query');
//            this.$display = $('#color_names');
            this.$queryPanel2 = $("#elm_config");

//            this.collection = new Colors();
//            this.collection.bind('reset', this.render); // collection event binder
//            this.collection.reset(css_colors_names);
//            this.$queryInput.focus();
        },
        onMouseOut: function () {
            //this.$queryInput.focus();
        },
        onMouseUp: function () {
            this.isDragging = false;
            //this.$queryInput.focus();

        },
        onMouseDown: function (e) {
            console.log("onMouseDown")
            this.isDragging = true;
            var yOffSet = 0;
            var offSetDiv = this.$queryPanel2.offset();
            this.xOffSet = e.clientX - offSetDiv.left;
            this.yOffSet = e.clientY - offSetDiv.top;
        },
        onMove: function (e) {
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

    var colorView = new ElmConfigView();

})(jQuery);


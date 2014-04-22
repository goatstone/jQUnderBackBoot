(function ($) {

    // search color results
    var Color = Backbone.Model.extend({
        defaults: {
            name: 'blue',
            r: 0,
            g: 0,
            b :255
        }
    });

    var Colors = Backbone.Collection.extend({
        model: Color
    });

    var ColorView = Backbone.View.extend({
        el: $('#search_color'),
        events: {
            'mousedown': 'onDrag',
            'mousemove': 'onMove',
            'mouseup': 'onMouseUp',
            'mouseout': 'onMouseOut',
            'keyup #query': 'searchColors'
        },
        isDragging: false,
        xOffSet: 0,
        yOffSet: 0,
        onMouseOut: function(){
            console.log("on onMouseOut");
            this.isDragging = false;
            this.$queryInput.focus();
        },
        onMouseUp: function(){
            console.log("on onMouseUp");
            this.isDragging = false;
            this.$queryInput.focus();

        },
        onDrag : function(e){
            console.log("on drag")
            this.isDragging = true;
            var yOffSet = 0;
            var offSetDiv= $(this.el).offset();
            this.xOffSet =   e.clientX -offSetDiv.left ;
            this.yOffSet =   e.clientY -offSetDiv.top ;
            console.log(this.offSetDiv);
            console.log(e.clientX);
//            console.log(this.xOffSet);
        },
        onMove : function(e){
//            console.log("on move");
//            console.log(e.offsetX);
            if(this.isDragging){
                var offSet = 20;
                var xOffSet = 0;
                console.log("is dragging");
                console.log(this.xOffSet );
                console.log(e.clientX);

//                $(this.el).css({"top": e.clientY + offSet });
                $(this.el).css({"left": e.clientX - this.xOffSet });
                $(this.el).css({"top": e.clientY - this.yOffSet });

            }
            //this.isDragging = truel;
        },
        initialize: function () {
            _.bindAll(this, 'render' );

            this.$queryInput = $(this.el).find('#query');
            this.$display = $('#color_names');

            this.collection = new Colors();
            this.collection.bind('reset', this.render); // collection event binder
            this.collection.reset(css_colors_names);
            this.$queryInput.focus();
        },
        render: function () {
             var $this = this;
            this.$display.html("");

            _(this.collection.models).each(function (color) { // in case collection is not empty
                var divEl = $("<div>");
                divEl.css ({"background-color":color.get("name") });
                divEl.text( color.get("name") )
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
            return false ;
        }
     });

    var colorView = new ColorView();

})(jQuery);
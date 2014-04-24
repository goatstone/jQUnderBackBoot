/* css_color_bb.js
 * */

var G = (G) ? G : {};

(function ($) {

    var SearchPanelView = Backbone.View.extend({
        el: $('#search_panel_view'),
        content: $('#spv_content'),
        x: 100,
        y: 100,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            _.bindAll(this, 'render', 'move', 'setOffset');
        },
        setOffset: function (offSets) {
            this.offSetX = offSets.x - this.x;
            this.offSetY = offSets.y - this.y;
        },
        move: function (e) {
            console.log("item view move")
            this.x = e.clientX - this.offSetX;
            this.y = e.clientY - this.offSetY;
            this.render();
        },
        render: function () {
//            $(this.el).html('<span>' + this.model.name + '</span>')
//                .css({ top: this.y, left: this.x});
            $(this.el).css({ top: this.y, left: this.x});
            $(this.content).html(this.model.name);
            return this;
        }
    });

//    G.colorView = new ColorView();
    G.SearchPanelView = SearchPanelView;

})(jQuery, G);

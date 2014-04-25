/* SearchPanelView.js
 * */

var G = (G) ? G : {};

(function ($) {

    var SearchPanelView = Backbone.View.extend({
        el: $('#search_panel_view'),
        content: $('#spv_content'),
        events: {
            // 'click input[name=selection_mode]': 'selectMode',
            'click .set_it': 'setIt'
        },
        x: 5,
        y: 5,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            var $this = this;
            _.bindAll(this, 'render', 'move', 'setOffset', 'setIt');

            this.$queryInput = $(this.el).find('#user_input');
            this.$queryInput.css({"background-color": "red"})

        },
        setIt: function () {
            // set the value in the box to text, color, prop
            if (this.$queryInput.val() != "") {
                var a = this.model.get("properties");
                a.text = this.$queryInput.val();
                this.model.set("properties", a); // TODO this does not trigger the update
                this.model.set("dummyProp", new Date()); // TODO : should not need this, ensure the change is triggered
            }
            this.$queryInput.focus()

//            switch (this.model.get("selectionMode")) {
//                case "element":
//                    this.model.set("element", this.$queryInput.val())
//                    break;
//                case "property":
//                    this.model.set("property", this.$queryInput.val())
//                    break;
//                case "value":
//                    this.model.set("value", this.$queryInput.val())
//                    break;
//            }
        },
        selectMode: function (e) {
            this.model.set("selectionMode", e.target.value);
        },
        setOffset: function (offSets) {
            this.offSetX = offSets.x - this.x;
            this.offSetY = offSets.y - this.y;
        },
        move: function (e) {
            this.x = e.clientX - this.offSetX;
            this.y = e.clientY - this.offSetY;
            this.render();
        },
        render: function () {
            $(this.el).css({ top: this.y, left: this.x});

//            var str =
//                "Selection Mode: " + this.model.get("selectionMode") + "<br> " +
//                "Element: " + this.model.get("element") + "<br> " +
//                "Property: " + this.model.get("property") + "<br> " +
//                "Value: " + this.model.get("value") + "<br> ";

//            $(this.content).html(str);
            return this;
        }
    });

    G.SearchPanelView = SearchPanelView;

})(jQuery, G);

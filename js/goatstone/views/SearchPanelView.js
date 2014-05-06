/* SearchPanelView.js
 * */

define(["backbone",  "element_config_model" ], function (Backbone,  elementConfigModel ) {

    var SearchPanelView = Backbone.View.extend({
        el: $('#search_panel_view'),
        content: $('#spv_content'),
        events: {
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
            this.$queryInput.css({"background-color": "red"});

        },
        setIt: function () {
            // set the value in the box to text, color, prop
            if (this.$queryInput.val() !== "") {
                var a = elementConfigModel.get("properties");
                a.text = this.$queryInput.val();
                elementConfigModel.set("properties", a); // TODO this does not trigger the update
                elementConfigModel.set("dummyProp", new Date()); // TODO : should not need this, ensure the change is triggered
            }
            this.$queryInput.focus();

        },
        selectMode: function (e) {
            elementConfigModel.set("selectionMode", e.target.value);
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
            return this;
        }
    });
    return SearchPanelView;
});

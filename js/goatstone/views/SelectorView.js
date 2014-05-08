/* SearchPanelView.js
 * */

define(["backbone", "element_config_model" ], function (Backbone, elementConfigModel) {

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
    ];

    var htmlElementProperies = ["Type", "Color", "Text", "Background Color"];

    var SelectorView = Backbone.View.extend({
        el: $('#selector_view'),
        $htmlElements: $("#selector_view .html_elements"),
        $selectorModes: $("#selector_view .selector_modes"),
        $queryInput : $('#selector_view .user_input'),
        $selected_color : $("#selector_view .selected_color"),

        events: {
            'click .set_it': 'setIt'
        },
        x: 0,
        y: 50,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            var $this = this;

            // populate the select fields
            _.each(elmJSON, function (el, index, list) {
                $($this.$htmlElements).append( $("<option>",
                    {text: el.name}
                ) )
            });
            _.each(htmlElementProperies, function (el, index, list) {
                var $li = $("<option>", {text: el.name});
                $($this.$selectorModes).append($("<option>", {text: el}))
            });

            _.bindAll(this, 'render', 'move', 'setOffset', 'setIt');

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
    return SelectorView;
});

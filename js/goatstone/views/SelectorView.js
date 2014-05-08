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

    var elementProps = [
        {label: "Type", value: "type"},
        {label: "Color", value: "color"},
        {label: "Text", value: "text"},
        {label: "Background Color", value: "background-color"}
    ];

    var SelectorView = Backbone.View.extend({

        el: $('#selector_view'),
        $htmlElements: $("#selector_view .html_elements"),
        $selectorModes: $("#selector_view .selector_modes"),
        $queryInput: $('#selector_view .user_input'),
        $selectedColor: $("#selector_view .selected_color"),

        events: {
            'click .set_it': 'setElementConfigModel'
        },
        x: 0,
        y: 50,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            var $this = this;

            this.$selectorModes.bind("change", function (e) {
                $this.setLayout($(this).val());
            });
            this.setLayout("type");

            // populate the select fields
            _.each(elmJSON, function (el, index, list) {
                $($this.$htmlElements).append($("<option>",
                    {text: el.name}
                ));
            });
            _.each(elementProps, function (el, index, list) {
                var $li = $("<option>", {text: el.name});
                $this.$selectorModes.append($("<option>", {text: el.label, value: el.value}));
            });

            _.bindAll(this, 'render', 'move', 'setOffset', 'setElementConfigModel', 'setLayout');

        },
        // TODO use a $selectedTypeElementValue, $selectedTypeElementKey
        setLayout: function (layoutType) {
            switch (layoutType) {
                case "type":
                    this.$queryInput.hide();
                    this.$selectedColor.hide();
                    this.$htmlElements.show();
                    break;
                case "text":
                    this.$queryInput.show();
                    this.$queryInput.focus();
                    this.$selectedColor.hide();
                    this.$htmlElements.hide();
                    break;
                case "color":
                    this.$selectedColor.css({"display": "inline-block"});
                    this.$queryInput.hide();
                    this.$htmlElements.hide();
                    break;
                case "background-color":
                    this.$selectedColor.css({"display": "inline-block"});
                    this.$queryInput.hide();
                    this.$htmlElements.hide();
                    break;
            }
        },

        setElementConfigModel: function () {

            var selectMode = this.$selectorModes.val();

            switch (selectMode) {
                case "type":
                    elementConfigModel.set(this.$selectorModes.val(), this.$htmlElements.val());
                    break;
                case "text":
                    elementConfigModel.set(this.$selectorModes.val(), this.$queryInput.val());
                    break;
                case "color":
                    elementConfigModel.set(this.$selectorModes.val(), "blue");
                    break;
                case "background-color":
                    elementConfigModel.set(this.$selectorModes.val(), "black");
                    break;
            }

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

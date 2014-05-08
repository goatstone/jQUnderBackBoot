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
        {label: "Background Color", value: "background_color"}
    ];

    var SelectorView = Backbone.View.extend({

        el: $('#selector_view'),
        $htmlElements: $("#selector_view .html_elements"),
        $selectorModes: $("#selector_view .selector_modes"),
        $queryInput: $('#selector_view .user_input'),
        $selectedColor: $("#selector_view .selected_color"),

        events: {
            'click .set_it': 'setIt'
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

            _.bindAll(this, 'render', 'move', 'setOffset', 'setIt', 'setLayout');

        },
        setLayout: function (layoutType) {
            console.log(layoutType);
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
                case "background_color":
                    this.$selectedColor.css({"display": "inline-block"});
                    this.$queryInput.hide();
                    this.$htmlElements.hide();
                    break;
            }
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

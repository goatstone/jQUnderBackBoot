/*
 * HTML_ElView.js
 * */

define(["backbone", "element_config_model" ], function (Backbone, elementConfigModel) {

    var HTML_ElView = Backbone.View.extend({
        el: $('#html_el_view'),
        events: {
            'click button': 'addToPage'
        },
        content: $('#html_el_view #hev_content'),
        textArea: $('#html_el_view textarea'),
        x: 220,
        y: 10,
        offSetX: 0,
        offSetY: 0,
        pTag: $("<p>"),
        selectedTag: null,
        selectedText: "",
        initialize: function () {
            _.bindAll(this, 'render', 'setOffset', 'move', 'addToPage', 'onModelChange', 'generateHTML_EL');

            elementConfigModel.bind("change", this.onModelChange);
            this.generateHTML_EL();

        },
        onModelChange: function () {
            this.selectedTag = elementConfigModel.get("element");
            this.selectedText = elementConfigModel.get("text");
            this.generateHTML_EL();
        },
        generateHTML_EL: function () {
            var tag = "";
            tag = $("<" + elementConfigModel.get("type") + ">");
            tag.text(elementConfigModel.get("text") );
            tag.css({
                "color": (elementConfigModel.get("color") ),
                "background-color": elementConfigModel.get("background-color") ,
                "margin": "0"
            });

            $(this.content).html(tag);
            $(this.textArea).html($(this.content).html());

        },
        addToPage: function () {
            $("#main_display").append($(this.textArea).val());
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
            var $this = this;
            var str = "";
            $(this.el).css({ top: this.y, left: this.x});
            return this;
        }
    });
    return HTML_ElView;
});

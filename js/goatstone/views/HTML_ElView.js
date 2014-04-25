/*
 * HTML_ElView.js
 * */

var G = (G) ? G : {};

(function ($) {

    var elementConfigModel;

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
        initialize: function () {
            _.bindAll(this, 'render', 'setOffset', 'move', 'addToPage', 'onModelChange', 'generateHTML_EL');

            elementConfigModel.bind("change", this.onModelChange);
            console.log(elementConfigModel.get("element"))
            this.generateHTML_EL();

        },
        onModelChange: function () {
            this.selectedTag = elementConfigModel.get("element");
            this.generateHTML_EL();
        },
        generateHTML_EL: function () {
            console.log(elementConfigModel.get("properties").backgroundColor);

            var tag = "";
            tag = $("<" + elementConfigModel.get("element") + ">");
            tag.text(elementConfigModel.get("properties").text)
            tag.css({
                "color": (elementConfigModel.get("properties").color),
                "background-color": elementConfigModel.get("properties").backgroundColor,
                "margin": "0"
            });

            $(this.content).html(tag);
            $(this.textArea).html($(this.content).html());

        },
        addToPage: function () {
            console.log("add to page");
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

    G.getHTML_ElView = function (elementConfigModelArg) {
        elementConfigModel = elementConfigModelArg;
        return new HTML_ElView();
    }

})(jQuery, G);
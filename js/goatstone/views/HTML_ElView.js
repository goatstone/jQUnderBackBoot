/*
 * HTML_ElView.js
 * */

//var G = (G) ? G : {};
//
//(function ($) {
define(["backbone" ], function (Backbone) {

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
        selectedText: "",
        initialize: function () {
            _.bindAll(this, 'render', 'setOffset', 'move', 'addToPage', 'onModelChange', 'generateHTML_EL');

            this.model.bind("change", this.onModelChange);
            console.log(this.model.get("element"))
            this.generateHTML_EL();

        },
        onModelChange: function () {
            this.selectedTag = this.model.get("element");
            this.selectedText = this.model.get("text");
            this.generateHTML_EL();
        },
        generateHTML_EL: function () {
            console.log(this.model.get("properties").backgroundColor);

            var tag = "";
            tag = $("<" + this.model.get("element") + ">");
            tag.text(this.model.get("properties").text)
            tag.css({
                "color": (this.model.get("properties").color),
                "background-color": this.model.get("properties").backgroundColor,
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
   return HTML_ElView;
});
//    G.getHTML_ElView = function (elementConfigModelArg) {
//        elementConfigModel = elementConfigModelArg;
//        return new HTML_ElView();
//    }

//})(jQuery, G);
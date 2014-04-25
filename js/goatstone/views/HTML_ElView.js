/*
 * ElementView.js
 * */

var G = (G) ? G : {};

(function ($) {

    // gets set by arg from MainView
//    var elementConfigModel;
//
//    var elmJSON = [
//        { name: 'div',
//            tag: '<div>'},
//        { name: 'span',
//            tag: '<span>'},
//        { name: 'paragraph',
//            tag: '<p>'},
//        { name: 'h1',
//            tag: '<h1>'},
//        { name: 'h2',
//            tag: '<h2>'},
//        { name: 'h3',
//            tag: '<h3>'}
//    ]
//    var Element = Backbone.Model.extend({
//        defaults: {
//            name: 'paragraph',
//            tag: '<p>'
//        }
//    });
//    var Elements = Backbone.Collection.extend({
//        model: Element
//    });

//    var HTML_ElView = Backbone.View.extend({
//        tagName: 'button',
//        events: {
//            'click ': 'onClick'
//        },
//        initialize: function () {
//            _.bindAll(this, 'render', 'onClick');
//
//        },
//        onClick: function (e) {
//            elementConfigModel.set("element", this.model.get("name"));
//            return false;
//        },
//        render: function () {
//            $(this.el).html(this.model.get('name'));
//            return this;
//        }
//    });

    var HTML_ElView = Backbone.View.extend({
        el: $('#html_el_view'),
        content: $('#html_el_view #hev_content'),
        textArea: $('#html_el_view textarea'),
        x: 220,
        y: 10,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
//           var $this = this;
            _.bindAll(this, 'render', 'setOffset', 'move');
            var pTag = $("<p>");
            pTag.text("hello ");
            pTag.css({color:"red", "background-color":"blue", "margin":"0"})
//            $(this.content).append( pTag );
            $(this.content).html(pTag);

            $(this.textArea).html($(this.content).html());
            //this.model.set("element", "A new name....");
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
//            $($this.el).html("hello . . .");
//            $(this.content).html("hello . . .")
//            _(this.collection.models).each(function (e) {
//                var elmv = new ElementView({model: e});
//                $($this.el).append(elmv.render().el)
//            });
            $(this.el).css({ top: this.y, left: this.x});

            return this;
        }
    });

    G.getHTML_ElView = function (elementConfigModelArg) {

//        elementConfigModel = elementConfigModelArg;
//        var es = new Elements(elmJSON);
        return new HTML_ElView();

    }

})(jQuery, G);
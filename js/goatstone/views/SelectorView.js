/* SearchPanelView.js
 * */

define(["backbone",  "element_config_model" ], function (Backbone,  elementConfigModel ) {
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
//    var Element = Backbone.Model.extend({
//        defaults: {
//            name: 'paragraph',
//            tag: '<p>'
//        }
//    });
//    var Elements = Backbone.Collection.extend({
//        model: Element
//    });
//    var es = new Elements(elmJSON);
//    this.$elementView = new ElementView({"collection": es });

    var SelectorView = Backbone.View.extend({
        el: $('#search_panel_view'),
        content: $('#spv_content'),
        htmlElements : $(".html_elements"),
        events: {
            'click .set_it': 'setIt'
        },
        x: 5,
        y: 5,
        offSetX: 0,
        offSetY: 0,
        initialize: function () {
            var $this = this;

            _.each( this.htmlElements, function(element, index, list){

                console.log(element+":"+ index +":"+ list)

            });

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
    return SelectorView;
});

/*
 * AppTemplates.js
 * CSS_ColorResultsTemplate
 * getTitle, ifHasOne, generateHTML_Sring
 * */

 function CSS_ColorResultsTemplate   () {
    var title = "CSS Colors";
    var colorLiTemplate = _.template("<li style='background-color:<%- value %> '><%- value %></li>");
    var hasOneResult = false;

    this.hasOne = function () {
        return true
    }
    // filter(query) filter(query, elementForWrap)
    this.getColorQueryResult = function (query) {
        hasOneResult = false;
        var q = (query) ? query : null;
        var str = "";
        var filtCs = G.cssColors;

        if (q != null) {
            filtCs = _.filter(G.cssColors, function (item) {
                var regex = new RegExp(q);
                return regex.test(item[0]);
            });
        }
        return filtCs;

    }
    this.wrapedElementString = function (filtCs) {
        var str = "";

        _.each(filtCs, function (item) {

            str += colorLiTemplate({value: item[0]});

        });
        if (filtCs.length === 1) {
            hasOneResult = true;
        }
        return str;
    }
    this.getColorQueryStringResult = function (query) {
        hasOneResult = false;
        var q = (query) ? query : null;
        var str = "";
        var filtCs = G.cssColors;

        if (q != null) {
            filtCs = _.filter(G.cssColors, function (item) {
                var regex = new RegExp(q);
                return regex.test(item[0]);
            });
        }

        _.each(filtCs, function (item) {
            str += colorLiTemplate({value: item[0]});

        });
        if (filtCs.length === 1) {
            hasOneResult = true;
        }
        return str;
    }
    this.ifHasOne = function () {
        return true;
    }
    this.scope = this;
    this.setTemplate = function (query) {
        var $this = this;

        _.templateSettings.variable = "rc";

        var template = _.template(
            $("script.template").html()
        );

        // Define our render data (to be put into the "rc" variable).
        var templateData = {
            getTitle: function () {
                return "CSS Colors:"
            },
            ifHasOne: this.ifHasOne,
            getColorQueryStringResult: function (q) {
                return $this.getColorQueryStringResult(query)
            }
        };
        $("#list_holder").html(
            template(templateData)
        );
    }

}



//var compiled = _.template("hello: <%= name %>");
//compiled({name: 'moe'});
////=> "hello: moe"
//
//var list = "<% _.each(people, function(name) { %> <li><%= name %></li> <% }); %>";
//var p = _.template(list, {people: ['moe', 'curly', 'larry']});
//=> "<li>moe</li><li>curly</li><li>larry</li>"

//var liTemplate = _.template("<li><%- value %></li>");
////var t =liTemplate({value: '<script>'});
////=> "<b>&lt;script&gt;</b>"
//console.log( liTemplate({value: 'hello world'}) );

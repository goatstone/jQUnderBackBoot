/*
 * main.js
 * */

var G = (G) ? G : {};

G.cssColorResultsTemplate = new CSS_ColorResultsTemplate();
G.cssColorResultsTemplate.setTemplate();

var $queryInput = $("#query_form input[name=query]");

$queryInput
    .focus()
    .on("keyup", function () {

        var query = $(this).val();

        G.cssColorResultsTemplate.setTemplate(query);

    });


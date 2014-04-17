/*
 * main.js
 * */

var G = (G) ? G : {};

G.CSS_ColorResultsTemplate.setTemplate();

var $queryInput = $("#query_form input[name=query]");

$queryInput
    .focus()
    .on("keyup", function () {

        var query = $(this).val();

        G.CSS_ColorResultsTemplate.setTemplate(query);

    });
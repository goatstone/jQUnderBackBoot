describe("Player", function (G) {

    var G = (window.G) ? window.G : {};

    beforeEach(function () {

        G.cssColorResultsTemplate = new CSS_ColorResultsTemplate();
    });

    it("Expect the query for aliceblue to return exactly one result", function () {

        var queryString = "aliceblue";
        var filteredArray = G.cssColorResultsTemplate.getColorQueryResult(queryString);
        expect(filteredArray.length).toBe(1);

    });

    it("Expect to receive a String of HTML of the supplied elements wrapped in an HTML tag", function () {

        var str = G.cssColorResultsTemplate.wrapedElementString(G.cssColors[0]);
        expect(typeof str).toBe('string');
    });


});

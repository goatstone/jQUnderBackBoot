/*
 * ElmConfig.js
 * */
var G = (G) ? G : {};

G.elmConfig = new ElmConfig();

function ElmConfig() {
    this.name;
    this.elementName;
    this.tag = "default";
}

ElmConfig.prototype.setElm = function (key, val) {
    console.log("setElm");
     this.tag = val;
}
ElmConfig.prototype.getTag = function(){
    return this.tag;
}
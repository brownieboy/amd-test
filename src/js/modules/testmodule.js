define(["jquery", "../libs/kendo/js/kendo.grid.min"], function($) {
    // console.log("testmodule.js loaded with kendo.grid?  kendoGrid = " + kendoGrid);
    $("#testGrid").kendoGrid({
        dataSource: [{
            name: "Han Solo"
        }]
    });

    return {};

});

// define(["jquery", "../libs/kendo/js/kendo.grid"], function($, kendoui.grid){
//    console.log("testmodule.js loaded?");

// });



// define(["kendoui"], function(kendoui){
//    var Widget = kendo.ui.ObservableObject;
//    return Widget.extend({
//       init: function(element, options) {
//          Widget.fn.init.call(this,  element, options);
//          console.log("init acts as the constructor of a kendo ui component, and we can add more intialization code here...");

//          //bind this presentation model to the element
//          kendo.bind($(element), this) ;
//       }
//       name: "John Doe",
//       doSomething: function(){
//          console.log("now we're returning the class itself to be instantiated elsewhere...");
//       };
//    });
// });

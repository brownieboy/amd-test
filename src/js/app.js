// For general AMD/Require.js: http://requirejs.org/docs/api.html
// For AMD with Kendo see http://docs.telerik.com/kendo-ui/third-party/using-kendo-with-requirejs#load-kendo-ui-using-requirejs
// See https://atxui.wordpress.com/2014/01/28/103/ for how to define your own kendo component.
// See http://docs.telerik.com/kendo-ui/api/javascript/class for info on kendo.Class

(function() {
    console.log("app.js has been loaded");

    require.config({
        paths: {
            // leave off the .js extension, otherwise it will try to load file.js.js and fail.
            "jquery": "./libs/jquery-1.11.1.min"
        }
    });

    require(["./modules/admintable"], function(AdminTable) {
    	// AdminTable is what is returned by testmodule.js
        console.log("testmodule.js required");

        var adminTable09 = new AdminTable({
            name: "Account Frequency Table",
            shortName: "accountFreqTable",
            tableNumber: "9"
        });

        var adminTable10 = new AdminTable({
            name: "Contract Sections",
            shortName: "contractSections",
            tableNumber: "10"
        });
    });


}())

(function() {
    console.log("app.js has been loaded");

    require.config({
        paths: {
            // leave off the .js extension, otherwise it will load file.js.js and fail.
            "jquery": "./libs/jquery-1.11.1.min"
        }
    });

    // require(["jquery"], function($) {
    // 	console.log("jQuery required");
    // });

    require(["./modules/testmodule"], function(testmodule) {
        console.log("testmodule.js required");
    });
}())

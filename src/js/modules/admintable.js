define(["jquery", "../libs/kendo/js/kendo.grid.min"], function($) {

   // This is what we're returning, a kendo Class (note: not an *instance* of that class).
   return kendo.Class.extend({
      init: function (configObj) {
         console.log("AdminTable init function, configObj = " + JSON.stringify(configObj));
      }
   });

});

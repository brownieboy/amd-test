define(["kendoui"], function(kendoui){
   var Widget = kendo.ui.ObservableObject;
   return Widget.extend({
      init: function(element, options) {
         Widget.fn.init.call(this,  element, options);
         console.log("init acts as the constructor of a kendo ui component, and we can add more intialization code here...");
 
         //bind this presentation model to the element
         kendo.bind($(element), this) ;
      }
      name: "John Doe",
      doSomething: function(){
         console.log("now we're returning the class itself to be instantiated elsewhere...");
      };
   });
});
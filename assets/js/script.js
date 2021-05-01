/**
 * Main
 */
const Main = function (opt) {
   let $this = this;
   let _private = {};
   let options = Object.assign(
      {
         example: "data",
      },
      typeof opt == "undefined" ? {} : opt
   );

   // Constructor
   this.init = () => {
      $this.eventManager();
   };

   /**
    * EventManager
    */
   this.eventManager = () => {
      // Register GUI Events here
      // $('#btn-blaa-click').on('click', this.callClickEventHandlerHere);
   };

   $this.init();
};

// Run this Class With:
$(() => {
   const main = new Main({ example: "test" });
   console.log("READY");
});

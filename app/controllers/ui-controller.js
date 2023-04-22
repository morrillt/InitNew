// app/controllers/ui-controller.js

const UICtrl = (function() {
  console.log('In UIcontroller');
  
  const UISelectors = {

    clientInputSelect: "#clientInput select",
    

    // Example of last one for reference
    // itemList: "#item-list",
    // listItems: '#item-list li',
    // addBtn: ".add-btn",
    // updateBtn: ".update-btn",
    // deleteBtn: ".delete-btn",
    // backBtn: ".back-btn",
    // itemNameInput: "#item-name",
    // itemCaloriesInput: "#add-calories",
    // totalCalories: ".total-calories",
  };


  return {
    getSelectors: function () {
      return UISelectors;
    },
    
    updateUI: function(message) {
      const element = document.querySelector(DOMStrings.message);
      element.textContent = message;
    }
  }
})();
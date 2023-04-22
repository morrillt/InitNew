// app/controllers/app-controller.js

const App = (function (StateCtrl, UICtrl) {
  console.log("In Appcontroller");

  // Load event listeners
  const loadEventListeners = function () {
    var UISelectors = UICtrl.getSelectors();

    //Materialzie styling for css input selectors and load initial values
    document.addEventListener("DOMContentLoaded", function () {
      // Load the initial clientlist
      let optionsArray;

      (async () => {
        optionsArray = await Tools.readAndParseJson(
          "../../testData/clients.json"
        );

        clientSelect = document.querySelector(UISelectors.clientInputSelect);
    
        optionsArray.forEach((option) => {
          let optionElement = document.createElement("option");
          optionElement.value = option.value;
          optionElement.textContent = option.label;
          clientSelect.appendChild(optionElement);
        });


        var elems = document.querySelectorAll("select");
        var instances = M.FormSelect.init(elems, {});


      })();

  

     

      
    });

    // Click on Client event
    document
      .querySelector(UISelectors.clientInputSelect)
      .addEventListener("change", clientChange);
  };

  const clientChange = function (e) {
    // Get form input from UI controller
    //const input = UICtrl.getItemInput();
    console.log(`In Client Change ${e.target.value}`);
  };

  return {
    init: function () {
      //load event listeners
      loadEventListeners();
    },
  };
})(StateCtrl, UICtrl);

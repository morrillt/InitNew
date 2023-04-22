// Storage controller

var a = 2;
// Item Controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure / State
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "eggs", calories: 2300 },
      // { id: 2, name: "yourmama", calories: 2300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  //public methods
  return {
    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      console.log("test5", name, calories);

      //Create ID
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // calories to number
      calories = parseInt(calories);
      let newItem = new Item(id, name, calories);
      data.items.push(newItem);
      return newItem;
    },

    getTotalCalories: function () {
      let total = 0;

      // loop though all
      data.items.forEach(function (item) {
        total += item.calories;
      });

      // set total in dataa structure
      data.totalCalories = total;

      // return total
      return data.totalCalories;
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    logData: function () {
      return data;
    },

    getItemById: function (id) {
      let found = null;

      //loop through

      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    updateItem: function (name, calories) {
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
  };
})();

//UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: '#item-list li',
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#add-calories",
    totalCalories: ".total-calories",
  };

  // publc methods
  return {
    populateItemList: function (items) {
      let html = "";
      let p = "";
      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}"> <strong>${item.name}: <em>${item.calories}</em> </strong> <a href="" class="secondary-content"> <i class="fa fa-pencil edit-item"></i></a></li>`;
      });

      //insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    addListItem: function (item) {
      // show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      //create LI element
      const li = document.createElement("li");
      //add class
      li.className = "collection-item";
      //add class
      li.id = `item-${item.id}`;
      // li html
      li.innerHTML = `<strong>${item.name}: <em>${item.calories}</em> </strong> <a href="" class="secondary-content"> <i class="fa fa-pencil edit-item"></i></a>`;

      //insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    updateItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // turn node list into array

      listItems = Array.from(listItems);

      listItems.forEach(function(listItem)
      {
        const itemID = listItem.getAttribute('id');
        if(itemID === `item-${item.id}`)
        {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: <em>${item.calories}</em> </strong> <a href="" class="secondary-content"> <i class="fa fa-pencil edit-item"></i></a>`;
        }


      }
      );


    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },

    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    // add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    //icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // update item
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
  };
  // add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    // make sure not blank
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //add item to ui list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //update the total calories
      UICtrl.showTotalCalories(totalCalories);

      // clearfields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  //update item submit
  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      //getlist item id
      const listID = e.target.parentNode.parentNode.id;
      console.log(listID);

      //break into arraay
      const listIdArr = listID.split("-");
      const id = parseInt(listIdArr[1]);
      

      // get item
      const itemToEdit = ItemCtrl.getItemById(id);

      //set item
      ItemCtrl.setCurrentItem(itemToEdit);

      // add item to form
      UICtrl.addItemToForm();

      console.log(`itemto edit ${itemToEdit}`);
    }
    e.preventDefault();
  };

  const itemUpdateSubmit = function (e) {
    console.log("itemupdateSubmit");
    //get input
    const input = UICtrl.getItemInput();

    //update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //update ui
    UICtrl.updateItem(updatedItem);

     // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //update the total calories
      UICtrl.showTotalCalories(totalCalories);

      // clearfields
      UICtrl.clearEditState();


    e.preventDefault();
  };

  //public methods
  return {
    init: function () {
      // hide buttons :)
      UICtrl.clearEditState();

      // fetch items from dataa structure
      const items = ItemCtrl.getItems();

      //Check if any
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //populate items to ui controller
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //update the total calories
      UICtrl.showTotalCalories(totalCalories);
      //load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//
App.init();

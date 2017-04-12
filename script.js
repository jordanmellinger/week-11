// LIST ARRAY IS WHERE OUR DATA FOR THIS APPLICATION LIVES
var listArray = [
  { name: "Books to Read",
    items: [
      "Hitchhiker's Guide to Galaxy",
      "Walden",
      "The Elephant, the Tiger, and the Cell Phone"
    ]
  },
    { name: "TV Shows to Watch",
    items: [
      "Star Trek: The Next Generation",
      "Legion",
      "House of Cards"
    ]
  }
];


var selectedList = 0;
var listDiv = document.getElementById("lists");
var itemDiv = document.getElementById("list-items");
var addListButton = document.getElementById("add-list-button");
var addItemButton = document.getElementById("add-item-button");

// FUNCTIONS TO UPDATE THE HTML PAGE WITH RESPECT TO DATA

function updateLists() {
  while(listDiv.hasChildNodes()) {
  listDiv.removeChild(listDiv.lastChild);
}

  function addHTMLForList(list, index) {
    var aElement = document.createElement("a");
    aElement.classList.add("list-group-item");
    aElement.classList.add("list-group");
    aElement.classList.add("list-group-item-action");


    aElement.setAttribute("data-index", index);

    var textNode = document.createTextNode(list.name);
    aElement.appendChild(textNode);


    console.log(aElement);
    listDiv.appendChild(aElement);
  }


  listArray.forEach(addHTMLForList);


}
updateLists();
function updateItemsForSelectedList() {
  while (itemDiv.hasChildNodes()) {
    itemDiv.removeChild(itemDiv.lastChild);
  }

  var listItemArray = listArray[selectedList].items;
  listItemArray.forEach(function(item, i) {

    // Populate the list-items div (the right div) wit respective list items
    // - make a new 'a' element
    // - add classes to its classList
    // - set value of 'data-index' attribute to i
    // - Create a textNode with item name
    // - append textNode to the 'a' element
    // - append 'a' element to the itemDiv

    var aElement = document.createElement("a");
    aElement.classList.add("list-group-item");
    aElement.classList.add("list-group");
    aElement.classList.add("list-group-item-action");


    aElement.setAttribute("data-index", i);

    var textNode = document.createTextNode(item);
    aElement.appendChild(textNode);


    console.log(aElement);
    itemDiv.appendChild(aElement)
  });
}



// ADDING TO LIST
addListButton.addEventListener("click", function(e){
  e.preventDefault();

   var input = document["add-list-form"]["list-name-input"];
   var newListName = input.value;
   if (newListName.length > 2) {
    var newList = { name: newListName, 
                  items: [] };

    listArray.push(newList);

    updateLists();
    closePopups();
   } else {
    alert("List name must be at least three characters");
   }
});

// ADDING TO LIST ITEMS

addItemButton.addEventListener("click", function(e){
  e.preventDefault();
  var currentList = listArray[selectedList];
  var itemArray = currentList.items;
   var input = document["add-item-form"]["item-name-input"];
   var newItemName = input.value;
   if (newItemName.length > 2) {
    var newItem = newItemName;

    itemArray.push(newItem);

    updateItemsForSelectedList();
    closePopups();
   } else {
    alert("Item must be at least three characters");
   }
});

updateItemsForSelectedList()


// POP-UP HANDLING CODE
var buttonsArray = document.querySelectorAll(".popup-button");
// querySelectorAll returns a DOMTokenList and not an Array (which includes methods like forEach)
buttonsArray = Array.from(buttonsArray); // Conevrting DOMTokenList to an Array

buttonsArray.forEach(function(button) {
  button.addEventListener("click", function() {
    var popup = document.getElementById(this.dataset.popupid);
    // The data attributes can be accessed by .dataset variable which is part of the DOMElement (check HTML for buttonsArray)
    popup.style.display = "flex";
  });
});

var closeButton = document.querySelectorAll(".close");
closeButton.forEach(function(button, i) {
  button.addEventListener("click", closePopups);
});

function closePopups() {
  var popupsArray = Array.from(document.querySelectorAll(".popup"));
  popupsArray.forEach(function(popup) {
    popup.style.display = "none";
  });
}

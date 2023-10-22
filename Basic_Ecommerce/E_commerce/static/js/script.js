// Load cart data from localStorage when the page loads
var cart;
if (localStorage.getItem("cart") === null) {
  cart = {};
} else {
  cart = JSON.parse(localStorage.getItem("cart"));
}

// Function to update the cart count and icon
function updateCartCount() {
  var cartCount = Object.keys(cart).length;
  var cartIcon = '<i class="bi bi-cart4"></i>';
  var cartText = cartIcon + " " + "("+ cartCount +")";
  document.getElementById("cart").innerHTML =cartText;
}

// Code for handling the "add" button
$(".add").on("click", function() {
  var item_id = this.id.toString();

  // Increment count of the item by 1 if it already exists
  if (cart[item_id] !== undefined) {
    var quantity = cart[item_id][0] + 1;
    cart[item_id][0] = quantity;
    cart[item_id][2] = cart[item_id][2] + parseFloat(document.getElementById("price" + item_id).innerHTML);
  } 
  // Add the item
  else {
    var quantity = 1;
    var price = parseFloat(document.getElementById("price" + item_id).innerHTML);
    var name = document.getElementById("nm" + item_id).innerHTML;
    cart[item_id] = [quantity, name, price];
  }

  // Update the cart data in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart count and icon
  updateCartCount();
});

// Function to display the cart
function displayCart(cart) {
  var cartString = "<h5>This is your cart</h5>";
  let cartObject = JSON.parse(localStorage.getItem("cart"));
  for (var item in cartObject) {
    cartString += cartObject[item][1] + " Qty: " + cartObject[item][0] + "<br>";
  }
  document.getElementById("cart").setAttribute("data-content", cartString);
  $('[data-toggle="popover"]').popover();
}

// Initial display of the cart and cart count
displayCart(cart);
updateCartCount();

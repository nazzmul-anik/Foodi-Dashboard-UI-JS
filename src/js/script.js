const mobile = document.querySelector(".menu-toggle");
const mobileLink = document.querySelector(".sidebar");
const closeSidebar = document.querySelector(".close-sidebar");
const cartBtn = document.querySelector(".cart");
const cartPopup = document.querySelector(".cart-popup");
const cartClose = document.querySelector(".cart-close");

mobile.addEventListener("click", () => {
  mobileLink.classList.toggle("active");
});

closeSidebar.addEventListener("click", () => {
  mobileLink.classList.toggle("active");
});

var step = 100;
var stepFilter = 60;
var scrolling = true;

$(".back").bind("click", function (e) {
  e.preventDefault();
  $(".highlight-wrapper").animate({
    scrollLeft: "-=" + step + "px",
  });
});

$(".next").bind("click", function (e) {
  e.preventDefault();
  $(".highlight-wrapper").animate({
    scrollLeft: "+=" + step + "px",
  });
});

$(".back-menus").bind("click", function (e) {
  e.preventDefault();
  $(".filter-wrapper").animate({
    scrollLeft: "-=" + stepFilter + "px",
  });
});

$(".next-menus").bind("click", function (e) {
  e.preventDefault();
  $(".filter-wrapper").animate({
    scrollLeft: "+=" + stepFilter + "px",
  });
});

cartBtn.addEventListener("click", () => {
  cartPopup.classList.toggle("active");
});

cartClose.addEventListener("click", () => {
  cartPopup.classList.remove("active");
});

const addToCart = (itemName, itemPrice) => {
  const cartItems = document
    .getElementById("cart-items")
    .getElementsByTagName("tbody")[0];

  const exitingItem = Array.from(cartItems.getElementsByTagName("tr")).find(
    (item) =>
      item.cells[0].textContent.trim().toLowerCase() ===
      itemName.trim().toLowerCase()
  );

  if (exitingItem) {
    const itemCount =
      parseInt(exitingItem.querySelector(".item-count").textContent) + 1;
    exitingItem.querySelector(".item-count").textContent = itemCount;

    const itemTotal =
      parseFloat(exitingItem.querySelector(".item-total").textContent) +
      parseFloat(itemPrice);
    exitingItem.querySelector(".item-total").textContent = itemTotal.toFixed(2);
  } else {
    const newRow = cartItems.insertRow();
    newRow.innerHTML = `
      <td>${itemName} </td>
      <td class='item-count'>1</td>
      <td class='item-price'>${itemPrice}</td>
      <td class='item-total'>${itemPrice}</td>
    `;
  }

  updateCartCountAndTotal();
};

const updateCartCountAndTotal = () => {
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const cartItems = document.querySelectorAll("#cart-items tbody tr");

  let totalCount = 0;
  let total = 0;

  cartItems.forEach((item) => {
    const itemCount = parseInt(item.querySelector(".item-count").textContent);
    const itemTotal = parseFloat(item.querySelector(".item-total").textContent);

    totalCount += itemCount;
    total += itemTotal;
  });

  cartCount.textContent = totalCount;
  cartTotal.textContent = total.toFixed(2);
};

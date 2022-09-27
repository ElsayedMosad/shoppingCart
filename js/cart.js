let basket = JSON.parse(localStorage.getItem("dataBasket")) || [];

// let cartItems = document.getElementById("cart-items");
let mainBox = document.getElementById("main");

let generateShop = () => {
  if (basket.length !== 0) {
    mainBox.innerHTML = `
    <div class="container cart-con">
      <h2 class="total-value" id="total-value">Total Bill : $ <span>${0}</span></h2>
      <div class="cart-buts">
        <button class="checkout">checkout</button>
        <button class="clear" id="clear-cart" onClick=clearAllData()>clear cart</button>
      </div>
      <div class="cart-items" id="cart-items">
      ${shopItemsData
        .map((e) => {
          let { id, name, desc, img, price } = e;
          let findItem = basket.find((ele) => ele.id === id);
          if (findItem) {
            let num = findItem.nums;
            return `<div class="cart-item">
            <div class="cart-item-img">
              <img src="${img}" alt="item image" />
            </div>
            <div class="cart-item-info">
              <div class="cart-head">
                <h3>${name}<span>$${price}</span></h3>
                <button class="delete-cart" onClick=deleteCart("${id}")><i class="bi bi-trash"></i></button>
              </div>
              <div class="cart-item-buts">
                <i onclick=decreament("${id}") class="bi bi-dash-lg"></i>
                <span class="item-nums" id="item-nums-${id}">${num}</span>
                <i onClick=increament("${id}")  class="bi bi-plus"></i>
              </div>
              <div class="total-cart-value" id="cart-total-${id}">$ ${
              num * price
            }</div>
            </div>
          </div>`;
          } else {
            return;
          }
        })
        .join("")}
      </div>
    </div>
        `;
  } else {
    mainBox.innerHTML = `<div class="container">
    <div class="empty">
      <h4>Cart is Empty</h4>
      <a href="index.html">Back to home</a>
    </div>
  </div>`;
  }
};
generateShop();
// decreament nums by using id to current item
let decreament = (id) => {
  let findItem = basket.find((i) => i.id === id);
  if (findItem && findItem.nums > 0) {
    --findItem.nums;
    getUpdateNums(id);
  }
  if (findItem && findItem.nums === 0) {
    let indexOfRemove = basket.indexOf(findItem);
    basket.splice(indexOfRemove, 1);
    generateShop();
  }
  getTotalSalary();
  handleLocalStorage();
};
// Increament nums by using id to current item
let increament = (id) => {
  let findItem = basket.find((i) => i.id === id);
  if (findItem == undefined) {
    basket.push({
      id: id,
      nums: 1,
    });
  } else {
    ++findItem.nums;
  }
  getUpdateNums(id);
  getTotalSalary();
  handleLocalStorage();
};
// Update nums of current item
let getUpdateNums = (id) => {
  let findItem = basket.find((i) => i.id === id);
  let getItemFromShop = shopItemsData.find((i) => i.id === id);
  let element = document.getElementById(`item-nums-${id}`);
  element.innerText = findItem.nums;
  let total = document.getElementById(`cart-total-${id}`);
  total.innerText = `$ ${findItem.nums * getItemFromShop.price}`;
  calTotalNums();
};

let calTotalNums = () => {
  let z = 0;
  z = basket.map((s) => s.nums).reduce((p, c) => p + c, 0);
  let element = document.getElementById(`cart-nums`);
  element.innerText = z;
};
calTotalNums();

let handleLocalStorage = () => {
  localStorage.setItem("dataBasket", JSON.stringify(basket));
};

let clearAllData = () => {
  basket = [];
  generateShop();
  localStorage.clear();
  calTotalNums();
};

let deleteCart = (id) => {
  let findItem = basket.find((i) => i.id === id);
  let indexOfRemove = basket.indexOf(findItem);
  basket.splice(indexOfRemove, 1);
  generateShop();
  calTotalNums();
  getTotalSalary();
  handleLocalStorage();
};

let getTotalSalary = () => {
  if (basket.length !== 0) {
    let totalValueElement = document.querySelector("#total-value  span");
    let z = 0;
    basket.forEach((e, i) => {
      let getItemFromShop = shopItemsData.find((ele) => e.id === ele.id);
      z += getItemFromShop.price * e.nums;
    });
    totalValueElement.innerHTML = z;
    return z;
  }
};

getTotalSalary();

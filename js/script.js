let shop = document.getElementById("shop");

// Get basket data from localStorage
let basket = JSON.parse(localStorage.getItem("dataBasket")) || [];
// let checkLocalStorage = () => {
//   if (localStorage.getItem("dataBasket")) {
//     basket = JSON.parse(localStorage.getItem("dataBasket"));
//   }
// };
// checkLocalStorage();
// Run shopItemsData and handle localStorage items
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((e) => {
      let { id, name, desc, img, price } = e;
      let num = 0;
      let findItem = basket.find((ele) => ele.id === id);
      if (findItem) {
        num = findItem.nums;
      }
      return `<div class="item" id="product-id-${id}">
    <img src="${img}" alt="item image">
    <div class="item-info">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="item-cost">
        <h4>$ ${price}</h4>
        <div  class="item-buts">
          <i onclick=decreament("${id}") class="bi bi-dash-lg"></i>
          <span  class="item-nums" id="item-nums-${id}">${num}</span>
          <i onClick=increament("${id}") class="bi bi-plus"></i>
        </div>
      </div>
    </div>
  </div>`;
    })
    .join(""));
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
  }
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
  handleLocalStorage();
};
// Update nums of current item
let getUpdateNums = (id) => {
  let findItem = basket.find((i) => i.id === id);
  let element = document.getElementById(`item-nums-${id}`);
  element.innerText = findItem.nums;
  calTotalNums();
};
// Show total nums of shopping
let calTotalNums = () => {
  let z = 0;
  z = basket.map((s) => s.nums).reduce((p, c) => p + c, 0);
  let element = document.getElementById(`cart-nums`);
  element.innerText = z;
};
calTotalNums();
// Save data of basket in localStorage
let handleLocalStorage = () => {
  localStorage.setItem("dataBasket", JSON.stringify(basket));
};

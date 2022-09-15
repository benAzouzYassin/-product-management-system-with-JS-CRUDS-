// variables
const body = document.querySelector("body");
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.querySelector(".total");
const count = document.querySelector("#count");
const category = document.querySelector("#category");
const createAndUpdateBtn = document.querySelector("#create-btn");
const productsTable = document.querySelector("table");
const deleteAllBtn = document.querySelector("#delete-all-btn");
const deleteBtn = document.querySelector(".delete-btn");
const modeLabel = document.querySelector("#mode");
let mode = "create";
let idForUpdating = undefined;
let totalPrice = 0;

// functions
const clearInputFields = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerText = "";
};
const renderProducts = () => {
  productsTable.innerHTML = `<tr>
  <th>ID</th>
  <th>TITLE</th>
  <th>PRICE</th>
  <th>TAXES</th>
  <th>ADS</th>
  <th>DISCOUNT</th>
  <th>TOTAL</th>
  <th>CATEGORY</th>
  <th>UPDATE</th>
  <th>DELETE</th>
</tr>`;
  if (localStorage.getItem("products")) {
    let currentProducts = JSON.parse(localStorage.getItem("products"));
    for (const product of currentProducts) {
      if (product) {
        productsTable.innerHTML += `<tr>
  <td>${product.id}</td>
  <td>${product.title}</td>
  <td>${product.price}</td>
  <td>${product.taxes}</td>
  <td>${product.ads}</td>
  <td>${product.discount}</td>
  <td>${product.total}</td>
  <td>${product.category}</td>
  <td><button class="update-btn" onclick="updateProduct(this)">update</button></td>
  <td><button class="delete-btn" onclick="deleteProduct(this)">delete</button></td>
</tr>`;
      }
    }
  }
};

const checkEmpty = (value) => {
  if (value == "") {
    return 0;
  } else {
    return value;
  }
};

const getId = () => {
  if (localStorage.getItem("id")) {
    //check if id exists on the local storage
    let current = Number(localStorage.getItem("id"));
    localStorage.setItem("id", JSON.stringify(current + 1));
    return current;
  } else {
    localStorage.setItem("id", 2);
    return 1;
  }
};
const deleteProduct = (product) => {
  let productId = product.parentNode.parentNode.children[0].innerText; //the id of the product
  const products = JSON.parse(localStorage.getItem("products"));
  const filtredProducts = products.filter((obj) => {
    if (obj) {
      return obj.id != productId;
    }
  });
  localStorage.setItem("products", JSON.stringify(filtredProducts));
  renderProducts();
};
const updateProduct = (product) => {
  mode = "update";
  let productId = product.parentNode.parentNode.children[0].innerText; //the id of the product
  idForUpdating = productId;
  const products = JSON.parse(localStorage.getItem("products"));
  const specefiedProduct = products.filter((obj) => {
    if (obj) {
      return obj.id == productId;
    }
  })[0];

  createAndUpdateBtn.innerText = "Update";
  modeLabel.innerText = "(Update Mode)";
  //render all the obj value in the input fields
  title.value = specefiedProduct.title;
  price.value = specefiedProduct.price;
  taxes.value = specefiedProduct.taxes;
  category.value = specefiedProduct.category;
  ads.value = specefiedProduct.ads;
  discount.value = specefiedProduct.discount;
  //move the scroll position up
};

// event listeners
body.onload = () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify([]));
    renderProducts();
  } else {
    renderProducts();
  }
};

price.onkeyup = () => {
  if (
    !isNaN(price.value) &&
    !isNaN(taxes.value) &&
    !isNaN(ads.value) &&
    price.value != ""
  ) {
    totalPrice =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerText = totalPrice;
  }
};
taxes.onkeyup = () => {
  if (
    !isNaN(price.value) &&
    !isNaN(taxes.value) &&
    !isNaN(ads.value) &&
    price.value != ""
  ) {
    totalPrice =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerText = totalPrice;
  }
};
ads.onkeyup = () => {
  if (
    !isNaN(price.value) &&
    !isNaN(taxes.value) &&
    !isNaN(ads.value) &&
    price.value != "" 
  ) {
    totalPrice =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerText = totalPrice;
  }
};
discount.onkeyup = () => {
  if (!isNaN(discount.value) && discount.value != "") {
    totalPrice =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerText = totalPrice;
  }
};

createAndUpdateBtn.onclick = () => {
  if (mode == "create") {
    let check = true;
    if (isNaN(price.value)) {
      alert("price be a number");
      check = false;
    }
    if (isNaN(taxes.value)) {
      alert("taxes should be a number");
      check = false;
    }
    if (isNaN(ads.value)) {
      alert("ads should be a number");
      check = false;
    }
    if (isNaN(discount.value)) {
      alert("discount should be a number");
      check = false;
    }
    if (price.value === "") {
      alert("price is empty");
      check = false;
    }

    if (title.value === "") {
      alert("title is empty");
      check = false;
    }
    if (category.value === "") {
      alert("category is empty");
      check = false;
    }
    if (isNaN(count.value)) {
      check = false;
      alert("count should be a number");
    }
    if (count.value === "") {
      alert("count is empty");
      check = false;
    }
    if (check === true) {
      let oldProducts = JSON.parse(localStorage.getItem("products"));
      let newProducts = [].concat(oldProducts);
      //save the values into an object with the id and evreything
      for (let i = 0; i < Number(count.value); i++) {
        newProducts = newProducts.concat({
          id: getId(),
          taxes: checkEmpty(taxes.value),
          title: title.value,
          price: price.value,
          ads: checkEmpty(ads.value),
          discount: checkEmpty(discount.value),
          category: category.value,
          total: totalPrice,
        });
      }
      localStorage.setItem("products", JSON.stringify(newProducts)); //saves the new products in the local storage
    }
    renderProducts();
    clearInputFields();
  } else {
    //saving updates
    createAndUpdateBtn.innerText = "Create";
    modeLabel.innerText = "(Create Mode)";
    const currentProducts = JSON.parse(localStorage.getItem("products"));

    let changedProducts = currentProducts
      .filter((product) => product != null)
      .map((product) => {
        if (product.id == idForUpdating) {
          return {
            id: product.id,
            taxes: taxes.value,
            title: title.value,
            price: price.value,
            ads: ads.value,
            discount: product.discount,
            category: category.value,
            total:
              Number(price.value) +
              Number(taxes.value) +
              Number(ads.value) -
              Number(discount.value),
          };
        } else {
          return product;
        }
      });
    localStorage.setItem("products", JSON.stringify(changedProducts));
    renderProducts();
    clearInputFields();
    //here u will save the updates
    mode = "create";
  }
};

deleteAllBtn.onclick = () => {
  localStorage.clear();
  renderProducts();
  clearInputFields();
};

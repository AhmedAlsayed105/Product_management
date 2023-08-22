// get total
// create product
// save localStorage
// clear inputs
// read
// count
// delete
//  update
//  search
//  clean date

let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let mood = "create";
let temp;

// count price or total
function getTotal() {
  let result = "";
  if (price.value !== "") {
    result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.background = "#18a90d";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
// create product

let allProduct = [];

if (localStorage.getItem("product")) {
  allProduct = JSON.parse(localStorage.getItem("product"));
} else {
  allProduct = [];
}

submit.onclick = () => {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // add object to arr to loop count create obj
  // allProduct.push(newPro);
  if (mood === "create") {
    for (let i = 0; i < newPro.count; i++) {
      if (newPro.count > 0) {
        allProduct.push(newPro);
      }
    }
    if (newPro.count === "") {
      allProduct.push(newPro);
    }
    // لو المود مش كريت اعمل كذا
  } else {
    allProduct[temp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  // console.log(newPro.count === '');
  //add allProduct to localStorage
  localStorage.setItem("product", JSON.stringify(allProduct));

  // clearDate
  clearDate();
  // show data
  showDataProduct();
  //
  getTotal();
};

// clear inputs

function clearDate() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// show All Data Product

function showDataProduct() {
  let trBody = "";
  for (let i = 0; i < allProduct.length; i++) {
    trBody += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${allProduct[i].title}</td>
        <td>${allProduct[i].price}</td>
        <td>${allProduct[i].taxes}</td>
        <td>${allProduct[i].ads}</td>
        <td>${allProduct[i].discount}</td>
        <td>${allProduct[i].total}</td>
        <td>${allProduct[i].category}</td>
        <td><button id="update" onclick="updateDate(${i})">تعديل</button></td>
        <td><button id="delete" onclick="delateProduct(${i})">حذف</button></td>
    </tr>
        `;
  }

  document.querySelector("#tbody").innerHTML = trBody;
  // create button delateAll
  let delateAll = document.querySelector("#delateAll");

  if (allProduct.length > 0) {
    delateAll.innerHTML = `
    <button id="delateAllBtn" onclick="delateAllFn()">Delate All (${allProduct.length})</button>
    `;
  } else {
    delateAll.innerHTML = "";
  }
}
showDataProduct();

// function delate
function delateProduct(id) {
  allProduct.splice(id, 1);
  localStorage.product = JSON.stringify(allProduct);
  showDataProduct();
}

// delateAll
function delateAllFn() {
  localStorage.clear();
  allProduct.splice(0);
  showDataProduct();
}

// count
function updateDate(i) {
  title.value = allProduct[i].title;
  price.value = allProduct[i].price;
  taxes.value = allProduct[i].taxes;
  ads.value = allProduct[i].ads;
  discount.value = allProduct[i].discount;
  //
  getTotal();
  submit.innerHTML = "تعديل";
  count.style.display = "none";
  category.value = allProduct[i].category;
  mood = "update";
  temp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchMood = "title";

function getSearchMode(id) {
  let search = document.querySelector("#search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "search By Category";
  }
  search.focus();
}

//
function searchDate(value) {
  let trBody = "";

  if (searchMood == "title") {
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].title.includes(value)) {
        trBody += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${allProduct[i].title}</td>
        <td>${allProduct[i].price}</td>
        <td>${allProduct[i].taxes}</td>
        <td>${allProduct[i].ads}</td>
        <td>${allProduct[i].discount}</td>
        <td>${allProduct[i].total}</td>
        <td>${allProduct[i].category}</td>
        <td><button id="update" onclick="updateDate(${i})">تحديث</button></td>
        <td><button id="delete" onclick="delateProduct(${i})">حذف</button></td>
    </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].category.includes(value)) {
        trBody += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${allProduct[i].title}</td>
        <td>${allProduct[i].price}</td>
        <td>${allProduct[i].taxes}</td>
        <td>${allProduct[i].ads}</td>
        <td>${allProduct[i].discount}</td>
        <td>${allProduct[i].total}</td>
        <td>${allProduct[i].category}</td>
        <td><button id="update" onclick="updateDate(${i})">تعديل</button></td>
        <td><button id="delete" onclick="delateProduct(${i})">حذف</button></td>
    </tr>
        `;
      }
    }
  }
  document.querySelector("#tbody").innerHTML = trBody;
}

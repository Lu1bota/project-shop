const products = [
  {
    id: 1,
    name: "Ноутбук Dell Inspiron 15",
    category: "Електроніка",
    price: 15000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGNSNxLkiHlnspcXnEQ570LiNoIIXKNfjVg&s",
  },
  {
    id: 2,
    name: "Смартфон Samsung Galaxy S21",
    category: "Електроніка",
    price: 12000,
    img: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/1/7/1725083_2.jpg/w_600",
  },
  {
    id: 3,
    name: "Кросівки Nike Air Max",
    category: "Одяг",
    price: 3000,
    img: "https://images.prom.ua/1580372382_w640_h320_muzhskie-krossovki-nike.jpg",
  },
  {
    id: 4,
    name: "Годинник Casio F91W",
    category: "Аксесуари",
    price: 2500,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6epyfhb1gy7Vk8r-PeTu8l5e0v1HzvzeOuQ&s",
  },
  {
    id: 5,
    name: "Кофемашина Philips 3200",
    category: "Побутова техніка",
    price: 8000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnM3g1YDNq9Xhp0C0_PH-8sC6uDvhXUtEU2Q&s",
  },
  {
    id: 6,
    name: "Рюкзак Herschel Little America",
    category: "Аксесуари",
    price: 3500,
    img: "https://img.eobuwie.cloud/eob_product_660w_880h(3/0/3/2/30326a6b472dc61aa4c7e8b706823bf64d14217a_20_0828432640447_ks.jpg,jpg)/riukzak-herschel-herschel-little-americatm-backpack-11390-06177-golubii-0828432640447.jpg",
  },
];

const form = document.querySelector("#searchForm");
const container = document.querySelector("#productsContainer");
const btnClear = document.querySelector(".btn-clear");

function createMarkup(arr) {
  return arr
    .map((item) => {
      return `<div class="product-card" data-id="${item.id}">
    <img src="${item.img} alt="${item.name}"/>
    <h2>${item.name}</h2>
    <h3>${item.category}</h3>
    <p>${item.price} грн</p>
  </div>`;
    })
    .join("");
}

container.insertAdjacentHTML("beforeend", createMarkup(products));

form.addEventListener("submit", handleForm);
btnClear.addEventListener("click", handleReset);

function handleForm(event) {
  event.preventDefault();

  const input = event.target.elements.input.value;
  const select = event.target.elements.select.value;
  if (!input) {
    alert("Товарів не знайдено");
  }
  const result = products.filter((item) =>
    item[select].toLowerCase().includes(input.toLowerCase()),
  );

  container.innerHTML = createMarkup(result);
}

function handleReset(event) {
  event.preventDefault();
  const input = document.querySelector("input[name='input']");
  input.value = "";

  container.innerHTML = createMarkup(products);
}

container.addEventListener("click", modalImg);

function modalImg(event) {
  if (event.target === event.currentTarget) {
    return;
  }

  const parent = event.target.closest(".product-card");
  const id = parent.dataset.id;
  const result = products.find((item) => item.id === Number(id));

  const instance = basicLightbox.create(`
  <div class="modal">
  <img src="${result.img}" alt="${result.name}" />
  <h2>${result.name}</h2>
  <h3>${result.category}</h3>
  <p>${result.price} грн</p>
  </div>
  `);

  instance.show();
}

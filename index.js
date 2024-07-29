const API_LINK = "https://fakestoreapi.com/products";

/*
const products = fetch(API_LINK)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    console.log(data);
  });
*/

async function getProducts(link) {
  try {
    let products = await fetch(link);
    products = await products.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

function createProductCard(product) {
  const { category, description, image, id, price, rating, title } = product;
  const categoryElem = createElement("h3", undefined, [category]);
  const descriptionElem = createElement(
    "p",
    ["description"],
    [description],
    true
  );
  const imageElem = createElement("img", undefined, undefined);
  imageElem.setAttribute("src", image);
  const priceElem = createElement("p", ["price"], [price]);
  const titleElem = createElement("h2", ["title"], [title], true);
  const liElelm = createElement(
    "li",
    ["card"],
    [imageElem, titleElem, categoryElem, descriptionElem, priceElem]
  );
  return liElelm;
}

function createElement(type, classNames = [], children = [], title = false) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  if (title) {
    elem.setAttribute("title", children[0]);
  }
  elem.append(...children);
  return elem;
}

async function updateView() {
  let products = await getProducts(API_LINK);
  let productCards = products.map((product) => {
    return createProductCard(product);
  });
  const ulElem = document.querySelector(".card-container");
  ulElem.replaceChildren(...productCards);
}

updateView();

// alert("Hello World, item page!");
const x = window.location;
console.log(x);
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const cost = urlParams.get("cost");
const src = urlParams.get("src");
console.log(title, cost, src);
//alert(`Title: ${title} cost: ${cost} path: ${src}`)

const container = document.createElement("div");
container.className = "itemContainer";

const image = document.createElement("img");
image.src = src;
image.className = "item__image"

const titleElement = document.createElement("h2");
titleElement.textContent = title;
titleElement.className = "item__title";

const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const textElement = document.createElement("p");
textElement.textContent = description;
textElement.className = "item__title";

const costElement = document.createElement("div");
costElement.textContent = cost;
costElement.className = "item__price";

container.append(titleElement);
container.append(image);
container.append(textElement);
container.append(costElement);

window.addEventListener("load", () =>{
  const app = document.getElementById("item-body");
  app.append(container);
});

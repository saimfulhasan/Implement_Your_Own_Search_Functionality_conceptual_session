const inputField = document.getElementById("search-category");
const spinner = document.getElementById("spinner");

const productsContainer = document.getElementById("products-container");

const allMenus = [];

const loadProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

const setMenus = async () => {
    const allProducts = await loadProducts();
    // console.log(allProducts);
    const menus = document.getElementById("all-menus");

    // console.log(menus.children)

    for (const product of allProducts) {
        // console.log(product.category)
        // console.log(allMenus.indexOf(product.category))
        if (allMenus.indexOf(product.category) === -1) {
            allMenus.push(product.category);

            const li = document.createElement("li");
            li.innerHTML = `<a>${product.category}</a>`;

            menus.appendChild(li);
        }
    }
}

setMenus();

inputField.addEventListener("keypress", async (event) => {

    if (event.key === "Enter") {
        productsContainer.textContent = "";
        // console.log(inputField.value);
        displaySpinner(true);

        const data = await loadProducts();

        const foundProducts = data.filter(product => product.category.includes(inputField.value));

        displaySpinner(false);

        if (foundProducts.length) {
            productsContainer.classList.add("grid", "grid-cols-4", "gap-4");

            foundProducts.forEach(product => {

                const card = document.createElement("div");
                card.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl">
                <figure><img src=${product.image} alt="Shoes" class="h-60 w-full"/></figure>
                <div class="card-body">
                  <h2 class="card-title">${product.title.length > 20 ? product.title.slice(0,20)+'...' : product.title}</h2>
                  <div class="card-actions justify-end">
                    <label for="my-modal-3" class="btn btn-primary modal-button" onclick="openModal('${product.description}', '${product.image}')">Show Details</label>
                  </div>
                </div>
              </div>
                `
                productsContainer.appendChild(card);
            });
        }
        else {
            productsContainer.classList.remove("grid", "grid-cols-4", "gap-4");
            productsContainer.innerHTML = `<h2 class="text-center text-orange-500 text-2xl">Products Not Found</h2>`
        }
    }
})

const displaySpinner = (display) => {
    if (display) {
        spinner.classList.remove("hidden");
    }
    else {
        spinner.classList.add("hidden");
    }
}

const openModal = (description, image) =>{
    console.log(image);
    const modal = document.getElementById("modal-body");
    modal.textContent = "";

    modal.innerHTML = `<p>${description}</p>
        <img src="${image}"/>
    `
}
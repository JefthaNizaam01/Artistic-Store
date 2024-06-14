let container = document.querySelector("[ourStore]");
let searchProduct = document.querySelector("[searchProduct]");
let sortingByAmount = document.querySelector("[sorting]");
// items/products
let checkoutItems = JSON.parse(localStorage.getItem("checkout"))
  ? JSON.parse(localStorage.getItem("checkout"))
  : [];
// Current year
document.querySelector("[currentYear]").textContent =
  new Date().getUTCFullYear();
let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : localStorage.setItem(
      "products",
      JSON.stringify([
        {
          id: 1,
          productName: "Scarlet Beauty",
          category: "Romance",
          description:
            "The artist captures the essence of elegance in its purest form, with the woman's radiant presence illuminating the canvas.",
          price: 1900.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/reddressart.jpg",
        },
        {
          id: 2,
          productName: "Shattered Silence",
          category: "Portrait",
          description:
            "The artist portrays the profound anguish of a woman, her hand obscuring her face, while fractured lines reveal the depth of her silent suffering.",
          price: 1800.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/Éphémère Évanescence painting.jpg",
        },
        {
          id: 3,
          productName: "Dusk's Embrace: Love on the Shore",
          category: "Romance",
          description:
            "As the sun's light fades from the sky, the couple's embrace seems to radiate with an inner glow, illuminating the darkness with the warmth of their love.",
          price: 1700.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/coupleinloveart.jpg",
        },
        {
          id: 4,
          productName: " Harmony in Motion: A Dance of Souls",
          category: "Romance",
          description:
            " Through delicate movements and tender gazes, Harmony in Motion: A Dance of Souls captures the fleeting moments of connection that define human relationships.",
          price: 1700.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/danceart.jpg",
        },
        {
          id: 5,
          productName: "Silent Steps: A Man's Path to Discovery",
          category: "Nature",
          description:
            "Within the silence of the scene, the individual becomes a calm observer of his own journey, each step a moment of self-reflection and redemption.",
          price: 1600.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/mountainart.jpg",
        },
        {
          id: 6,
          productName: "Whispers of the Night",
          category: "Romance",
          description:
            "Amid the night's embrace, a couple finds solace under an umbrella, their forms touched by the tender light of the moon.",
          price: 1500.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/purplerainart.jpg",
        },
        {
          id: 7,
          productName: "Winter's Embrace",
          category: "Nature",
          description:
            " Through the flow of seasons, these trees stand steadfast, embracing each change with resilience, their journey from greenery to snow-laden silhouettes a timeless testament to the cycle of life.",
          price: 1400.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/wintersnowart.jpg",
        },
        {
          id: 8,
          productName: "Shadows of Memory: A Fading Love",
          category: "Romance",
          description:
            "Captures the bittersweet essence of how  love changes over time, as two people fade away, leaving only memories behind.",
          price: 1300.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/lettinggoart.jpg",
        },

        {
          id: 9,
          productName: "Purple Petals: Nature's Melody",
          category: "Nature",
          description:
            "Depicts a vibrant purple flower in full bloom, its petals dancing gracefully, evoking a sense of natural harmony and beauty.",
          price: 1300.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/purpleflower.art.jpg",
        },
        {
          id: 10,
          productName: "Whiskers of Feeling: A Cat's Canvas",
          category: "Portrait",
          description:
            "Portrays the cat's emotional journey, from the depths of sadness to the pinnacle of joy.",
          price: 1200.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/catart.jpg",
        },

        {
          id: 11,
          productName: "Summer's Sunset Radiance: A Seasonal Shift Begins",
          category: "Nature",
          description:
            "As the sun sets, 'Summer's Sunset Radiance' captures the quiet beauty of seasonal transition, embodied by two trees standing in silent reverence.",
          price: 1200.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/sunsetart.jpg",
        },

        {
          id: 12,
          productName: "Crimson Canvas: A Scarlet Sonata",
          category: "Nature",
          description:
            "As the city streets blush with the crimson hues of autumn, the lady's presence adds a sense of timeless beauty to the ephemeral dance of the wind.",
          price: 1200.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/redart.jpg",
        },
      ])
    );

    let spinnerWrapper = document.querySelector(".spinner-wrapper");
setTimeout(() => {
  spinnerWrapper.style.opacity = 0;
}, 400);

function displayProducts(products, category = null) {
  container.innerHTML = "";

  products.forEach((product) => {
   
    // Add product card
    container.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${product.img_url}" class="card-img-top" alt="${
      product.productName
    }" id="cardImg${product.id}">
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text1">${product.description}</p>
                        <p class="card-text2">Amount: R ${product.price}</p>
                         <button type='button' class="btn  btn-primary" onclick='addToCart(${product.id})'>Add to cart</button>
                    </div>
                </div>
            </div>
        `;
  });
}
displayProducts(products);
// Search functionality
searchProduct.addEventListener("keyup", () => {
  try {
    const searchText = searchProduct.value.toLowerCase();
    let filteredProducts = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
    if (filteredProducts.length === 0) {
      throw new Error(`${searchText} product not found`);
    }
  } catch (error) {
    container.innerHTML = `<div class="alert alert-warning">${error.message}</div>`;
  }
});
// Sorting functionality
let ascendingOrder = true; 
sortingByAmount.addEventListener("click", () => {
  try {
    products.sort((a, b) =>
      ascendingOrder ? a.price - b.price : b.price - a.price
    );
    displayProducts(products);
    ascendingOrder = !ascendingOrder;
    sortingByAmount.textContent = ascendingOrder
      ? "Sorted by lowest amount"
      : "Sorted by highest amount";
  } catch (error) {
    container.innerHTML = `<div class="alert alert-danger">Sorting failed. Please try again.</div>`;
  }
});
// Add to cart functionality
function addToCart(productId) {
  try {
    // Find the product with the given ID
    const product = products.find(product => product.id === productId);
    if (product) {
      checkoutItems.push(product);
      localStorage.setItem("checkout", JSON.stringify(checkoutItems));
      document.querySelector("[counter]").textContent = checkoutItems.length || 0;
    } else {
      throw new Error(`Product with ID ${productId} not found.`);
    }
  } catch (error) {
    alert("Unable to add product to cart. Please try again.");
  }
}
window.onload = () => {
  document.querySelector("[counter]").textContent = checkoutItems.length || 0;
};


//Category filter
document
  .querySelector("[categoryFilter]")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
    displayProducts(filteredProducts);
  });



  
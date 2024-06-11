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
          productName: "Shadows of Memory: A Fading Love",
          category: "Romance",
          description:
            "Captures the bittersweet essence of how  love changes over time, as two people fade away, leaving only memories behind.",
          price: 300.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/lettinggoart.jpg",
        },
        {
          id: 2,
          productName: "Whiskers of Feeling: A Cat's Canvas",
          category: "Portrait",
          description:
            "Portrays the cat's emotional journey, from the depths of sadness to the pinnacle of joy.",
          price: 500.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/catart.jpg",
        },
        {
          id: 3,
          productName: "Dusk's Embrace: Love on the Shore",
          category: "Romance",
          description:
            "As the sun's light fades from the sky, the couple's embrace seems to radiate with an inner glow, illuminating the darkness with the warmth of their love.",
          price: 500.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/coupleinloveart.jpg",
            
        },
        {
          id: 4,
          productName: "Winter's Embrace",
          category: "Nature",
          description:
            " Through the flow of seasons, these trees stand steadfast, embracing each change with resilience, their journey from greenery to snow-laden silhouettes a timeless testament to the cycle of life.",
          price: 400.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/wintersnowart.jpg",
        },
        {
          id: 5,
          productName: "Purple Petals: Nature's Melody",
          category: "Nature",
          description:
            "Depicts a vibrant purple flower in full bloom, its petals dancing gracefully, evoking a sense of natural harmony and beauty.",
          price: 1000.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/purpleflower.art.jpg",
        },
        {
          id: 6,
          productName: "Summer's Sunset Radiance: A Seasonal Shift Begins",
          category: "Nature",
          description:
            "As the sun sets, 'Summer's Sunset Radiance' captures the quiet beauty of seasonal transition, embodied by two trees standing in silent reverence.",
          price: 900.0,
          img_url:
            "https://jefthanizaam01.github.io/favoriteimages/images/sunsetart.jpg",
        },
      ])
    );
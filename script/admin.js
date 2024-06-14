document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear()

document.addEventListener("DOMContentLoaded", function() {
    const productTableBody = document.getElementById("productTableBody");
    const searchInput = document.querySelector("[searchProduct]");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    function renderProducts(productList) {
        productTableBody.innerHTML = "";
        productList.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td>${product.description}</td>
                <td>R ${product.price}</td>
                <td><img src="${product.img_url}" alt="${product.productName}" style="width: 100px; height: 140px;"></td>
                <td><button class="edit-btn btn btn-primary" data-id="${product.id}">Edit</button></td>
                <td><button class="remove-btn btn btn-secondary" data-id="${product.id}">Remove</button></td>
            `;
            productTableBody.appendChild(row);
        });
    }
    
    let spinnerWrapper = document.querySelector(".spinner-wrapper");
setTimeout(() => {
  spinnerWrapper.style.opacity = 0;
}, 400);

    function filterAndSortProducts(query) {
        const filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        filteredProducts.sort((a, b) => {
            const nameA = a.productName.toLowerCase();
            const nameB = b.productName.toLowerCase();
            const categoryA = a.category.toLowerCase();
            const categoryB = b.category.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            if (categoryA < categoryB) return -1;
            if (categoryA > categoryB) return 1;
            return 0;
        });
        return filteredProducts;
    }
    
     // Constructor function for products
     function Product(id, productName, category, description, price, img_url) {
        this.id = id;
        this.productName = productName;
        this.category = category;
        this.description = description;
        this.price = price;
        this.img_url = img_url;
    }

    renderProducts(products);
    // Add new product button functionality
    const addNewProductBtn = document.getElementById("addNewProductBtn");
    addNewProductBtn.addEventListener("click", function() {
        clearModal();
        const modal = new bootstrap.Modal(document.getElementById("addProductModal"));
        modal.show();
    });
    // Clear modal fields
    function clearModal() {
        document.getElementById("productName").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";
        document.getElementById("price").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("saveProductChangesBtn").dataset.id = "";
    }
    // Event listener for modal's "Save Changes" button
    document.getElementById("saveProductChangesBtn").addEventListener("click", function() {
        const id = this.dataset.id ? parseInt(this.dataset.id) : products.length + 1;
        const productName = document.getElementById("productName").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const img_url = document.getElementById("imageUrl").value;
        if (this.dataset.id) {
            // Edit existing product
            const index = products.findIndex(product => product.id === id);
            products[index] = {
                id: id,
                productName: productName,
                category: category,
                description: description,
                price: price,
                img_url: img_url
            };
        } else {
            // Add new product
            const newProduct = {
                id: id,
                productName: productName,
                category: category,
                description: description,
                price: price,
                img_url: img_url
            };
            products.push(newProduct);
        }
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts(products);
        clearModal();
        const modal = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
        modal.hide();
    });
    productTableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-btn")) {
            const productId = parseInt(event.target.dataset.id);
            const productName = products.find(product => product.id === productId).productName;
            const modalBody = document.getElementById("errorModalBody");
            modalBody.innerHTML = `<p>Are you sure you want to remove "${productName}"?</p>`;
            const removeButton = document.querySelector("#errorModal button.btn-secondary:last-child");
            removeButton.addEventListener("click", function() {
                removeProduct(productId);
            });
            const modal = new bootstrap.Modal(document.getElementById("errorModal"));
            modal.show();
        } else if (event.target.classList.contains("edit-btn")) {
            const productId = parseInt(event.target.dataset.id);
            editProduct(productId);
        }
    });
    // Edit product functionality
    function editProduct(productId) {
        const product = products.find(product => product.id === productId);
        if (product) {
            document.getElementById("productName").value = product.productName;
            document.getElementById("category").value = product.category;
            document.getElementById("description").value = product.description;
            document.getElementById("price").value = product.price;
            document.getElementById("imageUrl").value = product.img_url;
            document.getElementById("saveProductChangesBtn").dataset.id = productId;
            const modal = new bootstrap.Modal(document.getElementById("addProductModal"));
            modal.show();
        }
    }
    // Remove product functionality
    function removeProduct(productId) {
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts(products);
        }
    }
    // Sorting functionality
    let ascendingOrder = true; // Default sort order
    const sortButton = document.querySelector("[sorting]");
    sortButton.addEventListener("click", () => {
        try {
            products.sort((a, b) => ascendingOrder ? a.price - b.price : b.price - a.price);
            renderProducts(products);
            ascendingOrder = !ascendingOrder; // Toggle sort order
            sortButton.textContent = ascendingOrder ? "Sort by highest price" : "Sort by lowest price";
        } catch (error) {
            document.body.innerHTML += `<div class="alert alert-danger">Sorting failed. Please try again.</div>`;
        }
    });
    // Search functionality
    searchInput.addEventListener("input", function() {
        const query = this.value.trim();
        if (query === "") {
            renderProducts(products);
        } else {
            const filteredProducts = filterAndSortProducts(query);
            renderProducts(filteredProducts);
        }
    });
});
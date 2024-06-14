document.querySelector('[currentYear]').textContent = new Date().getUTCFullYear()

let checkoutItems = JSON.parse(localStorage.getItem("checkout")) || [];

function removeDuplicates() {
    const uniqueItems = [];
    const itemNames = new Set();

    checkoutItems.forEach(item => {
        if (!itemNames.has(item.productName)) {
            uniqueItems.push(item);
            itemNames.add(item.productName);
        }
    });

    checkoutItems = uniqueItems;
    localStorage.setItem("checkout", JSON.stringify(checkoutItems));
}


let spinnerWrapper = document.querySelector(".spinner-wrapper");
setTimeout(() => {
  spinnerWrapper.style.opacity = 0;
}, 400);


function displayCheckoutItems() {
    removeDuplicates(); 

    const checkoutTableBody = document.getElementById("checkoutTableBody");
    checkoutTableBody.innerHTML = "";
    let total = 0;
    checkoutItems.forEach((item, index) => {
        const row = document.createElement("tr");
        const itemTotalPrice = item.price * (item.quantity || 1); 
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.category}</td>
            <td><img src="${item.img_url}" alt="${item.productName}" width="100"></td>
            <td>${item.description}</td>
            <td>
                <input type="number" min="1" value="${item.quantity || 1}" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>R${itemTotalPrice.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>
        `;
        checkoutTableBody.appendChild(row);
        total += itemTotalPrice; 
    });
    const totalRow = document.createElement("tr");
    totalRow.classList.add("total-row");
    totalRow.innerHTML = `
        <td colspan="7">Total: R ${total.toFixed(2)}</td>
    `;
    checkoutTableBody.appendChild(totalRow);
}

function addItemToCart(product) {
    const existingItemIndex = checkoutItems.findIndex(item => item.productName === product.productName);
    if (existingItemIndex !== -1) {
        checkoutItems[existingItemIndex].quantity += 1;
    } else {
        checkoutItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("checkout", JSON.stringify(checkoutItems));
    displayCheckoutItems();
}

function removeItem(index) {
    checkoutItems.splice(index, 1);
    localStorage.setItem("checkout", JSON.stringify(checkoutItems));
    displayCheckoutItems();
}

function updateQuantity(index, quantity) {
    checkoutItems[index].quantity = parseInt(quantity);
    localStorage.setItem("checkout", JSON.stringify(checkoutItems));
    displayCheckoutItems();
}

displayCheckoutItems();

function payNow() {
    alert("Thank you for Purchasing!");
    checkoutItems = [];
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));
    displayCheckoutItems();
}

function clearCart() {
    checkoutItems = [];
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));
    displayCheckoutItems();
}

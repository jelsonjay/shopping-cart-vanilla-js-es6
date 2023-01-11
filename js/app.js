const allProducts = document.querySelector('.card-container');

// ======RENDER HTML COMPONENTS======
function renderProducts() {
	products.forEach(items => {
		const { id, price, date, comment, name, imgSrc, category } = items;
		allProducts.innerHTML += `
  
  <div class="card bag">
  <div class="body-img">
    <img src="${imgSrc}" class="pic" alt="${name}"/>
    <span class="category-title">${category}</span>
  </div>
  <div class="content">
    <div class="content-top">
      <span><i class="bx bxs-calendar"></i>${date}</span>
      <span><i class="bx bxs-comment"></i>${comment}</span>
    </div>
    <h2 class="product-title">${name}</h2>
    
     <span class="stars"></span>
    <div>
    <p class="product-price">£ ${price}</p>
    <div onclick="addToCart(${id})">
    <i class="bx bx-cart-add add-cart"></i>
    </div>
    </div>
 

  </div>
</div>
  
  `;
	});
}

renderProducts();

// =========OPEN & CLOSE CART========
const cartIcon = document.querySelector('.cart-icon');
const openCloseCart = document.querySelector('.cart-close');
const cart = document.querySelector('.cart');
const cartContent = document.querySelector('.cart-content');
const subTotal = document.querySelector('.total-price');
const totalItemInCart = document.querySelector('.cart-count');

// ======== ADD EVENTS =========
cartIcon.addEventListener('click', () => {
	cart.classList.add('active');
});
openCloseCart.addEventListener('click', () => {
	cart.classList.remove('active');
});

// =====EMPTY CART ARRAY & SAVE TO LOCAL STORAGE======
let newCartArray = JSON.parse(localStorage.getItem('cart-product')) || [];
updateCart();

// ========ADD TO CART=========
function addToCart(id) {
	if (newCartArray.some(elem => elem.id === id)) {
		updateUnitsNumbers('plus', id);
	} else {
		const data = products.find(product => product.id === id);
		newCartArray.push({ ...data, countOfUnits: 1 });
	}

	updateCart();
}
// ========UPDATE CART & RENDER=========
function updateCart() {
	renderCartItems();
	renderSubtotal();

	// ---SAVE CART PRODUCT TO LOCAL STORAGE---
	localStorage.setItem('cart-product', JSON.stringify(newCartArray));
}

// ======REMOVE PRODUCT FROM CART=======
function remove(id) {
	newCartArray = newCartArray.filter(item => item.id !== id);
	updateCart();
	console.log(id);
}

// ======CALCULATE TOTAL======
function renderSubtotal() {
	let totalPrice = 0,
		totalItems = 0;

	newCartArray.forEach(item => {
		totalPrice += item.price * item.countOfUnits;
		totalItems += item.countOfUnits;
	});
	subTotal.innerHTML = `Subtotal (${totalItems} items) £ ${totalPrice.toFixed(
		2
	)}`;

	totalItemInCart.innerHTML = totalItems;
}

// ========HANDLE EVENTS FUNCTIONS=======
function renderCartItems() {
	cartContent.innerHTML = '';
	newCartArray.forEach(item => {
		const { id, imgSrc, name, price, countOfUnits } = item;
		cartContent.innerHTML += `
      			<div class="cart-box">
							<img src="${imgSrc}" class="cart-img" alt=${name} />
							<div class="info">
								<div class="cart-product-title">${name}</div>
								<div class="cart-price">${price}</div>
							</div>
              <div class="counter-units">
              <div class="btn minus" onclick="updateUnitsNumbers('minus', ${id})">-</div>
              <div class="number">${countOfUnits}</div>
              <div class="btn plus" onclick="updateUnitsNumbers('plus', ${id})">+</div>
              </div>
							<i class="bx bxs-trash-alt cart-delete"
              onclick="remove(${id})"
              ></i>
						</div>

    `;
	});
}

// ========CHANGE NUMBERS UNITS=========
function updateUnitsNumbers(action, id) {
	newCartArray = newCartArray.map(item => {
		countOfUnits = item.countOfUnits;

		if (item.id === id) {
			if (action === 'minus' && countOfUnits > 1) {
				countOfUnits--;
			} else if (action === 'plus' && countOfUnits < item.instock) {
				countOfUnits++;
			}
		}
		return { ...item, countOfUnits };
	});
	console.log('clicou');
	updateCart();
}

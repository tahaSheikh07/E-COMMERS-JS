// JavaScript for E-Commerce Functionality

const slideImages = [
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjq_llZYhr2G_XPzcFRjxcStRgttfMjd9-wNoYIJO5U8F2Qa2o85376GoMaczpkSvJ3xU&usqp=CAU",
    "https://www.createwithnestle.ph/sites/default/files/srh_recipes/440a9c7206d782751c58f17fb1c798c9.jpg",
    "https://mapleleafhh.com/wp-content/uploads/Broiled-Beef-Burger-e1556647638183.jpg",
    "https://assets.unileversolutions.com/recipes-v2/163110.jpg"
  ];

  
  const products = [
    {
      id: "1",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "THE Doppler",
      price: 10.00,
    },
    {
      id: "2",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "Pentra RELOADED",
      price: 20.00,
    },
    {
      id: "3",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "ALL PAKISTANI DOUBLE CHEESE",
      price: 50.00,
    },
    {
      id: "4",
      image: "https://em-cdn.eatmubarak.pk/55018/dish_image/1693985158.jpg",
      productName: "Big Bang",
      price: 40.00,
    },
  ];
  
  let cart = {};
  
  function displaySlider() {
    const slider = document.getElementById('slider');
    slideImages.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      slider.appendChild(img);
    });
  }
  
  displaySlider();
  
  function createProductCard() {
    const productListContainer = document.querySelector('.product-list');
    products.forEach((product, index) => {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.productName}" />
          <h3>${product.productName}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${index})">Add to Cart</button>
        </div>
      `;
      productListContainer.innerHTML += productCard;
    });
  }
  
  createProductCard();
  
  function addToCart(index) {
    const product = products[index];
    if (cart[product.id]) {
      cart[product.id].qty += 1;
    } else {
      cart[product.id] = { ...product, qty: 1 };
    }
    renderCart();
  }
  
  function renderCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    let totalAmount = 0;
    for (const id in cart) {
      const { productName, price, qty } = cart[id];
      const itemTotal = price * qty;
      totalAmount += itemTotal;
      cartContainer.innerHTML += `
        <div class="cart-item">
          <span>${productName} - $${price.toFixed(2)} x ${qty} = $${itemTotal.toFixed(2)}</span>
          <button onclick="removeFromCart('${id}')">Remove</button>
        </div>
      `;
    }
    cartContainer.innerHTML += `<div class="cart-total">Total: $${totalAmount.toFixed(2)}</div>`;
    cartContainer.innerHTML += '<button onclick="placeOrder()">Place Order</button>';
  }
  
  function removeFromCart(id) {
    if (cart[id].qty > 1) {
      cart[id].qty -= 1;
    } else {
      delete cart[id];
    }
    renderCart();
  }
  
  function placeOrder() {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderPage = window.open('', '_blank');
    let orderDetails = '<h1>Your Order</h1><ul>';
    let totalAmount = 0;
  
    for (const id in cart) {
      const { productName, price, qty } = cart[id];
      const itemTotal = price * qty;
      totalAmount += itemTotal;
      orderDetails += `<li>${productName} - $${price.toFixed(2)} x ${qty} = $${itemTotal.toFixed(2)}</li>`;
    }
  
    orderDetails += `</ul><h2>Total: $${totalAmount.toFixed(2)}</h2>`;
    orderDetails += '<p>Thank you for your order!</p>';
    orderPage.document.write(orderDetails);
    orderPage.document.close();
    cart = {}; // Clear the cart after placing order
    renderCart();
  }
  
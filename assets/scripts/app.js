const products = [
  {
    title: 'Hewlett Packard OMEN 17.3" ',
    imageUrl: 'https://i.ebayimg.com/images/g/ltgAAOSwfvRfGB5f/s-l1600.jpg',
    price: 1589,
    description:
      'Hewlett Packard OMEN 17.3" Intel i7-10750H 16GB RAM 512GB SSD Gaming',
  },
  {
    title: 'MSI GL75 Leopard - 17.3"',
    imageUrl: 'https://i.ebayimg.com/images/g/UvMAAOSwkgNfDYgC/s-l1600.jpg',
    price: 1299,
    description:
      'MSI GL75 Leopard 10SFK-029 - 17.3" 144 Hz - Intel Core i7-10750H - GeForce Gamming',
  },
  {
    title: 'HP OMEN 17 (2020) - 17.3"',
    imageUrl: 'https://i.ebayimg.com/images/g/nmsAAOSwjZRfGB5e/s-l1600.jpg',
    price: 999,
    description:
      'HP OMEN 17 (2020) - 17.3" FHD - Intel Core i7-10750H - GeForce GTX 1660 Ti - 16 Gamming',
  },
  {
    title: 'Gigabyte Aorus 5 - 15.6" ',
    imageUrl: 'https://i.ebayimg.com/images/g/2r0AAOSw399exmEf/s-l1600.jpg',
    price: 999,
    description:
      'Gigabyte Aorus 5 - 15.6" 144 Hz - Intel Core i7-10750H - GeForce RTX 2060 - 16 Gamming',
  },
];

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

class ProductRender {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
    <div>
      <div class="product-item__image">
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
      </div>
      <div class="product-item__content">
        <h3>${this.product.title}</h3>
        <h4>\$${this.product.price}</h4>
        <p>${this.product.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
    `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductListRender {
  constructor(products) {
    this.products = products;
  }

  create() {
    return this.products.map(
      ({ title, imageUrl, description, price }) =>
        new Product(title, imageUrl, description, price)
    );
  }
  render() {
    const productsData = this.create();
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const key of productsData) {
      const productItem = new ProductRender(key);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class ShoppingCart {
  items = [];
  totalOutput;
  // solution1
  get totalAmount() {
    const sum = this.items.reduce((acc, item) => acc + item.price, 0);
    return sum;
  }
  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`;
  }
  // end solution1
  // solution2
  // set cartItems(value) {
  //   this.items = value;
  //   this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`;
  // }
  // addProduct(product) {
  //   const updatedItems = [...this.items];
  //   updatedItems.push(product);
  //   this.cartItems = updatedItems;
  // }
  // end solution2
  render() {
    const cartEl = document.createElement('section');
    cartEl.className = 'cart';
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order Now!</h2>
    `;
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class Shop {
  cart;
  constructor() {
    this.render();
  }
  render() {
    const renderHook = document.getElementById('app');
    this.cart = new ShoppingCart();
    console.log('cart - ', this.cart);
    const cartEl = this.cart.render();
    const productList = new ProductListRender(products);
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

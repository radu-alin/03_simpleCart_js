const productsData = [
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
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  hookId;
  constructor(renderHook, shouldRender = true) {
    this.hookId = renderHook;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

class ProductRender extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
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
  }
}

class ProductListRender extends Component {
  #products = [];
  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  renderProducts() {
    for (const key in this.#products) {
      new ProductRender(this.#products[key], 'prod-list');
    }
  }

  fetchProducts() {
    this.#products = productsData.map(
      ({ title, imageUrl, description, price }) =>
        new Product(title, imageUrl, description, price)
    );
    this.renderProducts();
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class ShoppingCart extends Component {
  items = [];
  constructor(renderHookId) {
    super(renderHookId);
  }

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
  // solution2 at the end of the script
  orderProducts() {
    if (this.items.length === 0)
      return alert('Your cart is empty please add products ro the cart');
    const confirmation = prompt(`You want to order this products?
    yes or no`);
    if (!confirmation) return;
    if (confirmation.toLowerCase() !== 'yes' || confirmation.toLowerCase() !== 'no')
      return alert("Please choose between 'yes' or 'no'");
    if (confirmation.toLowerCase() === 'yes') return alert('Thank you.');
    if (confirmation.toLowerCase() === 'no')
      return alert('I hove you will change youre mind.');
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order Now!</h2>
    `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', () => this.orderProducts());
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class Shop {
  cart;
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductListRender('app');
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

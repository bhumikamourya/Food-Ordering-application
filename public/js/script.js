// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()




// document.addEventListener('DOMContentLoaded', function () {
//     // DOM Elements
//     const categoryTabs = document.querySelectorAll('.category-tab');
//     const menuItemsContainer = document.querySelector('.menu-items');
//     const cartItemsContainer = document.querySelector('.cart-items');
//     const emptyCartMessage = document.querySelector('.empty-cart-message');
//     const checkoutBtn = document.querySelector('.checkout-btn');
//     const closeModalBtn = document.getElementById('close-modal');
//     const confirmationModal = document.getElementById('confirmation-modal');

//     // Event Listeners
//     categoryTabs.forEach(tab => {
//         tab.addEventListener('click', function () {
//             categoryTabs.forEach(t => t.classList.remove('active'));
//             this.classList.add('active');
//             filterMenuItems(this.textContent);
//         });
//     });

//     checkoutBtn.addEventListener('click', placeOrder);
//     closeModalBtn.addEventListener('click', closeModal);

//     // Initialize the page
//     renderMenuItems(menuItems);
//     renderCart();

//     // Functions
//     function filterMenuItems(category) {
//         if (category === "All Items") {
//             renderMenuItems(menuItems);
//         } else {
//             const filteredItems = menuItems.filter(item => item.category === category);
//             renderMenuItems(filteredItems);
//         }
//     }

//     function renderMenuItems(items) {
//         menuItemsContainer.innerHTML = '';

//         items.forEach(item => {
//             const menuItemElement = document.createElement('div');
//             menuItemElement.className = 'menu-item';
//             menuItemElement.innerHTML = `
//                         <img src="${item.image}" alt="${item.name}" class="item-image">
//                         <div class="item-details">
//                             <div class="item-name">${item.name}</div>
//                             <div class="item-description">${item.description}</div>
//                             <div class="item-footer">
//                                 <div class="item-price">$${item.price.toFixed(2)}</div>
//                                 <button class="add-to-cart" data-id="${item.id}">Add</button>
//                             </div>
//                         </div>
//                     `;
//             menuItemsContainer.appendChild(menuItemElement);
//         });

//         // Add event listeners to new Add buttons
//         document.querySelectorAll('.add-to-cart').forEach(button => {
//             button.addEventListener('click', addToCart);
//         });
//     }

//     function addToCart(e) {
//         const itemId = parseInt(e.target.getAttribute('data-id'));
//         const item = menuItems.find(item => item.id === itemId);

//         // Check if item already in cart
//         const existingItem = cart.find(cartItem => cartItem.id === itemId);

//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//             cart.push({
//                 id: item.id,
//                 name: item.name,
//                 price: item.price,
//                 quantity: 1
//             });
//         }

//         renderCart();
//     }

//     function renderCart() {
//         cartItemsContainer.innerHTML = '';

//         if (cart.length === 0) {
//             emptyCartMessage.style.display = 'block';
//         } else {
//             emptyCartMessage.style.display = 'none';

//             cart.forEach(item => {
//                 const cartItemElement = document.createElement('div');
//                 cartItemElement.className = 'cart-item';
//                 cartItemElement.innerHTML = `
//                             <div class="cart-item-details">
//                                 <div class="cart-item-name">${item.name}</div>
//                                 <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
//                             </div>
//                             <div class="cart-item-quantity">
//                                 <button class="quantity-btn minus" data-id="${item.id}">-</button>
//                                 <span>${item.quantity}</span>
//                                 <button class="quantity-btn plus" data-id="${item.id}">+</button>
//                             </div>
//                         `;
//                 cartItemsContainer.appendChild(cartItemElement);
//             });

//             // Add event listeners to quantity buttons
//             document.querySelectorAll('.quantity-btn.minus').forEach(button => {
//                 button.addEventListener('click', decreaseQuantity);
//             });

//             document.querySelectorAll('.quantity-btn.plus').forEach(button => {
//                 button.addEventListener('click', increaseQuantity);
//             });
//         }

//         updateSummary();
//     }

//     function decreaseQuantity(e) {
//         const itemId = parseInt(e.target.getAttribute('data-id'));
//         const itemIndex = cart.findIndex(item => item.id === itemId);

//         if (cart[itemIndex].quantity > 1) {
//             cart[itemIndex].quantity -= 1;
//         } else {
//             cart.splice(itemIndex, 1);
//         }

//         renderCart();
//     }

//     function increaseQuantity(e) {
//         const itemId = parseInt(e.target.getAttribute('data-id'));
//         const itemIndex = cart.findIndex(item => item.id === itemId);

//         cart[itemIndex].quantity += 1;

//         renderCart();
//     }

//     function updateSummary() {
//         const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//         const total = subtotal + deliveryFee;

//         document.querySelectorAll('.summary-row span')[0].nextElementSibling.textContent = `$${subtotal.toFixed(2)}`;
//         document.querySelectorAll('.summary-row span')[2].nextElementSibling.textContent = `$${total.toFixed(2)}`;
//     }

//     function placeOrder() {
//         if (cart.length === 0) {
//             alert('Your cart is empty. Please add some items before proceeding.');
//             return;
//         }

//         // Validate delivery info
//         const name = document.querySelector('.delivery-info input[type="text"]').value;
//         const address = document.querySelector('.delivery-info input[type="text"]:nth-of-type(2)').value;
//         const phone = document.querySelector('.delivery-info input[type="tel"]').value;

//         if (!name || !address || !phone) {
//             alert('Please fill in all delivery information fields.');
//             return;
//         }

//         // In a real app, you would send this data to your backend
//         console.log('Order placed:', {
//             items: cart,
//             customerInfo: { name, address, phone },
//             specialInstructions: document.querySelector('.instructions-textarea').value,
//             deliveryTime: document.querySelector('input[name="delivery-time"]:checked').value
//         });

//         // Show confirmation modal
//         confirmationModal.style.display = 'flex';

//         // Clear cart
//         cart = [];
//         renderCart();
//     }

//     function closeModal() {
//         confirmationModal.style.display = 'none';
//     }
// });

var stripe = Stripe('sk_test_I7gN9gxFTJRo07i6O4rjUlc000WPMU4tnB');

var checkoutButton = document.querySelector('#checkout-button');
checkoutButton.addEventListener('click', function () {
  stripe.redirectToCheckout({
    items: [{
      // Define the product and plan in the Dashboard first, and use the plan
      // ID in your client-side code.
      plan: 'plan_123',
      quantity: 1
    }],
    successUrl: 'https://www.example.com/success',
    cancelUrl: 'https://www.example.com/cancel'
  });
});
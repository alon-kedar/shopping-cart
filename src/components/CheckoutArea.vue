<script>
  export default {
    name: "CheckoutArea",
    template:     "<div>" +
    "<h1>Checkout Area</h1>" +
    '<div class="checkout-area">' +
    '<span> {{ cart | cartSize }} </span><i class="fa fa-shopping-cart"></i>' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th class="align-center">SKU</th>' +
    '<th>Name</th>' +
    '<th>Description</th>' +
    '<th class="align-right">Amount</th>' +
    '<th class="align-right">Price</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    '<tr v-for="product in cart">' +
    '<td class="align-center">{{ product.sku }}</td>' +
    '<td>{{ product.product }}</td>' +
    '<td>{{ product.description }}</td>' +
    '<td class="align-right">{{ product.quantity }}</td>' +
    '<td class="align-right">\t&#8362;{{ product.price }}</td>' +
    '</tr>' +
    //'<button @click="removeProduct(product)"> X </button></div>' +
    '<tr>' +
    '<td>&nbsp;</td>' +
    '<td>&nbsp;</td>' +
    '<td>&nbsp;</td>' +
    '<td>&nbsp;</td>' +
    '<td>&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td class="align-right">Subtotal:</td>' +
    '<td class="align-right"><h4 v-if="cartSubTotal != 0">&#8362;\t{{ cartSubTotal }} </h4></td>' +
    '</tr>' +
    '<tr>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td class="align-right">Tax:</td>' +
    '<td class="align-right"><h4 v-if="cartSubTotal != 0">&#8362;\t{{ cartTotal - cartSubTotal | fixed }} </h4></td>' +
    '</tr>' +
    '<tr>' +
    '<td></td>' +
    '<td></td>' +
    '<td></td>' +
    '<td class="align-right vert-bottom">Total:</td>' +
    '<td class="align-right vert-bottom"><h2 v-if="cartSubTotal != 0">&#8362;\t {{ cartTotal | fixed }} </h2></td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '<button v-show="cartSubTotal" @click="checkoutModal()">Checkout</button></div>' +
    "<div class='modalWrapper' v-show='data.showModal'>" +
    "<div class='overlay' @click='hideModal()'></div>" +
    "<div class='modal checkout'>" +
    "<i class='close fa fa-times' @click='hideModal()'></i>" +
    "<h1>Checkout</h1>" +
    "<div>We accept: <i class='fa fa-stripe'></i> <i class='fa fa-cc-visa'></i> <i class='fa fa-cc-mastercard'></i> <i class='fa fa-cc-amex'></i> <i class='fa fa-cc-discover'></i></div><br>" +
    "<h3> Subtotal: {{ cartSubTotal | fixed }} </h3>" +
    "<h3> Tax: {{ cartTotal - cartSubTotal | fixed }} </h3>" +
    "<h3> Total: {{ cartTotal | fixed }} </h3>" +
    "<br><div>This is where our payment processor goes</div>" +
    "</div>" +
    "</div>" +
    "</div>",

    props: ['data'],

    filters: {
      customPluralize: function (cart) {
        var newName;

        if (cart.quantity > 1) {
          newName = cart.product + "s";
          return newName;
        }

        return cart.product;
      },

      cartSize: function (cart) {
        var cartSize = 0;

        for (var i = 0; i < cart.length; i++) {
          cartSize += cart[i].quantity;
        }

        return cartSize;
      },

      fixed: function (val) {
        return val.toFixed(2)
      }
    },

    computed: {
      cart() {
        return this.data.cart
      },
      cartSubTotal() {
        return this.data.cartSubTotal
      },
      cartTotal() {
        return this.data.cartTotal
      }
    },

    methods: {
      removeProduct: function (product) {
        this.data.cart.splice(this.data.cart.findIndex(p => p.product === product.product), 1)
        this.data.cartSubTotal = this.data.cartSubTotal - (product.price * product.quantity);
        this.data.cartTotal = this.data.cartSubTotal + (this.data.tax * this.data.cartSubTotal);

        if (this.data.cart.length <= 0) {
          this.data.checkoutBool = false;
        }
      },

      checkoutModal: function () {
        var self = this;
        self.data.showModal = true;

        console.log("CHECKOUT", self.cartTotal);

      },

      hideModal: function () {
        //hide modal and empty modal data
        var self = this;
        self.data.showModal = false;
      }
    },

    //intercept the checkout request broadcast
    //run our function
    events: {
      "checkoutRequest": function () {
        var self = this;
        self.checkoutModal();
      }
    }
  }
</script>

<style scoped>

</style>

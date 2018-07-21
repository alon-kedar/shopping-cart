<script>
  export default {
    name: "Cart",
    template: '<div>' +
    '<div class="cart">' +
    '<span class="cart-size" @click="showCart = !showCart"> {{ cart | cartSize }} </span><i class="fa fa-shopping-cart" @click="showCart = !showCart"></i>' +
    '<div class="cart-items" v-show="showCart">' +
    '<table class="cartTable">' +
    '<tbody>' +
    '<tr class="product" v-for="product in cart" track-by="$index">' +
    '<td class="align-left"><div class="cartImage" @click="removeProduct(product)" v-bind:style="{ backgroundImage: \'url(\' + product.image + \')\' }" style="background-size: cover; background-position: center;"><i class="close fa fa-times"></i></div></td>' +
    '<td class="align-center"><button @click="quantityChange(product, \'decriment\')"><i class="close fa fa-minus"></i></button></td>' +
    '<td class="align-center">{{ product.quantity }}</td>' +
    '<td class="align-center"><button @click="quantityChange(product, \'incriment\')"><i class="close fa fa-plus"></i></button></td>' +
    '<td class="align-center">{{ product.product }}</td>' +
    '<td>&#8362;\t{{ product.price }}</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '<h4 class="cartSubTotal" v-show="showCart"> &#8362;\t{{ cartSubTotal }} : סה"כ</h4></div>' +
    '<button class="clearCart" v-show="checkoutBool" @click="clearCart()"> Clear Cart </button>' +
    '<button class="checkoutCart" v-show="checkoutBool" @click="propagateCheckout()"> Checkout </button>' +
    '</div>',


    props: ['data'],

    data: function () {
      return {
        showCart: false
      }
    },

    filters: {
      customPluralize: function (cart) {
        var newName;

        if (cart.quantity > 1) {
          if (cart.product === "Peach") {
            newName = cart.product + "es";
          } else if (cart.product === "Puppy") {
            newName = cart.product + "ies";
            newName = newName.replace("y", "");
          } else {
            newName = cart.product + "s";
          }

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
      }
    },

    computed: {
      cart() {
        return this.data.cart
      },
      cartSubTotal() {
        return this.data.cartSubTotal
      },
      checkoutBool() {
        return this.data.checkoutBool
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

      clearCart: function () {
        this.data.cart = [];
        this.data.cartSubTotal = 0;
        this.data.cartTotal = 0;
        this.data.checkoutBool = false;
        this.showCart = false;
      },

      quantityChange: function (product, direction) {
        var qtyChange;

        for (var i = 0; i < this.data.cart.length; i++) {
          if (this.data.cart[i].sku === product.sku) {

            var newProduct = this.data.cart[i];

            if (direction === "incriment") {
              newProduct.quantity = newProduct.quantity + 1;
              this.data.cart[i] = newProduct

            } else {
              newProduct.quantity = newProduct.quantity - 1;

              if (newProduct.quantity == 0) {
                this.data.cart.splice(this.data.cart.findIndex(p => p.product === product.product), 1)

              } else {
                this.data.cart[i] = newProduct;
              }
            }
          }
        }

        if (direction === "incriment") {
          this.data.cartSubTotal = this.data.cartSubTotal + product.price;

        } else {
          this.data.cartSubTotal = this.data.cartSubTotal - product.price;
        }

        this.data.cartTotal = this.data.cartSubTotal + (this.data.tax * this.data.cartSubTotal);

        if (this.data.cart.length <= 0) {
          this.data.checkoutBool = false;
        }
      },
      //send our request up the chain, to our parent
      //our parent catches the event, and sends the request back down
      propagateCheckout: function () {
        this.data.$dispatch("checkoutRequest");
      }
    }
  }
</script>

<style scoped>

</style>

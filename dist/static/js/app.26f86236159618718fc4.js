webpackJsonp([1],{0:function(t,a){},1:function(t,a){},2:function(t,a){},NHnr:function(t,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var c=o("7+uW"),e=o("Gu7T"),i=o.n(e),r=o("uXZL"),d=o.n(r);var s=o("VU/8")({name:"Cart",template:'<div><div class="cart"><span class="cart-size" @click="showCart = !showCart"> {{ cart | cartSize }} </span><i class="fa fa-shopping-cart" @click="showCart = !showCart"></i><div class="cart-items" v-show="showCart"><table class="cartTable"><tbody><tr class="product" v-for="product in cart" track-by="$index"><td class="align-left"><div class="cartImage" @click="removeProduct(product)" v-bind:style="{ backgroundImage: \'url(\' + product.image + \')\' }" style="background-size: cover; background-position: center;"><i class="close fa fa-times"></i></div></td><td class="align-center"><button @click="quantityChange(product, \'decriment\')"><i class="close fa fa-minus"></i></button></td><td class="align-center">{{ product.quantity }}</td><td class="align-center"><button @click="quantityChange(product, \'incriment\')"><i class="close fa fa-plus"></i></button></td><td class="align-center">{{ product | customPluralize }}</td><td>{{ product.price }}</td></tr></tbody></table></div><h4 class="cartSubTotal" v-show="showCart"> {{ cartSubTotal }} </h4></div><button class="clearCart" v-show="checkoutBool" @click="clearCart()"> Clear Cart </button><button class="checkoutCart" v-show="checkoutBool" @click="propagateCheckout()"> Checkout </button></div>',props:["data"],data:function(){return{showCart:!1}},filters:{customPluralize:function(t){return t.quantity>1?"Peach"===t.product?t.product+"es":"Puppy"===t.product?(t.product+"ies").replace("y",""):t.product+"s":t.product},cartSize:function(t){for(var a=0,o=0;o<t.length;o++)a+=t[o].quantity;return a}},computed:{cart:function(){return this.data.cart},cartSubTotal:function(){return this.data.cartSubTotal},checkoutBool:function(){return this.data.checkoutBool}},methods:{removeProduct:function(t){this.data.cart.$remove(t),this.data.cartSubTotal=this.data.cartSubTotal-t.price*t.quantity,this.data.cartTotal=this.data.cartSubTotal+this.data.tax*this.data.cartSubTotal,this.data.cart.length<=0&&(this.data.checkoutBool=!1)},clearCart:function(){this.data.cart=[],this.data.cartSubTotal=0,this.data.cartTotal=0,this.data.checkoutBool=!1,this.showCart=!1},quantityChange:function(t,a){for(var o=0;o<this.data.cart.length;o++)if(this.data.cart[o].sku===t.sku){var c=this.data.cart[o];"incriment"===a?(c.quantity=c.quantity+1,this.data.cart[o]=c):(c.quantity=c.quantity-1,0==c.quantity?this.data.cart.$remove(c):this.data.cart.$set(o,c))}this.data.cartSubTotal="incriment"===a?this.data.cartSubTotal+t.price:this.data.cartSubTotal-t.price,this.data.cartTotal=this.data.cartSubTotal+this.data.tax*this.data.cartSubTotal,this.data.cart.length<=0&&(this.data.checkoutBool=!1)},propagateCheckout:function(){this.data.$dispatch("checkoutRequest")}}},null,!1,function(t){o("qarI")},"data-v-6b4faed3",null).exports,n=o("mvHQ"),u=o.n(n),l={name:"Products",ready:function(){var t=this;document.addEventListener("keydown",function(a){t.showModal&&37==a.keyCode?t.changeProductInModal("prev"):t.showModal&&39==a.keyCode?t.changeProductInModal("next"):t.showModal&&27==a.keyCode&&t.hideModal()})},template:"<div><h1>Products</h1><div class='products'><div v-for='product in productsData' track-by='$index' :class='`product` + product.product'><img :src='product.image' width='200' height='200'><div class='image' @click='viewProduct(product)' v-bind:style='{ backgroundImage: \"url(\" + product.image + \")\" }' style='background-size: cover; background-position: center;'></div><div class='name'>{{ product.product }}</div><div class='description'>{{ product.description }}</div><div class='price'>{{ product.price }}</div><button @click='addToCart(product)'>Add to Cart</button><br><br></img></div></div><div class='modalWrapper' v-show='showModal'><div class='prevProduct' @click='changeProductInModal(\"prev\")'><i class='fa fa-angle-left'></i></div><div class='nextProduct' @click='changeProductInModal(\"next\")'><i class='fa fa-angle-right'></i></div><div class='overlay' @click='hideModal()'></div><div class='modal'><i class='close fa fa-times' @click='hideModal()'></i><div class='imageWrapper'><div class='image' v-bind:style='{ backgroundImage: \"url(\" + modalData.image + \")\" }' style='background-size: cover; background-position: center;' v-on:mouseover='imageMouseOver($event)' v-on:mousemove='imageMouseMove($event)' v-on:mouseout='imageMouseOut($event)'></div></div><div class='additionalImages' v-if='modalData.images'><div v-for='image in modalData.images' class='additionalImage' v-bind:style='{ backgroundImage: \"url(\" + image.image + \")\" }' style='background-size: cover; background-position: center;' @click='changeImage(image.image)'></div></div><div class='name'>{{ modalData.product }}</div><div class='description'>{{ modalData.description }}</div><div class='details'>{{ modalData.details }}</div><h3 class='price'>{{ modalData.price }}</h3><label for='modalAmount'>QTY</label><input id='modalAmount' v-model='modalAmount' class='amount' @keyup.enter='modalAddToCart(modalData), hideModal()'/><button @click='modalAddToCart(modalData), hideModal()'>Add to Cart</button></div></div></div>",props:["data"],data:function(){return{showModal:!1,modalData:{},modalAmount:1,timeout:"",mousestop:""}},computed:{productsData:function(){return this.data.productsData}},methods:{addToCart:function(t){for(var a=!1,o=0;o<this.data.cart.length;o++)if(this.data.cart[o].sku===t.sku){var c=this.data.cart[o];c.quantity=c.quantity+1,console.log(this.data.cart),this.data.cart.$set(o,c),a=!0;break}a||(t.quantity=1,this.data.cart.push(t)),this.data.cartSubTotal=this.data.cartSubTotal+t.price,this.data.cartTotal=this.data.cartSubTotal+this.data.tax*this.data.cartSubTotal,this.data.checkoutBool=!0},modalAddToCart:function(t){for(var a=0;a<this.modalAmount;a++)this.addToCart(t);this.modalAmount=1},viewProduct:function(t){this.modalData=JSON.parse(u()(t)),this.showModal=!0},changeProductInModal:function(t){var a,o=this.data.productsData.length,c=this.modalData.sku;"next"===t?(a=c+1,c>=o&&(a=1)):"prev"===t&&0===(a=c-1)&&(a=o);for(var e=0;e<o;e++)this.data.productsData[e].sku===a&&this.viewProduct(this.data.productsData[e])},hideModal:function(){this.modalData={},this.showModal=!1},changeImage:function(t){this.modalData.image=t},imageMouseOver:function(t){t.target.style.transform="scale(2)"},imageMouseMove:function(t){t.target.style.transform="scale(2)",this.timeout=setTimeout(function(){t.target.style.transformOrigin=(t.pageX-t.target.getBoundingClientRect().left)/t.target.getBoundingClientRect().width*100+"% "+(t.pageY-t.target.getBoundingClientRect().top-window.pageYOffset)/t.target.getBoundingClientRect().height*100+"%"},50),this.mouseStop=setTimeout(function(){t.target.style.transformOrigin=(t.pageX-t.target.getBoundingClientRect().left)/t.target.getBoundingClientRect().width*100+"% "+(t.pageY-t.target.getBoundingClientRect().top-window.pageYOffset)/t.target.getBoundingClientRect().height*100+"%"},100)},imageMouseOut:function(t){t.target.style.transform="scale(1)"}}};var h=o("VU/8")(l,null,!1,function(t){o("g5kl")},"data-v-7e9d0db4",null).exports,p={name:"CheckoutArea",template:'<div><h1>Checkout Area</h1><div class="checkout-area"><span> {{ cart | cartSize }} </span><i class="fa fa-shopping-cart"></i><table><thead><tr><th class="align-center">SKU</th><th>Name</th><th>Description</th><th class="align-right">Amount</th><th class="align-right">Price</th></tr></thead><tbody><tr v-for="product in cart"><td class="align-center">{{ product.sku }}</td><td>{{ product.product }}</td><td>{{ product.description }}</td><td class="align-right">{{ product.quantity }}</td><td class="align-right">{{ product.price | currency }}</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td></td><td></td><td></td><td class="align-right">Subtotal:</td><td class="align-right"><h4 v-if="cartSubTotal != 0"> {{ cartSubTotal | currency }} </h4></td></tr><tr><td></td><td></td><td></td><td class="align-right">Tax:</td><td class="align-right"><h4 v-if="cartSubTotal != 0"> {{ cartTotal - cartSubTotal | currency }} </h4></td></tr><tr><td></td><td></td><td></td><td class="align-right vert-bottom">Total:</td><td class="align-right vert-bottom"><h2 v-if="cartSubTotal != 0"> {{ cartTotal | currency }} </h2></td></tr></tbody></table><button v-show="cartSubTotal" @click="checkoutModal()">Checkout</button></div>'+"<div class='modalWrapper' v-show='showModal'><div class='overlay' @click='hideModal()'></div><div class='modal checkout'><i class='close fa fa-times' @click='hideModal()'></i><h1>Checkout</h1><div>We accept: <i class='fa fa-stripe'></i> <i class='fa fa-cc-visa'></i> <i class='fa fa-cc-mastercard'></i> <i class='fa fa-cc-amex'></i> <i class='fa fa-cc-discover'></i></div><br><h3> Subtotal: {{ cartSubTotal | currency }} </h3><h3> Tax: {{ cartTotal - cartSubTotal | currency }} </h3><h3> Total: {{ cartTotal | currency }} </h3><br><div>This is where our payment processor goes</div></div></div></div>",props:["data"],data:function(){return{showModal:!1}},filters:{customPluralize:function(t){return t.quantity>1?t.product+"s":t.product},cartSize:function(t){for(var a=0,o=0;o<t.length;o++)a+=t[o].quantity;return a},currency:function(t){return t+"shekel69"}},computed:{cart:function(){return this.data.cart},cartSubTotal:function(){return this.data.cartSubTotal},cartTotal:function(){return this.data.cartTotal}},methods:{removeProduct:function(t){this.data.cart.$remove(t),this.data.cartSubTotal=this.data.cartSubTotal-t.price*t.quantity,this.data.cartTotal=this.data.cartSubTotal+this.data.tax*this.data.cartSubTotal,this.data.cart.length<=0&&(this.data.checkoutBool=!1)},checkoutModal:function(){this.showModal=!0,console.log("CHECKOUT",this.cartTotal)},hideModal:function(){this.showModal=!1}},events:{checkoutRequest:function(){this.checkoutModal()}}};var g=o("VU/8")(p,null,!1,function(t){o("g2PS")},"data-v-1f6bbf80",null).exports,v=(o("o/zv"),{name:"App",components:{Cart:s,Products:h,CheckoutArea:g},data:function(){return{data:{productsData:[],checkoutBool:!1,cart:[],cartSubTotal:0,tax:.065,cartTotal:0}}},methods:{getProductsFromExcel:function(t){var a=new XMLHttpRequest;a.open("GET","static/Prod.xls",!0),a.responseType="blob",a.onload=function(){var o=new FileReader;console.log(a.response),o.readAsBinaryString(a.response),o.onload=function(a){var o,c,e,r;o=a.target.result,c=d.a.read(o,{type:"binary"}),e=c.Sheets[c.SheetNames[0]],r=d.a.utils.sheet_to_json(e,{header:!0}),console.log(r),t.push.apply(t,i()(r.map(function(t,a){return{sku:a,image:"static/images/"+t.product+".jpg",product:t.product,price:t.price,description:t.name,details:t.name}}))),console.log(t)}},a.send()}},mounted:function(){this.getProductsFromExcel(this.data.productsData)}}),m={render:function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",{staticClass:"main-wrapper"},[t._m(0),t._v(" "),o("div",{attrs:{id:"vue"}},[o("cart",{attrs:{data:t.data}}),t._v(" "),o("products",{attrs:{data:t.data}}),t._v(" "),t.data.checkoutBool?o("checkout-area",{attrs:{data:t.data}}):t._e()],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"header"},[a("h1",[this._v("Vue Shopping Cart")])])}]};var f=o("VU/8")(v,m,!1,function(t){o("qz+Q")},null,null).exports;c.a.config.productionTip=!1,new c.a({el:"#app",components:{App:f},template:"<App/>"})},g2PS:function(t,a){},g5kl:function(t,a){},qarI:function(t,a){},"qz+Q":function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.26f86236159618718fc4.js.map
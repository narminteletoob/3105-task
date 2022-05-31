var bus = new Vue();
Vue.component('item', {
    template: '\
  <div id="product-box">\
    <img :src=productData.img>\
    <div id="add" @click="handleClick()">+</div>\
    <h3>{{productData.name}}</h3>\
    <h4>{{productData.price | formatMoney}}</h4>\
  </div>',
    props: ['productData'],
    methods: {
        handleClick: function() {
            bus.$emit('plus', this.productData.price);
        }
    },
    filters: {
        formatMoney: function(value) {
            return "$" + value;
        }
    }
});

Vue.component('cart', {
    template: '\
  <div id="cart-box">\
    <img src="https://www.iconninja.com/files/367/299/607/commerce-cart-shopping-cart-ecommerce-shopping-basket-buy-icon.png">\
    <div id="cart-count">{{total | formatMoney}}</div>\
  </div>',
    data: function() {
        return {
            total: 0
        }
    },
    mounted: function() {
        var _this = this;
        bus.$on('plus', function(d) {
            console.log(d);
            _this.total += d;
        });
    },
    filters: {
        formatMoney: function(value) {
            return "$" + value;
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        products: [{
                name: 'alma',
                price: 10,
                img: 'https://www.iconninja.com/files/757/476/966/apple-fruit-icon.png'
            },
            {
                name: 'banan',
                price: 15,
                img: 'https://www.iconninja.com/files/914/740/949/banana-fruit-icon.png'
            },
            {
                name: 'portaghal',
                price: 20,
                img: 'https://www.iconninja.com/files/876/574/490/orange-fruit-icon.png'
            }
        ]
    }
});
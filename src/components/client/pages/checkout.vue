<template>
  <div class="bg-light">
    <div class="container mb-5">
      <div class="py-5 text-center">
        <h2 class="bg-dark text-light d-inline-block p-3"><i class="fas fa-film"></i></h2>
      </div>
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4 border-left ">
          <ul class="list-group mb-3">
            <li v-for="item in cart.carts" :key="item.id"
              class="list-group-item d-flex justify-content-between lh-condensed">
              <span class="text-dark">
                <i class="far fa-trash-alt" @click="removeCart(item.id)"></i>
                <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              </span>
              <div>
                <h6 class="my-0 text-info">{{item.product.title}}</h6>
                <span class="text-success" style="font-size: 0.5rem" v-if="item.coupon">已套用優惠券</span>
              </div>
              <span v-if="item.product.price" class="text-dark">{{item.product.price * item.qty | currencyFilter}}</span>
              <span v-if="!item.product.price" class="text-dark">{{item.product.origin_price * item.qty | currencyFilter}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <div class="ml-auto h6">
                <span class="text-dark">總計</span>
                <span class="text-secondary"><small>TWD</small></span>
                <strong>{{cart.total | currencyFilter}}</strong>
              </div>
              <div v-if="cart.final_total !== cart.total" class="ml-auto h6">
                <span class="text-success">折扣價</span>
                <span class="text-secondary"><small>TWD</small></span>
                <strong class="text-success">{{cart.final_total | currencyFilter}}</strong>
              </div>
            </li>
          </ul>
          <form class="card p-2">
            <div class="input-group">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="輸入優惠券代碼">
              <div class="input-group-append">
                <button class="btn btn-secondary" 
                  @click="addCouponCode(coupon_code)">套用優惠券
                  <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
                </button>
              </div>
            </div>
          </form>
          <div class="back mt-3 text-right" @click="goBack">
            <span class="btn btn-outline-info btn-sm">  <i class="fas fa-angle-double-left"></i> 我要繼續逛 </span>
          </div>
        </div>

        <div class="col-md-8 order-md-1">
          <div class="container">
            <h4 class="mb-3 text-dark font-weight-normal">付款人資訊</h4>
            <form class="needs-validation" @submit.prevent="creatOrder">
              <div class="mb-3">
                <label for="username" class="text-dark lead">*姓名</label>
                <input type="text" class="form-control" name="username" id="username" placeholder="姓名" 
                  v-model="form.user.name"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('username')}">
                <span class="text-danger" v-if="errors.has('username')">
                  請輸入姓名
                </span>
              </div>

              <div class="mb-3">
                <label for="email" class="text-dark lead">*Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="請輸入Email"
                  v-model="form.user.email"
                  v-validate="'required|email'"
                  :class="{'is-invalid': errors.has('email')}">
                <span class="text-danger" v-if="errors.has('email')"> 
                  {{ errors.first('email') }}
                </span>
              </div>

              <div class="mb-3">
                <label for="address" class="text-dark lead">發票收件地址</label>
                <input type="text" class="form-control" name="address" id="address" placeholder="請填入收件地址"
                  v-model="form.user.address"
                  v-validate="'required'"
                >
              </div>

              <div class="mb-3">
                <label for="tel" class="text-dark lead">*手機號碼</label>
                <input type="text" class="form-control" id="tel" placeholder="請填入手機號碼"
                  v-model="form.user.tel"  
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('address')}">
                <span class="text-danger" v-if="errors.has('address')">
                  請輸入手機號碼
                </span>
              </div>

              <div class="form-group mb-3">
                <label for="message" class="text-dark">備註</label>
                <textarea class="form-control" name="message" id="message" 
                  cols="3" rows="3" v-model="form.message"></textarea>
              </div>
              <button class="btn btn-secondary btn-block">下一步: 完成付款</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Alert></Alert>
    <Footer></Footer>
  </div>
</template>

<script>
  import Alert from '../../AlertMsg'
  import Footer from '../footer'
  export default {
    components: {
      Footer,
      Alert
    },
    data() {
      return {
        cart: {},
        cartTotal: 0,
        coupon_code: '',
        isLoading: false,
        form: {
          user: {},
          message: ''
        }
      }
    },
    methods: {
      getCart() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        this.$http.get(api).then((response) => {
          this.cart = response.data.data;
          this.cartTotal = this.cart.carts.length;
        })
      },
      addCouponCode(code) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const coupon = {code: code};
        this.isLoading = true;
        this.$http.post(api, {data: coupon}).then((response) => {
          if(response.data.success) {
            this.getCart();
            this.isLoading = false;
            this.$bus.$emit('message-push', response.data.message, 'success');
          } else {
            this.getCart();
            this.isLoading = false;
            this.$bus.$emit('message-push', response.data.message, 'danger');
          }
        });
      },
      removeCart(id) {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/cart/${id}`;
        this.isLoading = true;
        this.$http.delete(api).then((response) => {
          this.getCart();
          this.isLoading = false;
        });
      },
      creatOrder() {
        const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/order`;
        const order = this.form;
        this.$validator.validate().then(result => {
          if (result) {
            this.$http.post(api, {data: order}).then((response) => {
              if(response.data.success) {
                this.$bus.$emit('message-push', response.data.message, 'success');
                this.$router.push(`/pay/${response.data.orderId}`);
              }
            })
          } else {
            this.$bus.$emit('message-push', '請再次確認表單是否填寫正確', 'danger');
          }
        });
      },
      goBack() {
        this.$router.push('/');
      },
    },
    created() {
      this.getCart();
    },
    mounted() {
      document.documentElement.scrollTop = 0;
    }
  }
</script>


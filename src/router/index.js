import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import CustomerOrder from '@/components/pages/CustomerOrders'
import CustomerCheckout from '@/components/pages/CustomerCheckout'
import Home from '@/components/client/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout
        }
      ],
    }, 
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [

      ],
    }
  ]
})
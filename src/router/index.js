import Vue from 'vue'
import VueRouter from 'vue-router'
import { isSignedIn, signOut } from '../auth'
import navbar from '../components/Navbar.vue'
import login from '../views/Login.vue'
import avisaEmail from '../views/AvisaEmail.vue'
import verificaEmail from '../views/VerificaEmail.vue'
import esqueciSenha from '../views/EsqueciSenha.vue'
import itens from '../views/Items.vue'
import listUser from '../views/ListUser.vue'
import peopleEdit from '../views/PeopleEdit.vue'
import peopleNew from '../views/PeopleNew.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    components: { default: login },
    beforeEnter (_, __, next) { // Impede usuários assinados de
      signOut()
      if (!isSignedIn()) { // acessar a página de login.
        next()
        return
      }
      next('/home')
    }
  },
  {
    path: '/home',
    name: 'home',
    components: { default: listUser, header: navbar },
    beforeEnter (_, __, next) { // Impede usuários não assinados
      if (isSignedIn()) { // de acessar a página Home.
        next()
        return
      }
      next('/')
    }
  },
  {
    path: '/avisaEmail',
    name: 'avisaEmail',
    components: { default: avisaEmail }
    // beforeEnter (_, __, next) { // Impede usuários não assinados
    //   if (isSignedIn()) { // de acessar a página Home.
    //     next()
    //     return
    //   }
    //   next('/')
    // }
  },
  {
    path: '/verificaEmail',
    name: 'verificaEmail',
    components: { default: verificaEmail }
    // beforeEnter (_, __, next) { // Impede usuários não assinados
    //   if (isSignedIn()) { // de acessar a página Home.
    //     next()
    //     return
    //   }
    //   next('/')
    // }
  },
  {
    path: '/esqueciSenha',
    name: 'esqueciSenha',
    components: { default: esqueciSenha }
    // beforeEnter (_, __, next) { // Impede usuários não assinados
    //   if (isSignedIn()) { // de acessar a página Home.
    //     next()
    //     return
    //   }
    //   next('/')
    // }
  },
  {
    path: '/itens',
    name: 'itens',
    components: { default: itens, header: navbar },
    beforeEnter (_, __, next) { // Impede usuários não assinados
      if (isSignedIn()) { // de acessar a página Home.
        next()
        return
      }
      next('/')
    }
  },
  {
    path: '/peopleNew',
    name: 'peopleNew',
    components: { default: peopleNew, header: navbar }
  },
  {
    path: '/peopleEdit',
    name: 'peopleEdit',
    components: { default: peopleEdit, header: navbar },
    beforeEnter (_, __, next) { // Impede usuários não assinados
      if (isSignedIn()) { // de acessar a página Home.
        next()
        return
      }
      next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

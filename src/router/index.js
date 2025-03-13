import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignIn from '@/views/Signin.vue'
import Join from '@/views/Join.vue'
import Main from '@/views/Main.vue'
import Profile from '@/components/Profile.vue'
import Left from '@/components/Leftsidebar.vue'
import Right from '@/components/Rightsidebar.vue'
import message from '@/components/Message.vue'
import Chat from '@/components/chat.vue'
import PrivateMessage from '@/components/PrivateMessage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '',
          name: 'normal',
          components: {
            default: Main,
            LeftSidebar: Left,
            Middle: message,
            RightSidebar: Right,

          }
        },
        {
          path: '/user',
          name: 'user',
          components: {
            LeftSidebar: Left,
            Middle: Profile,
            RightSidebar: Right,

          },
          props: true,
          authRequired:false,
        },
        {
          path: '/user/:userId',
          name: 'use',
          components: {
            LeftSidebar: Left,
            Middle: PrivateMessage,
            RightSidebar: Chat,
          },
          props: true,
          authRequired:false,
        },
      ]
    }
  ],
})

export default router

<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Talk
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.name }} | </b-nav-text>
      <b-nav-item href="#" active @click="onLogout">Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: 'chat-navbar',
    computed: {
        ...mapState(['user', 'reconnect'])
    },
    methods: {
      ...mapActions(['login', 'logout']),
      ...mapMutations(['setReconnect']),
      onLogout(){
        this.$router.push({
          path: '/'
        })
        this.logout()
      },
      unload(){
        if(this.user.username){
          this.setReconnect(true)
        }
      }
    },
    mounted(){
      window.addEventListener('beforeunload', this.unload)
      if(this.reconnect){
        this.login(this.user.username)
      }
    }
}
</script>

<style>
  #chat-navbar {
    margin-bottom: 15px;
  }
</style>

<template>
  <header>
    <div class="title" @click="$router.push('/')">
      Rotten Potatoes
    </div>
    <div class="actions">
      <button
        v-if="!user.isLogged"
        @click="loginModalOpen = true"
      >
        Login
      </button>
      <div v-else class="user-name">
        Seja bem vindo {{ user.data.name }}
      </div>
    </div>
  </header>

  <RouterView />
  <LoginModal v-model:modelValue="loginModalOpen"/>
</template>
<script>
import { ref } from 'vue'
import { useUserStore } from './stores/user'
import LoginModal from './components/LoginModal.vue'

export default {
  components: {
    LoginModal
  },
  setup() {
    const userStore = useUserStore()
    const loginModalOpen = ref(false)
    return { userStore, loginModalOpen }
  },
  computed: {
    user() {
      return { 
        isLogged: this.userStore.isLogged,
        data: this.userStore.user
      }
    }
  }
}
</script>
<style lang="scss" scoped>

header {
  .actions {
    display: flex;
    align-items: center;
    .user-name {
      color: #fff;
    }
  }

  .title {
    font-family: 'Island Moments' !important;
    font-size: 3rem;
    font-weight: bold;
    cursor: pointer;
    color: #09cc77;
  }
  background-color: #2f2841;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  button {
    padding: 1rem;
    font-size: 1rem;
    width: 150px;
    font-weight: bold;
    background-color: #00ff88;
    border: 1px solid #7C8596;
    color: #2b134b;
    background: #00ff88;
    cursor: pointer;
    box-shadow: 0px 10px 40px -12px #00ff8052;
    border-radius: 1rem;
    cursor: pointer;
  }
}
</style>
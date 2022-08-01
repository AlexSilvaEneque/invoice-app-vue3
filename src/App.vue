<script setup>
  import Navigation from './components/Navigation.vue'
  import InvoiceModal from './components/InvoiceModal.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const invoice = computed(() => store.state.invoiceModal)

</script>

<template>
  <div class="main-content">
    <Navigation />
    <div class="content-body">
      <transition name="invoice">
        <InvoiceModal v-if="invoice" />
      </transition>      
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .main-content {
    display: flex;
    background-color: #1e2131;
    height: 100vh;
    
    .content-body {      
      position: relative;
      
      width: 1000px;
      margin: 0 auto;
      padding: 1rem;

      @media(max-width: 1024px) {
        width: 700px;
      }

      @media(max-width: 728px) {
        width: 500px;
      }      
    }

    // Animated invoice
    .invoice-enter-active,
    .invoice-leave-active {
      transition: .7s ease all;
    }

    .invoice-enter-from,
    .invoice-leave-to {
      transform: translateX(-700px);
    }

  }
</style>

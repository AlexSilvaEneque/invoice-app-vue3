<script setup>
  import Navigation from './components/Navigation.vue'
  import InvoiceModal from './components/InvoiceModal.vue'
  import Modal from './components/Modal.vue'
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const invoice = computed(() => store.state.invoiceModal)
  const modal = computed(() => store.state.modalActive)
  const invoiceLoaded = computed(() => store.state.invoicesLoaded)

  onMounted(() => {
    store.dispatch('getInvoices')
  })

</script>

<template>
  <div class="main-content" v-if="invoiceLoaded">
    <Navigation />
    <Modal v-if="modal" />
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
    // background-color: #1e2131;
    background-color: rgb(22, 21, 35);
    min-height: 100vh;
    
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
  .paid {
      &::before {
        background-color: #33d69f;
      }
      color: #33d69f;
      background-color: rgba(51, 214, 160, .1);
    }

    .pending {
      &::before {
        background-color: #ffbf00;
      }
      color: #ffbf00;
      background-color: rgba(255, 145, 0, .1);
    }

    .draft {
      &::before {
        background-color: #dfe3fa;
      }
      color: #dfe3fa;
      background-color: rgba(223, 227, 250, .1);
    }
</style>

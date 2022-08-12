<script setup>
    // import store from '../store/index.js'
    import { computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()

    const editInvoice = computed(() => store.state.editInvoice)

    const closeModal = () => {
        store.dispatch('changeModal')
    }

    const closeInvoice = () => {
        store.dispatch('change')
        store.dispatch('changeModal')
        console.log(editInvoice.value)
        // if (editInvoice) {
        //     store.dispatch('toggleEditInvoice')
        // }        
    }    
    
</script>

<template>
    <div class="modal">
        <div class="modal-content">
            <p>Are you sure you want to exit? Your changes will not be saved?</p>
            <div class="actions">
                <button @click="closeModal" class="cancel">Cancel</button>
                <button @click="closeInvoice" class="close">Close</button>
            </div>
        </div>
    </div>    
</template>

<style lang="scss" scoped>
    .modal {
        z-index: 100;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;

        .modal-content {
            border-radius: 20px;
            padding: 48px 32px;
            max-width: 450px;
            background-color: #252945;
            color: #eee;

            p {
                text-align: center;
            }

            .actions {
                display: flex;
                margin-top: 24px;                

                button {
                    flex: 1;
                    border: none;
                    border-radius: 2rem;
                    height: 50px;
                    width: 10%;
                    color: #eee;
                    font-size: 17px;
                    cursor: pointer;
                }

                .cancel {
                    background-color: rgb(89, 67, 179);
                    margin-right: .5rem;
                }

                .close {
                    background-color: rgb(162, 73, 69);
                }
            }
        }
    }
</style>
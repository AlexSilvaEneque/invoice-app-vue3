<script setup>
    import { computed, onMounted, ref, watchEffect } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute, useRouter } from 'vue-router'

    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = ref([])
    const currentInvoiceArray = computed(() => store.state.currentInvoiceArray)
    const editInvoice = computed(() => store.state.editInvoice)

    const getCurrentInvoice = () => {
        store.commit('setCurrentInvoice', route.params.invoiceId) // mutation
    }

    const toggleEditInvoice = () => {
        store.commit('toggleEditInvoice')
        
        store.dispatch('change') // action
    }

    const deleteInvoice = async (id) => {
        store.dispatch('deleteInvoice', id)
        router.push({ name: 'Home' })
    }

    const updateStatusPaid = (id) => {
        store.dispatch('updateToPaid', id)
    }

    const updateStatusToPending = (id) => {
        store.dispatch('updateToPending', id)
    }

    watchEffect(() => {
        if (!editInvoice.value) {
            data.value = currentInvoiceArray.value[0]
        }
    })

    onMounted(() => {
        getCurrentInvoice()
        data.value = currentInvoiceArray.value[0]        
    })

</script>

<template>
    <div v-if="data" class="invoice-container">
        <router-link class="nav-link" :to="{ name: 'Home' }">
            <font-awesome-icon icon="fa-solid fa-angle-left" class="i" /><span>Go Back</span>
        </router-link>
        <!-- Header -->
        <div class="header">
            <div class="left">
                <span>Status</span>
                <div class="status-button"
                    :class="{
                        paid: data.invoicePaid,
                        draf: data.invoiceDraft,
                        pending: data.invoicePending
                    }"
                >
                    <span v-if="data.invoicePaid">Paid</span>
                    <span v-if="data.invoiceDraft">Draft</span>
                    <span v-if="data.invoicePending">Pending</span>
                </div>                
            </div>
            <div class="right">
                <button
                    @click="toggleEditInvoice"
                    class="button-edit"
                >Edit</button>
                <button
                    @click="deleteInvoice(data.docId)"
                    class="delete"
                >Delete</button>
                <button
                    v-if="data.invoicePending"
                    @click="updateStatusPaid(data.docId)"
                    class="button-mark"
                >Mark as Paid</button>
                <button
                    v-if="data.invoiceDraft || data.invoicePaid"
                    @click="updateStatusToPending(data.docId)"
                    class="button-pending"
                >Mark as Pending</button>
            </div>
        </div>
        <!-- Invoice Details -->
        <div class="invoice-details">
            <div class="top">
                <div class="left">
                    <p class="id"><span>#</span>{{ data.invoiceId }}</p>
                    <p>{{ data.productDescription }}</p>
                </div>
                <div class="right">
                    <p>{{ data.billerStreetAddress }}</p>
                    <p>{{ data.billerCity }}</p>
                    <p>{{ data.billerZipCode }}</p>
                    <p>{{ data.billerCountry }}</p>
                </div>
            </div>
            <div class="middle">
                <div class="payment">
                    <h4>Invoice Date</h4>
                    <p>{{ data.invoiceDate }}</p>
                    <h4>Payment Date</h4>
                    <p>{{ data.paymentDueDate }}</p>
                </div>
                <div class="bill">
                    <h4>Bill To</h4>
                    <p>{{ data.clientName }}</p>
                    <p>{{ data.clientAddress }}</p>
                    <p>{{ data.clientCity }}</p>
                    <p>{{ data.clientZipCode }}</p>
                    <p>{{ data.clientCountry }}</p>
                </div>
                <div class="send-to">
                    <h4>Sent to</h4>
                    <p>{{ data.clientEmail }}</p>
                </div>
            </div>
            <div class="bottom">
                <div class="billing-items">
                    <div class="heading">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div v-for="(item, index) in data.invoiceItems" :key="index"
                        class="item"
                    >
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>
                <div class="total">
                    <p>Amount Due</p>
                    <p>{{ data.invoiceTotal }}</p>
                </div>                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .invoice-container {
        // height: 90vh;
        padding-top: 2.5rem;
        // padding-bottom: 2.5rem;
        color: #eee;

        .nav-link {
            text-decoration: none;
            
            span {
                color: #eee;
                margin-left: 7px;
            }
        }

        .header {
            background-color: rgb(30, 33, 57);           
            display: flex;
            margin-top: 1.5rem;
            height: 80px;
            align-items: center;
            border-radius: 12px;

            .left {
                flex: 1;
                padding-left: 25px;
                .status-button {
                    display: inline;

                    padding: 6px 30px;
                    border-radius: 8px;
                    margin-left: .7rem;
                }
            }

            .right {
                flex: 1;
                display: flex;
                justify-content: flex-end;
                padding-right: 30px;

                button {
                    height: 40px;
                    border: none;
                    border-radius: 4.5rem;
                    color: #eee;
                    cursor: pointer;
                    font-size: 16px;
                }

                .button-edit {
                    padding: 0 15px;
                    margin-right: .4rem;
                    background-color: rgb(36,40,65);
                }

                .delete {
                    background-color: rgb(162, 73, 69);
                    padding: 0 25px;
                    margin-right: .4rem;
                }

                .button-mark {
                    background-color: rgb(99, 210, 166);
                    padding: 0 25px;
                }

                .button-pending {
                    background-color: #ffa500;
                    padding: 0 25px;
                }
            }
        }

        .invoice-details {
            background-color: rgb(30, 33, 57);
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            padding: 40px 35px;
            border-radius: 12px;

            .top {
                display: flex;
                margin-bottom: 1.8rem;
                .left {
                    flex: 1;

                    .id {
                        font-size: 25px;
                        font-weight: 600;
                        margin-bottom: .4rem;
                        span {
                            color: rgb(127, 127, 150);
                            margin-right: .4rem;
                        }
                    }
                }

                .right {
                    flex: 1;
                    text-align: right;
                }
            }

            .middle {
                display: flex;                
                width: 100%;

                h4 {
                    font-size: 14px;
                    font-weight: 100;                  
                    color: rgb(127, 127, 150);
                }

                .payment {
                    flex-basis: 30%;
                    
                    p {
                        font-size: 18px;
                        margin-top: .8rem;
                        margin-bottom: 1.2rem;
                    }
                }

                .bill {
                    flex-basis: 30%;

                    h4 {
                        margin-bottom: .8rem;
                    }

                    p {
                        margin-bottom: .4rem;
                    }
                }

                .send-to {
                    flex-basis: 40%;

                    h4 {
                        margin-bottom: .4rem;
                    }
                }
            }

            .bottom {
                border-radius: 12px;
                margin-top: 1rem;                
                overflow: hidden;

                .billing-items {
                    background-color: rgb(36,40,65);                    
                    padding: 15px 12px;
                    width: 100%;

                    .heading {
                        display: flex;
                        margin-bottom: 1rem;
                        
                    }

                    .item {
                        display: flex;
                        margin-bottom: .4rem;

                        p {
                            font-size: 15px;
                        }
                    }

                    p {
                        flex-basis: 10%;
                        
                        &:first-of-type {
                            flex-basis: 70%;
                        }
                    }                    
                }

                .total {
                    background-color: rgb(14, 17, 26);
                    display: flex;
                    height: 70px;
                    align-items: center;

                    p {
                        flex: 1;

                        padding-left: 30px;

                        &:last-of-type {
                            font-size: 25px;
                            text-align: end;
                            padding-right: 61px;
                        }
                    }
                }
            }
        }
    }
</style>
<script setup>
    import Invoice from '../components/Invoice.vue'
    import { computed, ref } from 'vue';
    import { useStore } from 'vuex';

    const filterMenu = ref(false)
    const filteredInvoice = ref('')    

    const store = useStore()

    const invoices = computed(()=> store.state.invoiceData)
    const editInvoice = computed(() => store.state.editInvoice)

    const toggleFilterMenu = () => {
        filterMenu.value = !filterMenu.value        
    }

    const filteredInvoices = e => {        
        if (e.target.innerText === 'Clear Filter') {
            filteredInvoice.value = ''
            return
        }
        filteredInvoice.value = e.target.innerText
    }

    const filteredData = computed(() => {
        return invoices.value.filter(invoice => {
            if (filteredInvoice.value === 'Draft') {
                return invoice.invoiceDraft === true
            }

            if (filteredInvoice.value === 'Pending') {
                return invoice.invoicePending === true   
            }

            if (filteredInvoice.value === 'Paid') {
                return invoice.invoicePaid === true
            }
            return invoice
        })
    })

    const newInvoice = () => {
        if (editInvoice.value) {
            store.commit('toggleEditInvoice')        
        }
        store.dispatch('change') // actions             
    }

</script>

<template>
    <div class="home-container">
        <!-- Header -->
        <div class="home-header">
            <div class="left">
                <h1>Invoices</h1>
                <span>There are {{ filteredData.length }} total invoices</span>
            </div>
            <div class="right">
                <div @click="toggleFilterMenu" class="filter">
                    <span>Filter by status <span v-if="filteredInvoice">{{ filteredInvoice }}</span></span>
                    <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
                    <ul v-show="filterMenu" class="filter-menu">
                        <li @click="filteredInvoices">Draft</li>
                        <li @click="filteredInvoices">Pending</li>
                        <li @click="filteredInvoices">Paid</li>
                        <li @click="filteredInvoices">Clear Filter</li>
                    </ul>
                </div>
                <div @click="newInvoice" class="button">
                    <div class="inner-button">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>
        <!-- Invoice -->
        <div v-if="invoices.length > 0">
            <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" />
        </div>
        <div class="empty" v-else>            
            <h3>There is nothing here</h3>
            <p>Creaet a new invoice by cliking the New Invoice button and get started</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .home-container {
        // border: white solid;
        padding: 1.5rem;

        .home-header {
            display: flex;
            flex-direction: row;

            .left {
                flex: 1 1 auto;

                h1, span {
                    color: #eee;
                }
            }

            .right {
                flex: 1 1 auto;
                display: flex;
                justify-content: flex-end;
                color: #eee;

                .filter {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;
                    cursor: pointer;
                    position: relative;

                    span {
                        margin-right: .5rem;
                    }

                    .icon {
                        color: rgb(121, 92, 247);
                    }

                    .filter-menu {
                        position: absolute;
                        top: 40px;
                        list-style: none;                        
                        background-color: rgb(39, 43, 67);
                        width: 100%;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                        border-radius: 0 0 8px 8px;
                        overflow: hidden;

                        li {
                            padding: .7rem .5rem;
                            transition: .5s ease-out;

                            &:hover {
                                background-color: rgb(49, 53, 77);
                            }
                        }
                    }
                }

                .button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 50px;
                    border-radius: 2rem;
                    padding: 0 .6rem;
                    cursor: pointer;

                    background-color: rgb(121, 92, 247);

                    transition: .4s ease-out;

                    .inner-button {                        
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        margin-right: .2rem;

                        background-color: #eee;
                        color: rgb(121, 92, 247);

                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    &:hover {
                        transform: scale(1.01);
                    }

                }
            }
        }

        .empty {
            margin-top: 160px;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #eee;

            // img {

            // }

            h3 {
                font-size: 20px;
                margin-top: 40px;
            }

            p {
                text-align: center;
                max-width: 224px;
                font-size: 12px;
                font-weight: 300;
                margin-top: 16px;
            }
        }
    }
</style>
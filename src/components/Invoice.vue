<script setup>
    import { onMounted } from 'vue';    

    const props = defineProps({
        invoice: Object
    })
    onMounted(()=>{
        // console.log(props.invoice)
    })
</script>

<template>
    <div class="container-invoices">
        <router-link 
            :to="{ name: 'Invoice', params: {invoiceId: invoice.invoiceId} }"
            class="invoice"
        >
            <div class="left">
                <span class="tracking-number">{{ invoice.invoiceId }}</span>
                <span class="due-date">{{ invoice.paymentDueDate }}</span>
                <span class="person">{{ invoice.clientName }}</span>                
            </div>
            <div class="right">
                <span class="price">${{ invoice.invoiceTotal }}</span>
                <div class="status-button"
                    :class="{paid : invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending}">
                    <span v-if="invoice.invoicePaid">Paid</span>
                    <span v-if="invoice.invoiceDraft">Draft</span>
                    <span v-if="invoice.invoicePending">Pending</span>
                </div>
                <div class="icon">
                    <font-awesome-icon icon="fa-solid fa-angle-right" />
                </div>
            </div>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>

    .container-invoices {
        margin-top: 1.5rem;

        .invoice {
            text-decoration: none;            
            border-radius: 12px;
            background-color: #1e2139;;
            color: #eee;
            box-shadow: 0px 3px 3px rgba($color: #000000, $alpha: .2);
            margin-bottom: 1rem;
            height: 80px;
            display: flex;
            align-items: center;

            .left {
                flex: 1 1 60%;
                // border: white solid;
                display: flex;
                
                span {
                    flex-basis: 33%;
                    // border: red solid;
                    text-align: center;
                }

            }

            .right {
                flex: 1 1 40%;
                display: flex;

                .price {
                    font-weight: 700;
                    flex-basis: 40%;                    
                    text-align: center;
                }

                .status-button {
                    flex-basis: 40%;
                    border: none;
                    border-radius: 8px;
                    text-align: center;                    
                    // padding-top: 5px;
                    // padding-bottom: 5px;
                    span {
                        padding: 12px;
                    }
                }

                .icon {
                    flex: 19%;
                    text-align: center;
                    color: rgb(121, 92, 247);
                }
            }
        }
    }
</style>
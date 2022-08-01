<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { useStore } from 'vuex'
    import { uid } from 'uid'

    const store = useStore()

    const billerStreetAddress = ref('')
    const billerCity = ref('')
    const billerZipCode = ref('')
    const billerCountry = ref('')

    const clientName = ref('')
    const clientEmail = ref('')
    const clientAddress = ref('')
    const clientCity = ref('')
    const clientZipCode = ref('')
    const clientCountry = ref('')

    const invoiceDateCurrent = ref('')
    const invoiceDate = ref('')
    const paymentTerms = ref('')
    const paymentDueDateUnix = ref('')
    const paymentDueDate = ref('')
    const productDescription = ref('')
    const invoicePending = ref('')
    const invoiceDraft = ref('')
    const invoiceItems = ref([])
    const invoiceTotal = 0

    const dateOptions = { year: "numeric", month: "short", day: "numeric" }

    const closeInvoice = () => {
        store.dispatch('change')
    }

    const addNewInvoiceItem = () => {
        invoiceItems.value.push({
            id: uid(),
            itemName: "",
            qty: "",
            price: 0,
            total: 0
        })
    }

    const deleteItem = (id) => {
        invoiceItems.value = invoiceItems.value.filter(item => item.id !== id)
    }

    const checkClick = () => {

    }

    const submitForm = () => {

    }    

    watch(() => {
        const futureDate = new Date()
        paymentDueDateUnix.value = futureDate.setDate(futureDate.getDate() + parseInt(paymentTerms.value))

        if (paymentTerms.value) {
            paymentDueDate.value = new Date(paymentDueDateUnix.value).toLocaleDateString('en-GB', dateOptions)            
        }
    })

    onMounted(() => {
        invoiceDateCurrent.value = Date.now()
        invoiceDate.value = new Date(invoiceDateCurrent.value).toLocaleDateString('en-GB', dateOptions)
    })

</script>

<template>
    <div @click="checkClick" class="invoice-wrap" ref="invoiceWrap">
        <form @submit.prevent="submitForm" class="invoice-content">
            <h1>New Invoice</h1>

            <!-- Bill From -->
                <div class="bill-from">
                    <h4>Bill From</h4>
                    <div class="input">
                        <label for="billerStreetAddress">Street Address</label>
                        <input
                            v-model="billerStreetAddress"
                            id="billerStreetAddress"
                            type="text"
                            required
                        >
                    </div>
                    <div class="location-details">
                        <div class="input">
                            <label for="billerCity">City</label>
                            <input
                                v-model="billerCity"
                                id="billerCity"
                                type="text"
                                required
                            >
                        </div>
                        <div class="input">
                            <label for="billerZipCode">Zip Code</label>
                            <input
                                v-model="billerZipCode"
                                id="billerZipCode"
                                type="text"
                                required
                            >
                        </div>
                        <div class="input">
                            <label for="billerCountry">Country</label>
                            <input
                                v-model="billerCountry"
                                id="billerCountry"
                                type="text"
                                required
                            >
                        </div>
                    </div>
                </div>
            <!-- End Bill From  -->

            <!-- Bill To -->
                <div class="bill-to">
                    <h4>Bill To</h4>
                    <div class="input">
                        <label for="clientName">Client's Name</label>
                        <input
                            v-model="clientName"
                            id="clientName"
                            type="text"
                            required
                        >
                    </div>
                    <div class="input">
                        <label for="clientEmail">Client's Email</label>
                        <input
                            v-model="clientEmail"
                            id="clientEmail"
                            type="text"
                            required
                        >
                    </div>
                    <div class="input">
                        <label for="clientAddress">Street Address</label>
                        <input
                            v-model="clientAddress"
                            id="clientAddress"
                            type="text"
                            required
                        >
                    </div>
                    <div class="location-details">
                        <div class="input">
                            <label for="clientCity">City</label>
                            <input
                                v-model="clientCity"
                                id="clientCity"
                                type="text"
                                required
                            >
                        </div>
                        <div class="input">
                            <label for="clientZipCode">Zip Code</label>
                            <input
                                v-model="clientZipCode"
                                id="clientZipCode"
                                type="text"
                                required
                            >
                        </div>
                        <div class="input">
                            <label for="clientCountry">Country</label>
                            <input
                                v-model="clientCountry"
                                id="clientCountry"
                                type="text"
                                required
                            >
                        </div>
                    </div>
                </div>
            <!-- End Bill To -->

            <!-- Invoice Work Details -->
                <div class="invoice-work">
                    <div class="payment">
                        <div class="input">
                            <label for="invoiceDate">Invoice Date</label>
                            <input
                                v-model="invoiceDate"
                                id="invoiceDate"
                                type="text"
                                disabled
                                required
                            >
                        </div>
                        <div class="input">
                            <label for="paymentDueDate">Payment Due</label>
                            <input
                                v-model="paymentDueDate"
                                id="paymentDueDate"
                                type="text"
                                disabled
                                required
                            >
                        </div>
                    </div>
                    <div class="input">
                        <label for="paymentTerms">Payment Terms</label>
                        <select id="paymentTerms" v-model="paymentTerms" required>
                            <option value="30">Next 30 Days</option>
                            <option value="60">Next 60 Days</option>
                        </select>
                    </div>
                    <div class="input">
                        <label for="productDescription">Product Description</label>
                        <input
                            v-model="productDescription"
                            id="productDescription"
                            type="text"
                            required
                        >
                    </div>
                    <div class="work-items">
                        <h3>Item List</h3>
                        <table class="item-list">
                            <tr class="table-heading">
                                <th class="item-name">Item Name</th>
                                <th class="qty">Qty</th>
                                <th class="price">Price</th>
                                <th class="total">Total</th>
                            </tr>

                            <tr class="table-items"
                                v-for="(item, index) in invoiceItems" :key="index">
                                <td class="item-name">
                                    <input type="text" v-model="item.itemName">
                                </td>
                                <td class="qty">
                                    <input type="text" v-model="item.qty">
                                </td>
                                <td class="price">
                                    <input type="text" v-model="item.price">
                                </td>
                                <td class="total">
                                    ${{ item.total = item.qty * item.price }}
                                </td>
                                <i><font-awesome-icon icon="fa-solid fa-trash-can" @click="deleteItem(item.id)" /></i>
                            </tr>
                        </table>
                        <div @click="addNewInvoiceItem" class="button">
                            <i><font-awesome-icon icon="fa-solid fa-plus" /></i>
                            <span>Add New Item</span>
                        </div>
                    </div>
                </div>
            <!-- End Invoice Work Details -->

            <!-- Save/Discard -->
                <div class="save">
                    <div class="left">
                        <button @click="closeInvoice" class="discard" type="button">
                            Discard
                        </button>
                    </div>
                    <div class="right">
                        <button @click="saveDraft" class="draft">
                            Save Draft
                        </button>
                        <button @click="createInvoice" class="create">
                            Create Invoice
                        </button>
                    </div>
                </div>
            <!-- End Save/Discard -->
        </form>
    </div>
</template>

<style lang="scss" scoped>
    .invoice-wrap {
        position: fixed;
        top: 0;
        left: 90px;
        background-color: transparent;
        width: 700px;
        height: 100vh;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        .invoice-content {
            position: relative;
            padding: 56px;
            width: 100%;
            background-color: #141625;
            color: #eee;

            box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, .2), 0 2px 4px -1px rgba(0, 0, 0, .06);

            h1 {
                margin-bottom: 40px;
            }            

            .bill-from,
            .bill-to,
            .invoice-work {
                margin-bottom: 2rem;

                h4 {                    
                    font-size: 15px;
                    color: rgb(121, 92, 247);
                    margin-bottom: .8rem;
                }

                .payment {
                    display: flex;
                    justify-content: space-between;

                    .input {
                        width: 49%;
                    }
                }


                .input {
                    margin-bottom: 1rem;

                    label {
                        margin-bottom: .7rem;
                        display: block;
                    }

                    input, select {
                        border: none;
                        width: 100%;
                        background: none;
                        height: 40px;
                        background-color: rgb(33, 32, 56);
                        color: #eee;
                        padding: 12px 4px;
                        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, .2), 0 2px 4px -1px rgba(0, 0, 0, .06);
                        font-size: 16px;
                    }
                }                
                
                .location-details {
                    display: flex;                    
                    position: relative;
                    align-items: center;

                    .input {
                        width: 32%;

                        &:nth-of-type(2) {
                            position: absolute;
                            right: 34%;
                        }

                        &:nth-of-type(3) {                            
                            position: absolute;
                            right: 0;
                        }
                    }
                }
            }
            
            .work-items {
                h3 {
                    color: #6F6F7B;
                    margin-bottom: 1rem;
                }

                .item-list {
                    width: 100%;
                    text-align: left;
                    margin-bottom: 2rem;

                    .table-heading {
                        margin-bottom: .8rem;
                        display: flex;

                        .item-name {
                            flex-basis: 50%;                            
                        }

                        .qty {
                            flex-basis: 10%;                            
                        }

                        .price {
                            flex-basis: 20%;                            
                        }

                        .total {
                            flex-basis: 20%;
                            // text-align: center;
                        }
                    }

                    .table-items {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        margin-bottom: .8rem;                        

                        input {
                            border: none;
                            border-radius: 2px;
                            background-color: rgb(33, 32, 56);
                            color: #eee;
                            height: 40px;
                            padding: 0 5px;
                        }

                        .item-name {
                            width: 50%;

                            input {
                                width: 95%;
                            }
                        }

                        .qty {
                            width: 10%;

                            input {
                                width: 80%;
                            }
                        }

                        .price {
                            width: 20%;
                            
                            input {
                                width: 95%;
                            }
                        }

                        .total {
                            width: 15%;                            
                        }

                        i {
                            cursor: pointer;
                            transition: .5s all;

                            &:hover {
                                transform: scale(1.02);
                            }
                        }
                    }
                }

                .button {
                    width: 100%;
                    height: 50px;
                    background-color: rgb(33, 32, 56);
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    border-radius: 4rem;
                    cursor: pointer;
                    transition: .5s ease-out;
                    
                    &:hover {
                        background-color: rgb(33, 32, 70);
                        transform: scale(1.01);
                    }

                    i {
                        color: rgb(121, 92, 247);
                        margin-right: .4rem;
                    }
                }
            }

            .save {
                display: flex;
                width: 100%;

                button {
                    border: none;
                    height: 50px;                    
                    border-radius: 2rem;
                    font-size: 16px;
                    color: #eee;
                    cursor: pointer;
                }

                .left {
                    flex-basis: 58%;

                    .discard {                        
                        background-color: rgb(162, 73, 69);
                        width: 100px;
                    }
                }

                .right {
                    .draft {
                        background-color: rgb(33, 32, 56);
                        width: 100px;
                    }

                    .create {
                        margin-left: .6rem;
                        background-color: rgb(89, 67, 179);
                        width: 130px;
                    }
                }

            }
        }
    }
</style>
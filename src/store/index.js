import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'

export default createStore({
    state: {
        invoiceData: [],
        invoiceModal: false,
        modalActive: false,
        invoicesLoaded: false,
        currentInvoiceArray: [],
        editInvoice: false
    },
    mutations,
    actions
})
export default {
    changeState(state) {
        state.invoiceModal = !state.invoiceModal
    },

    changeStateModal(state) {
        state.modalActive = !state.modalActive
    },

    setInvoiceData(state, payload) {
        state.invoiceData.push(payload)        
    },

    invoiceLoaded(state) {
        state.invoicesLoaded = true
    },

    setCurrentInvoice(state, payload) {
        // console.log(payload)
        state.currentInvoiceArray = state.invoiceData.filter(invoice => {
            return invoice.invoiceId === payload
        })
    },

    toggleEditInvoice(state) {
        state.editInvoice = !state.editInvoice
    },

    deleteInvoice(state, payload) { // only frontend
        state.invoiceData = state.invoiceData.filter(invoice => invoice.docId !== payload)
    },

    updateStatusToPaid(state, payload) {
        state.invoiceData.forEach(invoice => {
            if (invoice.docId === payload) {
                invoice.invoicePaid = true
                invoice.invoicePending = false
            }
        });
    },

    updateStatusToPending(state, payload) {
        state.invoiceData.forEach(invoice => {
            if (invoice.docId === payload) {
                invoice.invoicePaid = false
                invoice.invoiceDraft = false
                invoice.invoicePending = true
            }
        })
    }
}
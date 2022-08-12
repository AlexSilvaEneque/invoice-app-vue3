import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import db from '../firebase/firebase'

export default {
    change: ({ commit }) => commit('changeState'),
    changeModal: ({ commit }) => commit('changeStateModal'),
    getInvoices: async ({ commit, state }) => {
        const data = await getDocs(collection(db, 'invoices'))
        data.forEach(doc => {
            if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {
                const invoice = {
                    docId: doc.id,
                    invoiceId: doc.data().invoiceId,
                    billerStreetAddress: doc.data().billerStreetAddress,
                    billerCity: doc.data().billerCity,
                    billerZipCode: doc.data().billerZipCode,
                    billerCountry: doc.data().billerCountry,
                    clientName: doc.data().clientName,
                    clientEmail: doc.data().clientEmail,
                    clientAddress: doc.data().clientAddress,
                    clientCity: doc.data().clientCity,
                    clientZipCode: doc.data().clientZipCode,
                    clientCountry: doc.data().clientCountry,
                    invoiceDateCurrent: doc.data().invoiceDateCurrent,
                    invoiceDate: doc.data().invoiceDate,
                    paymentTerms: doc.data().paymentTerms,
                    paymentDueDateUnix: doc.data().paymentDueDateUnix,
                    paymentDueDate: doc.data().paymentDueDate,
                    productDescription: doc.data().productDescription,
                    invoicePending: doc.data().invoicePending,
                    invoiceDraft: doc.data().invoiceDraft,
                    invoiceItems: doc.data().invoiceItems,
                    invoiceTotal: doc.data().invoiceTotal,
                    invoicePaid: doc.data().invoicePaid
                }

                commit('setInvoiceData', invoice)
            }
        })
        commit('invoiceLoaded')
    },
    updateInvoice: async ({ commit, dispatch }, { docId, routeId }) => {
        commit('deleteInvoice', docId)
        await dispatch('getInvoices')
        commit('changeState')
        commit('toggleEditInvoice')
        commit('setCurrentInvoice', routeId)
    },
    deleteInvoice: async ({ commit }, docId) => {
        await deleteDoc(doc(db, 'invoices', docId))
        commit('deleteInvoice', docId)
    },

    updateToPaid: async ({ commit }, docId) => {
        const invoice = doc(db, 'invoices', docId)
        await updateDoc(invoice, {
            invoicePaid: true,
            invoicePending: false
        })
        commit('updateStatusToPaid', docId)
    },

    updateToPending: async ({ commit }, docId ) => {
        const invoice = doc(db, 'invoices', docId)
        await updateDoc(invoice, {
            invoicePaid: false,
            invoiceDraft: false,
            invoicePending: true,
        })
        commit('updateStatusToPending', docId)
    }

}
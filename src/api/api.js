
import sendRequest from '../config/sentRequest'

export const api = Object.freeze({
    async fetchDemands(obj) {
        const response = await sendRequest("demands/get.php",obj)
        return response
    },
    async fetchDashboards() {
        const response = await sendRequest("dashboard/get.php")
        return response
    },
    async fetchDocuments(obj) {
        const response = await sendRequest("documents/get.php",obj)
        return response.List
    },
    async fetchDebt(CustomerId) {
        let obj = { id: CustomerId }
        const response = await sendRequest("customers/getdata.php",obj)
        return response.Debt
    },
    async fetchCostomersProducts(Id) {  
        let obj = { id: Id }
        const response = await sendRequest("demands/get.php",obj)
        return response
    },
})
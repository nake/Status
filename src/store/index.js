import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // would be probably fetched from backend or elsewhere.
        availableStatuses: [
            { id: 0, value: 'Draft', color: '#C05717' },
            { id: 1, value: 'Needs prep.', color: '#FFC58B' },
            { id: 2, value: 'Needs estimates', color: '#CBF0F0' },
            { id: 3, value: 'Planned', color: '#E2E6EE' },
            { id: 4, value: 'Needs input', color: '#B3BCF5' },
            { id: 5, value: 'Waiting', color: '#47C1BF' },
            { id: 6, value: 'In Progress', color: '#50B83C' },
            { id: 7, value: 'Needs testing', color: '#FAD200' },
            { id: 8, value: 'Testing', color: '#FFEA8A' },
            { id: 9, value: 'Needs review', color: '#5C6AC4' },
            { id: 10, value: 'Needs attention', color: '#DE1818' },
            { id: 11, value: 'Completed', color: '#145B39' },
        ],
        selectedStatus: null,
        isStatusDropdownOpen: false
    },
    mutations: {
        updateStatus(state, payload) {
            state.selectedStatus = payload.status;
            state.isStatusDropdownOpen = false;
        },
        toggleStatusDropdown(state) {
            state.isStatusDropdownOpen = !state.isStatusDropdownOpen;
        },
        closeStatusDropdown(state) {
            state.isStatusDropdownOpen = false;
        },
        moveStatus(state, payload) {
            state.availableStatuses.splice(payload.to, 0, state.availableStatuses.splice(payload.from, 1)[0]);
            // perhaps here would be a good place to save it either to cookies or to backend... but this is not exactly in the scope of the task so...
        }
    },
    actions: {

    }
})
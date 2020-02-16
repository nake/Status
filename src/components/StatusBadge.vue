<template>
    <div class="badgeContainer">
        <button v-if="$store.state.selectedStatus === null"  @click="toggle()">Please select status</button>
        <button v-else @click="toggle()" v-bind:style="{ background: getColor($store.state.selectedStatus) }">{{ $store.state.selectedStatus.value }}</button>
        <div class="dropdownContainer" v-if="$store.state.isStatusDropdownOpen"><StatusDropdown/></div>
    </div>
</template>

<script>
    import StatusDropdown from './StatusDropdown.vue';

    export default {
        name: 'StatusBadge',
        components: {
            StatusDropdown
        },
        methods: {
            toggle: function () {
                this.$store.commit('toggleStatusDropdown');
            },
            close: function () {
                this.$store.commit('closeStatusDropdown');
            },
            getColor(status) {
                return status.color;
            }
        }
    }
</script>

<style scoped>
    .badgeContainer {
        width: 200px;
        position: absolute;
    }
    button {
        display: flex;
        flex-direction: row;
        padding: 2px 8px;
        height: 20px;
        border-radius: 4px;
        background: black;
        color: white;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
</style>
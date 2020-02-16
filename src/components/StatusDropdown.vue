<template>
    <div 
        v-closable="{
        exclude: [],
        handler: 'close'
        }"
        class="statusListContainer">
        <div 
            class="statusContainer"
            v-for="(status, i) in $store.state.availableStatuses"
            v-bind:key="i" 
            v-on:click="setStatus(status)"
            draggable="true" 
            @dragstart="dragStart(i, $event)"
            @dragover.prevent 
            @dragend="dragEnd" 
            @drop="dragFinish(i, $event)"
            v-bind:class="{ selected: getIsSelected(status), focused: currentStatus === i }">
        <div class="circleContainer"><span v-bind:style="{ background: getColor(status) }" class="circle"></span></div>
        <div class="text">{{ status.value }}</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    let handleOutsideClick
    // got directive from google, because... duh
    Vue.directive('closable', {
        bind(el, binding, vnode) {
            handleOutsideClick = (e) => {
                e.stopPropagation()
                const { handler, exclude } = binding.value
                let clickedOnExcludedEl = false
                exclude.forEach(refName => {
                    if (!clickedOnExcludedEl) {
                        const excludedEl = vnode.context.$refs[refName]
                        clickedOnExcludedEl = excludedEl.contains(e.target)
                    }
                })
                if (!el.contains(e.target) && !clickedOnExcludedEl) {
                    vnode.context[handler]()
                }
            }
            document.addEventListener('click', handleOutsideClick)
            document.addEventListener('touchstart', handleOutsideClick)
        },
        unbind() {
            document.removeEventListener('click', handleOutsideClick)
            document.removeEventListener('touchstart', handleOutsideClick)
        }
    })
    export default {
        name: 'StatusDrowndown',
        data: function () {
            return {
                currentStatus: 0
            };
        },
        mounted() {
            document.addEventListener("keyup", this.nextStatus);
        },
        methods: {
            setStatus (status) {
                this.$store.commit('updateStatus', { status });
            },
            close: function () {
                this.$store.commit('closeStatusDropdown');
            },
            dragStart(which, ev) {
                ev.dataTransfer.setData('Text', this.id);
                ev.dataTransfer.dropEffect = 'move'
                this.dragging = which;
            },
            dragEnd() {
                this.dragging = -1
            },
            dragFinish(to, ev) {
                this.moveItem(this.dragging, to);
                ev.target.style.marginTop = '2px'
                ev.target.style.marginBottom = '2px'
            },
            moveItem(from, to) {
                this.$store.commit('moveStatus', { to, from });
            },
            getColor(status) {
                return status.color;
            },
            getIsSelected(status) {
                let selected = this.$store.state.selectedStatus;
                if (selected !== null) {
                    return this.$store.state.selectedStatus.value == status.value;
                }
                return false;
            },
            nextStatus() {
                if (event.keyCode == 38 && this.currentStatus > 0) {
                    this.currentStatus--;
                } else if (event.keyCode == 40 && this.currentStatus < this.$store.state.availableStatuses.length - 1) {
                    this.currentStatus++;
                } else if (event.keyCode == 13) {
                    this.setStatus(this.$store.state.availableStatuses[this.currentStatus]);
                }
            }
        }
    }
</script>

<style scoped>
    @import url(/assets/fonts/inter.css);
    .statusListContainer {
        width: 160px;
        background: #FFFFFF;
        box-shadow: 0px 8px 32px rgba(31, 34, 38, 0.12), 0px 2px 6px rgba(31, 34, 38, 0.08);
        border-radius: 4px;
    }
    .statusContainer {
        display: flex;
        height: 32px;
        justify-content: left;
        align-content: center;
        flex-wrap: wrap;
    }
    .statusContainer:hover,
    .focused {
        background: #F7F9FD;
    }
    .circle {
        height: 12px;
        width: 12px;

        border-radius: 8px;
        display: inline-flex;
    }
    .circleContainer {
        display: inline;
        padding: 0 8px 0 8px;
    }
    .text {
        display: flex;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
    .selected {
        background: #EBF5FA;
    }
</style>
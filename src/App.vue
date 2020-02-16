<template>
    <div id="App">
        <Status/>
    </div>
</template>

<script>
    import Status from './components/StatusBadge.vue';

    export default {
        name: 'App',
        components: {
            Status
        }
    };
</script>

<style>
    @import './assets/fonts/inter.css';
</style>


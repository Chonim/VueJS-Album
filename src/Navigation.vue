<template>
    <navbar placement="top"
            type="default">

        <router-link slot="brand"
           to="/"
           title="Home"
           class="navbar navbar-dark navbar-fixed-topd">
            <span>Album</span>
        </router-link>

        <router-link slot="left"
                     to="/"
                     tag="li"
                     exact></router-link>

    </navbar>
</template>

<script>
import navbar from '../node_modules/vue-strap/src/Navbar.vue';

export default {
    components: { navbar }
}
</script>

<style>
.navbar-brand {
    width: 100%;
}
#app .navbar .nav {
    padding-left: 15px;
}
</style>

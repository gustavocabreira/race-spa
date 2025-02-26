<template>
    <div class="bg-slate-100 min-h-screen min-w-screen flex items-center justify-center">
        <router-view/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GuestLayout',
    mounted() {
        console.log(this.$route)
    }
})
</script>
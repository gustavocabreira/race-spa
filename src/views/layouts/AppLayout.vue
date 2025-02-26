<template>
    <div class="bg-slate-100 min-h-screen min-w-screen">
        <router-view/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppLayout',
})
</script>
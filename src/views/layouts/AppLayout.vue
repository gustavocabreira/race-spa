<template>
    <div class="bg-slate-100 min-h-screen min-w-screen">
        <router-view/>
    </div>
</template>

<script lang="ts">
import client from '../../helpers/client';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppLayout',
    mounted() {
			client.get('me')
				.catch(err => {
					alert('Unauthorized');
					this.$router.push({name: "LoginPage"})
			})
    }
})
</script>
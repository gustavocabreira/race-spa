<template>
    <div class="bg-slate-100 min-h-screen min-w-screen">
				<Navbar/>
        <router-view/>
    </div>
</template>

<script lang="ts">
import client from '../../helpers/client';
import { defineComponent } from 'vue';
import Navbar from '../../components/ui/Navbar.vue';

export default defineComponent({
    name: 'AppLayout',
		components: {
			Navbar,
		},
    mounted() {
			client.get('me')
				.catch(err => {
					alert('Unauthorized');
					this.$router.push({name: "LoginPage"})
			})
    }
})
</script>
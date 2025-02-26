<template>
	<div class="flex items-center justify-center min-h-screen">
		<form @submit.prevent="store" class="bg-white p-6 w-1/2 space-y-4">
			<div>
				<Input name="date" id="date" type="date" label="Data da Prova" v-model="form.happens_at" />
				<Input name="place" id="place" label="Local" v-model="form.place" />
				<Input name="total_laps" id="total_laps" label="Total de Voltas" v-model="form.total_laps" />
			</div>
			<div>
				<PrimaryButton type="submit" :loading="isLoading">Cadastrar</PrimaryButton>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from '../../components/ui/Input.vue';
import PrimaryButton from '../../components/ui/PrimaryButton.vue';
import client from '../../helpers/client';

export default defineComponent({
	name: 'CreateRace',
	components: {
		Input,
		PrimaryButton,
	},
	data() {
		return {
			form: {
				happens_at: '',
				place: '',
				total_laps: '',
			},
			isLoading: false,
		}
	},
	methods: {
		store() {
			this.isLoading = true;
			client.post('races', this.form).then(response => {
				alert('Corrida cadastrada com sucesso!');
				return this.$router.push({
					name: "Home"
				})
			})
				.catch(err => {
					alert(err.response.data.message)
				})
				.finally(() => {
					this.isLoading = false;
				})
		}
	}
})
</script>
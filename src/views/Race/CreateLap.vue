<template>
	<div class="min-w-width min-h-height flex justify-center mt-8">
		<form @submit.prevent="store" class="bg-white w-4xl p-4">
			<h2>Cadastrar Volta</h2>
			<div class="mt-4">
				<label class="block">Selecione a corrida</label>
				<select v-model="form.race_id"
					class="flex h-9 w-full rounded-md border border-gray-300 border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
					<option></option>
					<option v-for="(race, index) in races" :key="index" :value="race.id">{{ race.place }}</option>
				</select>
			</div>
			<div class="mt-4">
				<label class="block">Selecione o piloto</label>
				<select v-model="form.driver_id"
					class="flex h-9 w-full rounded-md border border-gray-300 border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
					<option></option>
					<option v-for="(driver, index) in drivers" :key="index" :value="driver.id">{{ driver.name }}</option>
				</select>
			</div>
			<div class="mt-4 flex items-center gap-4" v-for="(lap, index) in form.laps" :key="index">
				<div class="w-full">
					<Input label="Informe o número da volta" v-model="lap.number" name="number" id="number" />
				</div>
				<div class="w-full">
					<Input label="Informe a duração da volta" v-model="lap.duration" name="duration" id="duration" />
				</div>
				<div class="" v-if="index == form.laps.length - 1">
					<label class="block text-white">.</label>
					<PrimaryButton @click="addLap(lap.id + 1)">ADICIONAR</PrimaryButton>
				</div>
				<div class="" v-else>
					<label class="block text-white">.</label>
					<PrimaryButton @click="removeLap(lap.id)">REMOVER</PrimaryButton>
				</div>
			</div>
			<div class="mt-4">
				<div class="w-full">
					<PrimaryButton :isLoading="true" type="submit">Cadastrar</PrimaryButton>
				</div>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from '../../components/ui/Input.vue'
import PrimaryButton from '../../components/ui/PrimaryButton.vue'
import client from '../../helpers/client';

export default defineComponent({
	name: 'HomeView',
	components: {
		Input,
		PrimaryButton,
	},
	data() {
		return {
			races: [],
			drivers: [],
			form: {
				race_id: null,
				driver_id: null,
				laps: [
					{
						id: 1,
						number: 1,
						duration: 1,
					}
				]
			},
			isLoading: false,
		}
	},
	methods: {
		addLap(lap: number) {
			if (!this.form.race_id) {
				alert('Selecione uma corrida');
				return;
			}

			let race = this.races.filter(el => el.id == this.form.race_id)[0];
			console.log(this.form.laps.length, race.total_laps);

			if (this.form.laps.length >= race.total_laps) {
				return;
			}

			this.form.laps.push({
				number: lap,
				duration: 1,
				id: lap,
			})
		},
		removeLap(id: number) {
			this.form.laps = this.form.laps.filter(el => el.id !== id)
		},
		store() {
			this.isLoading = true;
			let payload = this.form.laps

			client.post(`races/${this.form.race_id}/drivers/${this.form.driver_id}/laps`, payload)
				.then(response => {
					alert('Voltas cadastradas com sucesso!')
					this.$router.push({
						name: 'Home'
					})
				})
				.catch(err => {
					alert(err.response.data.message)
				})
				.finally(() => {
					this.isLoading = false;
				})
		},
		getRaces() {
			client.get('races')
				.then((response) => {
					this.races = response.data
				})
		},
		getDrivers() {
			client.get('drivers')
				.then((response) => {
					this.drivers = response.data
				})
		}
	},
	mounted() {
		this.getRaces();
		this.getDrivers();
	}
});
</script>
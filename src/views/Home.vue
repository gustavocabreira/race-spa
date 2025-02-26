<template>
	<div class="min-w-width min-h-height flex justify-center mt-8">
		<div class="bg-white w-4xl p-4">
			<div class="flex gap-8">
				<div class="w-full">
					<h3>Selecione uma corrida</h3>
					<select @change="selectRace" v-model="race_id"
						class="flex h-9 w-full rounded-md border border-gray-300 border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
						<option></option>
						<option v-for="(race, index) in races" :key="index" :value="race.id">{{ race.place }}</option>
					</select>
				</div>
				<div v-show="display" class="w-full">
					<h1 class="text-2xl">TOP 3 COLOCADOS</h1>
					<div v-for="(driver, index) in top3" class="border border-neutral-100 rounded-lg flex items-center justify-between p-4 mt-4">
						<span>{{driver.name}}</span>
						<div>
							<h3 class="text-right text-2xl font-bold">{{index + 1}} º</h3>
							<span>Lugar</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import client from '../helpers/client';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Home',
	data() {
		return {
			display: false,
			races: [],
			race_id: null,
			top3: [],
			laps: [],
		}
	},
	methods: {
		getRaces() {
			client.get('races').then((response) => {
				this.races = response.data
			})
		},
		selectRace() {
			if (!this.race_id) {
				this.display = false;
				return
			}

			client.get(`races/${this.race_id}`).then((response) => {
				this.top3 = response.data.top_3
				this.display = true
			})
		}
	},
	mounted() {
		this.getRaces()
	}
})
</script>
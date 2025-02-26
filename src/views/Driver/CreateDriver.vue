<template>
    <div class="flex items-center justify-center min-h-screen">
        <form @submit.prevent="store" class="bg-white p-6 w-1/2 space-y-4">
            <div>
                <Input name="name" id="name" label="Nome do Piloto" v-model="form.name"/>
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
    name: 'CreateDriver',
    components: {
        Input,
        PrimaryButton,
    },
    data() {
        return {
            form: {
                name: '',
            },
            isLoading: false,
        }
    },
    methods: {
        store() {
            this.isLoading = true;
            client.post('drivers', this.form).then(response => {
                alert('Piloto cadastrado com sucesso!');
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
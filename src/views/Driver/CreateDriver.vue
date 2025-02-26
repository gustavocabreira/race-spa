<template>
    <div class="flex items-center justify-center min-h-screen">
        <form @submit.prevent="store" class="bg-white p-6 w-1/2 space-y-4">
            <div>
                <Input name="name" id="name" label="Nome do Piloto"/>
            </div>
            <div>
                <PrimaryButton>Cadastrar</PrimaryButton>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from '../../components/ui/Input.vue';
import PrimaryButton from '../../components/ui/PrimaryButton.vue';

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
            }
        }
    },
    methods: {
        store() {
            alert('name is required')
        }
    }
})
</script>
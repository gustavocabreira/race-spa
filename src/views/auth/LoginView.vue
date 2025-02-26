<template>
  <div class="w-full sm:w-[400px] px-4 sm:px-0 mx-auto min-h-screen flex items-center justify-center flex-col gap-6">
    <a href="/"
      class="flex items-center gap-2 self-center text-xl font-semibold text-gray-900 hover:opacity-90 transition-opacity">
      <span style="
          background: linear-gradient(to right, #242427, #363639);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        ">Race</span>
    </a>
    <div class="bg-white w-full px-4 sm:px-6 py-6 shadow-md rounded-lg border border-gray-200">
      <div class="mb-6">
        <h1 class="text-xl font-bold tracking-tight text-gray-900">Entrar</h1>
        <p class="mt-1.5 text-sm text-gray-500">Bem-vindo ao Race</p>
      </div>

      <!-- Form -->
      <div class="mt-6">
        <form @submit.prevent="login" class="flex flex-col gap-2">
          <Input label="Email" type="email" name="email" id="email" placeholder="you@example.com" required
            v-model="form.email" />
          <Input label="Senha" type="password" name="password" id="password" placeholder="••••••••" required
            v-model="form.password" />

          <PrimaryButton type="submit" :loading="isLoading" loading-text="Signing in..." class="mt-2">
            Entrar
          </PrimaryButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from '../../components/ui/Input.vue';
import PrimaryButton from '../../components/ui/PrimaryButton.vue';
import client from '../../helpers/client';
import axios from 'axios';


export default defineComponent({
  name: 'LoginView',
  components: {
    Input,
    PrimaryButton,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      isLoading: false,
    }
  },
  methods: {
    login() {
      this.isLoading = true;

      client.get('http://localhost/sanctum/csrf-cookie')
        .then(() => {
          client.post('auth/login', this.form)
            .then((response) => {
              this.$router.push({
                name: 'Home'
              })
            })
            .catch(err => {
              alert(err.response.data.message)
            })
        })
    }
  }
});
</script>
<script lang ="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <button :disabled="authStore.loading" class="btn btn-accent" @click="authStore.signIn">
    Sign in With GitHub
    <span v-if="authStore.loading" class="loading loading-spinner loading-xs" />
    <Icon v-else name="tabler:brand-github" size="32" />
  </button>
</template>

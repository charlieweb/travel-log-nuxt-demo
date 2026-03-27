<script lang="ts" setup>
const error = useRoute().query.error || "An unknown error occurred on the page.";
</script>

<template>
  <div class="card  bg-base-300 container  mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4">
    <div role="alert" class="alert alert-error min-w-1/2 text-center">
      <span>{{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary mt-4">
      <Icon name="tabler:home" size="32" />
    </NuxtLink>
  </div>
</template>

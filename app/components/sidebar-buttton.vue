<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  label: string;
  url: string;
  showLabel: boolean;
}>();
const route = useRoute();
</script>

<template>
  <div class="tooltip-right" :data-tip="showLabel ? undefined : props.label" :class="{ tooltip: !showLabel }">
    <NuxtLink :to="props.url" :class="{ 'bg-base-300': route.path === props.url, 'justify-center': !showLabel, 'justtify-start': showLabel }" class="flex  gap-2 p-2 hover:bg-base-300 hover:cursor-pointer">
      <Icon :name="props.icon" size="24" />
      <Transition name="fade">
        <span v-if="props.showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.fade-enter-active {
  transition: all 0.1s ease-out;
}

.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

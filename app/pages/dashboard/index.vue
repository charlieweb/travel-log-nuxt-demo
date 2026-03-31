<script lang="ts" setup>
const isSidebarOpen = ref(true);
onMounted(() => {
  const storedValue = localStorage.getItem("isSidebarOpen");
  if (storedValue !== null) {
    isSidebarOpen.value = storedValue === "true";
  }
});
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-200 transition-all duration-300" :class="isSidebarOpen ? 'w-64' : 'w-16'">
      <div class="flex hover: cursor-pointer hover:bg-base-300 p-2" :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }" @click="toggleSidebar">
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="32" />
        <Icon v-else name="tabler:chevron-right" size="32" />
      </div>
      <div class="flex flex-col">
        <SidebarButtton :show-label="isSidebarOpen" icon="tabler:map" label="Locations" url="/dashboard" />
        <SidebarButtton :show-label="isSidebarOpen" icon="tabler:circle-plus-filled" label="Add Location" url="/add" />
        <div class="divider" />
        <SidebarButtton :show-label="isSidebarOpen" icon="tabler:logout-2" label="Sign Out" url="/sign-out" />
      </div>
    </div>
    <div class="flex-1" />
  </div>
</template>

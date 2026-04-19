<script lang="ts" setup>
import type { FetchError } from "ofetch";
import { toTypedSchema } from "@vee-validate/zod";
import { InsertLocationSchema } from "~~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const loading = ref(false);
const submitError = ref("");
const submitted = ref(false);
const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocationSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "POST",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard/");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage || "An error occurred while adding the location.";
    // Optionally, you can show a user-friendly error message here
  }
  loading.value = false;
});
onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm("Are you sure you want to leave? You have unsaved changes.");
    if (!confirmed) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-2xl font-bold mb-4">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to.
      </p>
    </div>
    <div v-if="submitError" role="alert" class="alert alert-error">
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        name="name"
        label="name"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description"
        label="description"
        type="textarea"
        :disabled="loading"
        :error="errors.description"
      />
      <AppFormField
        name="lat"
        label=" Latitude"
        :disabled="loading"
        :error="errors.lat"
      />
      <AppFormField
        name="lng"
        label=" Longitude"
        :disabled="loading"
        :error="errors.lng"
      />
      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline mt-4"
          @click="router.back()"
        >
          Cancel
          <Icon name="tabler:arrow-left" size="20" />
        </button>
        <button :disabled="loading" type="submit" class="btn btn-primary mt-4">
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon v-else name="tabler:circle-plus-filled" size="20" />
        </button>
      </div>
    </form>
  </div>
</template>

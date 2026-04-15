<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { InsertLocationSchema } from "~~/lib/db/schema";

const router = useRouter();
const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(InsertLocationSchema),
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
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
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField name="name" label="name" :error="errors.name" />
      <AppFormField
        name="description"
        label="description"
        type="textarea"
        :error="errors.description"
      />
      <AppFormField
        name="lat"
        label=" Latitude"
        :error="errors.lat"
      />
      <AppFormField
        name="lng"
        label=" Longitude"
        :error="errors.lng"
      />
      <div class="flex justify-end gap-2">
        <button type="button" class="btn btn-outline mt-4" @click="router.back()">
          Cancel
          <Icon name="tabler:arrow-left" size="20" />
        </button>
        <button type="submit" class="btn btn-primary mt-4">
          Add
          <Icon name="tabler:circle-plus-filled" size="20" />
        </button>
      </div>
    </form>
  </div>
</template>

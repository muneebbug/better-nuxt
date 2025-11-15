<template>
  <Alert variant="default" v-if="message">
    <!-- <AlertTitle>Error</AlertTitle> -->
    <AlertDescription class="text-emerald-500">
      {{ message }}
    </AlertDescription>
  </Alert>
</template>

<script lang="ts" setup>
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

  defineProps<{
    message: string | null
  }>()

</script>

<style>

</style>
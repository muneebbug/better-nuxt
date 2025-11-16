<script lang="ts" setup>
import { Alert, AlertDescription } from '@/components/ui/alert'

defineProps<{
  message: string | null
}>()
</script>

<template>
  <Alert v-if="message" variant="default">
    <!-- <AlertTitle>Error</AlertTitle> -->
    <AlertDescription class="text-emerald-500">
      {{ message }}
    </AlertDescription>
  </Alert>
</template>

<style>

</style>

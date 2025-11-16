<script lang="ts" setup>
import { Alert, AlertDescription } from '@/components/ui/alert'

defineProps<{
  error: string | null
}>()
</script>

<template>
  <Alert v-if="error" variant="destructive">
    <!-- <AlertTitle>Error</AlertTitle> -->
    <AlertDescription>
      {{ error }}
    </AlertDescription>
  </Alert>
</template>

<style>

</style>

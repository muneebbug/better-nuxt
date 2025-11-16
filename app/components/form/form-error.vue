<template>
  <Alert variant="destructive" v-if="error">
    <!-- <AlertTitle>Error</AlertTitle> -->
    <AlertDescription>
      {{ error }}
    </AlertDescription>
  </Alert>
</template>

<script lang="ts" setup>
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

  defineProps<{
    error: string | null
  }>()

</script>

<style>

</style>
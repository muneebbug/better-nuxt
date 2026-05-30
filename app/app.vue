<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Better Nuxt`
      : 'Better Nuxt'
  },
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

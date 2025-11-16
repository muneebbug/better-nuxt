<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1 flex items-center container mx-auto my-8 px-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
</script>
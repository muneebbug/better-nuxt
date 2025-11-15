<template>
  <footer class="border-t bg-background">
    <div class="container mx-auto px-4 py-6 text-sm text-muted-foreground flex items-center justify-between">
      <span>© {{ year }} Nuxt 4 Starter</span>
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="hover:text-foreground">Home</NuxtLink>
        <NuxtLink to="/protected" class="hover:text-foreground">Protected</NuxtLink>
        <a href="https://github.com/muneebbug/better-nuxt" target="_blank" class="hover:text-foreground">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
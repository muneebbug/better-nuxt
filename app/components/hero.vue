<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { loggedIn } = storeToRefs(useAuthStore())
</script>

<template>
  <section class="py-20">
    <div class="container mx-auto px-4 text-center max-w-3xl">
      <h1 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        A better Nuxt 4 starter
      </h1>
      <p class="text-muted-foreground text-lg md:text-xl mb-8">
        Minimal, fast, and practical starter with auth, UI components, and serverless-ready setup.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button :to="loggedIn ? '/protected' : '/signup'">
          Get Started
        </Button>
        <Button
          as="a"
          href="https://github.com/muneebbug/better-nuxt"
          target="_blank"
          variant="outline"
          size="lg"
        >
          View on GitHub
        </Button>
      </div>
    </div>
  </section>
</template>

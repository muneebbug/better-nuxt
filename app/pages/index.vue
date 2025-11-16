<script setup lang="ts">
import { Paintbrush, Rocket, ShieldCheck } from 'lucide-vue-next'

import Hero from '~/components/hero.vue'
</script>

<template>
  <div>
    <Hero />
    <section class="container mx-auto px-4 py-10">
      <div class="grid gap-6 md:grid-cols-3">
        <div class="rounded-lg border p-6">
          <Rocket class="w-6 h-6 mb-2" />
          <h3 class="font-semibold mb-2">
            Fast setup
          </h3>
          <p class="text-muted-foreground">
            Nuxt 4 + shadcn-vue + auth ready out of the box.
          </p>
        </div>
        <div class="rounded-lg border p-6">
          <ShieldCheck class="w-6 h-6 mb-2" />
          <h3 class="font-semibold mb-2">
            Auth & guards
          </h3>
          <p class="text-muted-foreground">
            Protected, public, and guest-only route middlewares included.
          </p>
        </div>
        <div class="rounded-lg border p-6">
          <Paintbrush class="w-6 h-6 mb-2" />
          <h3 class="font-semibold mb-2">
            Beautiful UI
          </h3>
          <p class="text-muted-foreground">
            Prebuilt components for rapid prototyping and clean design.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

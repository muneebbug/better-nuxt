<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  loading?: boolean
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})

const buttonBg = computed(() => {
  const buttonVariant = buttonVariants({ variant: props.variant })
  return buttonVariant.split(' ').find(className => className.startsWith('bg-'))
})

</script>

<template>
  <NuxtLink
    v-if="to"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :to="to"
    class="space-x-3 cursor-pointer"
  >
    <slot />
  </NuxtLink>

  <Primitive
    v-else
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="props.loading"
    class="cursor-pointer relative"
  >
    <!-- span bg should be exactly same as  button bg based on variant -->
    <span
      :class="[props.loading ? 'opacity-100' : 'opacity-0', buttonBg]"
      class="absolute left-0 top-0 w-full h-full inset-0 flex items-center justify-center"
    >
      <Loader2
        class="h-4 w-4 animate-spin"
      />
    </span>
    <slot />
  </Primitive>
</template>

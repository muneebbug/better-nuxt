<script setup lang="ts">
import { Home, Menu, Moon, Package2, Sun } from 'lucide-vue-next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useColorMode } from '#imports'

const { user, loggedIn } = storeToRefs(useAuthStore())
const { signOut } = useAuthStore()

const { generateUserInitials } = useUtils()
const route = useRoute()

const activeRoute = computed(() => route.path)
const drawerRoutes = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Protected', icon: Package2, to: '/protected' },
]

// Color mode toggle
const colorMode = useColorMode()
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <img
          src="/logo-inverted.svg"
          alt="Logo"
          class="h-6 dark:inline hidden"
        >
        <img
          src="/logo.svg"
          alt="Logo"
          class="h-6 dark:hidden"
        >
        <span class="sr-only">Nuxt 4 Starter</span>
      </NuxtLink>
      <NuxtLink
        to="/"
        class="text-foreground transition-colors hover:text-foreground"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/protected"
        class="text-muted-foreground transition-colors hover:text-foreground"
      >
        Protected
      </NuxtLink>
    </nav>

    <Sheet>
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden"
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-lg font-semibold md:text-base p-4"
        >
          <img
            src="/logo-inverted.svg"
            alt="Logo"
            class="h-6 dark:inline hidden"
          >
          <img
            src="/logo.svg"
            alt="Logo"
            class="h-6 dark:hidden"
          >
          <span class="sr-only">Nuxt 4 Starter</span>
        </NuxtLink>
        <nav class="grid gap-2 text-lg font-medium p-4">
          <NuxtLink
            v-for="item in drawerRoutes"
            :key="item.label"
            :to="item.to"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
            :class="activeRoute === item.to ? 'bg-muted text-foreground' : 'text-muted-foreground'"
          >
            <component :is="item.icon" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </SheetContent>
    </Sheet>

    <NuxtLink
      to="/"
      class="md:hidden flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <img
        src="/logo-inverted.svg"
        alt="Logo"
        class="h-6 dark:inline hidden"
      >
      <img
        src="/logo.svg"
        alt="Logo"
        class="h-6 dark:hidden"
      >
      <span class="sr-only">Nuxt 4 Starter</span>
    </NuxtLink>

    <div class="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle color mode"
        @click="toggleColorMode"
      >
        <!-- Render both icons to avoid SSR hydration mismatch; toggle via CSS -->
        <Sun class="h-5 w-5 dark:hidden" />
        <Moon class="h-5 w-5 hidden dark:inline" />
        <span class="sr-only">Toggle color mode</span>
      </Button>
      <div class="flex items-center gap-2">
        <Button
          v-if="!loggedIn"
          aria-label="Login"
          to="/login"
        >
          Login
          <span class="sr-only">Login</span>
        </Button>
      </div>
      <DropdownMenu v-if="loggedIn">
        <DropdownMenuTrigger as-child>
          <Button
            id="user-menu"
            variant="secondary"
            size="icon"
            class="rounded-full"
          >
            <Avatar>
              <AvatarImage
                v-if="user?.image"
                :src="user?.image!"
                :alt="user?.name"
              />
              <AvatarFallback>{{ generateUserInitials(user?.name!) || 'U' }}</AvatarFallback>
            </Avatar>
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem class="p-0 cursor-pointer">
            <NuxtLink to="/protected" class="w-full h-full py-2 px-4">
              Protected
            </NuxtLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="p-0 cursor-pointer" @click="signOut({ redirectTo: '/' })">
            <div class="w-full h-full py-2 px-4">
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

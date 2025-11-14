<template>
  <section class="container mx-auto px-4 py-10">
    <div class="max-w-md mx-auto">
      <pre>

      </pre>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="user" class="flex items-center gap-4">
            <Avatar>
              <AvatarImage v-if="user.image" :src="user.image!" :alt="user.name" />
              <AvatarFallback>{{ initials }}</AvatarFallback>
            </Avatar>
            <div>
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-sm text-muted-foreground">{{ user.email }}</p>
            </div>
          </div>
          <div v-else class="text-sm text-muted-foreground">Loading your account…</div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

definePageMeta({
  auth: {
    only: 'user',
  }
})

const { user } = useAuth()

const { generateUserInitials } = useUtils()
const initials = computed(() => generateUserInitials(user.value?.name || '') || 'U')


</script>
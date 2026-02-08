<template>
  <div class="flex flex-col justify-between min-h-screen">
    <Header />
    <main class="min-h-full flex items-center justify-center">
      <div class="w-full max-w-sm">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>

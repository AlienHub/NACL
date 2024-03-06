<template>
  <ClientOnly>
    <NuxtPage />
  </ClientOnly>
</template>


<script setup lang="ts">

const router = useRouter()

const nav = [
  { label: 'Home', to: '/' },
  { label: 'sign', to: '/sign' }
]

</script>
<template>
  <NuxtPage />
</template>


<script setup lang="ts">
const router = useRouter()

const nav = [
  { label: 'Home', to: '/' },
  { label: 'remote', to: '/remote' }
]

</script>
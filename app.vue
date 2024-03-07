<template>
  <VitePwaManifest />
  <NuxtPage />
</template>


<script setup lang="ts">

const router = useRouter()

const nav = [
  { label: 'Home', to: '/' },
  { label: 'sign', to: '/sign' }
]

</script>
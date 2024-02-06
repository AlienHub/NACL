<template>
    <Navbar></Navbar>
    <div class="main">
        <ClientOnly>
            <Remote></Remote>
        </ClientOnly>
    </div>
</template>


<script setup lang="ts">

</script>

<style scoped>
.main {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    max-width: 1200px;
}
</style>
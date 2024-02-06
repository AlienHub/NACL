<template>
    <Navbar />
    <div class="indexmain">
        <ClientOnly>
            <div >
                <Local></Local>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.indexmain {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    max-width: 1200px;
}
</style>
<template>
    <!-- <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <a href="/">
                    <img src="/nacl.svg" alt="logo" />
                </a>
            </div>
            <div class="tabs">
                <div class="textdef" :class="{ tabstext: isActive }" @click="toggle('local')">
                    本地
                </div>
                <div class="textdef" :class="{ tabstext: !isActive }" @click="toggle('remote')">
                    远程
                </div>
            </div>
        </div>
    </nav> -->
    <Navbar />
    <div class="indexmain">
        <ClientOnly>
            <div v-if="isActive">
                <Local></Local>
            </div>
            <div v-else>
                <Remote></Remote>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

const isActive = ref(true)

const toggle = (key: string) => {
    if (key === 'local') {
        isActive.value = true
        router.push('/local');
    } else if (key === 'remote') {
        isActive.value = false
        router.push('/remote');
    }
}

</script>

<style scoped>
.navbar {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.navbar-logo {
    display: flex;
    align-items: center;
}

.navbar-container {
    width: 80%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
}

.tabs {
    display: flex;
    gap: 20px;
    font-size: 18px;
    cursor: pointer;
}

.tabstext {
    padding: 10px;
    border-bottom: 4px solid #333;
    font-weight: bold;
}

.textdef {
    padding: 10px;
    color: rgb(51, 51, 51);
}

.textnover {
    padding: 10px;
    color: rgb(51, 51, 51, 0.5);
}

.indexmain {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    max-width: 1200px;
}
</style>
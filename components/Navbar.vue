<template>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <a href="/">
                    <img src="/nacl.svg" alt="logo" />
                </a>
            </div>
            <div class="tabs">
                <div class="textdef" :class="{ tabstext: isActive }" @click="toggle('local')">
                    <span>本地</span>
                </div>
                <div class="textdef" :class="{ tabstext: ! isActive }" @click="toggle('remote')">
                    <span>远程<NuxtLink to="/remote"></NuxtLink></span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">

const isActive = ref(true)

const toggle = (key:string) => {
    if (key === 'local') {
        isActive.value = true
    } else {
        isActive.value = false
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
}
</style>
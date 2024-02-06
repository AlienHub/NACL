<template>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <a href="/">
                    <img src="/nacl.svg" alt="logo" />
                </a>
            </div>
            <div class="tabs">
                <div class="textdef" :class="{ tabstext: isActive('/') }" @click="toggle('/')">
                    本地
                </div>
                <div class="textdef" :class="{ tabstext: isActive('/remote') }" @click="toggle('/remote')">
                    远程
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const router = useRouter()

const isActive = (path: string) => router.currentRoute.value.path === path;

const toggle = (path: string) => {
    router.push(path);
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
    border-bottom: 4px solid var(--el-color-primary);
    font-weight: bold;
    color: var(--el-color-primary) !important;;
}

.textdef {
    padding: 10px;
    color: rgb(51, 51, 51);
}

</style>
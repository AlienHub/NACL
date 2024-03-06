<template>
    <nav class="navbar">
        <a class="navbar-logo" href="/">
            <img src="/logo.svg" alt="logo" />
        </a>
        <div class="action">
            <div class="icon" @click="toggle('/add')"><img src="/add.svg" alt="SVG Icon"></div>
            <div class="icon-scanner" @click="toggle('/scanner')"><img src="/Vector.svg" alt="SVG Icon"></div>
            <div class="textdef" @click="login()">
                {{ sgin }}
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const router = useRouter()
const sgin = ref('Sgin in')
const login = () => {
    if (sgin.value !== 'Hello') {
        router.push('/sgin'); 
    }
}
const toggle = (path: string) => {
    router.push(path);        

}
onMounted(() => {
    const localStorageValue = localStorage.getItem('token');

    if (localStorageValue) {
        sgin.value = 'Hello';
    }else {
        sgin.value = 'Sgin in'
    }
});


</script>

<style scoped>
.navbar {
    width: calc(100% - 48px);
    height: 48px;
    display: flex;
    align-items: center;
    margin: 0 24px;
}

.navbar-logo {
    display: flex;
    align-items: center;
}

.action {
    display: flex;
    gap: 24px;
    font-size: 14px;
    cursor: pointer;
    margin-left: auto;
    justify-content: flex-end;
    align-items: center;
}

.icon {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}

.icon:hover {
    background-color: #F0F0F0;
}

.icon-scanner {
    display: none;
}

@media only screen and (max-width: 600px)  {
    .icon-scanner{
        width: 32px;
        height: 32px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }
    .icon-scanner:active {
        background-color: #F0F0F0;
    }
    .icon:active {
        background-color: #F0F0F0;
    }
}

.tabstext {
    padding: 10px;
    border-bottom: 4px solid var(--el-color-primary);
    font-weight: bold;
    color: var(--el-color-primary) !important;
    ;
}

.textdef {
    padding: 10px;
    color: rgb(51, 51, 51);
}
</style>
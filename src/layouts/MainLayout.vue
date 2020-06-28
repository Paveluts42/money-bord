<template>
    <div>
        <loader v-if="loading"/>

        <div v-else class="app-main-layout">
            <navbar @click="isOpen=!isOpen"/>
            <side-bar v-model="isOpen"/>


            <main class="app-content " :class="{full:!isOpen}">
                <div class="app-page">

                    <router-view/>


                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link class="btn-floating btn-large blue" to="/record" v-tooltipe="'Создать новую запись'">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "../components/app/Navbar"
    import SideBar from "../components/app/SideBar"
    import messages from "../utils/messages";

    export default {
        data: () => ({
            isOpen: true,
            loading: true
        }),
        mounted() {
            if (!Object.keys(this.$store.getters.info).length) {
                this.$store.dispatch('fetchUser')
            }
            this.loading = false

        },
        components: {
            Navbar,
            SideBar

        },
        computed:{
            error(){
                return   this.$store.getters.error
            }
        },
        watch:{
            error(fbError){
                this.$error( messages[fbError.code] || 'Ошибка')
            }
        }

    }
</script>

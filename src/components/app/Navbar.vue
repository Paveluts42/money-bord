<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('click')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{date |date('datetime')}}</span>
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a
                            class="dropdown-trigger black-text"
                            href="#"
                            data-target="dropdown"
                            ref="dropdown"
                    >
                        {{name}}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                        <router-link tag="li" to="/profile">
                            <a href="#" class="black-text">
                                <i class="material-icons">account_circle</i>{{'ProfileTitle'|localize}}
                            </a>
                        </router-link>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a href="#" class="black-text" @click.prevent="logout">
                                <i class="material-icons">assignment_return</i>{{'exit'|localize}}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
    export default {
        data: () => ({
            date: new Date(),
            dateUpdate: null,
            dropdown: null
        }),
        computed: {

            name(){
                return this.$store.getters.info.name
            }
        },

        mounted() {
            this.dateUpdate = setInterval(() => {
                this.date = new Date()
            }, 1000)
            this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
                constrainWidth: false
            })
        },
        methods: {
            async logout() {
                await this.$store.dispatch('logOut')
                this.$router.push("/login?message=logout")
            }
        },
        beforeDestroy() {
            clearInterval(this.dateUpdate)
            if (this.dropdown && this.dropdown.destroy) {
                this.dropdown.destroy()
            }
        }
    }
</script>

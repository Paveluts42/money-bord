<template>
    <ul class="sidenav app-sidenav " :class="{open:value}">
        <router-link
                v-for="(item,index) in route"
                :key="index"
                tag="li"
                :exact="item.exact"
                active-class="active"
                :to="item.url"

        >
            <a href="#" class="waves-effect waves-orange pointer">{{item.name |localize}}</a>
        </router-link>

    </ul>
</template>

<script>
    export default {
        props: {
            value:Boolean
        }
        ,
        data: () => ({
            route: [
                {name: "Bill", exact: true, url: "/"},
                {name: "History",  url: "/history"},
                {name: "Planing", url: "/planning"},
                {name: "newRecord",  url: "/record"},
                {name: "Category",  url: "/categories"},
            ]
        })
    }
</script>

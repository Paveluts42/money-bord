<template>
    <div>
        <div class="page-title">
            <h3>{{'Planing'|localize}}</h3>
            <h4>{{info.bill | currency("RUB")}}</h4>
        </div>
        <loader v-if="loading"/>
        <p class="center" v-else-if="!categories.length">Нет категорий.
            <router-link to="/categories">Создать категорию</router-link>
        </p>
        <section v-else>
            <div v-for="i in categories" :key="i.id">
                <p>
                    <strong>{{i.title}}</strong>
                    {{i.spend |currency("RUB")}} {{'of'|localize}} {{i.limit |currency("RUB")}}
                </p>
                <div class="progress" v-tooltipe="i.tooltip">
                    <div
                            class="determinate "
                            :class="[i.progressColor]"
                            :style="{width:i.progressPercent +'%'}"
                    ></div>
                </div>
            </div>
        </section>
    </div>

</template>
<script>
    import {mapGetters} from 'vuex'
    import currencyFilter from "../../filters/Currency.Filter";
    export default {
        name: "planing",
        data: () => ({
            loading: true,
            categories: []
        }),
        computed: {
            ...mapGetters(['info'])
        },
        metaInfo(){
            return {
                title: this.$title("Planing")
            }
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')
            this.categories = categories.map(i => {
                const spend = records
                    .filter(r => r.categoryId === i.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount
                    }, 0)
                const percent = 100 * spend / i.limit
                const progressPercent = percent > 100 ? 100 : percent
                const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : "red"
                const tooltipValue = i.limit - spend
                const tooltip = `${tooltipValue < 0 ? 'Превышение на ' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
                return {
                    ...i, progressPercent, progressColor, spend, tooltip
                }
            })
            this.loading = false
        }
    }
</script>

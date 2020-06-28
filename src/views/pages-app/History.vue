<template>
    <div>
        <div class="page-title">
            <h3>{{'historyRecord'|localize}}</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>
        <loader v-if="loading"/>
        <p class="center" v-else-if="!records.length">Записей пока нет
            <router-link to="/record"> Добавте первую</router-link>
        </p>
        <section v-else>
            <history-table @updateRecord="updateRecord" :records="items"/>
            <paginate :page-count="pageCount"
                      :click-handler="pageChangeHandler"
                      :prev-text="'back'|localize"
                      :next-text="'forward'|localize"
                      :container-class="'pagination'"
                      :page-class="'waves-effect'"
                      v-model="page"

            />
        </section>
    </div>
</template>

<script>
    import HistoryTable from "../../components/HistoryTable";
    import paginationMixin from '../../mixins/pagination.mixin'
    import {Pie} from 'vue-chartjs'

    export default {
        name: "History",
        extends: Pie,
        data: () => ({
            loading: true,
            records: [],
            categories: []
        }),
        mixins: [paginationMixin],
        metaInfo(){
            return {
                title: this.$title("History")
            }
        },
        async mounted() {

            await this.updateRecord()
            this.loading = false
        },
        methods: {
            async updateRecord() {
                this.records = await this.$store.dispatch('fetchRecords')
                this.categories = await this.$store.dispatch('fetchCategories')
                this.setUpPagination(this.records.map((rec) => {
                    return {
                        ...rec,
                        categoryName: this.categories.find(s => s.id === rec.categoryId).title,
                        typeClass: rec.type === 'income' ? 'green' : 'red',
                        typeText: rec.type === 'income' ? 'Доход' : 'Расход',
                    }
                }))
                console.log(this.categories)
                this.renderChart({
                    labels: this.categories.map(r=>r.title),
                    datasets: [{
                        label: 'Расходы по категориям',
                        data: this.categories.map(c=>{
                            return this.records.reduce((total,r)=>{
                                if(r.categoryId===c.id && r.type ==='outcome'){
                                    total += +r.amount
                                }
                                return total
                            },0)
                        }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                })

            },

        },
        components: {
            HistoryTable
        }
    }
</script>

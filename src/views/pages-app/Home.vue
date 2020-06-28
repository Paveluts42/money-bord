<template>
    <div>
        <div class="page-title">
            <h3>{{'Bill'|localize}}</h3>

            <button @click="refresh" class="btn waves-effect waves-light btn-small">
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <loader v-if="loading"/>
        <div v-else class="row">
            <home-bill
                    :rates="currency.rates"
            />
            <home-currency :rates="currency.rates"
            :date="currency.date"
            />
        </div>
    </div>
</template>

<script>
    import HomeBill from '@/components/HomeBill'
    import HomeCurrency from '@/components/HomeCurrency'

    export default {
        name: 'Home',
        data: () => ({
            loading: true,
            currency: null
        }),

        async mounted() {
            this.currency = await this.$store.dispatch('fetchCurrency')
            console.log(this.currency.date)
            this.loading = false
        },
        metaInfo(){
            return {
                title: this.$title("Bill")
            }
        },
        methods:{
          async  refresh(){
                this.loading=true
                this.currency = await this.$store.dispatch('fetchCurrency')
                this.loading = false

            }
        },
        components: {
            HomeBill,
            HomeCurrency
        },
    }
</script>

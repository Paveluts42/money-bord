<template>
    <div>
        <div class="page-title">
            <h3>{{'newRecord'|localize}}</h3>
        </div>
        <loader v-if="loading"/>
        <p class="center" v-else-if="!categories.length">Нет категорий.
            <router-link to="/categories">Создать категорию</router-link>
        </p>
        <form v-else class="form" @submit.prevent="hendleSubmit">
            <div class="input-field">
                <select v-model="category" ref="select">
                    <option
                            v-for="c in categories"
                            :key="c.id"
                            :value="c.id"
                    >{{c.title}}
                    </option>
                </select>
                <label>{{'choseCat'|localize}}</label>
            </div>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="income"
                            v-model="type"
                    />
                    <span>{{"Доход"|localize}}</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                            class="with-gap"
                            name="type"
                            type="radio"
                            value="outcome"
                            v-model="type"

                    />
                    <span>{{"Расход"|localize}}</span>
                </label>
            </p>

            <div class="input-field">
                <input
                        id="amount"
                        type="number"
                        v-model.number="amount"
                        :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)
                        ||
                        ($v.amount.$dirty && !$v.amount.required)
                        }"

                >
                <label for="amount">{{"amount"|localize}}</label>
                <span
                        v-if="($v.amount.$dirty && !$v.amount.minValue)
                         ||
                        ($v.amount.$dirty && !$v.amount.required)"
                        class="helper-text invalid"
                >
            Минимальная значение {{$v.amount.$params.minValue.min}}
          </span>

            </div>

            <div class="input-field">
                <input
                        v-model="description"
                        :class="{invalid: $v.description.$dirty && !$v.description.required}"

                        id="description"
                        type="text"
                >
                <label for="description">{{'Description'|localize}}</label>
                <span
                        v-if="$v.description.$dirty && !$v.description.required"
                        class="helper-text invalid"
                >
            Введите описание
          </span>
            </div>


            <button class="btn waves-effect waves-light" type="submit">
                {{'Create'|localize}}
                <i class="material-icons right">send</i>
            </button>

        </form>
    </div>

</template>

<script>
    import {minValue, required} from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex'

    export default {
        name: 'record',
        data: () => ({
            loading: true,
            select: null,
            category: null,
            categories: [],
            type: 'outcome',
            amount: 1,
            description: ''
        }),
        metaInfo(){
            return {
                title: this.$title("newRecord")
            }
        },
        validations: {
            amount: {minValue: minValue(1), required},
            description: {required}
        },
        async mounted() {

            this.categories = await this.$store.dispatch("fetchCategories")
            this.loading = false
            if (this.categories.length) {
                this.category = this.categories[0].id
            }
            setTimeout(() => {
                this.select = window.M.FormSelect.init(this.$refs.select)
                window.M.updateTextFields()
            })

        },
        computed: {
            ...mapGetters(['info']),
            canCreateRecord() {
                if (this.type === "income") {
                    return true
                }
                return this.info.bill >= this.amount
            }
        },
        methods: {
            async hendleSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                if (this.canCreateRecord) {
                    try {
                        await this.$store.dispatch('createRecord', {
                            categoryId: this.category,
                            amount: this.amount,
                            description: this.description,
                            type: this.type,
                            data: new Date().toJSON()
                        })
                        const bill = this.type === 'income' ? this.info.bill + this.amount
                            :
                            this.info.bill - this.amount
                        await this.$store.dispatch('updateInfo',{bill})
                        this.$message('Запись успешно создана')
                        this.$v.$reset()
                        this.amount=1
                        this.description=''
                    } catch (e) {
                        this.$error(e)
                    }

                } else {
                    this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
                }

            }
        },

        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

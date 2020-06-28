<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{'edit'|localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                    <select ref="select" v-model="current">
                        <option
                                v-for="c of categories"
                                :key="c.id"
                                :value="c.id"
                        >{{c.title}}</option>
                    </select>
                    <label>{{'choseCat'|localize}}</label>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">{{"name"|localize}}</label>
                    <span
                            v-if="$v.title.$dirty && !$v.title.required"
                            class="helper-text invalid"
                    >
            {{'inputName'|localize}}
          </span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                    >
                    <label for="limit">{{'limit'|localize}}</label>
                    <span
                            v-if="$v.limit.$dirty && !$v.limit.minValue"
                            class="helper-text invalid"
                    >
            Минимальная значение {{$v.limit.$params.minValue.min}}
          </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{'update'|localize}}
                    <i class="material-icons right">send</i>
                </button>

            </form>
            <button
                    style="margin-left: 5px"
                    class="btn  btn red lighten-1 "
                    @click="deleteCategory"
            >
                {{'delete'|localize}}
                <i class="material-icons right">close</i>
            </button>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'

    export default {
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            select: null,
            title: '',
            limit: 100,
            current: null
        }),
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },
        watch: {
            current(catId) {
                const {title, limit} = this.categories.find(c => c.id === catId)
                this.title = title
                this.limit = limit
            }
        },
        created() {
            const {id, title, limit} = this.categories[0]
            this.current = id
            this.title = title
            this.limit = limit
        },
        methods: {
            async deleteCategory(){
                await this.$store.dispatch('deleteCategory', this.current)
                this.$message('Категория упешно удалена')
                this.$emit('delete',this.current)
            },

            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return

                }

                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }
                    await this.$store.dispatch('updateCategory', categoryData)
                    this.$message('Категория упешно обновлена')
                    this.$emit('updated', categoryData)
                } catch (e) {
                    return e
                }
            }
        },
        mounted() {
            this.select =  window. M.FormSelect.init(this.$refs.select)
           window. M.updateTextFields()
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

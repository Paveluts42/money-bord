<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{"Create"|localize}}</h4>
            </div>

            <form @submit.prevent="submitHendler">
                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid:$v.title.$error && !$v.title.required}"
                    >
                    <label for="name">{{"name"|localize}}</label>
                    <span class="helper-text invalid"
                          v-if="$v.title.$error && !$v.title.required">{{'inputName'|localize}}</span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid:$v.limit.$error && !$v.limit.minValue}"

                    >
                    <label for="limit">{{'limit'|localize}}</label>
                    <span class="helper-text invalid"
                          v-if="$v.limit.$error && !$v.limit.minValue"
                    >
                        Минимальная величина {{$v.limit.$params.minValue.min}}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{"Create"|localize}}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>

</template>

<script>
    import {minValue, required} from 'vuelidate/lib/validators'

    export default {
        data: () => ({
            title: '',
            limit: 100,
        }),
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },
        mounted() {
            window.M.updateTextFields()
        },
        methods: {
          async  submitHendler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                try {

                const category = await  this.$store.dispatch('createCategory',{
                        title:this.title,
                        limit:this.limit
                    })
                    console.log(category)
                    this.title=''
                    this.limit=100
                    this.$v.$reset()
                    this.$message('Категория создана')
                        this.$emit('created',category)
                }catch (e) {
                    this.$error(e)
                }

            }
        },

    }
</script>

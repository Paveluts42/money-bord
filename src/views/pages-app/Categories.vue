<template>
    <div>

        <div class="page-title">
            <h3>{{'Category'|localize}}</h3>
        </div>
        <section>
            <loader v-if="loading"/>

            <div v-else class="row">
                <category-create @created="addNewCategory"/>
                <category-edit
                        @delete="deleteCategories"
                        v-if="categories.length"
                        @updated="updateCategories"
                        :key="categories.length + updateCount"
                        :categories="categories"/>
                <p v-else class="center">Нет категорий</p>
            </div>
        </section>

    </div>
</template>

<script>
    import CategoryCreate from '@/components/CategoryCreate'
    import CategoryEdit from '@/components/CategoryEdit'

    export default {
        name: 'categories',
        metaInfo(){
            return {
                title: this.$title("Category")
            }
        },
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0
        }),
        components: {
            CategoryCreate,
            CategoryEdit
        },
        async mounted() {
            try {
                this.categories = await this.$store.dispatch('fetchCategories')
            } catch (e) {
                this.$error(e)
            }
            this.loading = false
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category)
            },
            updateCategories(category) {
                const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].title = category.title
                this.categories[idx].limit = category.limit
                this.updateCount++
            },
            deleteCategories(id) {
                this.categories=  this.categories.filter(c => c.id !== id)

            },
        }

    }
</script>

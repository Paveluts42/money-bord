import * as firebase from "firebase";

export default {
    state:{
      category:[]
    },
    actions: {
        async createCategory({commit, dispatch}, {title, limit}) {
            try {
                const uid = await dispatch('getUserId')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
                return {title, limit, id: category.key}
            } catch (e) {
                commit('setError', e)
                return e
            }
        },
        async updateCategory({commit,dispatch}, {title,limit,id}){
            try {
                const uid = await dispatch('getUserId')



                    await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})

            } catch (e) {
                commit('setError', e)
                return e
            }
        },
        deleteCategory: async function ({commit, dispatch}, id) {
            try {
                console.log(id)
                const uid = await dispatch('getUserId')

                await firebase.database().ref(`/users/${uid}/categories/${id}`).remove()
            } catch (e) {
                commit('setError', e)
                return e
            }
        },
        async fetchCategories ({commit, dispatch}){
            try {
                const uid = await dispatch('getUserId')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val()||{}


             return    Object.keys(category).map(key=>({
                 ...category[key],id:key
             }))
            } catch (e) {
                commit('setError', e)
                return e
            }
        }  ,
        async fetchCategoryById ({commit, dispatch},id){
            try {
                const uid = await dispatch('getUserId')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val()||{}


             return  {...category,id}
            } catch (e) {
                commit('setError', e)
                return e
            }
        }
    }
}

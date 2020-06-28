import firebase from 'firebase/app'

export default {
    actions: {
        // eslint-disable-next-line no-unused-vars
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)

            } catch(e){
commit('setError',e)
                throw e
            }
        },
        async logOut({commit}){
         await   firebase.auth().signOut()
             commit('clearInfo')
        },
        // eslint-disable-next-line no-unused-vars
        async register({dispatch, commit}, {email, password,name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid=await dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill:0,
                    name
                })

            } catch(e){
                commit('setError',e)
                throw e
            }
        },

        getUserId(){
          let user =  firebase.auth().currentUser
            return user ? user.uid :null
        }
    }


}

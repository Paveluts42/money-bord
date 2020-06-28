<template>
    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>{{'amount'|localize}}</th>
            <th>{{'date'|localize}}</th>
            <th>{{'Category'|localize}}</th>
            <th>{{'type'|localize}}</th>
            <th>{{'open'|localize}}</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(rec,index) in records" :key="rec.id">
            <td>{{index + 1}}</td>
            <td>{{rec.amount | currency('RUB')}}</td>
            <td>{{rec.data | date('datetime')}}</td>
            <td>{{rec.categoryName}}</td>
            <td>
                <span class="white-text badge"
                      :class="[rec.typeClass]" >{{rec.typeText|localize}}</span>
            </td>
            <td>
                <button
                        class="btn-small btn"
                        @click="$router.push('/detail/'+ rec.id)"
                v-tooltipe="'showRecord'"
                >
                    <i class="material-icons">open_in_new</i>
                </button>
                <button
                        style="margin-left: 5px"
                        class="btn-small  btn red lighten-1 "
                        @click="deleteRecord(rec.id)"
                v-tooltipe="'delete'"
                >
                    <i class="material-icons">close</i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>

</template>
<script>
    export default {
        name:'HistoryTab',
        props:{
            records:{
                required:true,
                type:Array
            }
        },
        mounted() {
            console.log(this.records)
        },
        methods:{
         async   deleteRecord(id){
            await    this.$store.dispatch('deleteRecord',id)
this.$emit("updateRecord")
            }
        }
    }
</script>

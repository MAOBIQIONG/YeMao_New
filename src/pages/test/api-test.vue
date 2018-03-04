<template>
    <div>
        <button @click="queryList('comments')">
            queryList
        </button>
        <ul>
            <li>a</li>
        </ul>
    </div>
</template>
<script>
export default{
    data(){
        return {
            data:[],
            pageNo:0,
            pageSize:200,
        }
    },
    methods:{
        queryList(coll){
            let _self = this;
            console.log(coll);
            let params = {
                interfaceId:common.interfaceIds.queryList,
                coll:coll,
                // user_id: '5a9a635c5844423e439d833e',
                where:{
                    user_id:'5a5edb3f9bc0184eb7fb2848',
                    floor:2
                },
                pageNo:this.pageNo,
                pageSize:this.pageSize
            }
             _self.$axios.post('/mongoApi', {
                params: params
            }, response => {
                console.log(response);
            })
        }
    },
    created(){

    }
}
</script>
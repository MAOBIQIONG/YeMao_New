<template>
<div v-if="ended">
    {{endMsg}}
</div>
<div v-else>
    <slot name="header"></slot>
    <counter @countDownEnd="countDownEnd()" :endtime="endtime" ></counter>
    <slot name="footer"></slot>
</div>


</template>
<script>
import counter from '@/components/counter'    
export default {
    components:{
        counter
    },
    data(){
        return{
            ended:false,
            endMsg:'已截止'
        }
    },
    props: ['endtime'],
    methods:{
        countDownEnd(){
            this.ended = true;
        }
    }
}
</script>
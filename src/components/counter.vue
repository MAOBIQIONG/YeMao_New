<template>
	<span class='orange'>{{countDownTime}}</span>
</template>
<script>
export default{
    data(){
        return{
            now:0
        }
    },
    props: ['endtime'],
    methods:{
		formate(time){
            if(time<=0){
                this.$emit('countDownEnd');
                clearInterval(this.timeProcess);
                return 0 + '小时' + 0 + '分钟';
            }
            let day = parseInt(time/1000/3600/24)
			let hour = parseInt(time/1000/3600);
			let min = parseInt((time/1000 - hour * 3600)/60);
            let sec = parseInt(time/1000 - hour * 3600 - min * 60)
            if(day<=0){
                return hour + '小时' + min + '分钟';
            } else {
			    return day+'天'
            }

		}
    },
    computed:{
		'countDownTime': function(){
			return this.formate(new Date(this.endtime).getTime() - this.now);
        }	
    },
    created(){
        let self = this;
        self.now = new Date().getTime();
		this.timeProcess = setInterval(function(){
			self.now = new Date().getTime();
		}, 1000);
    }

}
</script>
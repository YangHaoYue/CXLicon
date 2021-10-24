<template>
	<view class="u-p-30">
		<view class="u-m-b-20 u-font-28 text-black text-bold">
			{{title}}{{desc}}
		</view>
		<block v-for="(item,index) in questionList" :key="item.id">
			<view class=" u-m-t-20">
				<view class="title u-font-28 text-black text-bold">
					{{index+1}}{{item.title}}
				</view>
				<u-radio-group wrap active-color="#DC2672"  @change="radioGroupChange($event,index)" v-if="item.type===0">
					<u-radio v-for="(son, i) in item.items" :key="i" :name="son">{{son}}</u-radio>
				</u-radio-group>
				<u-checkbox-group shape="circle" wrap active-color="#DC2672" @change="checkboxGroupChange($event,index)" v-if="item.type===1">
					<u-checkbox v-model="son.checked" v-for="(son, j) in item.items" :key="j" :name="son.name">{{son.name}}</u-checkbox>
				</u-checkbox-group>
				<view class="textarea" v-if="item.type===2">
					<textarea @input="textInput($event,index)" type="text" placeholder="说说您认为我们还需要改进的地方" :placeholderStyle="placeholderStyle" />
				</view>
			</view>
		</block>
		
		<u-button :custom-style="customStyle" type="error" shape="circle" @click="submitAnswerOfQuestionnaire">确认保存</u-button>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getQuestions()
		},
		data() {
			return {
				title:'',
				desc:'',
				questionList:[],
				placeholderStyle:"color:#EE9ABB;font-size:32rpx",
				answers:{},
				customStyle:{
					backgroundColor:"#ED1E79",
					position:'fixed',
					bottom:"30rpx",
					left:'10rpx',
					right:'10rpx'
				}
			}
		},
		methods: {
			async getQuestions(){
				let {code,data} = await this.http.get('index/getQuestionnaireList')
				this.title = data.title;
				this.desc = data.desc;
				this.questionList = data.items.map(v=>{
					//问题类型0单选1多选2文本框
					if(v.type === 1){
						v.items =  v.items.map(k=>{
							return{
								name:k,
								checked:false
							}
						})
					}
					return v
				});
				console.log(this.questionList);
			},
			radioGroupChange(event,index){
				this.answers[index] = event;
			},
			checkboxGroupChange(event,index){
				this.answers[index] = event;
			},
			textInput(event,index){
				this.answers[index] = event.detail.value;
			},
			async submitAnswerOfQuestionnaire(){
				let answers = []
				for (let index in this.answers) {
					answers.push(this.answers[index])
				}
				let {code,msg} = await this.http.post('index/submitAnswerOfQuestionnaire',{answers})
				this.$u.toast(msg)
				if(code != 1000) return 
				setTimeout(()=>uni.navigateBack({delta:1}),1500)
			}
		}
	}
</script>

<style>
	.textarea{
		background-color: #FFEEF7;
		width: 690rpx;
		height: 300rpx;
		border-radius: 30rpx;
		margin: 20rpx 0;
		padding: 30rpx;
	}
</style>

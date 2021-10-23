<template>
	<view class="u-p-30">
		<view class="u-m-b-20 u-font-28 text-black text-bold">
			{{title}}{{desc}}
		</view>
		<block v-for="(item,index) in questionList" :key="item.id">
			<view class="">
				<view class="title u-font-28 text-black text-bold">
					{{index+1}}{{item.title}}
				</view>
				<u-radio-group v-model="item.q_id" wrap active-color="#DC2672"  @change="radioGroupChange($event,index)" v-if="item.type===0">
					<u-radio v-for="(son, i) in item.items" :key="i" :name="son">{{son}}</u-radio>
				</u-radio-group>
				<u-checkbox-group shape="circle" wrap active-color="#DC2672" @change="checkboxGroupChange($event,index)" v-if="item.type===1">
					<u-checkbox v-model="son.checked" v-for="(son, j) in item.items" :key="j" :name="son.name">{{son.name}}</u-checkbox>
				</u-checkbox-group>
				<view class="textarea" v-if="item.type===2">
					<u-input type="textarea" height="320" inputAlign="center" placeholder="说说您认为我们还需要改进的地方" :placeholderStyle="placeholderStyle" />
				</view>
			</view>
		</block>
		<view class="u-flex u-p-l-30 u-p-r-30">
			<view class="u-font-28 text-black text-bold u-m-r-18">姓名</view>
			<u-input border borderColor="#F01C77" />
		</view>
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
				placeholderStyle:"color:#EE9ABB;font-size:32rpx"
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
				console.log(event);
			},
			checkboxGroupChange(event,index){
				console.log(event);
			},
			submitAnswerOfQuestionnaire(){
				this.http.post('index/submitAnswerOfQuestionnaire',{
					answers:''
				})
			}
		}
	}
</script>

<style>
	.textarea{
		background-color: #FFEEF7;
		width: 650rpx;
		height: 300rpx;
		border-radius: 30rpx;
		margin: 20rpx 25rpx;
		padding: 30rpx;
	}
</style>

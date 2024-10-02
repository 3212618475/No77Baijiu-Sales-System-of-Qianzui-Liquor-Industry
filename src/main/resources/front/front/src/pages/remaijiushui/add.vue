<template>
<div :style='{"width":"calc(100% - 40px)","padding":"30px 20px 40px","margin":"20px auto 0","position":"relative","background":"rgba(255,255,255,.3)"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="酒水名称" prop="jiushuimingcheng">
            <el-input v-model="ruleForm.jiushuimingcheng" 
                placeholder="酒水名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="封面" v-if="type!='cross' || (type=='cross' && !ro.fengmian)" prop="fengmian">
            <file-upload
            tip="点击上传封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.fengmian?ruleForm.fengmian:''"
            @change="fengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' class="upload" v-else label="封面" prop="fengmian">
                <img v-if="ruleForm.fengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.fengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.fengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}'  label="酒水类型" prop="jiushuileixing">
            <el-select v-model="ruleForm.jiushuileixing" placeholder="请选择酒水类型"  >
              <el-option
                  v-for="(item,index) in jiushuileixingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}'  label="包装形式" prop="baozhuangxingshi">
            <el-select v-model="ruleForm.baozhuangxingshi" placeholder="请选择包装形式"  >
              <el-option
                  v-for="(item,index) in baozhuangxingshiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="品牌" prop="pinpai">
            <el-input v-model="ruleForm.pinpai" 
                placeholder="品牌" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="度数" prop="dushu">
            <el-input v-model="ruleForm.dushu" 
                placeholder="度数" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="储藏方法" prop="chuzangfangfa">
            <el-input v-model="ruleForm.chuzangfangfa" 
                placeholder="储藏方法" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="生产年份" prop="shengchannianfen">
            <el-input v-model="ruleForm.shengchannianfen" 
                placeholder="生产年份" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="产地" prop="chandi">
            <el-input v-model="ruleForm.chandi" 
                placeholder="产地" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="厂名" prop="changming">
            <el-input v-model="ruleForm.changming" 
                placeholder="厂名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="适用场景" prop="shiyongchangjing">
            <el-input v-model="ruleForm.shiyongchangjing" 
                placeholder="适用场景" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="生产许可证" prop="shengchanxukezheng">
            <el-input v-model="ruleForm.shengchanxukezheng" 
                placeholder="生产许可证" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="单限" prop="onelimittimes">
            <el-input v-model="ruleForm.onelimittimes" 
                placeholder="单限" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="库存" prop="alllimittimes">
            <el-input v-model="ruleForm.alllimittimes" 
                placeholder="库存" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="价格" prop="price">
            <el-input v-model="ruleForm.price" 
                placeholder="价格" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="酒水详情" prop="jiushuixiangqing">
            <editor 
                :style='{"minHeight":"200px","padding":"0","margin":"0","borderColor":"#ccc","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0px","width":"100%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.jiushuixiangqing" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"20px 0 20px 0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"0px 0px 0px #ccc","margin":"0 20px 0 0","color":"#fff","outline":"none","borderRadius":"0px","background":"linear-gradient(320deg, rgba(48,134,185,1) 0%, rgba(197,230,250,1) 80%, rgba(48,134,185,1) 100%),#3086b9","width":"110px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"0px solid #bbb","cursor":"pointer","padding":"0","boxShadow":"0px 0px 0px #eee","margin":"0","color":"#333","outline":"none","borderRadius":"0px","background":"linear-gradient(320deg, rgba(204,204,204,1) 0%, rgba(255,255,255,1) 80%, rgba(204,204,204,1) 100%),#999","width":"110px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            jiushuimingcheng : false,
            fengmian : false,
            jiushuileixing : false,
            baozhuangxingshi : false,
            pinpai : false,
            dushu : false,
            chuzangfangfa : false,
            shengchannianfen : false,
            chandi : false,
            changming : false,
            shiyongchangjing : false,
            shengchanxukezheng : false,
            jiushuixiangqing : false,
            onelimittimes : false,
            alllimittimes : false,
            thumbsupnum : false,
            crazilynum : false,
            clicktime : false,
            clicknum : false,
            price : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          jiushuimingcheng: '',
          fengmian: '',
          jiushuileixing: '',
          baozhuangxingshi: '',
          pinpai: '',
          dushu: '',
          chuzangfangfa: '',
          shengchannianfen: '',
          chandi: '',
          changming: '',
          shiyongchangjing: '',
          shengchanxukezheng: '',
          jiushuixiangqing: '',
          onelimittimes: '-1',
          alllimittimes: '-1',
          thumbsupnum: '',
          crazilynum: '',
          clicktime: '',
          clicknum: '',
          price: '',
        },
        jiushuileixingOptions: [],
        baozhuangxingshiOptions: [],
        rules: {
          jiushuimingcheng: [
          ],
          fengmian: [
          ],
          jiushuileixing: [
          ],
          baozhuangxingshi: [
          ],
          pinpai: [
          ],
          dushu: [
          ],
          chuzangfangfa: [
          ],
          shengchannianfen: [
          ],
          chandi: [
          ],
          changming: [
          ],
          shiyongchangjing: [
          ],
          shengchanxukezheng: [
          ],
          jiushuixiangqing: [
          ],
          onelimittimes: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          alllimittimes: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          thumbsupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          crazilynum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          clicktime: [
          ],
          clicknum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' },
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
        },
      };
    },
    computed: {



    },
    components: {
    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='jiushuimingcheng'){
              this.ruleForm.jiushuimingcheng = obj[o];
              this.ro.jiushuimingcheng = true;
              continue;
            }
            if(o=='fengmian'){
              this.ruleForm.fengmian = obj[o].split(",")[0];
              this.ro.fengmian = true;
              continue;
            }
            if(o=='jiushuileixing'){
              this.ruleForm.jiushuileixing = obj[o];
              this.ro.jiushuileixing = true;
              continue;
            }
            if(o=='baozhuangxingshi'){
              this.ruleForm.baozhuangxingshi = obj[o];
              this.ro.baozhuangxingshi = true;
              continue;
            }
            if(o=='pinpai'){
              this.ruleForm.pinpai = obj[o];
              this.ro.pinpai = true;
              continue;
            }
            if(o=='dushu'){
              this.ruleForm.dushu = obj[o];
              this.ro.dushu = true;
              continue;
            }
            if(o=='chuzangfangfa'){
              this.ruleForm.chuzangfangfa = obj[o];
              this.ro.chuzangfangfa = true;
              continue;
            }
            if(o=='shengchannianfen'){
              this.ruleForm.shengchannianfen = obj[o];
              this.ro.shengchannianfen = true;
              continue;
            }
            if(o=='chandi'){
              this.ruleForm.chandi = obj[o];
              this.ro.chandi = true;
              continue;
            }
            if(o=='changming'){
              this.ruleForm.changming = obj[o];
              this.ro.changming = true;
              continue;
            }
            if(o=='shiyongchangjing'){
              this.ruleForm.shiyongchangjing = obj[o];
              this.ro.shiyongchangjing = true;
              continue;
            }
            if(o=='shengchanxukezheng'){
              this.ruleForm.shengchanxukezheng = obj[o];
              this.ro.shengchanxukezheng = true;
              continue;
            }
            if(o=='jiushuixiangqing'){
              this.ruleForm.jiushuixiangqing = obj[o];
              this.ro.jiushuixiangqing = true;
              continue;
            }
            if(o=='onelimittimes'){
              this.ruleForm.onelimittimes = obj[o];
              this.ro.onelimittimes = true;
              continue;
            }
            if(o=='alllimittimes'){
              this.ruleForm.alllimittimes = obj[o];
              this.ro.alllimittimes = true;
              continue;
            }
            if(o=='thumbsupnum'){
              this.ruleForm.thumbsupnum = obj[o];
              this.ro.thumbsupnum = true;
              continue;
            }
            if(o=='crazilynum'){
              this.ruleForm.crazilynum = obj[o];
              this.ro.crazilynum = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
            if(o=='clicknum'){
              this.ruleForm.clicknum = obj[o];
              this.ro.clicknum = true;
              continue;
            }
            if(o=='price'){
              this.ruleForm.price = obj[o];
              this.ro.price = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/leixing/jiushuileixing', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.jiushuileixingOptions = res.data.data;
          }
        });
        this.baozhuangxingshiOptions = "箱装,瓶装,桶装,礼盒装".split(',')
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('remaijiushui/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('remaijiushui/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('remaijiushui/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('remaijiushui/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      fengmianUploadChange(fileUrls) {
          this.ruleForm.fengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #666;
	  background: linear-gradient(320deg, rgba(204,204,204,.0) 0%, rgba(255,255,255,.9) 80%, rgba(204,204,204,.0) 100%);
	  width: 400px;
	  font-size: 14px;
	  border-color: #9dcde9;
	  border-width: 0 0 2px;
	  border-style: dotted;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #666;
	  background: linear-gradient(320deg, rgba(204,204,204,.0) 0%, rgba(255,255,255,.9) 80%, rgba(204,204,204,.0) 100%);
	  width: 200px;
	  font-size: 14px;
	  border-color: #9dcde9;
	  border-width: 0 0 2px;
	  border-style: dotted;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #666;
	  background: linear-gradient(320deg, rgba(204,204,204,.0) 0%, rgba(255,255,255,.9) 80%, rgba(204,204,204,.0) 100%);
	  width: 200px;
	  font-size: 14px;
	  border-color: #9dcde9;
	  border-width: 0 0 2px;
	  border-style: dotted;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  cursor: pointer;
	  border: 2px dotted #9dcde9;
	  border-radius: 6px;
	  color: #9dcde9;
	  background: linear-gradient(320deg, rgba(204,204,204,.0) 0%, rgba(255,255,255,.9) 80%, rgba(204,204,204,.0) 100%);
	  width: 200px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  cursor: pointer;
	  border: 2px dotted #9dcde9;
	  border-radius: 6px;
	  color: #9dcde9;
	  background: linear-gradient(320deg, rgba(204,204,204,.0) 0%, rgba(255,255,255,.9) 80%, rgba(204,204,204,.0) 100%);
	  width: 200px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  cursor: pointer;
	  border: 2px dotted #9dcde9;
	  border-radius: 6px;
	  color: #9dcde9;
	  background: linear-gradient(320deg, rgba(204,204,204,.0) 0%, rgba(255,255,255,.9) 80%, rgba(204,204,204,.0) 100%);
	  width: 200px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 2px dotted #9dcde9;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #666;
	  background: linear-gradient(320deg, rgba(204,204,204,.0) 0%, rgba(255,255,255,.9) 80%, rgba(204,204,204,.0) 100%);
	  width: 400px;
	  font-size: 14px;
	  min-height: 120px;
	}
</style>

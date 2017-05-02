<template>
    <div class="stat-loan">
        <lever-bar :lever="{'p':'统计','c':'授信查询'}"></lever-bar>
        <div class="stat-box">
            <div  class="search-box">
                <el-form   :model="formInline" label-width="66px" >
                    <el-select @change="mixChange"  v-model="mix.value" placeholder="条件" size="small" class="middle">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-show="mix.value == 1 " size="small"  v-model="search.name" :placeholder="'请输入姓名'"></el-input>
                    <el-input v-show="mix.value == 2 " size="small"  v-model="search.mobile" :placeholder="'请输入手机'"></el-input>
                    <el-input v-show="mix.value == 3 " size="small"  v-model="search.certNo" :placeholder="'请输入身份证'"></el-input>
                    <el-form-item label="授信金额">
                        <el-input @blur="moneyChange" size="small" class="money" v-model.lazy="search.creditAmtMinT" placeholder="金额"></el-input>
                        <span>-</span>
                        <el-input @blur="moneyChange" size="small" class="money" v-model.lazy="search.creditAmtMaxT" placeholder="金额"></el-input>
                    </el-form-item>
                    <el-form-item label="授信余额">
                        <el-input @blur="moneyChange" size="small" class="money" v-model.lazy="search.remainedAmtMinT" placeholder="金额"></el-input>
                        <span>-</span>
                        <el-input @blur="moneyChange" size="small" class="money" v-model.lazy="search.remainedAmtMaxT" placeholder="金额"></el-input>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select size="small" class="middle" v-model="search.creditCheckStatus" placeholder="审核状态">
                            <el-option :label="'全部'" :value="null"></el-option>
                            <el-option :label="'已处理'" :value="0"></el-option>
                            <el-option :label="'已失败'" :value="1"></el-option>
                            <el-option :label="'处理中'" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="社区经理">
                        <el-select class="lang" size="small" filterable
                                   :filter-method="filterMethod"
                                   :loading="staffLoading"
                                   @visible-change="expandHandler"
                                   v-model="search.jobNum" placeholder="请选择">
                            <el-option :label="'全部'" :value="null"></el-option>
                            <el-option-group
                                    v-for="group in staffList"
                                    :key="group.label"
                                    :label="group.label">
                                <el-option
                                        v-for="item in group.options"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.value">
                                    <span style="float: left">{{ item.name }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.no }}</span>
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="授信时间">
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.startDateMinT"
                                type="date"
                                placeholder="开始日期时间">
                        </el-date-picker>
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.startDateMaxT"
                                type="date"
                                placeholder="截至日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="到期时间">
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.endDateMinT"
                                type="date"
                                placeholder="选择日期时间">
                        </el-date-picker>
                        <el-date-picker
                                editable="false"
                                class="time"
                                size="small"
                                v-model="search.endDateMaxT"
                                type="date"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="有效状态">
                        <el-select size="small" class="short" v-model="search.status" placeholder="请选择条件">
                            <el-option :label="'全部'" :value="null"></el-option>
                            <el-option :label="'正常'" :value="0"></el-option>
                            <el-option :label="'失效'" :value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <div class="item-box">
                        <el-button size="small" type="primary">重置</el-button>
                        <el-button @click.native="doSearch" size="small" type="primary">查询</el-button>
                    </div>
                </el-form>
            </div>
            <div class="result-box">
                <span>授信总金额:{{totals.creditAmtTotal | moneyFormat}}</span>
                <span>授信总余额:{{totals.remainedCreditAmtTotal | moneyFormat}}</span>
                <span>授信到期笔数:{{ totals.expireCreditCount}}</span>
                <span>授信笔数:{{totals.creditCount}}</span>
                <!--<span>流失借款金额:</span>-->

                <div class="pull-right">
                    <a href="#">
                        <span>导出</span>
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                        <span>导出全部</span>
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="table">
            <el-table
                    :data="list"
                    :stripe="true"
                    border
                    style="width: 100%">
                <el-table-column
                        align="center"
                        label="姓名"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.name | nameFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        align="center"
                        label="手机号"
                        >
                </el-table-column>
                <el-table-column
                        prop="certNo"
                        label="身份证号"
                        align="center"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="授信金额"
                        align="center"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.creditAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="授信余额"
                        align="center"
                >
                    <template scope="scope">
                        <span>{{ scope.row.remainedAmt | moneyFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="授信时间"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.startDate | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="授信到期时间"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.endDate | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="状态(审核)"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.creditCheckStatus | creditCheckStatus }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="有效(是/否)"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.status | creditStatus }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="社区经理"
                        width="120"
                        >
                    <template scope="scope">
                        <span>{{ scope.row.mgrName }} - {{ scope.row.jobNum }} </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer-box">
            <span v-if="startRow" class="pull-left">显示{{startRow}}-{{endRow}} 总共有{{total}}条目</span>
            <div class="pagination pull-right">
                <el-pagination
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div>
        </div>

    </div>

</template>

<script>
    import leverBar             from    '../../Com/LeverBar.vue'
    import Staff                from    '../../../data/loan/staff'
    import Util                 from    '../../../js/util'
//    let wrpEle;
    let ops =[
//        {
//            value: '0',
//            label: '合同号'
//        },
        {
            value: '1',
            label: '姓名'
        },
        {
            value: '2',
            label: '手机号'
        },
        {
            value: '3',
            label: '身份证'
    }]
    let list = []
    export default {
        data() {
            return {
                list: list,
                options: ops,
                value: '',
                mix:{
                    //混合选项 合同 身份证 手机号
                    value:'1',
                },
                totals:{

                },
                search:{
                    //用户姓名
                    name:'',
                    //手机号
                    mobile:'',
//                    身份证
                    certNo:'',
                    //授信总额
                    creditAmtMin:'',
                    creditAmtMinT:'',
                    creditAmtMax:'',
                    creditAmtMaxT:'',
                    //授信余额
                    remainedAmtMin:'',
                    remainedAmtMax:'',
                    remainedAmtMinT:'',
                    remainedAmtMaxT:'',
                    //授信时间
                    startDateMin:'',
                    startDateMinT:'',
                    startDateMax:'',
                    startDateMaxT:'',
                    endDateMin:'',
                    endDateMinT:'',
                    endDateMax:'',
                    endDateMaxT:'',
                    status:null,
                    creditCheckStatus:null,
                    jobNum:null
                },
                staffList: Staff.list,
                staffLoading:false,
                value7: '',
                total:0,
                pageNum:1
            }
        },
        watch: {
            "search.startDateMinT": function (val) {
                this.search.startDateMin = val ? new Date(val).getTime() : null
            },
            "search.startDateMaxT": function (val) {
                this.search.startDateMax = val ? new Date(val).getTime() : null
            },
            "search.endDateMinT": function (val) {
                this.search.endDateMin = val ? new Date(val).getTime() : null
            },
            "search.endDateMaxT": function (val) {
                this.search.endDateMax = val ? new Date(val).getTime() : null
            },
            "search.creditAmtMinT": function (val) {
                this.search.creditAmtMin = val ? accounting.format(val, 0, '') : null
            },
            "search.creditAmtMaxT": function (val) {
                this.search.creditAmtMax = val ? accounting.format(val, 0, '') : null
            },
            "search.remainedAmtMinT": function (val) {
                this.search.remainedAmtMin = val ? accounting.format(val, 0, '') : null
            },
            "search.remainedAmtMaxT": function (val) {
                this.search.remainedAmtMax = val ? accounting.format(val, 0, '') : null
            },
        },
        methods: {
            mixChange(val){
                this.search.name    = ''
                this.search.mobile  = ''
                this.search.certNo  = ''
            },
            moneyChange(val){
                const search = this.search
                if(search.creditAmtMinT)
                    search.creditAmtMinT = accounting.format(search.creditAmtMinT,2,',')

                if(search.creditAmtMaxT)
                    search.creditAmtMaxT = accounting.format(search.creditAmtMaxT,2,',')

                if(search.remainedAmtMinT)
                    search.remainedAmtMinT = accounting.format(search.remainedAmtMin,2,',')

                if(search.remainedAmtMaxT)
                    search.remainedAmtMaxT = accounting.format(search.remainedAmtMaxT,2,',')
            },
            expandHandler(val){
                if(val == true){
                    this.staffList = Staff.list
                }
            },
            expandHandler(val){
                if(val == true){
                    this.staffList = Staff.list
                }
            },
            filterMethod(query){
                if (query !== '') {
                    this.staffLoading = true
                    if(!!query.match(/[\u4e00-\u9fa5]/)){
                        this.staffLoading = false
                        this.staffList = Staff.findByName(Staff.list,query)
                    }else if(!!query.match(/^\d/)){
                        this.staffLoading = false
                        this.staffList = Staff.findByNo(Staff.list,query)
                    }else if(!!query.match(/[a-zA-Z]/)){
                        console.log('字母')
                        this.staffLoading = false
                        this.staffList = Staff.findByInitial(Staff.list,query.toUpperCase())
                    }else{
                        this.staffLoading = false;

                    }
                } else {
                    this.staffLoading = true;
                    this.staffList = []
                    setTimeout(()=>{
                        this.staffLoading = false;
                        this.staffList = Array.from(Staff.list)
                    })

                }
            },
            doSearch(){
                let that        = this
                let url         = Vue.debugUrl + '/stat/credit/search'
                var reqData     = {
                    pageSize:15,
                    pageNum:that.pageNum
                }

                Object.assign(reqData,that.search)
                Util.dataClear(reqData)

                that.$http.get(url,{params:reqData}).then(function (res) {
                    if(res.body.msg == "OK") {
                        let data            = res.body.data
                        Object.assign(that,data)
                    }
                });
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.doSearch()
            }
        },
        components:{
            leverBar
        }
    }
</script>
<style lang="scss">
    @import 'src/scss/pages/stat/credit.scss';
</style>
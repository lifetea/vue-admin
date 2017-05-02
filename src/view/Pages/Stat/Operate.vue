<template>
    <div class="stat-loan">
        <lever-bar :lever="{'p':'统计','c':'运营数据统计'}"></lever-bar>
        <div class="stat-box">
            <div class="search-box">
                <el-form   :model="formInline" label-width="66px" >
                    <el-form-item label="开始时间">
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="borrow.loanStart"
                                type="datetime"
                                placeholder="开始日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="截至时间">
                        <el-date-picker
                                class="time"
                                size="small"
                                v-model="borrow.expireStart"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <div class="item-box">
                        <el-button size="small" type="primary">重置</el-button>
                        <el-button size="small" type="primary">查询</el-button>
                    </div>
                </el-form>
            </div>
            <div class="result-box">
                <span>授信净增金额:</span>
                <span>授信净增人数:</span>
                <span>应还本金:</span>
                <span>应还收益:</span>
                <span>实还本息:</span>
                <span>本金归还笔数:</span>
                <span>本金实还笔数:</span>

                授信净增金额          授信净增人数
                借款净增金额          借款净增人数
                借款流失金额          借款流失人数
                投资净增金额          投资净增人数
                投资流失金额          投资流失人数
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
        <div class="data-wrp">

        </div>
    </div>

</template>

<script>
    import leverBar         from    '../../Com/LeverBar.vue'
    import list             from    '../../../../src/data/loan/list'
    import Staff            from    '../../../data/loan/staff'

    var divide = function (val) {
        let [n,d] = val.replace(/[^(\.|\d)]/g,'').split('.')
        var res = n.replace(/^(\d{1,3})((?:\d{3})*)$/,function (b,c,d) {
            console.log(' b:'+b,' c:'+c,' d:'+d)
            return c + d.replace(/(\d{3})/g,",$&")
        })
        if(!!d)
            res += ('.' + d.slice(0,2))
        return res
    }


    let wrpEle;
    let ops =[{
        value: '0',
        label: '合同号'
    }, {
        value: '1',
        label: '借款人'
    }, {
        value: '2',
        label: '手机号'
    }, {
        value: '3',
        label: '身份证号'
    }]
    export default {
        data() {
            return {
                list: list,
                options: ops,
                value: '',
                mix:{
                    //混合选项 合同 身份证 手机号
                    value:'0',
                    placeholder:'请输入合同号',
                    input:''
                },
                borrow:{
                    //借款金额 min-max
                    minMoney:'',
                    maxMoney:'',
                    //借款期限 min-max
                    minDays:'',
                    maxDays:'',
                    rate:'',
                    status:0,
                    first:0,
                    loanStart:'',
                    loadEnd:'',
                    expireStart:'',
                    expireEnd:''
                },
                staffList: Staff.list,
                staffLoading:false,
                value7: ''
            }
        },
        methods: {
            formatter(row, column) {
                return row.card;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            mixChange(val){
                let el = ops.find(item=>{
                    return item.value == val
                })
                this.mix.placeholder = '请输入' + el.label
                console.log(val)
            },
            test(event){
                if(event.wheelDeltaY>0){
                    wrpEle.scrollLeft += 30
                }else{
                    wrpEle.scrollLeft -= 30
                }
            },
            loanMoneyLowChange(val){
                const that = this
                let res = divide(val)
                that.borrow.minMoney = res
            },
            loanMoneyHighChange(val){
                const that = this
                let res = divide(val)
                that.borrow.maxMoney = res
            },
            filterMethod(query){
                if (query !== '') {
                    this.staffLoading = true
                    if(!!query.match(/[\u4e00-\u9fa5]/)){
                        this.staffLoading = false
                        this.staffList = Staff.findByName(Staff.list,query)
//                        console.log('test:',Staff.list)
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
//                    this.loading = true;
//                    setTimeout(() => {
//                        this.loading = false;
//                        this.options4 = this.list.filter(item => {
//                            return item.label.toLowerCase()
//                                    .indexOf(query.toLowerCase()) > -1;
//                        });
//                    }, 200);
                } else {
                    this.staffLoading = true;
                    this.staffList = []
                    setTimeout(()=>{
                        this.staffLoading = false;
                        console.log('空白',Staff.list)
                        this.staffList = Array.from(Staff.list)
                    })

                }
            }
        },
        created:function () {
//            console.log(this.$route)
//            console.log(this.$route.params)
        },
        mounted:function () {
            wrpEle = document.querySelector('.table .el-table__body-wrapper')
        },
        components:{
            leverBar
        }
    }
</script>
<style lang="scss">
    @import 'src/scss/pages/stat/loan.scss';
</style>
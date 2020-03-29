<template>
    <el-card>
        <el-card class="card-item blog">
            <div slot="header" class="clearfix">
                <span class="title">博客</span>
            </div>
            <div class="stat_box">
                <span class="stat_value">{{post_total}}</span>
                <span class="stat_name">&nbsp;文章</span>
                <el-divider direction="vertical"></el-divider>
                <span class="stat_value">{{category_total}}</span>
                <span class="stat_name">&nbsp;分类</span>
                <el-divider direction="vertical"></el-divider>
                <span class="stat_value">{{tag_total}}</span>
                <span class="stat_name">&nbsp;标签</span>
            </div>
        </el-card>

        <el-card class="card-item progress">
            <div slot="header" class="clearfix">
                <span class="title">TODOs</span>
            </div>
            <div class="progress">
                <el-progress
                        type="circle"
                        :percentage="progress"
                        :width="180"
                        :status="status"
                ></el-progress>
            </div>
        </el-card>
    </el-card>
</template>

<script>
    import {api} from "../../core/api";

    export default {
        name: 'Overview',
        data: function () {
            return {
                post_total: 0,
                category_total: 0,
                tag_total: 0,
                progress: 0
            }
        },
        methods: {
            async get_overview() {
                let ret = await api.get('/v1/post/overview')
                this.post_total = ret.post_count
                this.category_total = ret.category_count
                this.tag_total = ret.tag_count
            },
            async get_todolist_overview(){
                let ret = await api.get('/v1/todolist/overview')
                this.progress = Number(((ret.total > 0? ret.finished_count / ret.total : 0) * 100).toFixed(2))
                console.log(this.progress)
            }
        },
        created() {
            this.get_overview()
            this.get_todolist_overview()
        },
        computed: {
            status: function () {
                if (this.progress >= 100) {
                    return 'success'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .card-item {
        width: 100%;
        margin-bottom: 20px;
        margin-right: 20px;
        border: none;
        box-shadow: none !important;
    }
    .title {
        font-size: 26px;
    }
</style>
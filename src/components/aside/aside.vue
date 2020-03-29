<template>
    <el-aside width="200px">
        <IndexCard></IndexCard>
        <Menu></Menu>
        <div class="interval"></div>
        <div class="info_card">
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
        </div>

        <div class="friend_links">

        </div>

        <div class="toc" v-if="display_toc">
            TOC
            <div v-for="t in tocs" :key="t.title"
                 :class="'toc' + t.level" class="toc-item"
                 @click="jump_toc(t.title)">
                <el-link>{{t.title}}</el-link>
            </div>
        </div>

    </el-aside>
</template>

<script>
    import IndexCard from "./indexCard";
    import Menu from "./menu";
    import {api} from '../../core/api.js'

    export default {
        name: "Aside",
        components: {
            IndexCard,
            Menu
        },
        data: function () {
            return {
                post_total: 10,
                category_total: 4,
                tag_total: 1,
                tocs: []
            };
        },
        props: {
            display_toc: {
                type: Boolean,
                default: false,
            },
            post_id: {
                type: Number,
                default: undefined
            }
        },
        methods: {
            async get_overview() {
                let ret = await api.get('/v1/post/overview')
                this.post_total = ret.post_count
                this.category_total = ret.category_count
                this.tag_total = ret.tag_count
            },
            async get_toc() {
                let ret = await api.get('/v1/post/' + this.post_id + '/toc')
                this.tocs = ret
            },
            jump_toc(title) {
                this.$emit("jump_toc", title)
            }
        },
        created() {
            this.get_overview()
            if (this.display_toc) {
                this.get_toc()
            }
        }
    };
</script>

<style lang="less" scoped>
    .el-aside {
        background-color: #f5f7f9;
        margin-right: 20px;
        width: 240px !important;
    }

    .interval {
        height: 10px;
        width: 100%;
        background-color: #f5f7f9;
    }

    .info_card {
        background-color: #fff;
        padding: 30px 10px;
    }

    .stat_box {
        height: 41px;
        text-align: center;
        line-height: 41px;
    }

    .stat_value {
        color: #555;
        font-size: 16px;
    }

    .stat_name {
        color: #999;
        font-size: 14px;
    }

    .link_box {
        margin-top: 20px;
        padding: 0 10px;
    }

    .el-button {
        display: inline-block;
        border: none;
        background-color: #fff;
    }

    .el-row {
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .friend_link_title {
        color: #555;
    }

    .toc {
        padding: 30px;
        background-color: #fff;
        margin-top: 10px;
        color: #555;
    }

    .toc-item {
        margin-top: 5px;
    }

    .toc1 {
        padding-left: 0px;
        margin-top: 15px;
    }

    .toc2 {
        padding-left: 10px;
    }

    .toc3 {
        padding-left: 20px;
    }
</style>
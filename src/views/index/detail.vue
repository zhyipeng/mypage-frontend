<template>
    <el-container>
        <Aside :display_toc="true" :post_id="post.id"
               @jump_toc="jump_to_title"></Aside>
        <el-main>
            <div class="post-box">
                <div class="post_title">
                    <a class="post-title-link">{{post.title}}</a>
                </div>
                <div class="info">
                    <i class="el-icon-edit"></i>
                    <span>发表于{{post.created_at}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-folder"></i>
                    <span>
                      分类于
                      <el-link>{{post.category.name}}</el-link>
                    </span>
                </div>

                <div class="body">
                    <MarkdownPro
                            v-model="post.body"
                            :bordered="false"
                            :height="null"
                            theme="gitHub"
                            isPreview></MarkdownPro>
                </div>

                <div class="tags">
                    <el-tag type="info" v-for="t in post.tags"
                            @click="jump_to_tag(t.id)">{{ t.name }}
                    </el-tag>
                </div>
            </div>
        </el-main>
    </el-container>

</template>

<script>
    import {api} from '../../core/api.js'
    import {formatDatetime} from '../../core/utils.js'
    import {MarkdownPro} from "vue-meditor";
    import Aside from '../../components/aside/aside'


    export default {
        name: "PostDetail",
        data: function () {
            return {
                post: {
                    id: null,
                    title: '',
                    created_at: '',
                    category: {
                        id: null,
                        name: ''
                    },
                    tags: [],
                    body: ''
                }
            }
        },
        methods: {
            async getPost() {
                let r = await api.get('/v1/post/' + this.post.id)
                r.created_at = formatDatetime(r.created_at)
                this.post = r
                console.log(this.post)
            },
            jump_to_tag(id) {
                this.$router.push({path: '/', query: {'tag_id': id}})
            },
            jump_to_title(title) {
                title = title.replace(' ', '-')
                let anchor = document.getElementById(title);
                if (anchor) {
                    anchor.scrollIntoView()
                }
            }
        },
        created() {
            this.post.id = Number(this.$route.params.id)
            this.getPost()
        },
        components: {
            MarkdownPro,
            Aside
        }
    };
</script>

<style lang="less" scoped>
    .el-container {
        height: 100%;
        width: 960px;
        margin: auto;
    }

    .el-main {
        background-color: #fff;
    }

    a {
        border: none;
    }

    .post_title {
        font-size: 26px;
        text-align: center;
        margin-bottom: 20px;
    }

    .info {
        font-size: 12px;
        text-align: center;
        color: #999;
        margin-top: 3px;
        margin-bottom: 20px;

        span {
            margin-left: 5px;
        }
    }

    .post-box {
        padding-top: 40px;
    }

    .tags {
        padding: 20px 40px;
    }

    .el-tag {
        margin: 0 5px;
        cursor: pointer;
    }
</style>
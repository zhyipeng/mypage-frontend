<template>
    <div>
        <PostItem v-for="post in posts" :key="post.id" :post="post"
                  @jump_to_category="render_category"></PostItem>
        <pagination
                class='pagination'
                :total="total"
                :pageSizes="[10,50,100]"
                :layout="'prev, pager, next'"
                :bgStyle="true"
                @size_change="handleSizeChange"
                @page_change="handleCurrentPageChange"
        ></pagination>
    </div>
</template>

<script>
    import PostItem from "../../components/post/postItem";
    import Pagination from "../../components/common/pagination";
    import {api} from "../../core/api.js";
    import {timestampToTime} from '../../core/utils.js'

    export default {
        name: "Posts",
        data: function () {
            return {
                posts: [],
                currentPage: 1,
                size: 10,
                total: 0
            }
        },
        components: {
            PostItem,
            Pagination
        },
        methods: {
            async getPosts() {
                let params = this.$route.query
                params.page = this.currentPage
                params.size = this.size
                let ret = await api.get("/v1/post", {
                    params: params
                });
                let data = ret.data;
                for (let i = 0; i < data.length; i++) {
                    data[i].created_at = timestampToTime(data[i].created_at);
                }
                this.posts = data;
                this.total = ret.page_info.total;
            },
            handleSizeChange(size) {
                this.size = size;
                this.getPosts();
            },
            handleCurrentPageChange(page) {
                this.currentPage = page;
                this.getPosts();
            },
            render_category(id) {
                this.$route.query.category_id = id
                this.getPosts()
                this.$router.push({path: '/', query: {'category_id': id}})
            }
        },
        created() {
            this.getPosts();
        }
    };
</script>

<style lang="less" scoped>
    .el-pagination {
        margin-top: 20px;
        text-align: center;
    }
</style>
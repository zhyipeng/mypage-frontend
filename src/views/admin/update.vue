<template>
    <PostForm :id="id"></PostForm>
</template>

<script>
import PostForm from '../../components/post/form'

export default {
    name: 'UpdatePost',
    components: {
        PostForm
    },
    computed: {
        id() {
            return Number(this.$route.params.id)
        }
    }
}
</script>

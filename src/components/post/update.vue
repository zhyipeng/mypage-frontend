<template>
    <PostForm :id="id"></PostForm>
</template>

<script>
import PostForm from './form'

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

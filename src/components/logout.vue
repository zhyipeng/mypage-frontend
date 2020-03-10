<template>
    <div>
        <el-button @click="logout" type='info'>退出</el-button>
    </div>
</template>

<script>
export default {
    name: 'Logout',
    methods: {
        logout: function(){
            window.sessionStorage.removeItem('token')
            this.$router.push('/admin/login')
        }
    }
}
</script>
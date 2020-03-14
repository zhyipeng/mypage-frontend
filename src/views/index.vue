<template>
  <el-container>
    <Aside></Aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import Aside from '../components/aside/aside'

export default {
  name: "Index",
  components: {
      Aside
  },
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

</style>
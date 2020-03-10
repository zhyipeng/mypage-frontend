<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in items" :key="item.name" :to="{path: item.path}">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    items: Array
  }
};
</script>
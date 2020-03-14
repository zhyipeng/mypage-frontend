<template>
  <el-aside width="200px">
    <IndexCard></IndexCard>
    <Menu></Menu>
    <div class="interval"></div>
    <div class="info_card">
      <div class="stat_box">
        <span class="stat_value">6</span>
        <span class="stat_name">&nbsp;文章</span>
        <el-divider direction="vertical"></el-divider>
        <span class="stat_value">6</span>
        <span class="stat_name">&nbsp;分类</span>
        <el-divider direction="vertical"></el-divider>
        <span class="stat_value">6</span>
        <span class="stat_name">&nbsp;标签</span>
      </div>
      <!-- <el-divider></el-divider> -->

      <!-- <div class="link_box">
        <el-row :gutter="90">
          <el-col :span="2">
            <el-button size="mini" icon="el-icon-search" type="info" plain>搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" icon="el-icon-search" type="info" plain>搜索</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="90">
          <el-col :span="2">
            <el-button size="mini" icon="el-icon-search" type="info" plain>搜索</el-button>
          </el-col>
        </el-row>
      </div> -->
    </div>

    <div class="friend_links">

    </div>
  </el-aside>
</template>

<script>
import IndexCard from "./indexCard";
import Menu from "./menu";

export default {
  name: "Aside",
  components: {
    IndexCard,
    Menu
  },
  data: function() {
    return {
      post_total: 10,
      category_total: 4,
      tag_total: 1
    };
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
</style>
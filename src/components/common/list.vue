<template>
  <el-table :data="data" style="width: 100%" stripe>
    <el-table-column v-for="item in attrs" :key="item.label" :prop="item.attr" :label="item.label">
      <template v-slot="scope" v-if="item.type">
      <div v-if="item.type=='bool'">
        <el-switch v-model="scope.row.is_top" @change="switchChange(scope.row.id, scope.row.is_top)"></el-switch>
      </div>
      <div v-if="item.type=='operations'">
        <el-button-group>
          <el-button size="mini" icon="el-icon-view" @click="view(scope.row.id)"></el-button>
          <el-button size="mini" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
          <el-button size="mini" icon="el-icon-delete" @click="delete_item(scope.row.id)"></el-button>
        </el-button-group>
      </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "List",
  props: {
    data: Array,
    attrs: Array,
  },
  data: function() {
    return {
      q: ""
    };
  },
  methods: {
    edit(id) {
      this.$emit('edit_item', id)
    },
    delete_item(id) {
      this.$emit('delete_item', id)
    },
    view(id) {
      this.$emit('view_item', id)
    },
    switchChange(id, status) {
      this.$emit('switch_change', id, status)
    }
  }
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>
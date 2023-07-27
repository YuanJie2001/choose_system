<template>
  <el-container>
    <el-aside width="200px">
      <el-row>
        <el-button class="side" @click="comName = Index">选人系统</el-button>
      </el-row>
      <el-row>
        <el-button class="side" @click="comName = Log">日志系统</el-button>
      </el-row>
    </el-aside>

    <KeepAlive>
      <component :is="comName" v-if="comName==Index"></component>
    </KeepAlive>
    <component :is="comName" v-if="comName==Log"></component>
  </el-container>
</template>


<script setup lang="ts">
import { shallowRef } from "vue";
import Index from "@/view/Index.vue";
import Log from "@/view/Log.vue";
let comName = shallowRef(Index);

</script>

<style scoped>
.el-aside {
  background: rgba(0, 0, 0, 0.7);
  color: #333;
  text-align: center;
}

.side {
  width: 200px;
  height: 40px;
  text-align: center;
}
</style>

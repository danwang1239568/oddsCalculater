<script setup>
  import {
    ref
  } from 'vue';
  import {
    RouterView,
    useRoute
  } from 'vue-router';

  // 判断是否为移动端
  const isMobile = ref(true)
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  updateIsMobile()

  const routeDate = ref([{
    name: '首页',
    index: '/home'
  }, {
    name: '概率模型',
    index: '/oddsModel'
  }, {
    name: '概率分布',
    index: '/oddsDistribution'
  }, {
    name: '概率计算',
    index: '/calculate'
  }])

  const route = useRoute()
  const title = ref(route.name)
  const drawer = ref(false)

  const changeRoute = () => {
    if (isMobile.value) {
      title.value = route.name
      drawer.value = false
    }
  }
</script>

<template>
  <!-- 移动端模板 -->
  <div v-if="isMobile">
    <div class="mobileTitle">
      {{ title }}
      <el-icon>
        <el-icon class="icon" size="24" @click="drawer=true">
          <Expand />
        </el-icon>
      </el-icon>
    </div>
    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>

  <!-- PC端模板 -->
  <el-row v-if="!isMobile">
    <el-col :span="4">
      <div>
        <el-menu :default-active="'/calculate'" style="height: 100vh" router background-color="#bca" text-color="#fff"
          class="el-menu">
          <el-menu-item v-for="item in routeDate" :index="item.index">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="20" class="routerView">
      <router-view></router-view>
    </el-col>
  </el-row>


  <el-drawer direction="ttb" size="40%" v-model="drawer" :with-header="false" style="background-color: #bca;"
    @click="changeRoute">
    <el-menu :default-active="'/home'" router background-color="#bca" text-color="#fff">
      <el-menu-item v-for="item in routeDate" :index="item.index">
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<style lang="scss" scoped>
  .mobileTitle {
    text-align: center;
    height: 50px;
    width: 100%;
    background-color: rgba(44, 44, 44, 0.9);
    color: #fff;
    line-height: 50px;
    position: fixed;
    z-index: 100;

    .icon {
      position: fixed;
      right: 20px;
      top: 15px;
    }
  }

  .routerView {
    height: 100vh;
    background-color: #eff1f1;
    overflow: scroll;
    background: url(@/assets/NAHIDA.jpg) no-repeat;
    background-size: 80%;
    background-position: 50% 30%;
  }

  @media(orientation:portrait) {
    .routerView {
      padding: 50px 0;
      height: calc(100vh - 100px);
      background-size: 100%;

    }
  }
</style>

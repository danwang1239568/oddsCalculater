<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter()
</script>

<template>
  <div class="content">
    <p class="title">
      <span>欢迎使用</span><br>
      <span class="name">神祈概率计算器</span>
    </p><br><br>
    <p><a @click="router.replace('calculate')">前往计算</a><span>，也可以从导航栏前往，手机端在右上角，PC端在左侧</span></p>
    <p>如果页面跳转无效的话，重试或者等几秒就好了</p>
    <p>前端萌新，求大佬指教o&gt;_&lt;o</p><br />
    <p>本项目代码仓库：<a target="_blank" href="https://github.com/danwang1239568/oddsCalculater">点击跳转</a></p>
    <p>bilibili主页：<a target="_blank" href="https://space.bilibili.com/417911503?spm_id_from=333.1228.0.0">点击跳转</a></p>
    <p>原神uid：502645129</p>
  </div>
</template>

<style lang="scss" scoped>
  .content {
    background-color: rgba(250, 255, 250, 0.75);
    padding: 50px;
    min-height: 90%;

    .title {

      font-family: bwxbt;
      color: green;
      font-size: 40px;

      .name {
        font-size: 43px;
        color: royalblue;
      }
    }

    a{
      color: blue;
      cursor: pointer;
      text-decoration: none;
    }
  }

  @media(orientation:portrait) {
    .content {
      padding: 20px;
    }
  }

  @font-face {
    font-family: bwxbt;
    src: url(@/assets/baoweixiaobaiti.ttf);
  }
</style>

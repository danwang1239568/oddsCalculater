<script setup lang="ts">
  import { ref } from 'vue';
  import { calcOddsList } from '@/utils/calcOdds.js'

  const centerDialogVisible = ref(true)
  const yidian = ref(0)
  const yitun = ref(0)
  const kachi = ref('character')
  const baodi = ref('xianding')
  const mode = ref(false)

  let oddsList = ref([[1, 1, 1, 1], [1, 1]])
  const changeMode = () => {
    if (mode.value) oddsList.value = [[1, 1, 1, 1, 1, 1], [1, 1, 1]]
    else oddsList.value = [[1, 1, 1, 1], [1, 1]]
  }
  const start = async () => {
    if (yidian.value > (kachi.value == 'character' ? 89 : 79) || yidian.value < 0) {
      yidian.value = 0
      kachi.value == 'character' ? alert('垫数需要在0~89之间') : alert('垫数需要在0~79之间')
      return
    }
    const loading = ElLoading.service({
      lock: true,
      text: '正在计算...若在简单计算时崩溃，您可稍加等待',
      background: 'rgba(0, 0, 0, 0.8)',
    })
    if (mode.value && yitun.value >= 120) {
      ElMessage({
        message: '应该算不出来，计算量太大了',
        type: 'warning',
      })
    } else if (mode.value && yitun.value >= 90) {
      ElMessage({
        message: '可能得等个五六分钟',
        type: 'warning',
      })
    }
    setTimeout(() => {
      oddsList.value = calcOddsList(yidian.value, yitun.value, kachi.value, baodi.value, mode.value)
      setTimeout(() => {
        loading.close()
        ElMessage({
          message: '计算成功！.',
          type: 'success',
        })
      }, 100)
    }, 100)
    // xianding1.value = calcXianding1(yidian.value, yitun.value, kachi.value, baodi.value)

  }
</script>

<template>
  <div class="content">
    <div class="header">
      <span>已垫</span>
      <el-input type="number" placeholder="0~89" v-model="yidian" style="width: 80px" />
      <span>抽，屯了</span>
      <el-input type="number" placeholder="0~999" v-model="yitun" style="width: 80px" />
      <span>抽，要抽</span>
      <el-select v-model="kachi" size="default" style="width: 100px">
        <el-option label="角色" value="character" />
        <el-option label="武器" value="weapon" />
      </el-select><br>
      <span>上个出的五星是</span>
      <el-select v-model="baodi" size="default" style="width: 100px">
        <el-option label="常驻" value="changzhu" />
        <el-option label="限定" value="xianding" />
      </el-select>,
      <el-switch v-model="mode" @change="changeMode" size="large" active-text="复杂计算" inactive-text="简单计算" /><br>
      <el-button @click="start" type="primary">开始计算</el-button><br><br>
    </div>
    <hr><br>
    <div>
      <p v-for="(item, index) in oddsList[0]">
        至少出 {{ index + 1}} 个五星的概率：{{ (item * 100).toFixed(5) }} %
      </p><br>
      <p v-for="(item, index) in oddsList[1]">
        至少出 {{ index + 1}} 个限定五星的概率：{{ (item * 100).toFixed(5) }} %
      </p><br>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .content {
    background-color: rgba(250, 255, 250, 0.75);
    padding: 50px;
    min-height: 90%;
  }

  @media(orientation:portrait) {
    .content {
      padding: 20px;
    }
  }
</style>

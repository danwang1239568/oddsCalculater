<script setup>
  import {
    useOddsStore
  } from '@/stores';
  import * as echarts from 'echarts';
  import {
    ref
  } from 'vue';
  import {
    onMounted
  } from 'vue';

  const oddsStore = useOddsStore()
  const activeName = ref('character')
  const handleClick = () => {}

  onMounted(() => {
    const character2 = echarts.init(document.getElementById('character2'));
    character2.setOption({
      xAxis: {
        type: 'category',
        data: oddsStore.character2.map((item, index) => index)
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1
      },
      series: [{
        data: oddsStore.character2.map(item => item.toFixed(5)),
        type: 'line'
      }],
      tooltip: {
        show: true,
        trigger: 'axis'
      }
    })

    var character3 = echarts.init(document.getElementById('character3'));
    character3.setOption({
      xAxis: {
        type: 'category',
        data: oddsStore.character3.map((item, index) => index)
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 0.12
      },
      series: [{
        data: oddsStore.character3.map(item => item.toFixed(5)),
        type: 'line'
      }],
      tooltip: {
        show: true,
        trigger: 'axis'
      }
    })

    const weapon2 = echarts.init(document.getElementById('weapon2'));
    weapon2.setOption({
      xAxis: {
        type: 'category',
        data: oddsStore.weapon2.map((item, index) => index)
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1
      },
      series: [{
        data: oddsStore.weapon2.map(item => item.toFixed(5)),
        type: 'line'
      }],
      tooltip: {
        show: true,
        trigger: 'axis'
      }
    })
    const weapon3 = echarts.init(document.getElementById('weapon3'));
    weapon3.setOption({
      xAxis: {
        type: 'category',
        data: oddsStore.weapon3.map((item, index) => index)
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 0.12
      },
      series: [{
        data: oddsStore.weapon3.map(item => item.toFixed(5)),
        type: 'line'
      }],
      tooltip: {
        show: true,
        trigger: 'axis'
      }
    })
  })
</script>

<template>
  <div class="content">
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @click="handleClick">
      <el-tab-pane label="限定角色祈愿" name="character">
        <h3>n抽之内至少出1个五星角色的概率：</h3>
        <div id="character2"></div>
        <h3>五星所用的抽数分布：</h3>
        <div id="character3"></div>
      </el-tab-pane>

      <el-tab-pane label="限定武器祈愿" name="weapon">
        <h3>n抽之内至少出1把五星武器的概率：</h3>
        <div id="weapon2"></div>
        <h3>五星所用的抽数分布：</h3>
        <div id="weapon3"></div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<style scoped lang="scss">
  .content {
    background-color: rgba(250, 255, 250, 0.75);
    padding: 50px;
    min-height: 90%;
  }

  #character2,
  #character3,
  #weapon2,
  #weapon3 {
    width: calc(40vw + 200px);
    height: 400px;
    margin: 20px auto;
  }

  @media(orientation:portrait) {

    #character2,
    #character3,
    #weapon2,
    #weapon3 {
      margin: 20px auto;
    }

    .content {
      padding: 20px;
    }

  }
</style>

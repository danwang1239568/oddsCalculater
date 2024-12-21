<script setup lang="ts">
  import { ref } from 'vue';
  import * as echarts from 'echarts';
  import { onMounted } from 'vue';
  import { useOddsStore } from '@/stores'

  const activeName = ref('character')
  const handleClick = () => { }

  const oddsStore = useOddsStore()

  onMounted(() => {
    const character1 = echarts.init(document.getElementById('character1'));
    character1.setOption({
      xAxis: {
        type: 'category',
        data: oddsStore.character1.map((item, index) => index)
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1
      },
      series: [
        {
          data: oddsStore.character1.map(item => item.toFixed(5)),
          type: 'line'
        }
      ],
      tooltip: {
        show: true,
        trigger: 'axis'
      }
    })

    const weapon1 = echarts.init(document.getElementById('weapon1'));
    weapon1.setOption({
      xAxis: {
        type: 'category',
        data: oddsStore.weapon1.map((item, index) => index)
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1
      },
      series: [
        {
          data: oddsStore.weapon1.map(item => item.toFixed(5)),
          type: 'line'
        }
      ],
      tooltip: {
        show: true,
        trigger: 'axis'
      }
    })
  })
</script>

<template>
  <div class="content">
    <p>由于官方并未明确具体的抽卡概率模型，这里使用的是民测的较为准确的模型，即：</p>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @click="handleClick">
      <el-tab-pane label="限定角色祈愿" name="character">
        <p style="color: #cc8;font-weight:bold;">限定角色祈愿：</p>
        <ul style="padding-left: 2em;">
          <li>
            <p>前73抽每次有0.6%概率出五星</p>
          </li>
          <li>
            <p>第74抽开始，每多一抽则概率增加6%，第74抽概率为6.6%</p>
          </li>
          <li>
            <p>第90抽必定出金，实际上几乎不会出现这么非的情况</p>
          </li>
          <li>
            <p>第一次出金记为小保底，小保底有50%的概率为当期限定五星角色，50%为常驻角色</p>
          </li>
          <li>
            <p>若小保底出了常驻角色，则进入大保底，下次出金必为当期限定五星角色并重置到小保底状态</p>
          </li>
          <li>
            <p>5.0纳塔版本更新后，新增的“捕获明光”的触发条件尚不清晰，这里用的是
              5.0版本更新后，新增一个计数器，初始值为1，小保底每歪一次则计数器+1，每不歪一次则计数器-1，最小值为0，最大值为3，当计数器为3时，下一次小保底必定触发捕获明光 并将计数器重置为1</p>
          </li>
          <li>
            <p>由于能力有限，本站计算出多金的概率暂未考虑捕获明光机制，而是55%的综合不歪概率</p>
          </li>
        </ul>
        <div id="character1"></div>
      </el-tab-pane>

      <el-tab-pane label="限定武器祈愿" name="weapon">
        <p style="color: #cc8;font-weight:bold;">限定武器祈愿：</p>
        <ul style="padding-left: 2em;">
          <li>
            <p>基础概率与角色池基本一样，只是抽数减10，即前63抽概率为0.6%</p>
          </li>
          <li>
            <p>第64抽开始，每抽概率增加6%，第64抽为6.6%，第80抽为100%</p>
          </li>
        </ul>
        <div id="weapon1"></div>
      </el-tab-pane>
    </el-tabs>



  </div>
</template>

<style lang="scss" scoped>
  .content {
    background-color: rgba(250, 255, 250, 0.75);
    padding: 50px;

    #character1,
    #weapon1 {
      width: calc(40vw + 200px);
      height: 400px;
      margin: 20px auto;
    }
  }

  @media(orientation:portrait) {

    #character1,
    #weapon1 {
      width: 20px;
      height: 20px;
      margin: 20px 0;
    }

    .content {
      padding: 20px;
    }

  }
</style>

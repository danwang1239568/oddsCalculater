import {
  defineStore
} from "pinia";
import {
  ref
} from "vue";

export const useOddsStore = defineStore('odds', () => {
  const character1 = [] // 角色单抽概率
  for (var i = 0; i <= 90; i++) {
    if (i == 0) character1.push(0)
    else if (i < 74) character1.push(0.006)
    else if (i < 90) character1.push(0.006 + 0.06 * (i - 73))
    else character1.push(1)
  }
  const character2 = [] // 角色池n抽内至少出一金
  var sum = 0
  for (var i = 0; i <= 90; i++) {
    sum = character1.reduce((prev, item, index) => index <= i ? prev * (1 - item) : prev, 1)
    character2.push(1 - sum)
  }
  const character3 = [] // 所有金所用抽数分布
  character2.reduce((prev, item, index) => {
    character3.push(item - prev)
    return item
  }, 0)

  const weapon1 = [] // 武器单抽概率
  for (var i = 0; i <= 80; i++) {
    if (i == 0) weapon1.push(0)
    else if (i < 64) weapon1.push(0.006)
    else if (i < 80) weapon1.push(0.006 + 0.06 * (i - 63))
    else weapon1.push(1)
  }
  const weapon2 = [] // 角色池n抽内至少出一金
  var sum = 0
  for (var i = 0; i <= weapon1.length; i++) {
    sum = weapon1.reduce((prev, item, index) => index <= i ? prev * (1 - item) : prev, 1)
    weapon2.push(1 - sum)
  }
  const weapon3 = [] // 所有金所用抽数分布
  weapon2.reduce((prev, item, index) => {
    weapon3.push(item - prev)
    return item
  }, 0)

  return {
    character1,
    character2,
    character3,
    weapon1,
    weapon2,
    weapon3,
  }
})

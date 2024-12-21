import {
  useOddsStore
} from '@/stores';

const oddsStore = useOddsStore()

let arr1 = []
let arr2 = []
let arr3 = []

const updateArrs = (yidian, yitun, kachi) => {
  arr1 = []
  arr2 = []
  arr3 = []

  arr1 = kachi == 'character' ? oddsStore.character1.concat([]) : oddsStore.weapon1.concat([])
  var i = yidian
  while (i > 0) {
    arr1.splice(1, 1)
    i--
  }
  while (arr1.length > yitun + 1) {
    arr1.pop()
  }
  var sum = 0
  for (var i = 0; i < arr1.length; i++) {
    sum = arr1.reduce((prev, item, index) => (index <= i) ? (prev * (1 - item)) : prev, 1)
    arr2.push(1 - sum)
  }

  arr2.reduce((prev, item) => {
    arr3.push(item - prev)
    return item
  }, 0)
}

const calcOddsOfOne = (yidian, yitun, kachi) => {
  let pWuxing1 = 1
  yidian = Number(yidian)
  yitun = Number(yitun)
  updateArrs(yidian, yitun, kachi)

  if (yidian + yitun <= 0) {
    pWuxing1 = 0
  } else if (yidian + yitun < (kachi == 'character' ? 90 : 80)) {
    pWuxing1 = arr2[yitun]
  } else {
    pWuxing1 = 1
  }
  return pWuxing1
}

const calcOdds = (yidian, yitun, kachi, callback) => {
  yidian = Number(yidian)
  yitun = Number(yitun)
  updateArrs(yidian, yitun, kachi)

  let pWuxing = arr3.reduce((prev, item, index) => {
    return prev + item * callback(0, yitun - index, kachi)
  }, 0)
  return pWuxing
}

const calcOddsOfTow = (yidian, yitun, kachi) => {
  return calcOdds(yidian, yitun, kachi, calcOddsOfOne)
}
const calcOddsOfThree = (yidian, yitun, kachi) => {
  return calcOdds(yidian, yitun, kachi, calcOddsOfTow)
}
const calcOddsOfFour = (yidian, yitun, kachi) => {
  return calcOdds(yidian, yitun, kachi, calcOddsOfThree)
}
const calcOddsOfFive = (yidian, yitun, kachi) => {
  return calcOdds(yidian, yitun, kachi, calcOddsOfFour)
}
const calcOddsOfSix = (yidian, yitun, kachi) => {
  return calcOdds(yidian, yitun, kachi, calcOddsOfFive)
}

export const calcOddsList = (yidian, yitun, kachi, baodi, mode) => {
  return new Promise((resolve, reject) => {
    if (mode) {
      var oddsList1 = [
        calcOddsOfOne(yidian, yitun, kachi),
        calcOddsOfTow(yidian, yitun, kachi),
        calcOddsOfThree(yidian, yitun, kachi),
        calcOddsOfFour(yidian, yitun, kachi),
        calcOddsOfFive(yidian, yitun, kachi),
        calcOddsOfSix(yidian, yitun, kachi)
      ]
    } else {
      var oddsList1 = [
        calcOddsOfOne(yidian, yitun, kachi),
        calcOddsOfTow(yidian, yitun, kachi),
        calcOddsOfThree(yidian, yitun, kachi),
        calcOddsOfFour(yidian, yitun, kachi)
      ]
    }
    const calcQiahao = (yidian, yitun, kachi, n) => {
      let qiahao = oddsList1[n - 1] - oddsList1[n]
      return qiahao
    }
    let qiahao1 = calcQiahao(yidian, yitun, kachi, 1)
    let qiahao2 = calcQiahao(yidian, yitun, kachi, 2)
    let qiahao3 = calcQiahao(yidian, yitun, kachi, 3)

    const calcXianding1 = (yidian, yitun, kachi, baodi) => {
      if (baodi == 'xianding') {
        return qiahao1 * 0.55 + oddsList1[1]
      } else {
        return oddsList1[0]
      }
    }
    const calcXianding2 = (yidian, yitun, kachi, baodi, mode) => {
      if (baodi == 'xianding') {
        // 1 - 0.45 * 1 * 0.45 = 0.7975
        return qiahao2 * 0.55 ** 2 + qiahao3 * 0.7975 + oddsList1[3]
      } else {
        return qiahao2 * 0.55 * oddsList1[2]
      }
    }
    const calcXianding3 = (yidian, yitun, kachi, baodi) => {
      let qiahao4 = calcQiahao(yidian, yitun, kachi, 4)
      let qiahao5 = calcQiahao(yidian, yitun, kachi, 5)

      if (baodi == 'xianding') {
        // 1 - (0.45 * 0.45 + 0.55 * 0.45 * 0.45 + 0.55 * 0.45 * 0.45) = 0.57475
        // 0.45 * 1 * 0.45 * 1 * 0.45 = 0.091125
        return qiahao3 * 0.55 ** 3 + qiahao4 * 0.57475 + qiahao5 * 0.091125 + oddsList1[5]
      } else {
        return qiahao3 * 0.55 ** 3 + qiahao4
      }
    }
    if (mode) {
      var oddsList2 = [
        calcXianding1(yidian, yitun, kachi, baodi),
        calcXianding2(yidian, yitun, kachi, baodi),
        calcXianding3(yidian, yitun, kachi, baodi),
      ]
    } else {
      var oddsList2 = [
        calcXianding1(yidian, yitun, kachi, baodi),
        calcXianding2(yidian, yitun, kachi, baodi)
      ]
    }
    resolve([
      oddsList1,
      oddsList2
    ])
  })
}

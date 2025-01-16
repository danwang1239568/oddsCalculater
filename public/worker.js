let arr1, arr2, arr3
var calcOddsOfOne, calcOddsOfTow, calcOddsOfThree, calcOddsOfFour, calcOddsOfFive, calcOddsOfSix, calcOdds, updateArrs

self.onmessage = e => {
  let { yidian, yitun, kachi, baodi, mode, action } = e.data
  if (action == 'first') {
    var oddsStore = JSON.parse(e.data.oddsStore)

    updateArrs = (yidian, yitun, kachi) => {
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

    calcOdds = (yidian, yitun, kachi, callback) => {
      updateArrs(yidian, yitun, kachi)

      let pWuxing = arr3.reduce((prev, item, index) => {
        return index <= 90 ? prev + item * callback(0, yitun - index, kachi) : prev
      }, 0)
      return pWuxing
    }

    calcOddsOfOne = (yidian, yitun, kachi) => {
      let pWuxing1 = 1
      let max = kachi == 'character' ? 90 : 80
      yidian = Number(yidian)
      yitun = Number(yitun)
      if (yidian <= 0 && yitun <= max) {
        return kachi == 'character' ? oddsStore.character2[yitun] : oddsStore.weapon2[yitun]
      }
      if (yidian + yitun <= 0) {
        pWuxing1 = 0
      } else if (yidian + yitun < max) {
        updateArrs(yidian, yitun, kachi)
        pWuxing1 = arr2[yitun]
      } else {
        pWuxing1 = 1
      }
      return pWuxing1
    }

    calcOddsOfTow = (yidian, yitun, kachi) => {
      if (yidian + yitun <= 0) return 0
      if (yidian + yitun >= 180) return 1
      return calcOdds(yidian, yitun, kachi, calcOddsOfOne)
    }
    calcOddsOfThree = (yidian, yitun, kachi) => {
      if (yidian + yitun <= 0) return 0
      if (yidian + yitun >= 270) return 1
      return calcOdds(yidian, yitun, kachi, calcOddsOfTow)
    }
    calcOddsOfFour = (yidian, yitun, kachi) => {
      if (yidian + yitun <= 0) return 0
      if (yidian + yitun >= 360) return 1
      return calcOdds(yidian, yitun, kachi, calcOddsOfThree)
    }
    calcOddsOfFive = (yidian, yitun, kachi) => {
      if (yidian + yitun <= 0) return 0
      if (yidian + yitun >= 450) return 1
      return calcOdds(yidian, yitun, kachi, calcOddsOfFour)
    }
    calcOddsOfSix = (yidian, yitun, kachi) => {
      if (yidian + yitun <= 0) return 0
      if (yidian + yitun >= 540) return 1
      return calcOdds(yidian, yitun, kachi, calcOddsOfFive)
    }
  } else {
    yidian = Number(yidian)
    yitun = Number(yitun)
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
    var calcQiahao = (yidian, yitun, kachi, n) => {
      let qiahao = oddsList1[n - 1] - oddsList1[n]
      return qiahao
    }
    let qiahao1 = calcQiahao(yidian, yitun, kachi, 1)
    let qiahao2 = calcQiahao(yidian, yitun, kachi, 2)
    let qiahao3 = calcQiahao(yidian, yitun, kachi, 3)

    var calcXianding1 = (yidian, yitun, kachi, baodi) => {
      if (baodi == 'xianding') {
        return qiahao1 * 0.55 + oddsList1[1]
      } else {
        return oddsList1[0]
      }
    }
    var calcXianding2 = (yidian, yitun, kachi, baodi, mode) => {
      if (baodi == 'xianding') {
        // 1 - 0.45 * 1 * 0.45 = 0.7975
        return qiahao2 * 0.55 ** 2 + qiahao3 * 0.7975 + oddsList1[3]
      } else {
        return qiahao2 * 0.55 * oddsList1[2]
      }
    }
    var calcXianding3 = (yidian, yitun, kachi, baodi) => {
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
    self.postMessage({ oddsList1, oddsList2 })
  }
}

export function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start)
}

/**
 * 取范围内随机整数
 * @param {number} minNum
 * @param {number} maxNum
 */
export function randomNum(minNum = 1, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}
/**
 * 单次抽奖
 * @param {number} total 总人数
 * @param {array} won 已中奖
 * @param {number} num 本次抽取人数
 */
export function luckydrawHandler(total, won = [], num) {
  const peolist = generateArray(1, Number(total))
  const wons = won
  const res = []
  for (let j = 0; j < num; j++) {
    const nodraws = peolist.filter((item) => !wons.includes(item))
    const current = nodraws[randomNum(1, nodraws.length) - 1]
    res.push(current)
    wons.push(current)
  }
  return res
}

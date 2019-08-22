<template>
    <div>
        <div><h1>全球匯率</h1></div>
        <div>
           原幣<select v-model="base">
             <option v-for="(Currency) in currencyList" :key="Currency[0]" :value="Currency[0]">{{Currency[1]}}</option>
           </select>
           <input type="button" value="查詢" @click="getNowRate" />
        </div>
        <div>
          <div>即時匯率</div>
          <div v-for="(Rate) in RateData" :key="Rate">{{Rate}}</div>
        </div>
    </div>
</template>
<script>

import {rterApiNowGet} from '@/api/Api'

const CurrencyList = {
  AUD: ['AUD', '澳幣'],
  TWD: ['TWD', '台幣'],
  JPD: ['JPD', '日圓'],
  USD: ['USD', '美元'],
  RMB: ['RMB', '人民幣'],
  EUR: ['EUR', '歐元']
}

export default {
  data () {
    return {
      base: 'TWD',
      currencyList: CurrencyList,
      RateData: []
    }
  },
  created () {
  },
  methods: {
    getNowRate: function (event) {
      let self = this
      let symbols = Object.keys(CurrencyList)
        .reduce((a, b) => { return `${a},${b}` })
      rterApiNowGet(self.base, symbols)
        .then(responseObj => {
          let response = responseObj.data
          if (response.success === false) {
            if (response.error.code === 105) {
              self.RateData = ['無權訪問該幣別，因為沒付錢QQ']
            } else {
              self.RateData = [`錯誤訊息${response.error.type}`]
            }
          } else {
            console.log(response)
            self.RateData = []
            Object.keys(CurrencyList).forEach(Currency => {
              if (Currency === self.base) return false
              if (response.rates[Currency] !== undefined) {
                let rate = response.rates[Currency]
                self.RateData.push(`${CurrencyList[self.base][1]} 兌 ${CurrencyList[Currency][1]} 匯率 ${rate}`)
              }
            })
          }
        })
        .catch((error) => {
          if (error.response) { // 請求成功發出，但回應不是200
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else {
            console.log(error.message)// 發送請求失敗
          }
        })
    }
  }
}
</script>

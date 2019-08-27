<template>
    <div>
        <div>
          <span>台股資料</span>   <span style="float:right">資料時間: {{time}}</span>
          <b-table striped hover :items="items" :fields="fields">
             <span slot="[當盤成交價]" slot-scope="data" v-html="data.value"></span>
             <span slot="[QuoteChange]" slot-scope="data" v-html="data.value"></span>           
          </b-table>
        </div>
    </div>
</template>
<script>

import {stockApiGetStockInfo} from '@/api/Api'

const stockList = ['tse_1101.tw', 'tse_1102.tw', 'tse_1103.tw']

export default {
  data () {
    return {
      stockList: stockList,
      RateData: [],
      time: '####',
      fields: ['股票代號', '公司簡稱', '當盤成交價', '當盤成交量',{key: 'QuoteChange', label: '漲跌幅'} , '開盤價', '最高價', '最低價', '累積成交量', '昨收價'],
      items: []
    }
  },
  created () {
    this.getStock(this)
  },
  methods: {
    getStock: (obj) => {
      stockApiGetStockInfo(stockList)
        .then(responseObj => {
          let response = responseObj.data
          if (response.rtcode === '0000') {
            let isActive = true           
            obj.items = response.msgArray.map(o => {
              isActive = !isActive
              let QuoteChange = Math.round((o.z * 100 - o.y * 100)/(o.y * 100) * 100 * 100) / 100 // 避免小數點問題
              let color = (QuoteChange<0)? 'green' : 'red'
              return { isActive: isActive, 股票代號: o.c, 公司簡稱: o.n, 當盤成交價: `<span style="color:${color}">${o.z}</span>` , 當盤成交量: o.tv, 累積成交量: o.v, 開盤價: o.o, 最高價: o.h, 最低價: o.l, 昨收價: o.y, QuoteChange: `<span style="color:${color}">${(String(QuoteChange).concat('%'))}</span>`
              }
            })
            obj.time = response.queryTime.sysDate + ' ' + response.queryTime.sysTime
          } else {
            console.log(response.rtmessage)
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
      setTimeout( obj.getStock(obj),1000)   
    }
  }
}
</script>

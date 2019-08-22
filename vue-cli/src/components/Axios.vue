<template>
    <div>
        <div><h1>全球匯率</h1></div>
        <div>{{capiData}}</div>
    </div>
</template>
<script>

import {getRter} from '@/api/api'

export default {
  data () {
    let capiData = ''

    return {
      capiData: capiData
    }
  },
  created () {
    let self = this
    getRter()
      .then(response => {
        self.capiData = response
      })
  }
}
</script>

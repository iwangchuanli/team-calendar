<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 99, width: '100%',backgroundColor: 'white', }">
      <div>Team Calendar</div>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-calendar @select="onSelect" valueFormat="YYYY-MM-DD" :locale="locale">
        <template #dateCellRender="{current}">
          <ul class="events">
            <li style="list-style-type:none;" v-for="item in getDayData(current)" :key="item.no">
              <a-tag color="#f50">{{ item.xiangmujingli }}</a-tag>
            </li>
          </ul>
        </template>
      </a-calendar>
    </a-layout-content>
  </a-layout>
</template>
<script>
import dayjs from 'dayjs'
import {get} from "@/utils/request";

export default {
  name: 'Calendar',
  created() {
    this.getRecords()
    const response =
        {
          "entry": [{
            "updatornum": "admin",
            "no": 1,
            "updatorname": "管理员",
            "created": "2022-03-24 16:02:52",
            "creatorname": "管理员",
            "xiangmujingli": "admin",
            "id": "1",
            "updated": "2022-03-24 16:02:52",
            "creatornum": "admin",
            "jiaofushijian": "2022-03-15 16:02:00"
          },
            {
              "updatornum": "admin",
              "no": 2,
              "updatorname": "管理员",
              "created": "2022-03-24 22:03:12",
              "creatorname": "管理员",
              "xiangmujingli": " 经理2",
              "id": "2",
              "updated": "2022-03-24 22:03:12",
              "creatornum": "admin",
              "jiaofushijian": "2022-03-18 22:02:00"
            },
            {
              "updatornum": "admin",
              "no": 3,
              "updatorname": "管理员",
              "created": "2022-03-24 22:03:26",
              "creatorname": "管理员",
              "xiangmujingli": "经理2",
              "id": "3",
              "updated": "2022-03-24 22:03:26",
              "creatornum": "admin",
              "jiaofushijian": "2022-03-21 22:03:00"
            }
          ],
          "totalCount": 3
        }
    this.entry = response.entry
  },
  data() {
    return {
      locale: {
        "lang": {
          "locale": "zh_CN",
          "month": "月",
          "year": "年",
          "today": "今天",
        }
      },
      total: 0,
      entry: []
    }
  },
  methods: {
    getRecords() {
      let url = "/magicflu/service/s/jsonv2/00000000-0000-0000-0000-000000000000/forms/b68e2ce5-b156-4aee-bc70-5b9f805e2f05/records/entry?start=0&limit=-1&bq="
      let data = {}
      get(url, data).then(res => {
        console.log(res)
        if (res) {
          this.entry = res.entry
          this.total = res.totalCount
        }
      })
    },
    onSelect(value) {
      console.log(value)
    },
    getDayData(current) {
      let dayList = []
      for (let entryItem of this.entry) {
        if (entryItem !== undefined && this.dateFormat(entryItem.jiaofushijian) === this.dateFormat(current)) {
          console.log(this.dateFormat(entryItem.jiaofushijian))
          dayList.push(entryItem)
        }
      }
      // console.log(dayList)
      return dayList || [];
    },
    dateFormat(date) {
      return dayjs(date).format('YYYY-MM-DD')
    }
  }
}

</script>



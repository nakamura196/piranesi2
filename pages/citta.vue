<template>
  <div>
    <v-container>
      <h2 class="my-5">Views, Remains, Architectures in {{ title }}</h2>
      <h2 class="my-5">{{ title }}の景色、遺跡、建築</h2>

      <small>{{ arr.length }}図版</small>

      <v-card v-for="(obj, key) in arr" :key="key" class="my-5">
        <v-card-text>
          <v-row>
            <v-col cols="1">{{ key + 1 }}</v-col>
            <v-col cols="2">
              <v-img
                :contain="true"
                :src="obj.thumbnail"
                class="mt-2"
                max-height="200px"
              ></v-img>
            </v-col>
            <v-col cols="9">
              <router-link
                :to="{
                  path: '/detail_cdml',
                  query: { file_no: obj.file_no }
                }"
              >
                <small>{{ obj.volume }}巻 {{ obj.series_JP }}</small>
                <br />
                {{ obj.plate }}葉 {{ obj.title_JP }}
                <br />
                {{ obj.title }}
              </router-link>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <br />
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Mixin from '@/mixins/mixin'
export default {
  mixins: [Mixin],
  data: () => ({
    title: '',
    arr: []
  }),
  watch: {
    $route() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const citta = this.$route.query.citta ? this.$route.query.citta : null
      this.title = citta

      if (citta == null) {
        return
      }

      axios
        .get(
          'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
        )
        .then((response) => {
          const data = this.get_print_data(response)
          const index = data.index

          const obj = index['検索フィールド']

          const ids = []

          for (const key in obj) {
            if (key.includes(citta)) {
              const ids2 = obj[key]
              for (let j = 0; j < ids2.length; j++) {
                ids.push(ids2[j])
              }
            }
          }

          const arr = []
          for (let i = 0; i < ids.length; i++) {
            arr.push(data.data[ids[i]])
            /*
          if(i == 0){
            let obj = data.data[ids[i]]
            for(let key in obj){
              console.log(key+"\t"+obj[key])
            }
          }
          */
          }

          this.arr = arr
        })
    }
  }
}
</script>

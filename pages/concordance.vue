<template>
  <div class="mt-5">
    <v-container>
      <h3>カタログ・レゾネ コンコーダンス表</h3>

      <v-card class="mt-5">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="arr"
          :search="search"
          :items-per-page="50"
          :rows-per-page-items="[20, 50, 100]"
        >
          <template v-slot:item.Kamei_no="{ item }">
            <router-link
              :to="{ path: '/detail_cdml_j', query: { file_no: item.file_no } }"
              >{{ item.Kamei_no }}</router-link
            >
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Mixin from '@/mixins/mixin'
export default {
  mixins: [Mixin],
  data: () => ({
    search: '',
    headers: [
      { text: '亀井', value: 'Kamei_no' },
      { text: 'F.D', value: 'FD_no' },
      { text: 'C', value: 'Calco_tav_no' },
      { text: 'W.E', value: 'WE_no' },
      { text: 'T', value: 'Taschen_no' },
      { text: 'H.F', value: 'HF_no' },
      { text: '神奈川', value: 'Kanagawa_no' },
      { text: '町田', value: 'Machida_no' }
    ],
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
      axios
        .get(
          'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
        )
        .then((response) => {
          let data = this.get_print_data(response)
          data = data.data

          const arr = []
          const headers = this.headers
          for (const key in data) {
            const obj = data[key]

            const obj2 = {}

            for (let i = 0; i < headers.length; i++) {
              const key = headers[i].value
              let value = obj[key]
              if (
                (key === 'Kamei_no' || key === 'FD_no') &&
                obj.constellation
              ) {
                value += '.' + obj.constellation.replace('.', '')
              }
              obj2[key] = value
            }

            obj2.file_no = obj.file_no

            arr.push(obj2)
          }
          this.arr = arr
        })
    }
  }
}
</script>

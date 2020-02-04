<template>
  <div>
    <v-container>
      <h2 class="my-5">Views, Remains, Architectures in {{ title }}</h2>

      <small>{{ arr.length }}図版</small>

      <v-card v-for="(obj, key) in arr" :key="key" class="my-5">
        <v-card-text>
          <p v-if="obj.Edificio_IL">{{ obj.Edificio_IL }}</p>
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
                  path: '/detail_cdml_j',
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
      const subcategoria = this.$route.query.subcategoria
        ? this.$route.query.subcategoria
        : null

      if (subcategoria == null) {
        return
      }

      axios
        .get(
          'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
        )
        .then((response) => {
          let data = this.get_print_data(response)
          const index = data.index
          data = data.data

          const ids = []

          const obj = index.subcategoria
          for (const key in obj) {
            if (key.includes(subcategoria.toLowerCase())) {
              const ids2 = obj[key]
              for (let i = 0; i < ids2.length; i++) {
                ids.push(ids2[i])
              }
            }
          }

          const arr = []
          for (let i = 0; i < ids.length; i++) {
            const obj = data[ids[i]]
            arr.push(obj)
          }
          this.arr = arr
        })
    }
  }
}
</script>

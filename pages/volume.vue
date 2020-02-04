<template>
  <div>
    <v-container>
      <h2 class="my-5">
        <template v-if="$i18n.locale === 'ja'">第 {{ title }} 巻</template>
        <template v-else>Vol. {{ title }}</template>
      </h2>

      <searchResult :result="arr"></searchResult>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Mixin from '@/mixins/mixin'
import searchResult from '~/components/ui/searchResult'
export default {
  components: {
    searchResult
  },
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
      const volume = this.$route.query.volume
        ? String(this.$route.query.volume)
        : null
      this.title = volume

      if (volume === null) {
        return
      }

      axios
        .get(
          'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
        )
        .then((response) => {
          const data = this.get_print_data(response)
          const index = data.index

          const obj = index.volume

          const ids = []

          for (const key in obj) {
            if (key === volume) {
              const ids2 = obj[key]
              for (let j = 0; j < ids2.length; j++) {
                ids.push(ids2[j])
              }
            }
          }

          const arr = []
          for (let i = 0; i < ids.length; i++) {
            arr.push(data.data[ids[i]])
          }

          this.arr = arr
        })
    }
  }
}
</script>

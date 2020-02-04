<template>
  <div>
    <v-container>
      <h2 class="my-5">{{ title }}</h2>

      <iframe
        width="100%"
        height="600px"
        allowfullscreen
        frameborder="0"
        src="https://nakamura196.github.io/piranesi/icv/?curation=https://mp.ex.nii.ac.jp/api/curation/json/af18d11d-0d58-46de-aa50-28bb930babd9&mode=annotation&lang=ja&full=1"
      />

      <p class="mt-5">
        <router-link :to="{ path: '/mapsearch' }">Show all places.</router-link>
      </p>
    </v-container>
  </div>
</template>

<script>
import Mixin from '@/mixins/mixin'
import axios from 'axios'
export default {
  mixins: [Mixin],
  data: () => ({
    title: ''
  }),
  created() {
    const mapNo = this.$route.query.mapNo
    axios
      .get(
        'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
      )
      .then((response) => {
        const printDdata = this.get_printDdata(response)
        const index = printDdata.index
        const id = index.mapNo[mapNo][0]
        const obj = printDdata.data[id]
        this.title = obj.Edificio_i
      })
  }
}
</script>

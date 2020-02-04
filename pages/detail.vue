<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="10">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-col>
        <v-col cols="12" md="2">
          <toc></toc>
        </v-col>
      </v-row>
    </v-container>

    <iframe
      v-if="data.manifest != null"
      :src="
        'https://universalviewer.io/examples/uv/./uv.html#?manifest=' +
          encodeURIComponent(data.manifest)
      "
      width="100%"
      height="600"
      allowfullscreen
      frameborder="0"
    ></iframe>

    <v-container>
      <v-row>
        <v-col cols="12" md="3"
          >Vol. {{ data.volume }}<br />Page. {{ data.plate
          }}{{ data.constellation }}</v-col
        >
        <v-col cols="12" md="9"
          >{{ data.series }}<br />
          {{ data.series_JP }}</v-col
        >
      </v-row>

      <hr class="my-5" />

      <h3>Catalogue no.</h3>

      <hr class="my-5" />

      <h3>Inscriptions on the print</h3>

      <v-row>
        <v-col cols="12" md="3">Inscription 1</v-col>

        <v-col v-html="data.inscription1" cols="12" md="9"></v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="10">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
        </v-col>
        <v-col cols="12" md="2">
          <toc></toc>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import toc from '~/components/ui/toc.vue'
export default {
  components: {
    toc
  },
  data: () => ({
    data: {},
    items: []
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
      this.title = ''

      const fileNo = this.$route.query.file_no
        ? this.$route.query.file_no
        : null

      axios
        .get(
          'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json'
        )
        .then((response) => {
          const result = response.data

          const data = {}
          const index = {}

          const manifests = result.manifests
          for (let i = 0; i < manifests.length; i++) {
            const obj = manifests[i]
            const metadata = obj.metadata

            const map = {}
            for (let j = 0; j < metadata.length; j++) {
              const m = metadata[j]
              const label = m.label
              const value = m.value
              if (!index[label]) {
                index[label] = {}
              }
              if (!index[label][value]) {
                index[label][value] = []
              }
              index[label][value].push(obj['@id'])

              map[label] = value
            }

            data[obj['@id']] = map

            map.thumbnail = obj.thumbnail
            map.manifest = obj['@id']
          }

          const id = index.file_no[fileNo]
          const obj = data[id]
          this.data = obj
          console.log(obj)

          this.items = [
            {
              text: 'トップ',
              disabled: false,
              // to: this.localePath('/')
              to: { path: '/' }
            },
            {
              text: '全巻目次',
              disabled: false,
              to: this.localePath('/volumes')
            },
            {
              text: this.data.volume + '巻目次',
              disabled: false,
              to: this.localePath({
                path: '/volume',
                query: { volume: this.data.volume }
              })
            },
            {
              text: this.data.volume + '巻' + this.data.plate + '葉',
              disabled: false,
              to: this.localePath({
                path: '/item',
                query: { file_no: this.data.file_no }
              })
            }
          ]
        })
    }
  }
}
</script>

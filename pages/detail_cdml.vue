<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-breadcrumbs
            :items="[
              {
                text: 'トップ',
                disabled: false,
                href: ''
              },
              {
                text: '全巻目次',
                disabled: false,
                href: ''
              },
              {
                text: data.volume + '巻目次',
                disabled: false,
                href: ''
              },
              {
                text: data.volume + '巻' + data.plate + '葉',
                disabled: true,
                href: ''
              }
            ]"
          ></v-breadcrumbs>
        </v-col>
        <v-col cols="2">
          <toc></toc>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          ><b>{{ data.plate }}.{{ data.constellation }}</b> ({{
            data.image_ID
          }})</v-col
        >
        <v-col
          ><nuxt-link
            :to="
              localePath({
                path: '/catalog_cdml',
                query: { volume: data.volume }
              })
            "
          >
            <template v-if="$i18n.locale === 'ja'">
              {{ data.volume }}巻のindex
            </template>
            <template v-else> Index of vol.{{ data.volume }} </template>
          </nuxt-link></v-col
        >
        <v-col> </v-col>
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
        <v-col cols="8">
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="11">{{ data.opera }}</v-col>
          </v-row>

          <v-row>
            <v-col cols="1">{{ data.volume }}巻</v-col>
            <v-col cols="11">
              {{ data.series }}<br />
              {{ data.series_JP }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="1">{{ data.plate }}葉{{ data.constellation }}</v-col>
            <v-col cols="11">
              {{ data.title }}<br />
              {{ data.title_JP }}<br />
              <small>
                {{ data.author }} {{ data.author_JP }}<br />
                {{ data.plate_size }} mm<br />
                亀井文庫番号：{{ data.Kamei_no }}.{{ data.constellation }}
              </small>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-flag</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>詳細情報</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :to="{ path: '/photo', query: { fileNo: data.fileNo } }"
            >
              <v-list-item-icon>
                <v-icon>mdi-flag</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>現在の写真</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :to="{ path: '/p_maps', query: { map_no: data.map_no } }"
            >
              <v-list-item-icon>
                <v-icon>mdi-flag</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ローマ地図へ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <div class="text-right">
        <v-breadcrumbs
          :items="[
            {
              text: 'トップ',
              disabled: false,
              href: ''
            },
            {
              text: '全巻目次',
              disabled: false,
              href: ''
            },
            {
              text: data.volume + '巻目次',
              disabled: false,
              href: ''
            },
            {
              text: data.volume + '巻' + data.plate + '葉',
              disabled: true,
              href: ''
            }
          ]"
        ></v-breadcrumbs>

        <v-select label="各巻目次へ"></v-select>
      </div>
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
    data: {}
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
        })
    }
  }
}
</script>

<template>
  <div>
    <v-container>
      <h2 class="my-5">{{ title }}</h2>
      <v-row>
        <v-col>
          <p class="my-5">Prints and photos from the same angle ↓ :</p>

          <div class="text-center" style="height : 800px; overflow: scroll;">
            <template v-for="(obj, key) in fileNoMap">
              <template v-if="obj.photo && obj.print">
                <v-card :key="key" class="my-5">
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <router-link
                          :to="{
                            path: '/photo3',
                            query: { photo_no: obj.photo.photo_no }
                          }"
                        >
                          <v-img
                            :contain="true"
                            :src="obj.photo.thumbnail"
                            max-height="200px"
                          ></v-img>
                        </router-link>
                      </v-col>
                      <v-col cols="6">
                        <router-link
                          :to="{
                            path: '/detail_cdml_j',
                            query: { file_no: obj.print.file_no }
                          }"
                        >
                          <v-img
                            :contain="true"
                            :src="obj.print.thumbnail"
                            max-height="200px"
                          ></v-img>
                        </router-link>
                      </v-col>
                    </v-row>

                    <v-btn :href="get_url(obj)" color="primary" target="_blank"
                      >Miradorで比較する</v-btn
                    >
                  </v-card-text>
                </v-card>
              </template>
            </template>
          </div>
        </v-col>
        <v-col>
          <p class="my-5">Other prints:</p>

          <v-card class="my-5" style="height : 400px; overflow: scroll;">
            <v-card-text>
              <v-row>
                <template v-for="(obj, key) in fileNoMap" class="text-center">
                  <template v-if="!obj.photo && obj.print">
                    <v-col :key="key" cols="4">
                      <router-link
                        :to="{
                          path: '/detail_cdml_j',
                          query: { file_no: obj.print.file_no }
                        }"
                      >
                        <v-img
                          :contain="true"
                          :src="obj.print.thumbnail"
                          max-height="200px"
                        ></v-img>
                      </router-link>
                      <p class="mt-2">{{ obj.print.title }}</p>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-card-text>
          </v-card>

          <p class="my-5">Photos:</p>

          <v-card class="my-5" style="height : 400px; overflow: scroll;">
            <v-card-text>
              <v-row>
                <template v-for="(obj, key) in fileNoMap" class="text-center">
                  <template v-if="obj.photo && !obj.print">
                    <v-col :key="key" cols="4">
                      <router-link
                        :to="{
                          path: '/photo3',
                          query: { photo_no: obj.photo.photo_no }
                        }"
                      >
                        <v-img
                          :contain="true"
                          :src="obj.photo.thumbnail"
                          max-height="200px"
                        ></v-img>
                      </router-link>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <br />
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    fileNoMap: {},
    title: ''
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
      let mapNo = this.$route.query.mapNo ? this.$route.query.mapNo : null
      const edificioIL = this.$route.query.edificioIL
        ? this.$route.query.edificioIL
        : null

      if (mapNo === null && edificioIL === null) {
        mapNo = '20'
      }

      let edificioNo = null

      if (edificioIL != null) {
        this.title = edificioIL
        if (edificioIL.split('[').length > 1) {
          edificioNo = edificioIL.split('[')[1].split(']')[0]
        }
      }

      this.get_photo(mapNo, edificioNo, edificioIL)
    },
    get_photo(mapNo, edificioNo, edificioIL) {
      axios
        .get('https://nakamura196.github.io/piranesi/photo/iiif/top.json')
        .then((response) => {
          const result = response.data

          const data = {}
          const index = {}

          // 初期化
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

          const fileNoMap = {}

          let ids = []

          if (index.mapNo[mapNo]) {
            ids = index.mapNo[mapNo]
          } else {
            const obj = index.Edificio_all
            for (const key in obj) {
              if (key.includes('[' + edificioNo + ']')) {
                const ids2 = obj[key]
                for (let i = 0; i < ids2.length; i++) {
                  ids.push(ids2[i])
                }
              }
            }
          }

          for (let i = 0; i < ids.length; i++) {
            const id = ids[i]
            const metadata = data[id]

            if (this.title === '') {
              this.title = metadata.Edificio_all
            }

            let value
            if (metadata.file_n1) {
              value = metadata.file_n1
            } else {
              value = metadata.photo_no
            }

            // 重複していた場合
            if (fileNoMap[value] && fileNoMap[value].photo != null) {
              value = metadata.photo_no
            }

            if (!fileNoMap[value]) {
              fileNoMap[value] = {
                photo: null,
                print: null
              }
            }
            fileNoMap[value].photo = {
              thumbnail: metadata.thumbnail,
              manifest: metadata.manifest,
              photo_no: metadata.photo_no
            }
          }

          this.get_print(mapNo, edificioNo, edificioIL, fileNoMap)
        })
    },
    get_print(mapNo, edificioNo, edificioIL, fileNoMap) {
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

          let ids = []

          // 順番が重要
          if (index.mapNo[mapNo]) {
            ids = index.mapNo[mapNo]
          } else if (edificioNo != null) {
            const obj = index.Edificio_all
            for (const key in obj) {
              if (key.includes('[' + edificioNo + ']')) {
                const ids2 = obj[key]
                for (let i = 0; i < ids2.length; i++) {
                  ids.push(ids2[i])
                }
              }
            }
          } else if (index.edificioIL[edificioIL]) {
            ids = index.edificioIL[edificioIL]
          }

          // let ids = index.mapNo[mapNo];

          for (let i = 0; i < ids.length; i++) {
            const id = ids[i]
            const metadata = data[id]
            if (metadata.file_no) {
              let value = metadata.file_no

              // 重複していた場合
              if (fileNoMap[value] && fileNoMap[value].print != null) {
                value = metadata.image_ID // 一意に定まる値
              }

              if (!fileNoMap[value]) {
                fileNoMap[value] = {
                  photo: null,
                  print: null
                }
              }

              fileNoMap[value].print = {
                thumbnail: metadata.thumbnail,
                manifest: metadata.manifest,
                title: metadata.title,
                file_no: metadata.file_no
              }
            }
          }

          this.fileNoMap = fileNoMap
        })
    },
    get_url(obj) {
      const params = [
        {
          manifest: obj.photo.manifest
        },
        {
          manifest: obj.print.manifest
        }
      ]
      const url =
        'https://tei-eaj.github.io/parallel_text_viewer/app/mirador/?params=' +
        JSON.stringify(params)
      return url
    }
  }
}
</script>

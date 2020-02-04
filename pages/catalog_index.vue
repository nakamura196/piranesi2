<template>
  <div>
    <v-container>
      <h2 class="my-5">
        {{ $t('message.browse') }}
      </h2>
      <v-card v-for="(obj, key) in data" :key="key" class="my-5">
        <v-card-text>
          <v-row>
            <v-col cols="2">
              <nuxt-link
                :to="
                  localePath({
                    path: '/catalog_cdml',
                    query: { volume: obj.volume }
                  })
                "
              >
                <v-img
                  :contain="true"
                  :src="obj.thumbnail"
                  class="mt-2"
                  max-height="200px"
                ></v-img>
              </nuxt-link>
            </v-col>
            <v-col cols="9">
              <h3>
                <nuxt-link
                  :to="
                    localePath({
                      path: '/catalog_cdml',
                      query: { volume: obj.volume }
                    })
                  "
                >
                  {{ obj.title }}
                </nuxt-link>
              </h3>
              <a v-if="obj.pdf" :href="obj.pdf" target="_blank">
                <small>
                  {{ obj.pdf_label }}
                </small>
              </a>

              <v-card outlined flat class="mt-5">
                <v-list>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(obj2, key2) in obj.list"
                      :key="key2"
                      :to="
                        localePath({
                          path: '/catalog_cdml',
                          query: { volume: obj2.volume }
                        })
                      "
                      two-line
                    >
                      <v-list-item-content>
                        <template v-if="$i18n.locale == 'ja'">
                          <v-list-item-subtitle>
                            <b>{{ obj2.volume }}巻</b> {{ obj2.series }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            {{ obj2.series_JP }}
                          </v-list-item-subtitle>
                        </template>
                        <template v-else>
                          <v-list-item-subtitle>
                            <b>Volume {{ obj2.volume }}</b> {{ obj2.series }}
                          </v-list-item-subtitle>
                        </template>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    data: [
      {
        title: 'TOMO I-IV. LE ANTICHITÀ ROMANE',
        volume: 1,
        pdf: 'https://diyhistory.org/public/localhost/pdf/TomoI-IV.pdf',
        pdf_label: '序文',
        thumbnail:
          'https://iiif.dl.itc.u-tokyo.ac.jp/repo/files/medium/cb27746c19e108aee651b725959c6c6bd64be3bb.jpg',
        list: [
          {
            volume: 1,
            series: 'GLI AVANZI DEGLI ANTICHI EDIFICI DI ROMA',
            series_JP: 'ローマの古代建築物の遺構'
          },
          {
            volume: 1,
            series: 'GLI AVANZI DEGLI ANTICHI EDIFICI DI ROMA',
            series_JP: 'ローマの古代建築物の遺構'
          }
        ]
      }
    ]
  })
}
</script>

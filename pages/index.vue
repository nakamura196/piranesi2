<template>
  <div>
    <section class="mb-5">
      <v-parallax src="/hero.jpg" height="600">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>{{ $t('message.title') }}</b>
          </h1>
        </v-layout>
      </v-parallax>
    </section>

    <v-container>
      <v-card class="my-5">
        <v-card-text>
          <p class="display-1 text--primary text-center my-5">
            {{ $t('message.about') }}
          </p>
          <p v-if="$i18n.locale == 'en'">
            <a href="e_about.html">This image database</a> contains digital
            images of Giovanni Battista Piranesi's original etchings from
            <i
              >Opere di Giovanni Battista Piranesi, Francesco Piranesi e
              d'altri</i
            >
            (published by Firmin Didot Freres, Paris, 1835-1839), which are
            preserved in the University of Tokyo Library's
            <i>Kamei Collection.</i>
            <br />These digital images have been processed from negatives of the
            <i>Opere</i>, produced specifically for research objectives. All
            1,440 works of the 29 volumes can be browsed and searched on this
            website.
          </p>
          <p v-else>
            <a href="about.html">このデータベース</a
            >は，東京大学附属図書館（総合図書館）所蔵
            の亀井文庫『ピラネージ版画集
            <i>
              Opere di Giovanni Battista Piranesi, Francesco Piranesi e d'altri
            </i>
            』（1835 ～ 39年，パリ，フィルマン・
            ディド兄弟出版社刊）全29巻に収録されたオリジナル版画1,440点をデータベース化したものです。亀井文庫『ピラネージ版画集』全作品の閲覧と作品情報の検索が可能です。
          </p>

          <v-row class="mb-5">
            <v-col cols="3">
              <v-card outlined>
                <v-list-item
                  :to="
                    localePath({ path: '/catalog_cdml', query: { volume: 1 } })
                  "
                  three-line
                >
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      {{ $t('message.browse') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('message.browse_about') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card outlined>
                <v-list-item :to="{ path: '/about' }" three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      {{ $t('message.text_search') }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('message.text_search_about') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>

          <p v-if="$i18n.locale == 'en'">
            <i>Opere</i> contains 940 etchings created by Giovanni Battista
            Piranesi (1720-1778), a famous Italian architect and etcher, 269
            etchings by his son, Francesco Piranesi (1758-1810), and 231 works
            by other artists.
          </p>
          <p v-else>
            『ピラネージ版画集』には，18世紀イタリアの著名な建築家・版画家ジョヴァ
            ンニ・バッティスタ・ピラネージ（Giovanni Battista Piranesi,1720
            ～1778年）が制作した銅版画940点，息子のフランチェスコ・ピラネージ（Francesco
            Piranesi,
            1758～1810年）が制作した版画269点，その他の作家による作品231点が収録されています。
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

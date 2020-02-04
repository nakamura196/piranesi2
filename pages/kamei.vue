<template>
  <div>
    <v-container>
      <img
        src="images/w.gif"
        hspace="0"
        vspace="0"
        border="0"
        height="14"
        width="100"
      />
      <br />

      <h4>亀井文庫『ピラネージ版画集』について</h4>
      <p style="margin-left: 15px; margin-right: 15px;">
        東京大学附属図書館所蔵亀井文庫は，旧津和野藩主亀井家の当主で後に伯爵となった亀井茲明（かめい・これあき，1861～1896年）が滞独中に購入した美術研究資料の寄贈コレクションです。多数の貴重書を含む西洋美術史関係の文献1958点が収められています。
        <br />
        <cite>
          <small>
            <a href="http://www.lib.u-tokyo.ac.jp/koho/guide/collection.html"
              >→東京大学附属図書館の主要コレクションへ</a
            >
          </small>
        </cite>
      </p>
      <p style="margin-left: 15px; margin-right: 15px;">
        西周（1829～1897年）の門生であり美術に造詣の深かった茲明は，1886（明治19）年末，各国の帝室儀式調査および美術研究のため，ドイツに留学しました。渡独後，日本に美術学の基礎を打ち立てるという志を抱いて美学美術研究に専心し，ベルリン大学にて四年間学んだ後，ヨーロッパ一巡の美術見学を経て1891（明治24）年に帰国しました。
      </p>
      <p style="margin-left: 15px; margin-right: 15px;">
        帰国後，茲明は日本美術振興に努めましたが，1894（明治24）年に勃発した日清戦争に写真班として従軍し，撮影した写真は『明治二十七八年戦役写真帖』（明治30年）として諸方に献納されました。しかし，この従軍によって健康を害した茲明は間もなく病床に伏し，1896（明治29）年7月，小石川区丸山町の邸で永眠しました。
        <br />茲明の死後，彼がベルリンで購入した書物の大部分が東京大学に寄贈され，「亀井文庫」として東京大学附属図書館に所蔵されました。
      </p>
      <br />
      <h4>
        フィルマン・ディド版「ピラネージ版画集」とピラネージの銅版について
      </h4>
      <p style="margin-left: 15px; margin-right: 15px;">
        ジョヴァンニ・バッティスタ・ピラネージ（Giovanni Battista Piranesi,
        1720～1778年）の息子フランチェスコ・ピラネージ（Francesco Piranesi,
        1758～1810年）の死後，ピラネージの銅版はすべて，著名な出版業者であったアンブロワーズ・フィルマン・ディド（Ambroise-Firmin
        Didot,
        1790～1876年）に買い取られました。亀井茲明が購入した『ピラネージ版画集』は，1835～39年にフィルマン・ディド兄弟出版社より発行された版にあたります。
      </p>
      <p style="margin-left: 15px; margin-right: 15px;">
        その後，ローマ法王グレゴリオ16世（在位1831～46年）の指示により，1839年にピラネージの銅版はディドからローマに返還され，現在，ローマ国立銅版画博物館
        (Calcografia nazionale, Roma) に永久保存されています。
      </p>
      <hr />
      参考文献：
      <br />
      <span class="stxt">
        柳田泉「明治文化研究
        第一集」『日清戦争従軍写真帖－伯爵亀井茲明の日記』，柏書房，1997年
        <br />桐敷真次郎，岡田哲史『ピラネージと「カンプス・マルティウス」』，本の友社，1993年
      </span>
      <p></p>
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

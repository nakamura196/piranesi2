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

      <h4>データの利用を希望される方へ</h4>
      <p style="margin-left: 15px; margin-right: 15px;"></p>
      <ol>
        <li>
          本サイトに掲載する全ての情報（各ページに表示，記載されている文字情報，画像，デザインなど）の著作権は，UT-PICURE（東京大学大学院人文社会系研究科
          COE象形文化研究拠点）あるいは原著作者に帰属します。
          <br />
          <br />
        </li>
        <li>
          情報の引用（ダウンロード，プリントアウト）は，別途各ページ上で禁止あるいは制限しない限り，学術的利用もしくは非営利目的の場合は自由です。ただし，引用した複製物に修正を加えること，および複製物を不特定または多数の人に送信，配布することはできません。
          <br />上記条件外の利用については，必ず下記にお問い合わせください。
          <br />
          <a href="mailto:webmaster@coe.l.u-tokyo.ac.jp"
            >webmaster@coe.l.u-tokyo.ac.jp</a
          >
          <br />
          <br />
          <!--span>〒113-0033 東京都文京区本郷7-3-1<BR>
法文二号館3F<BR>
東京大学大学院人文社会系研究科・文学部 象形文化研究拠点<BR>
 TEL:03-5841-2694<BR>
          FAX:03-5841-8959<BR><BR></span-->
        </li>
        <li>
          本サイトの利用によって何らかの成果を得た場合は，成果の公表にあたって本サイトを利用した旨を明記し，UT-PICUREへその成果物を一部寄贈，あるいはご報告ください。
          <br />
          <br />
        </li>
        <li>
          本サイト中に文字の誤入力などを発見した場合は，上記にご連絡ください。
          <br />
          <br />
        </li>
        <li>
          本サイトへのご意見，ご質問に関する特定の個人情報を，無断で第三者および機関に提供することは一切ありません。
        </li>
      </ol>
      <p></p>
      <!--h4>高解像度画像の提供について</h4-->
      <!--p style="margin-left: 15px; margin-right: 15px;">
      亀井文庫「ピラネージ版画集」の，本サイトに掲載されていない高解像度画像（6000～8000px) については，研究目的での利用に限り提供を検討いたします。詳細は上記問い合わせ先までご連絡ください。</p-->
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

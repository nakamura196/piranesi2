<template>
  <div>
    <v-container>
      <h2 class="my-5">Views, Remains, Architectures in {{ title }}</h2>

      <h4>データベースの使い方</h4>
      <p style="margin-left: 15px; margin-right: 15px;">
        各画像のサムネールから，基本作品情報，詳細作品情報をご覧頂けます。
        <br />
        <br />
        <a
          href="FMPro@-db=sougouwebcp.fp5&amp;-op=eq&amp;volume=1&amp;-token.0=25&amp;-find=&amp;-format=%252Fdetail_cdml_j.html&amp;-max=1.html"
          >基本作品情報のページ</a
        >は，画像の通し番号，作品名（伊・和），著者名，サイズ，亀井文庫の作品番号を掲載しています。
        <br />
        <a
          href="FMPro@-db=sougouwebcp.fp5&amp;-token.0=25&amp;-find=&amp;-format=%252Ftext_cdml_j.html&amp;-max=1&amp;file_no=1001&amp;-find=.html"
          >詳細作品情報のページ</a
        >は，版画に銘記されている銘文のテキスト原文と和訳，各種カタログ・レゾネ番号，版画に記載されている実在するラテン碑文の参照番号などを掲載しています。版画銘記の和訳は随時更新中です。
        <br />基本作品情報のページのリンクから，画像の拡大表示（長辺1500px），版画に記載されている遺構の現在の写真，遺構の場所を示す地図，ラテン碑文の画像をご覧頂けます。
        <br />
        <br />
      </p>
      <h4>以下の4つの方法で版画集の各画像にアクセスできます。</h4>
      <p></p>
      <p style="margin-left: 15px; margin-right: 15px;">
        <a href="find0606.html">
          作品検索
        </a>
        <br />
        <b>簡易検索：</b>
        日本語・イタリア語の作品名，著者名，フリーキーワードで全作品を検索できます。
        <br />
        <br />
        <b>詳細検索：</b> 日本語の作品名，
        <i>Calcografia Nazionale</i> によるイタリア語の作品名，
        <i>J. Wilton Ely</i>
        による英語の作品名，著者名，作品番号，巻ごとの検索，既出版の5種類のレゾネ番号と日本で開催された2つの展覧会のカタログ番号などから全作品を検索できます。
      </p>
      <p style="margin-left: 15px; margin-right: 15px;">
        <a href="index_01.html">
          全巻目次
        </a>
        <br />全29巻から成る1440作品を，版画集のページ順に巻ごとに閲覧できます。
      </p>
      <p style="margin-left: 15px; margin-right: 15px;">
        <a
          href="FMPro@-db=sougouwebcp.fp5&amp;-format=mapsearch.html&amp;-FindAll.html"
        >
          地図検索
        </a>
        <br />ローマの古代と現代の地図を重ね合わせ，ジョヴァンニ・バッティスタ・ピラネージとフランチェスコ・ピラネージの版画に記載されている遺構の位置を地図上にマッピングしました。版画と，描かれた遺構を同じ角度から撮影した現在の写真を同時にご覧頂けます。遺構の別角度からの写真も掲載しています。
        <br />
        <br />
        <a href="subject.html">
          <b>主題別検索：</b>
        </a>
        ジョヴァンニ・バッティスタ・ピラネージとフランチェスコ・ピラネージの版画を描かれた主題によるカテゴリー別リストから検索できます。
      </p>
      <h4>その他</h4>
      <p style="margin-left: 15px; margin-right: 15px;">
        <a
          href="FMPro@-db=sougouwebcp.fp5&amp;-format=%252Fconcordance.html&amp;-Max=103&amp;-FindAll.html"
        >
          コンコーダンス表
        </a>
        <br />亀井文庫の作品番号と，これまでに出版されているジョヴァンニ・バッティスタ・ピラネージのカタログレゾネ（
        <i>
          <a href="hanrei.html#raisone">Calcografia</a>,
          <a href="hanrei.html#raisone">J. Wilton-Ely</a>,
          <a href="hanrei.html#raisone">H. Focillon</a>,
          <a href="hanrei.html#raisone">Taschen</a> </i
        >）の番号，および日本で開催された2つの展覧会（
        <a href="hanrei.html#catalog">神奈川県立近代美術館</a>，
        <a href="hanrei.html#catalog"
          >1977年／町田市立国際版画美術館，1989年）</a
        >のカタログ番号との対応表を掲載しています。
      </p>
      <p style="margin-left: 15px; margin-right: 15px;">
        <a href="sitemap.html">
          コンテンツ一覧
        </a>
        <br />ピラネージ版画データベース全体のサイトマップです。
      </p>
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

<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :temporary="true" app overflow>
      <v-list>
        <v-list-item :to="{ path: '/' }" link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/help' }" link>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('message.help') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/kamei' }" link>
          <v-list-item-action>
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('message.about_the_kamei_collection')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/who' }" link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>G.B.ピラネージについて</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/mapsearch' }" link>
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ローマ地図検索</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/subject' }" link>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>主題別検索</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/concordance' }" link>
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>コンコーダンス表</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/sitemap' }" link>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>コンテンツ一覧</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/hanrei' }" link>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>凡例</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/contact' }" link>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>データの利用を希望される方へ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/about' }" link>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>このサイトについて</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ $t('message.title') }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="changeLocale" text>{{
        $t('message.change_locale')
      }}</v-btn>
    </v-app-bar>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<template>
  <v-app>
    <Header />

    <nuxt />

    <v-footer :dark="true">
      <v-container>
        <p class="text-center my-5">
          {{ $t('message.project') }}（{{ $t('message.library') }})
          <br />digital-archive [at] lib.u-tokyo.ac.jp
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

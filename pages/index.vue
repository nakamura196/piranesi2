<template>
  <div>
    <section class="mb-5">
      <v-parallax src="/hero.jpg" height="600">
        <v-layout column align-center justify-center class="white--text">
          <!-- 
          <h1 class="white--text mb-2 display-1 text-center">
            <b>{{$t("message.title")}}</b>
          </h1>
          <p>{{$t("message.hogehoge")}}</p>
          <v-btn large class="mt-5" color="primary">{{$t("message.hogehoge")}}</v-btn>
          -->
        </v-layout>
      </v-parallax>
    </section>

    <v-container>
      <v-card class="my-5">
        <v-card-text>
          <!-- 
          <p class="display-1 text--primary text-center my-5">{{$t("message.about")}}</p>
          <div class="text--primary">{{$t("message.hogehoge")}}</div>
          -->
        </v-card-text>
      </v-card>

      <br />

      <br />
    </v-container>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<template>
  <div>
    <v-container>
      <h2 class="my-5">Piranesi Map Search Index</h2>

      <p>
        <router-link :to="{ path: '/subject' }"
          >Index of Subjects is here.</router-link
        >
      </p>

      <p>
        Prints of views, ruins, and architectures by Giovanni Battista Piranesi
        and Francesco Piranesi can be searched.
      </p>

      <h3>Search Roma ⇒ select the number on the map.</h3>

      <v-card v-show="false" class="my-5">
        <v-card-text>
          <p>
            Indices of the map ↓:
            <br />
            <v-btn>the number of places [1-136]</v-btn>
          </p>

          <p>
            <v-select
              :items="['[a] Acqua Traiana', 'bbb']"
              label="Standard"
            ></v-select>
            <br />
            <v-btn>submit</v-btn>
          </p>

          <p>
            <router-link :to="{ path: '/cityindex' }"
              >Search other cities</router-link
            >
          </p>
        </v-card-text>
      </v-card>

      <br />

      <iframe
        width="100%"
        height="600px"
        allowfullscreen
        frameborder="0"
        src="https://nakamura196.github.io/piranesi/icv/?curation=https://mp.ex.nii.ac.jp/api/curation/json/af18d11d-0d58-46de-aa50-28bb930babd9&mode=annotation&lang=ja&full=1"
      />

      <v-card class="my-5">
        <v-card-text>
          <cityindex></cityindex>
        </v-card-text>
      </v-card>
      <v-card class="my-5">
        <v-card-text>
          <h3>Index of all places [ A to Z ]</h3>
          <p>[ ]= the no. on the Roman map.</p>
          <p>' '= the Latin name of the site.</p>
          <indexOfAllPlaces></indexOfAllPlaces>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import cityindex from '@/components/ui/cityindex.vue'
import indexOfAllPlaces from '@/components/ui/indexOfAllPlaces.vue'
export default {
  components: {
    cityindex,
    indexOfAllPlaces
  },
  data: () => ({
    title: ''
  })
}
</script>

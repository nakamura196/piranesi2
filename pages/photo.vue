<template>
  <div>
    <photo v-if="arr[index] != null" :data="arr[index]"></photo>

    <v-container>
      <v-row>
        <v-col v-for="(obj, key) in arr" :key="key" cols="3">
          <v-card @click="index = key" class="my-5">
            <v-card-text>
              <p>{{ obj.Didascalia }}</p>
              <v-img
                :contain="true"
                :src="
                  'https://nakamura196.github.io/piranesi/photo/m/' +
                    obj.photo_no +
                    '.jpg'
                "
                class="mt-2"
                max-height="200px"
              ></v-img>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Mixin from '@/mixins/mixin'
import photo from '@/components/ui/photo'
import axios from 'axios'
export default {
  components: { photo },
  mixins: [Mixin],
  data: () => ({
    title: '',
    arr: [],
    index: 0
  }),
  created() {
    const fileNo = this.$route.query.fileNo

    axios
      .get(
        'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/photo/iiif/top.json'
      )
      .then((response) => {
        const photoData = this.get_photoData(response)
        const index = photoData.index

        const ids = []

        const keys = ['file_n1', 'file_n2', 'file_n3']

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          if (index[key][fileNo]) {
            const ids2 = index[key][fileNo]
            for (let j = 0; j < ids2.length; j++) {
              ids.push(ids2[j])
            }
          }
        }

        for (let i = 0; i < ids.length; i++) {
          this.arr.push(photoData.data[ids[i]])
        }
      })
  }
}
</script>

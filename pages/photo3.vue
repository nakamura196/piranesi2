<template>
  <div>
    <photo v-if="obj != null" :data="obj"></photo>
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
    obj: null
  }),
  created() {
    const photoNo = this.$route.query.photoNo

    axios
      .get(
        'https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/photo/iiif/top.json'
      )
      .then((response) => {
        const photoData = this.get_photoData(response)
        const index = photoData.index

        const id = index.photoNo[photoNo]

        const obj = photoData.data[id]
        this.obj = obj
      })
  }
}
</script>

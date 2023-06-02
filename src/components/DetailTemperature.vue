<template>
  <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
  <v-card v-else class="mx-1 mt-2">
    <v-row class="ma-1" justify="space-between">
      <v-col cols="8" class="text-body-1" align-self="center">Température :</v-col>
      <v-col cols="4" class="text-h5" :style='getColorFromTemperature()'>{{ temperature }}°</v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "DetailTemperature",

  props: {
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      coursDeau: [],
      temperature: null,
      loading: true,
    }
  },

  watch:{
    async latitude(newVal, oldVal) {
      if(oldVal !== newVal){
        this.temperature = 0
        await this.getTemperature(newVal, this.longitude)
      }
    }
  },

  async mounted() {
    await this.getTemperature(this.latitude, this.longitude)
  },

  methods: {
    async getTemperature(latitude, longitude) {
      if(latitude!==null && longitude!==null){
        const response = await fetch(`https://hubeau.eaufrance.fr/api/v1/temperature/chronique?distance=20&latitude=${latitude}&longitude=${longitude}&size=1&sort=desc`);
        const data = await response.json();

        if (data?.data.length > 0) {
          this.coursDeau = data.data;
          this.temperature = this.coursDeau[0].resultat.toFixed(1);
        } else {
          this.coursDeau = [];
        }
        this.loading = false
      }
      else {
        this.loading = true
      }
    },

    getColorFromTemperature() {
      let color = this.temperature < 20 ? 'blue' :
        this.temperature < 26 ? 'orange' :
          'red'
      return "color: " + color
    }
  }
}
</script>

<style scoped></style>

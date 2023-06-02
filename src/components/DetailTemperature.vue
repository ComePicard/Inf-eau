<template>
  <v-progress-circular v-if="loading" indeterminate color="white"></v-progress-circular>
  <v-card v-else class="mx-1 mt-2" color="#20345c">
    <div v-if="nomEau !== null">
      <v-row class="mx-1 mt-1" justify="space-between">
        <v-col cols="12" class="text-body-1 text-center" align-self="center">
          <span class="font-weight-bold text-white">{{ nomEau }}</span>
        </v-col>
      </v-row>
      <v-row class="ma-1" justify="space-between">
        <v-col cols="7" class="text-body-1" align-self="center">
          <v-icon icon="mdi-thermometer" class="mr-1" color="white"/>
          <span class="text-white">
            Température :
          </span>
        </v-col>
        <v-col cols="4" class="text-h5" :style='getColorFromTemperature()'>{{ temperature }}°</v-col>
      </v-row>
    </div>
    <div v-else>
      <v-card-text class="ma-1" justify="space-between">
        <span class="text-body-1 font-weight-bold">Pas de cours d'eau trouvé à proximité</span>
      </v-card-text>
    </div>
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
      nomEau: null,
      loading: true,
    }
  },

  watch: {
    async latitude(newVal, oldVal) {
      if (oldVal !== newVal) {
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
      if (latitude !== null && longitude !== null) {
        const response = await fetch(`https://hubeau.eaufrance.fr/api/v1/temperature/chronique?distance=20&latitude=${latitude}&longitude=${longitude}&size=1&sort=desc`);
        const data = await response.json();

        if (data?.data.length > 0) {
          this.coursDeau = data.data;
          this.temperature = this.coursDeau[0].resultat.toFixed(1);
          this.nomEau = this.coursDeau[0].libelle_station
        } else {
          this.coursDeau = [];
          this.nomEau = null
        }
        this.loading = false
      }
      else {
        this.loading = true
      }
    },

    getColorFromTemperature() {
      let color = this.temperature < 20 ? '#09e9f1' :
        this.temperature < 26 ? 'orange' :
          'red'
      return "color: " + color
    }
  }
}
</script>

<style scoped></style>

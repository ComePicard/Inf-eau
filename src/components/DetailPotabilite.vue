<template>
  <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
  <v-card v-else class="mx-1 mt-2">
    <v-row class="ma-1" justify="space-between">
      <v-col cols="8" class="text-body-1" align-self="center">Potabilité</v-col>
      <v-col cols="4" class="text-h5" :style='potable ? "color: green" : "color: red"'>{{
          potable ? 'Oui' : 'Non'
        }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "DetailPotabilite",

  props: {
    code_postal: {
      type: Number,
      default: null
    },
  },

  data() {
    return {
      coursDeau: [],
      potable: false,
      loading: true,
    }
  },

  watch: {
    async code_postal(newVal, oldVal) {
      if (oldVal !== newVal) {
        await this.getPotabilite(newVal, this.longitude)
      }
    }
  },

  async mounted() {
    await this.getPotabilite(this.latitude, this.longitude)
  },

  methods: {
    async getPotabilite() {
      if (this.code_postal !== null ) {
        const response = await fetch(`https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis/?code_commune=${this.code_postal}`);
        const data = await response.json();
        this.potable = data['data'][0]["conformite_limites_bact_prelevement"] === "C"
        this.loading = false
      } else {
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

<template>
  <v-container>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" class="text-center">
        <span class="text-h4">{{ titre }}</span>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" class="d-flex justify-center align-center">
        <v-autocomplete placeholder="Rechercher" variant="solo" class="my-input">
          <template #prepend-inner>
            <v-icon icon="mdi-magnify" />
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-card class="mx-1">
      <v-row class="ma-1" justify="space-between">
        <v-col cols="8" class="text-body-1" align-self="center">Température :</v-col>
        <v-col cols="3" class="text-h5" :style='getColorFromTemperature()'>{{ temperature }}°</v-col>
      </v-row>
    </v-card>
    <v-card class="mx-1 mt-2">
      <v-row class="ma-1" justify="space-between">
        <v-col cols="8" class="text-body-1" align-self="center">Potable :</v-col>
        <v-col cols="3" class="text-h5" :style='potable ? "color: green" : "color: red"'>{{ potable ? 'Oui' : 'Non'
        }}</v-col>
      </v-row>
    </v-card>
    <v-card class="mx-1 mt-2">
      <v-row class="ma-1">
        <v-col cols="8" class="text-body-1" align-self="center">Qualité de l'eau :</v-col>
      </v-row>
    </v-card>
    <v-card class="mx-1 mt-2">
      <v-row class="ma-1">
        <v-col cols="8" class="text-body-1" align-self="center">Assainissement :</v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DetailPage",

  data() {
    return {
      titre: "Rennes",
      temperature: 28,
      potable: true
    }
  },

  methods: {
    getColorFromTemperature() {
      let color = this.temperature < 20 ? 'blue' :
        this.temperature < 26 ? 'orange' :
          'red'
      return "color: " + color
    }
  }
}
</script>

<style>
body{
  overflow: hidden;
}
</style>

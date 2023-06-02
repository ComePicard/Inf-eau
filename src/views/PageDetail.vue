<template>
  <v-container>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" class="text-center">
        <span v-if="ville" class="text-h4 text-white">{{ ville }}</span>
        <v-progress-circular v-else indeterminate color="white"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" class="d-flex justify-center align-center">
        <RechercheVille @searched="getVille" />
      </v-col>
    </v-row>
    <DetailTemperature :longitude="longitude" :latitude="latitude" class="mt-16"/>
    <DetailPotabilite :code_postal="code" />
    <DetailQualite />
    <DetailPage />
    <v-row justify="center" class="">
      <v-col cols="12" class="text-center">
        <v-img src="@/assets/inf-eau.png" width="125" class="mt-1 mx-auto"/>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import DetailPage from "@/components/DetailPage.vue";
import DetailPotabilite from "@/components/DetailPotabilite.vue";
import DetailQualite from "@/components/DetailQualite.vue";
import DetailTemperature from "@/components/DetailTemperature.vue";
import RechercheVille from "@/components/RechercheVille.vue";

export default {
  name: "PageDetail",

  components: {
    DetailPage,
    RechercheVille,
    DetailPotabilite,
    DetailQualite,
    DetailTemperature,
  },

  data() {
    return {
      ville: "",
      latitude: null,
      longitude: null,
      code: null
    }
  },

  created() {
    const success = (position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://geo.api.gouv.fr/communes?lat=${this?.latitude}&lon=${this?.longitude}&fields=nom,codesPostal`, requestOptions)
        .then(response => response.text())
        .then(result => {
          let response = JSON.parse(result)
          this.ville = response[0]['nom'];
          this.code = response[0]['code']
          console.log(this.code)
        })
        .catch(error => console.log('error', error));
    };

    const error = (err) => {
      console.log(err)
    };

    navigator.geolocation.getCurrentPosition(success, error);
  },

  methods: {
    getVille(ville) {
      this.ville = ville['nom']
      this.code = ville['code']
      this.longitude = ville['centre']['coordinates'][0]
      this.latitude = ville['centre']['coordinates'][1]
      console.log(this.latitude, this.longitude);
    },
  }
};
</script>

<style>
body{
  background-color: #345ca8
}
</style>

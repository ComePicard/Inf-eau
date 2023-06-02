<template>
  <v-container>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" class="text-center">
        <span v-if="ville" class="text-h4">{{ ville }}</span>
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" class="d-flex justify-center align-center">
        <RechercheVille @searched="getVille" />
      </v-col>
    </v-row>
    <DetailTemperature :longitude="longitude" :latitude="latitude" />
    <DetailPotabilite />
    <DetailQualite />
    <DetailPage />
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

      fetch(`https://geo.api.gouv.fr/communes?lat=${this?.latitude}&lon=${this?.longitude}&fields=nom`, requestOptions)
        .then(response => response.text())
        .then(result => {
          let response = JSON.parse(result)
          this.ville = response[0]['nom'];
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
    },
  }
};
</script>

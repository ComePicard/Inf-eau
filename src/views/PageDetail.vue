<template>
  <v-container>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" class="text-center">
        <span v-if="titre" class="text-h4">{{ titre }}</span>
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" class="d-flex justify-center align-center">
        <RechercheVille @searched="getVille"/>
      </v-col>
    </v-row>
    <DetailPage/>
  </v-container>
</template>

<script>
import DetailPage from "@/components/DetailPage.vue";
import RechercheVille from "@/components/RechercheVille.vue";

export default{
  name: "PageDetail",

  components: {
    DetailPage,
    RechercheVille
  },

  data(){
    return {
      titre: "",
    }
  },

  mounted(){
    this.getGeo()
  },

  methods: {
    getVille(ville){
      this.titre = ville.nom
    },

    getGeo(){
      let resultat = "patate"
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        const crd = pos.coords;

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`https://geo.api.gouv.fr/communes?lat=${crd.latitude}&lon=${crd.longitude}&fields=code,nom,codesPostal`, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("dans fetch :",resultat)
            this.titre = result;
          })
          .catch(error => console.log('error', error));

          return resultat
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      console.log("before result: ",resultat);
      navigator.geolocation.getCurrentPosition(success, error, options);
      console.log("after result: ",resultat);
      return resultat;
    }
  }
};
</script>

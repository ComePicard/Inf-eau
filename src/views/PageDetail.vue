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

  created(){
    const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=nom`, requestOptions)
        .then(response => response.text())
        .then(result => {
          let response = JSON.parse(result)
          this.titre = response[0]['nom'];
        })
        .catch(error => console.log('error', error));
    };

    const error = (err) => {
      console.log(err)
    };

    navigator.geolocation.getCurrentPosition(success, error);
  },

  methods: {
    getVille(ville){
      this.titre = ville['nom']
    },
  }
};
</script>

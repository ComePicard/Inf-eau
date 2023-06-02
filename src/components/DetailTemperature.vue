<template>
  <v-card class="mx-1">
    {{ temperature }}
  </v-card>
</template>

<script>
export default {
  name: "DetailTemperature",
  props: {
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    }
  },

  data() {
    return {
      coursDeau: [],
      qualite: [],
      temperature: null,
      potable: true
    }
  },

  created() {
    this.getTemperature()
  },

  methods: {
    getTemperature() {
      fetch(`https://hubeau.eaufrance.fr/api/v1/temperature/chronique?distance=10&latitude=${this?.latitude}&longitude=${this?.longitude}&size=1&sort=desc`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.data.length > 0) {
            this.coursDeau = data.data;
            this.temperature = coursDeau[0].temperature;
            const codeCommune = data.data[0].code_commune;

            fetch(`https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis/?code_commune=${codeCommune}&size=1&sort=desc`)
              .then(response => response.json())
              .then(qualiteData => {
                console.log(qualiteData);

                if (qualiteData.data.length > 0) {
                  this.qualite = qualiteData.data[0].conclusion_conformite_prelevement;
                  console.log(this.qualite);
                } else {
                  this.qualite = '';
                }

                this.isLoading = false; // Terminé de charger
              })
              .catch(error => {
                console.error(error);
                this.qualite = '';
                this.isLoading = false; // Terminé de charger
              });
          } else {
            this.coursDeau = [];
            this.qualite = '';
            this.isLoading = false; // Terminé de charger
          }
        })
    }
  }
}
</script>

<style scoped></style>

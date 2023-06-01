<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-card>
              <v-card-title>Stations de la commune</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="codeLatitude" label="Latitude"></v-text-field>
                  <v-text-field v-model="codeLongitude" label="Longitude"></v-text-field>
                  <v-btn color="primary" @click="fetchStations">Obtenir les stations</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
            <div v-if="isLoading" class="d-flex align-center justify-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <transition-group name="fade-up">
              <v-list v-if="coursDeau.length > 0" key="coursDeau">
                <v-list-item v-for="riviere in coursDeau" :key="riviere.id">
                  <v-card>
                    <v-card-text>
                      <h3>{{ riviere.localisation }}, {{ riviere.resultat.toFixed(2) }}{{ riviere.symbole_unite }}</h3>
                      <h4 v-if="qualite !== ''">{{ qualite }}</h4>
                      <h4 v-else>pas d'infos</h4>
                    </v-card-text>
                  </v-card>
                </v-list-item>
              </v-list>
              <div v-else>
                Aucune station trouvée pour ces coordonnées.
              </div>
            </transition-group>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      codeLatitude: '',
      codeLongitude: '',
      coursDeau: [],
      qualite: '',
      isLoading: false
    };
  },
  methods: {
    fetchStations() {
      this.isLoading = true;
      fetch(`https://hubeau.eaufrance.fr/api/v1/temperature/chronique?distance=10&latitude=${this.codeLatitude}&longitude=${this.codeLongitude}&size=1&sort=desc`)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          if (data.data.length > 0) {
            this.coursDeau = data.data;
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
        .catch(error => {
          console.error(error);
          this.coursDeau = [];
          this.qualite = '';
          this.isLoading = false; // Terminé de charger
        });
    }
  }
};
</script>

<style lang="scss">
.align-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-up-enter-active {
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-leave-active {
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(-20px);
}
</style>

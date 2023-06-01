<template>
  <v-autocomplete
    label="Rechercher"
    placeholder="Bourg-En-Bresse"
    v-model="ville"
    id="search"
    :items="searched"
    @update:search="search_city"
    @update:modelValue="select_city"
    variant="solo"
  >
    <template #prepend-inner>
      <v-icon icon="mdi-magnify"/>
    </template>
  </v-autocomplete>
</template>

<script>

export default {
  name : "RechercheVille",
  data() {
    return {
      searched : [],
      parsed_searched : [],
      ville :"",
      ville_data : {}
    }
  },

  methods : {

    select_city(){
      console.log(this.ville);
      for (let i = 0; i < this.parsed_searched.length; i++) {
        if (this.parsed_searched[i].nom === this.ville) {
          this.ville_data= this.parsed_searched[i]
          this.$emit('searched', this.ville_data)
        }
      }
    },

    search_city() {
      let str = document.getElementById('search').value
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`https://geo.api.gouv.fr/communes?nom=${str}&fields=departement,centre&boost=population&limit=5`, requestOptions)
        .then(response => response.text())
        .then(result => {
          this.parsed_searched = JSON.parse(result);
          const names = [];

          for (let i = 0; i < this.parsed_searched.length; i++) {
            names.push(this.parsed_searched[i].nom);
          }
          this.searched = names;

        })
        .catch(error => console.log('error', error));

    }
  }
}
</script>


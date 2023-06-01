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
        <RechercheVille/>
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

  date(){
    return {
      titre: "",
    }
  }
};
</script>

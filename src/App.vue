<template>
  <v-app constrained>
    <v-app-bar color="primary" app> Programmino
      <v-spacer></v-spacer>
      <v-icon @click="$vuetify.theme.dark = !$vuetify.theme.dark"> mdi-theme-light-dark </v-icon>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col lg="8">
            <comment-fetcher />
            <contest-rules />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col lg="8">
            <comment-container />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommentFetcher from "@/components/CommentFetcher.vue";
import CommentContainer from "@/components/CommentContainer.vue";
import ContestRules from "@/components/ContestRules.vue";

@Component({ components: { CommentFetcher, CommentContainer, ContestRules } })
export default class App extends Vue {
  mounted() {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.$vuetify.theme.dark = prefersDark;
  }
}
</script>
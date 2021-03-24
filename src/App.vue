<template>
  <v-app constrained>
    <v-app-bar app color="primary"> Programmino </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col lg="9">
            <comment-fetcher />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col lg="9">
            <comment-container />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommentFetcher from "./components/CommentFetcher.vue";
import CommentContainer from "@/components/CommentContainer.vue";

@Component({ components: { CommentFetcher, CommentContainer } })
export default class App extends Vue {}
</script>
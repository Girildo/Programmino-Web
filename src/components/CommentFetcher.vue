<template>
  <!-- <v-container> -->
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid">
          <v-card :loading="busy">
            <v-card-title>
              Per iniziare, inserisci l'URL della pagina di Flickr
            </v-card-title>
            <v-card-text>
              <v-text-field
                :rules="validation"
                outlined
                label="URL"
                v-model="url"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer> </v-spacer>
              <v-btn type="submit" @click.prevent="valid ? fetch() : validate()">
                Recupera commenti
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MutationTypes } from "@/store/mutations/MutationTypes";
import { State } from "vuex-class";

@Component
export default class CommentFetcher extends Vue {
  url = "https://www.flickr.com/groups/1744262@N24/discuss/72157718562758587/";
  valid = false;
  urlPattern = /(?:https?:\/\/)?www.flickr.com\/groups\/([^/]+)\/discuss\/([^/]+)\/?/;
  validation = [
    (s: string) => (s.length > 0 ? true : "Per favore inserisci un URL"),
    (s: string) => (this.urlPattern.test(s) ? true : "Questo URL non è valido"),
  ];
  @State(state => state.fetchingComments) busy!: boolean;

  private validate() {
    console.log("aaa");
    (this.$refs["form"] as HTMLFormElement).validate();
  }

  private fetch() {
    const groups = this.urlPattern.exec(this.url);
    if (!groups) throw new Error("Something went wrong");
    const groupId = groups[1];
    const topicId = groups[2];

    const payload = {
      groupId,
      topicId,
    };

    this.$store.commit(MutationTypes.FETCH_COMMENTS, payload);
  }
}
</script>
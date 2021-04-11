<template>
  <v-row>
    <v-col>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> Impostazioni </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row align="end">
                <v-col cols="12">
                  <v-row align="baseline">
                    <v-slider
                      v-model="votesPerUser"
                      step="1"
                      min="1"
                      max="10"
                      ticks="always"
                      label="Voti per utente"
                    >
                    </v-slider>
                    <span class="ml-2 font-weight-medium">
                      {{ votesPerUser }}</span
                    >
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-checkbox label="Consenti autovoto" v-model="allowSelfVote">
                </v-checkbox>
              </v-row>
              <v-row>
                <v-checkbox
                  label="Solo i partecipanti possono votare"
                  v-model="requireHavingAPhoto"
                >
                </v-checkbox>
              </v-row>
              <v-row>
                <v-checkbox
                  label="Chi ha aperto il contest deve partecipare"
                  v-model="creatorMustParticipate"
                >
                </v-checkbox>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MutationTypes } from "@/store/mutations/mutationTypes";

@Component
export default class ContestRules extends Vue {
  get votesPerUser() {
    return this.$store.state.votesPerUser;
  }
  set votesPerUser(value: number) {
    this.$store.commit(MutationTypes.SET_VOTES_PER_USER, value);
  }

  get allowSelfVote() {
    return this.$store.state.contestRules.allowSelfVote;
  }
  set allowSelfVote(value: boolean) {
    this.$store.commit(MutationTypes.SET_CONTEST_RULES, {
      allowSelfVote: value,
    });
  }

  get requireHavingAPhoto() {
    return this.$store.state.contestRules.requireHavingAPhoto;
  }
  set requireHavingAPhoto(value: boolean) {
    this.$store.commit(MutationTypes.SET_CONTEST_RULES, {
      requireHavingAPhoto: value,
    });
  }

  get creatorMustParticipate() {
    return this.$store.state.contestRules.creatorMustParticipate;
  }
  set creatorMustParticipate(value: boolean) {
    this.$store.commit(MutationTypes.SET_CONTEST_RULES, {
      creatorMustParticipate: value,
    });
  }
}
</script>
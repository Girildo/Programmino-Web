<template>
<v-expansion-panels v-if="comments.length > 0">
  <v-expansion-panel>
    <v-expansion-panel-header>
      Commenti
    </v-expansion-panel-header>
    <v-expansion-panel-content>
    <!-- <v-container> -->
      <v-row v-for="comment in comments" v-bind:key="comment.ID">
        <v-col>
            <comment :comment="comment"/>
        </v-col>
      </v-row>
    <!-- </v-container> -->
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import Comment from "@/components/Comment.vue";
import { UnparsedComment } from "@/lib/models";

@Component({ components: { Comment } })
export default class CommentContainer extends Vue {
  @State((s) => s.unparsedComments) comments!: UnparsedComment[];
}
</script>
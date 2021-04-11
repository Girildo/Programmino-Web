<template>
  <v-expansion-panels v-if="comments.length > 0">
    <v-expansion-panel>
      <v-expansion-panel-header> Commenti </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-for="comment in comments" v-bind:key="comment.ID">
          <v-col>
            <comment :comment="comment" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { State as StateType } from "@/store/state";
import Comment from "@/components/Comment.vue";
import { ParsedComment, UnparsedComment } from "@/core/models";
import { ActionTypes } from "@/store/actions/actionTypes";

@Component({ components: { Comment } })
export default class CommentContainer extends Vue {
  @State((s: StateType) => s.parsedComments) comments!: ParsedComment[];
  @State((s: StateType) => s.unparsedComments)
  unparsedComments!: UnparsedComment[];

  @Watch("unparsedComments")
  private parseComments(): void {
    this.$store.dispatch(ActionTypes.PARSE_COMMENTS);
  }
}
</script>
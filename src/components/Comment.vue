<template>
  <v-card>
    <v-card-title>
      <div class="d-inline-flex align-center">
        <span>
          Commento di
          <span class="accent--text"> {{ comment.AuthorName }}</span>
        </span>
        <v-icon small class="ml-2">
          {{ icon }}
        </v-icon>
      </div>
    </v-card-title>
    <v-card-text>
      {{ comment.Content }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CommentType } from "@/lib/commentType";
import { ParseCommentType } from "@/lib/commentParser";
import { UnparsedComment } from "@/lib/models";

@Component
export default class Comment extends Vue {
  @Prop()
  comment!: UnparsedComment;

  type = CommentType.IGNORE;

  get icon() {
    switch (this.type) {
      case CommentType.PHOTO:
        return "mdi-camera-outline";
      case CommentType.START_VOTING:
        return "mdi-star-circle-outline";
      case CommentType.VOTE:
        return "mdi-vote-outline";
      case CommentType.IGNORE:
      default:
        return "mdi-help-circle-outline";
    }
  }




  mounted() {
    const type = ParseCommentType(this.comment.Content);
    console.log(type);

    this.type = type;
  }
}
</script>

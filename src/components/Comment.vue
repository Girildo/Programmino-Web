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
import { ParsedComment } from "@/core/models";
import { CommentType } from "@/core/commentType";

@Component
export default class Comment extends Vue {
  @Prop()
  comment!: ParsedComment;

  get icon() {
    switch (this.comment.Type) {
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
}
</script>

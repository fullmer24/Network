<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        <PostForm />
      </div>
      <div class="col-md-10" v-for="p in posts" :key="p.id">
        <PostCard :post="p" />
      </div>
    </div>
    <div class="d-flex justify-content-around my-3">
      <button class="btn btn-info" @click="getPosts(prevPage)" v-if="prevPage > 0">
        Previous
      </button>
      <button class="btn btn-info" @click="getPosts(nextPage)">Next</button>
    </div>
  </div>
</template>






<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    async function getPosts(page) {
      try {
        await postsService.getPosts(page)
      } catch (error) {
        logger.error('Getting posts', error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getPosts()
    })
    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.page + 1),
      prevPage: computed(() => AppState.page - 1),
      getPosts
    };
  },
};
</script>

<style >
</style>
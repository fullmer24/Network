<template>
  <div class="container">
    <div class="row">
      <div>
        <ContentCard />
      </div>
      <!-- <div v-for="c in content" :key="c.id">
        <ContentCard :content="c" />
      </div> -->
      <div class="col-md-7">
        <PostForm />
      </div>
      <div class="col-md-7" v-for="p in posts" :key="p.id">
        <PostCard :post="p" />
      </div>
    </div>
    <div class="d-flex justify-content-around my-3">
      <button class="btn btn-info" @click="changePage(prevPage)" :disabled="!prevPage">
        Previous
      </button>
      <button class="btn btn-info" @click="changePage(nextPage)" :disabled="!nextPage">Next</button>
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
import ContentCard from '../components/ContentCard.vue';
import { contentsService } from '../services/ContentsService.js';

export default {
  name: "home",
  setup() {
    async function getContent(url) {
      try {
        await contentsService.getContent(url);
      }
      catch (error) {
        logger.error("Getting content homePage", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getContent();
    });


    async function getPosts(page) {
      try {
        await postsService.getPosts(page);
      }
      catch (error) {
        logger.error("Getting posts", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      prevPage: computed(() => AppState.previousPage),
      getPosts,
      async changePage(url) {
        try {
          await postsService.changePage(url);
        }
        catch (error) {
          logger.error(`changing page on homepage`, error);
          Pop.error(error);
        }
      }
    };
  },
  components: { ContentCard }
};
</script>

<style lang="scss" scoped>
// .bar {
//   height: 100vh;
//   width: auto;
// }
</style>
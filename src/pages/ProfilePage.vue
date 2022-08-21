<template>
  <div class="right-bar p-2 bar">
    <ContentCard />
    <p>test</p>
  </div>
  <div class="profile-page" v-if="profile">
    <div class="cover-img">
      <div class="position-absolute " style="right:0" v-if="profile.id == account.id">
        <router-link class="btn square btn-warning " :to="{ name: 'Account' }">Edit Account</router-link>
      </div>
      <img :src="profile.picture" alt="" height="120">
      <h3>{{ profile.name }}</h3>
      <p>{{ profile.bio }}</p>
      <p>{{ profile.github }}</p>
      <p>{{ profile.linkedin }}</p>
      <p>{{ profile.class }}</p>
      <p>{{ profile.graduated }}</p>
    </div>
    <div class="container">
      <div class="row">
        <div class="mx-auto my-3 col-md-10" v-for="p in posts" :key="p.id">
          <PostCard :post="p" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-around my-3">
      <button class="btn btn-info" @click="changePage(prevPage)" v-if="prevPage > 1">
        Previous
      </button>
      <button class="btn btn-info" @click="changePage(nextPage)">Next</button>
    </div>

  </div>
  <div v-else>
    Profile Coming<i class="mdi mdi-spin mdi-star"></i>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';
export default {
  setup() {
    const route = useRoute();
    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.profileId);
      }
      catch (error) {
        logger.error("[Getting profile posts]", error);
        Pop.error(error);
      }
    }
    async function getPosts(page) {
      try {
        await postsService.getPosts(page)
      } catch (error) {
        logger.error('Getting posts', error)
        Pop.error(error)
      }
    }
    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId);
      }
      catch (error) {
        logger.error("[GettingProfile]", error);
        Pop.error(error);
        router.push({ name: "Home" });
      }
    }
    onMounted(() => {
      getPosts();
      getProfileById();
      getPostsByCreatorId();
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.activeProfile),
      cover: computed(() => `url(${AppState.activeProfile?.coverImg || "https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg"})`),
      posts: computed(() => AppState.profilePosts),
      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.error(`changing page on profile page`, error)
          Pop.error(error)
        }
      }

    };
  },
  components: { PostCard }
}
</script>
<style lang="scss" scoped>
.cover-img {
  height: 300px;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  color: aliceblue;
  background-image: v-bind(cover);
}
</style>
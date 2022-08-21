<template>
    <div class="post-card card">
        <div class="card-body">
            <div class="post-creator" v-if="post.creator">
                <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
                    <img :src="post.creator.picture" alt="" :title="post.creator.name" class="selectable elevation-4">
                </router-link>
            </div>
            <div class="card-title">
                <h6 class="text-uppercase">
                    {{ post.body }} - {{ new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day:
                                'numeric'
                        })
                    }}
                </h6>
                <div class="img" v-if="post.img">
                    <img :src="post.img" alt="" height="100">
                </div>
                <div v-if="post.creator.id == account.id">
                    <button @click="deletePost">Delete</button>
                </div>
                <div>
                    <!-- <i class="mdi mdi-heart selectable">{{posts.likes.length}}</i> -->
                </div>
            </div>
        </div>
    </div>


</template>








<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        post: { type: Post, required: true }
    },
    setup() {
        return {
            account: computed(() => AppState.account),
            async deletePost(post) {
                try {
                    const yes = await Pop.confirm('Delete the post?')
                    if (!yes) { return }
                    await postsService.deletePost(post.id)
                } catch (error) {
                    logger.error('[Deleting Post]', error)
                    Pop.error(error)
                }
            }
        };
    },
};
</script>











<style lang="scss" scoped>
.post-card {
    min-height: 100px;
    background-image: v-bind(cover) !important;
    background-size: cover;
    background-position: center;
    margin-bottom: 3rem;
    position: relative;
}

.post-creator {
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    img {
        transition: all .15s linear;
        border-radius: 50px;
        height: 45px;
        width: 45px;
        object-fit: cover;
        object-position: center;

        &:hover {
            transform: translateY(-3px);
        }
    }
}
</style>
<template>
    <div class="post-card card selectable">
        <div class="card-body">
            <div class="post-creator" v-if="post.creator">
                <router-link :to="{ name: 'Profile', params: { profileId: project.creator.id } }">
                    <img :src="project.creator.picture" alt="" :title="project.creator.name"
                        class="selectable elevation-2">
                </router-link>
            </div>
            <div class="card-title">
                <h6 class="text-uppercase">
                    {{ post.body }} - {{ new Date(project.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day:
                                'numeric'
                        })
                    }}
                </h6>
                <div class="post-image">
                    <img v-for="img in post.image" :src="img" alt="" height="100">
                </div>
                <div v-if="post.creator.id == account.id">
                    <button @click="toggleEdit">Edit</button>
                    <PostForm v-if="editing" />
                </div>
            </div>
        </div>
    </div>
</template>








<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';

export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(props) {
        const editing = ref(false)
        return {
            editing,
            account: computed(() => AppState.account),
            toggleEdit() {
                AppState.activePost = props.post
                this.editing = !this.editing
            }
        };
    },
};
</script>











<style lang="scss" scoped>
.post-card {
    min-height: 300px;
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
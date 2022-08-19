<template>
    <form @submit.prevent="handleSubmit">
        <p>Make a Post</p>
        <input type="text" placeholder="post" v-model="editable.post" />
        <input type="text" placeholder="image url" v-model="editable.img" />
        <button class="btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>
    </form>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})
        watchEffect(() => {
            if (!AppState.activePost) { return }
            editable.value = { ...AppState.activePost }
        })
        return {
            editable,
            async handleSubmit() {
                try {
                    if (editable.value.id) {
                        await postsService.editPost(editable.value)
                        Pop.success('Post edited')
                    } else {
                        await postsService.createPost(editable.value)
                        Pop.success('Post created')
                    }
                    editable.value
                } catch (error) {
                    logger.error(['Create or Edit post', error])
                    Pop.error(error)
                }
            }
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
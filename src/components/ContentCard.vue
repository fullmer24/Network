<template>
    <div class="Content-card card">
        <div class="card-body" v-for="c in content">
            <img :src="c.square" alt="" height="100">

        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { Content } from '../models/Content.js';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { contentsService } from '../services/ContentsService.js'

export default {
    props: {
        content: { type: Content, required: true }
    },
    setup() {
        async function getContent() {
            try {
                await contentsService.getContent()
            } catch (error) {
                logger.error('Getting content', error)
                Pop.error(error)
            }
        }
        // onMounted(() => {
        //     getContent()
        // })
        return {
            content: computed(() => AppState.content)
        }
    }
};
</script>






<style >
</style>
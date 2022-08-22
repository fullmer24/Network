import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { bcwSandbox } from "./AxiosService.js"

class PostsService {
    async getPosts() {
        const res = await bcwSandbox.get('api/posts')
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        AppState.prevPage = res.data.newer
    }

    async getPostsByCreatorId(creatorId) {
        const res = await bcwSandbox.get('api/profiles/' + creatorId + '/Posts')
        AppState.posts = res.data.posts.map(p => new Post(p))
        console.log(AppState.posts)
    }

    async createPost(postData) {
        const res = await bcwSandbox.post('api/posts', postData)
        AppState.posts.push(new Post(res.data))
    }

    async editPost(postData) {
        const res = await bcwSandbox.put(`api/posts/${postData.id}`, postData)
        const index = AppState.post.findIndex(p => p.id == postData.id)
        AppState.posts.slice(index, 1, new Post(res.data))
    }

    async deletePost(id) {
        const res = await bcwSandbox.delete(`api/posts/${id}`)
        AppState.posts = AppState.posts.filter(p => p.id != id)
    }

    async changePage(url) {
        const res = await bcwSandbox.get(url)
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async searchPosts(searchTerm) {
        const res = await bcwSandbox.get(`api/posts?query=${searchTerm}`)
        AppState.posts = res.data.posts
    }
}

export const postsService = new PostsService()
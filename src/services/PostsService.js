import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { bcwSandbox } from "./AxiosService.js"

class PostsService {
    async getPosts(page = 1) {
        const res = await bcwSandbox.get('api/posts', {
            params: {
                page: page
            }
        })
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.page = res.data.page
    }

    async getPostsByCreatorId(creatorId) {
        const res = await bcwSandbox.get('api/posts', {
            params: {
                creatorId
            }
        })
        AppState.profilePosts = res.data.map(p => new Post(p))
    }

    async createPost(postData) {
        const res = await bcwSandbox.post('/api/posts', postData)
        let post = new Post(res.data)
        AppState.posts = [...AppState.posts, post]
    }

    async editPost(postData) {
        const res = await bcwSandbox.put(`api/posts/${postData.id}`, postData)
        const index = AppState.post.findIndex(p => p.id == postData.id)
        AppState.posts.slice(index, 1, new Post(res.data))
    }

    async deletePost(postId) {
        const res = await bcwSandbox.delete(`api/posts/${postId}`)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }
}

export const postsService = new PostsService()
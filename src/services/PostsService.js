const { AppState } = require("../AppState.js")
const { Post } = require("../models/Post.js")
const { logger } = require("../utils/Logger.js")
const { bcwSandbox } = require("./AxiosService.js")

class PostsService {
    async getPosts() {
        const res = await bcwSandbox.get('api/post')
        logger.log(res.data)
        AppState.posts = res.data.map(p => new Post(p))
    }

    async getPostsByCreatorId(creatorId) {
        const res = await bcwSandbox.get('api/post', {
            params: {
                creatorId
            }
        })
        AppState.profilePosts = res.data.map(p => new Post(p))
    }

    async createPost(postData) {
        const res = await bcwSandbox.post('/api/post', postData)
        let post = new Post(res.data)
        AppState.posts = [...AppState.posts, post]
    }

    async editPost(postData) {
        const res = await bcwSandbox.put(`api/post/${postData.id}`, postData)
        const index = AppState.post.findIndex(p => p.id == postData.id)
        AppState.posts.slice(index, 1, new Post(res.data))
    }

    async deletePost(postId) {
        const res = await bcwSandbox.delete(`api/post/${postId}`)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }
}

export const postsService = new PostsService()
import { reactive } from 'vue'

export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},

  /**@type {import('./models/Post.js').Post[]} */
  posts: [],

  nextPage: null,

  previousPage: null,

  /**@type {import('./models/Post.js').Post[]} */
  profilePosts: [],

  /**@type {import('./models/Content.js').Content[]} */
  content: [],
})
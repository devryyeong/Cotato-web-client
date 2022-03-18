export default class PostService {
  constructor(http, tokenStorage) {
    this.http = http
    this.tokenStorage = tokenStorage
  }

  async getCategory(username) {
    const query = username ? `?username=${username}` : ""
    return this.HttpClient.fetch(`/cotato/${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    })
  }

  async createPost(postTitle, postDesc, category, attachment) {
    console.log(this.getHeaders())
    return this.http.fetch(`/cotato/${category.category}/createPost`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        title: postTitle,
        desc: postDesc,
        category: category.category,
        attachment: attachment,
      }),
    })
  }

  async deletePost(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
  }

  async updatePost(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    })
  }

  getHeaders() {
    const token = this.tokenStorage.getToken()
    return {
      Authorization: `Bearer ${token}`,
    }
  }
}

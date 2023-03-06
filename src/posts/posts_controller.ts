import * as express from "express"

class PostsController{
	path = "/posts"
	router = express.Router()

	constructor(){
		this.initRoutes()
	}

	private initRoutes(){
		this.router.get(this.path, this.getAllPosts)
	}

	private getAllPosts(request, response){
		response.send("all posts")
	}
}

export {PostsController}
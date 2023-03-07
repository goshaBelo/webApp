import * as express from "express"
import {postgresClient} from "../postgre/postgresClient"

class PostsController{
	path = "/posts"
	router = express.Router()

	constructor(){
		this.initRoutes()
	}

	private initRoutes(){
		this.router.get(this.path, this.getAllPosts)
	}

	private async getAllPosts(request, response){
		try{
			let res = await postgresClient.query('select * from posts;')
	        console.log(res.rows)
		    response.send("all posts")

		}catch(error){
			console.log(error)

		}
	}
}

export {PostsController}
import * as express from "express"
import {postgresClient} from "../postgre/postgresClient"
import {authMiddleware} from "../middleware/auth_middleware"
import * as uniqid from "uniqid"

class PostsController{
	path = "posts"
	router = express.Router()

	constructor(){
		this.initRoutes()
	}

	private initRoutes(){
		this.router.get(`/groups/:group_id/${this.path}`, authMiddleware, this.getAllPosts)
	}

	private getAllPosts = async(request, response)=>{
		try{
			if(request.query.action=="suggest"){
				console.log("suggestPost")
				this.suggestPost(request, response)
			}else{
				let group_id = request.params.group_id
			    let posts = (await postgresClient.query(`SELECT * FROM posts WHERE group_id='${group_id}';`)).rows
		        response.send(posts)
			}
		}catch(error){
			console.log(error)
		}
	}

	private suggestPost = async(request, response)=>{
		try{
			let postData = request.body.postData
			let user = request.user
			let post_id = uniqid()
			let group_id = request.params.group_id

			let res = (await postgresClient.query(
				`SELECT * FROM group_members WHERE user_id='${user.id}' AND group_id='${group_id}';`)).rows[0]
			if(res){

				await this.suggestPostService(user, postData, post_id, group_id)
				// await postgresClient.query(`INSERT INTO posts (id, title, content, author_id, group_id)
				// 	VALUES ('${post_id}', '${postData.title}', '${postData.content}', '${user.id}', '${group_id}');`)

				// await postgresClient.query(`INSERT INTO group_suggestions (post_id, group_id)
				//  VALUES ('${post_id}', '${group_id}');`)

				response.send("suggested")

			}else{
				response.send("you dont join group")
			}
		}catch(error){
			console.log(error)
		}
	}

	private suggestPostService = async(user, postData, post_id, group_id)=>{
		try{

			await postgresClient.query(`INSERT INTO posts (id, title, content, author_id, group_id)
				VALUES ('${post_id}', '${postData.title}', '${postData.content}', '${user.id}', '${group_id}');`)

			await postgresClient.query(`INSERT INTO group_suggestions (post_id, group_id)
				VALUES ('${post_id}', '${group_id}');`)			

		}catch(error) {
			console.log(error)
		}
	}

	private checkUserinGroup= async(user, group_id)=>{
		let res = (await postgresClient.query(`SELECT * FROM group_members WHERE user_id='${user.id}' AND group_id='${group_id}';`)).rows[0]
		if(res){
			return true
		}else{
			return false
		}

	}



}

export {PostsController}
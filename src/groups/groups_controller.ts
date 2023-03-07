import * as express from "express"
import {authMiddleware} from "../middleware/auth_middleware"
import * as uniqid from "uniqid"
import {postgresClient} from "../postgre/postgresClient"
import {adminMiddleware} from "../middleware/admin_middleware"

class GroupsController{
	path = "/groups"
	router = express.Router()
	constructor(){
		this.initRoutes()
	}

	private initRoutes(){
		this.router.post(this.path, authMiddleware, this.createGroup)
		this.router.post(`${this.path}/:id`, authMiddleware, this.alterGroupById)
		this.router.get(this.path, authMiddleware, this.getAllGroups)
		this.router.get(`${this.path}/:id`, authMiddleware, this.getGroupById)
		this.router.get(`${this.path}/:id/suggestions`, authMiddleware, adminMiddleware, this.getGroupSuggestions)
	}

	private createGroup = async(request, response)=>{
		try{
			let user = request.user
			let group_data = request.body.group_data
			//console.log(group_data)
			let group_id = uniqid()
			let group = await postgresClient.query(`INSERT INTO groups (id, name) VALUES ('${group_id}', '${group_data.name}');`)
			await postgresClient.query(`INSERT INTO group_members(user_id, group_id) VALUES ('${user.id}', '${group_id}');`)
			await postgresClient.query(`INSERT INTO group_admins(user_id, group_id) VALUES ('${user.id}', '${group_id}');`)
			await postgresClient.query(`INSERT INTO group_creators(user_id, group_id) VALUES ('${user.id}', '${group_id}');`)

		}catch(error){
			console.log(error)
		}
	}

	private getAllGroups = async(request, response)=>{
		try{
			//console.log("getAllGroups")
			let groups = (await postgresClient.query(`SELECT * FROM groups;`)).rows
			response.send(groups)
		}catch(error){
			console.log(error)
		}
	}

	private getGroupById = async(request, response)=>{
		try{
			//console.log("getGroupById")
			let group_id = request.params.id
			let group = (await postgresClient.query(`SELECT * FROM groups WHERE id='${group_id}';`)).rows
			response.send(group)

		}catch(error){
			console.log(error)
		}
	}

	private alterGroupById = async(request, response)=>{
		try{
			console.log(request.query)

		}catch(error){

		}
	}

	private getGroupSuggestions = async(request, response)=>{
		try{

		}catch(error){

		}
	}
}

export{GroupsController}
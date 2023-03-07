import * as express from "express"
import {authMiddleware} from "../middleware/auth_middleware"
import * as uniqid from "uniqid"
import {postgresClient} from "../postgre/postgresClient"

class GroupsController{
	path = "/groups"
	router = express.Router()
	constructor(){
		this.initRoutes()
	}

	private initRoutes(){
		this.router.post(this.path, authMiddleware, this.createGroup)
		//this.router.get(this.path, authMiddleware, this.getAllGroups
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
}

export{GroupsController}
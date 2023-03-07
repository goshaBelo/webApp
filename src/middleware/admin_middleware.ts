import * as express from "express"
import {postgresClient} from "../postgre/postgresClient"

async function adminMiddleware(request, response, next){
	try{
		let user = request.user
		console.log("from adminMiddleware",user)
		let group_id = request.params.id
		let admin = (await postgresClient.query(
			`SELECT * FROM group_admins WHERE group_id='${group_id}' AND user_id='${user.id}';`)).rows[0]
		if(admin){
			console.log("admin adminMiddleware OK")
			next()
		}else{
			response.send("Error/you are not admin of this group/ Error")
		}

	}catch(error){
		console.log(error)
	}
}

export {adminMiddleware}
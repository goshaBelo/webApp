import * as jwt from "jsonwebtoken"
import {postgresClient} from "../postgre/postgresClient"

async function authMiddleware(request, response, next){
	try{
		//console.log(request.headers)
		let token = request.headers.authentication
		if(token){
			let dataFromToken = jwt.verify(token, "SECRET_KEY")
			let user = (await postgresClient.query(`SELECT * FROM users WHERE id='${dataFromToken.id}2';`)).rows[0]
			if(user){
				next()
			}else{
				response.send("authentication error2")
			}
		}else{
			response.send("authentication error")
		}
	}catch(error){
		console.log(error)
		response.send("authentication error")
	}
}

export {authMiddleware}
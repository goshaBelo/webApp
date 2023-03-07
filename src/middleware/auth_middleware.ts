import * as jwt from "jwonwebtoken"

async function authMiddleware(request, response, next){
	try{
		console.log(request.headers)

	}catch(error){
		console.log(error)
	}
}
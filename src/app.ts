import * as express from "express"
import * as bodyParser from "body-parser"
import {postgresClient} from "./postgre/postgresClient"

class App{
	app = express()
	port
	constructor(controllers, port){
		this.port=port
		this.initMiddlewares()
		this.connectDataBase()
		this.initControllers(controllers)
	}

	private initControllers(controllers){
		for(let i=0; i<controllers.length; i++){
			let router = controllers[i].router
			this.app.use("/", router)
		}
	}

	private connectDataBase(){
		postgresClient.connect(function(err){
			if(err){
				throw err
			}else{
				console.log("Connected!")
			}
		})
	}

	private initMiddlewares(){
		this.app.use(bodyParser.json())
	}

	listen(){
		this.app.listen(this.port, ()=>{
			console.log(`server works on ${this.port}`)
		})
	}
}

export{App}
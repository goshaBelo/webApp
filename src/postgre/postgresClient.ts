import {Client} from "pg"

const postgresClient = new Client({
  user: 'gosha_for_twit',
  host: 'localhost',
  database: 'project_twit',
  password: '12345',
  port: 5432,
})

export{postgresClient}


function f(client){
	client.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});

}



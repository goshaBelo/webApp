import {Client} from "pg"

const postgresClient = new Client({
  user: 'gosha_for_twit',
  host: 'localhost',
  database: 'project_twit',
  password: '12345',
  port: 5432,
})

export{postgresClient}


// async function f(client){
// 	await client.connect(function(err) {
// 		if (err) throw err;
// 		console.log("Connected!");
// 	});

// 	let res = await client.query('select * from posts;')
// 	console.log(res)
// }

//f(postgresClient)





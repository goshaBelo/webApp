import {App} from "./app"
import {PostsController} from "./posts/posts_controller"

const app = new App([
	new PostsController()
	], 5000)

app.listen()
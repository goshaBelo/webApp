import {App} from "./app"
import {PostsController} from "./posts/posts_controller"
import {AuthenticationController} from "./authentication/authentication_controller"

const app = new App([
	new PostsController(),
	new AuthenticationController()
	], 5000)

app.listen()
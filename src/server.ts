import {App} from "./app"
import {PostsController} from "./posts/posts_controller"
import {AuthenticationController} from "./authentication/authentication_controller"
import {GroupsController} from "./groups/groups_controller"

const app = new App([
	new PostsController(),
	new AuthenticationController(),
	new GroupsController()
	], 5000)

app.listen()
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Login from "./authentication/login"
import Register from "./authentication/register"
import { index } from "./LandingPages"
import {Home} from "./Home/index"

export const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={index}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}
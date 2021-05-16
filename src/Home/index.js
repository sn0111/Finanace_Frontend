// import { Fragment } from "react"
import Sidebar from "./sidebar"
import './home.css'
import { Topbar } from "./topbar"
import { Route, Switch } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { Bidding } from "../pages/Bidding"
import { Settings } from "../pages/settings"
import { Payments } from "../pages/Payments"
import { Users } from "../pages/Users"
import { Customers } from "../pages/Users/customers"
import Office from "../pages/settings/office"


export const Home =()=>{
    return(
        <div className="home">
            <Sidebar/>
            <div className="main">
                <Topbar/>
                <div className="pages">
                    <Switch>
                        <Route path="/home/dashboard" component={Dashboard} props/>
                        <Route path="/home/payments" component={Payments}/>
                        <Route path="/home/bidding" component={Bidding}/>
                        <Route exact path="/home/users" component={()=><Users users={[]}/>}/>
                        <Route exact path="/home/customers" component={Customers}/>
                        <Route path="/home/office" component={Office}/>
                        <Route path="/home/settings" component={Settings}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}
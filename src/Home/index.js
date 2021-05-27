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
import { Component } from "react"
import { Chat } from "../pages/Bidding/chat"


export class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isMobile:window.innerWidth
        }
    }

    
    render(){

        return(
            <div className="home">
                <Sidebar/>
                <div className="main">
                    <Topbar/>
                    <div className="pages">
                        <Switch>
                            <Route path="/home/dashboard" component={Dashboard}/>
                            <Route path="/home/payments" component={Payments}/>
                            <Route path="/home/bidding1" component={Bidding}/>
                            <Route path="/home/bidding" component={Chat}/>
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
}
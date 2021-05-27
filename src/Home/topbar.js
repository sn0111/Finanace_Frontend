import './home.css'
import img from './index.jpeg'
import React from 'react'

export class Topbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            account:localStorage.getItem('account'),
            data:[]
        }
    }
    componentDidMount(){
        fetch('/account',{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(!data.error){
                this.setState({
                    data:data
                })
            }
        }).catch(e=>console.log(e))
    }
    select_change=(e)=>{
        e.preventDefault();
        localStorage.setItem('account',e.target.value)
        this.setState({
            account:e.target.value
       
        })
    }

    render(){
        return(
            <div className="main">
                <div className="topbar">
                    <ul className="topbar-right">
                        <li>
                            <select onChange={this.select_change} value={this.state.account}>
                                {this.state.data.map((acc,key)=>{
                                    // console.log(acc._id)
                                    return <option value={acc._id} key={key}>{acc.account_amount}</option>
                                })}
                            </select>
                        </li>
                            <li><img src={img} alt="img"/></li>
                            {/* <li>dkkdk</li> */}
                    </ul>
                </div>
            </div>
    
        )
    }
}
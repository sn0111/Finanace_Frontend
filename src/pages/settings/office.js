import react, { Fragment } from 'react'

export default class Office extends react.Component{
    constructor(props){
        super(props);
        this.state={
            office_name:'',
            office_type:'',
            address:'',
            city:'',
            state:'',
            office_no:'',
            pin_code:'',
            data:[],
            type_value:'days',
            amount:'',
            required_holders:'',
            no_of_times:'',
            errormsg:'',
            error:''
        }
    }
    componentDidMount(){
        fetch('http://localhost:3000/office',{
            method:"GET",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                office_name:data.office_name,
                office_type:data.office_type,
                address:data.address,
                city:data.city,
                state:data.state,
                pin_code:data.pin_code,
                office_no:data.phone_no,
            })
        }).catch(console.log)
        console.log(this.state.amount)
        fetch('http://localhost:3000/account',{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                this.setState({
                    data:data
                })
            }).catch(e=>console.log(e))
    }
    add=(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({
            account_amount:this.state.amount,
            required_holders:this.state.required_holders,
            no_of_times:this.state.no_of_times,
            type:this.state.type_value,
        }))
        if(this.state.amount===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'amount'
            })
        }else if(this.state.required_holders===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'required_holders'
            })
        }else if(this.state.no_of_times===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'no_of_times'
            })
        }else{
            fetch('http://localhost:3000/account',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                body:JSON.stringify({
                    account_amount:this.state.amount,
                    total_holders:this.state.total_holders,
                    no_of_times:this.state.no_of_times,
                    type:this.state.type_value,
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                // this.setState({
                //     data:data
                // })
            }).catch(e=>console.log(e))
        }
    }
    update=(e)=>{
        e.preventDefault();
        console.log(this.state.amount)
        console.log(this.state.type_value)
        if(this.state.amount===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'amount'
            })
        }else if(this.state.required_holders===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'required_holders'
            })
        }else if(this.state.no_of_times===""){
            this.setState({
                errormsg:'please fill the above box',
                error:'no_of_times'
            })
        }else{
            fetch('http://localhost:3000/account',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('token')
                },
                body:JSON.stringify({
                    account_amount:this.state.amount,
                    total_holders:this.state.total_holders,
                    no_of_times:this.state.no_of_times,
                    type:this.state.type_value,
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                // this.setState({
                //     data:data
                // })
            }).catch(e=>console.log(e))
        }

    }
    add_account=()=>{
        var modal = document.getElementsByClassName('add-modal')[0]
        modal.style.display='block'
    }
    update_account(){
        var modal = document.getElementsByClassName('update-modal')[0]
        modal.style.display='block'
    }
    close(){
        var add = document.getElementsByClassName('add-modal')[0]
        add.style.display='none'
        var update = document.getElementsByClassName('update-modal')[0]
        update.style.display='none'
    }
    change=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    select_change=(e)=>{
        this.setState({
            type_value:e.target.value
        })
    }
    render(){
        return(
            <Fragment>
                <div className="pages">
                    <div className="office_accounts">
                        <form className="office">
                            <p>Office Settings  </p>
                            <div className="office-f">
                                <label>Office Name</label><br/>
                                <input type="text" name="office_name" value={this.state.office_name} onChange={this.change}/>
                            </div>
                            <div className="office-f">
                                <label>Office Type1</label><br/>
                                <input type="text" name="office_type" value={this.state.office_type} onChange={this.change}/>
                            </div>
                            <div className="office-f">
                                <label>Address</label><br/>
                                <input type="text" name="address" value={this.state.address} onChange={this.change}/>
                            </div>
                            <div className="office-f">
                                <label>City</label><br/>
                                <input type="text" name="city" value={this.state.city} onChange={this.change}/>
                            </div>
                            <div className="office-f">
                                <label>State</label><br/>
                                <input type="text" name="state" value={this.state.state} onChange={this.change}/>
                            </div>
                            <div className="office-f">
                                <label>Pincode</label><br/>
                                <input type="text" name="pincode" value={this.state.pin_code} onChange={this.change}/>
                            </div>
                            <div className="office-f">
                                <label>Office No</label><br/>
                                <input type="text" name="office_no" value={this.state.office_no} onChange={this.change}/>
                            </div>
                            <div className="office-f">
                                <button>Update</button>
                            </div> 
                        </form>
                        <div className="accounts">
                            <span>Account Settings</span>
                            <button style={{float:'right'}} onClick={this.add_account}>Add Account</button>
                            {/* <div className="account">
                                <p>Amount:2000</p>
                                <span>Holders:15</span><span>Required:20</span><hr/>
                                <button onClick={this.update_account}>update</button>
                                <button onClick={this.delete_account} style={{marginLeft:'33%'}}>delete</button>
                                <button onClick={this.hold_account} style={{ float:'right'}}>hold</button>
                            </div> */}
                            {this.state.data.map((d,index)=>{
                                return <div className="account" key={index}>
                                <p>Amount:{d.account_amount}</p>
                                <span>Holders:{d.required_holders}</span><span>Times:{d.no_of_times}</span><hr/>
                                <button onClick={this.update_account}>update</button>
                                <button onClick={this.delete_account} style={{marginLeft:'33%'}}>delete</button>
                                <button onClick={this.hold_account} style={{ float:'right'}}>hold</button>
                            </div>
                            })}
                            
                        </div>
                    </div>
                    {/* add account */}
                    <div className="add-modal">
                        <div className="update-modal-content">
                            <span style={{float:'right'}} className="close" onClick={this.close}>&times;</span>
                            <form className="account-form" onSubmit={this.add}>
                                <p>Adding new account</p>
                                <div className="office-f">
                                    <label>Amount</label><br/>
                                    <input type="text" name="amount" value={this.state.amount} onChange={this.change}/>
                                    {this.state.error==="amount"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                                </div>
                                <div className="office-f">
                                    <label>Required holders</label><br/>
                                    <input type="text" name="required_holders" value={this.state.required_holders} onChange={this.change}/>
                                    {this.state.error==="required_holders"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                                </div>
                                <div className="office-f">
                                    <label>No of times</label><br></br>
                                    <input type="text" name="no_of_times" value={this.state.no_of_times} onChange={this.change}/>
                                    <select onChange={this.select_change} value={this.state.type_value}>
                                        <option value="days">days</option>
                                        <option value="weeks">weeks</option>
                                        <option value="months">months</option>
                                    </select>
                                    {this.state.error==="no_of_times"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                                </div>
                                <div className="office-f">
                                    <button>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* update account */}
                    <div className="update-modal">
                        <div className="update-modal-content">
                            <span style={{float:'right'}} className="close" onClick={this.close}>&times;</span>
                            <form className="account-form" onSubmit={this.update}>
                                <p>Update account</p>
                                <div className="office-f">
                                    <label>Amount</label><br/>
                                    <input type="text" name="amount" value={this.state.amount} onChange={this.change}/><br/>
                                    {this.state.error==="amount"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                                </div>
                                <div className="office-f">
                                    <label>Required holders</label><br/>
                                    <input type="text" name="required_holders" value={this.state.required_holders} onChange={this.change}/><br></br>
                                    {this.state.error==="required_holders"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                                </div>
                                <div className="office-f">
                                    <label>No of times</label><br></br>
                                    <input type="text" name="no_of_times" value={this.state.no_of_times} onChange={this.change}/>
                                    <select onChange={this.select_change} value={this.state.type_value}>
                                        <option value="days">days</option>
                                        <option value="weeks">weeks</option>
                                        <option value="months">months</option>
                                    </select><br/>
                                    {this.state.error==="no_of_times"?<span style={{color:'red'}}>{this.state.errormsg}</span>:null}
                                </div>
                                <div className="office-f">
                                    <button>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
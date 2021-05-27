import react from 'react'
import '../pages.css'

export class Payments extends react.Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        fetch('/payments',{
            method:'GET',
            "headers":{
                "accept": "application/json",
                "content-type": "application/json",
                'Authorization':"Bearer "+localStorage.getItem("token"),
                'account':localStorage.getItem('account')
            }
        }).then(res=>res.json())
        .then(data=>{
            if(!data.error){
                this.setState({
                    data:data
                })
            }
        })
    }
    change=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return(
            <div className="pages">
                <div className="na">
                    <div className="nav-link">
                        <p>Payments
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.99984 0L0.589844 1.41L5.16984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0Z" fill="black"/>
                        </svg></p>
                        <p> all Payments</p>
                    </div>
                </div>
                <div className="nav">
                    <form onSubmit={this.find} className="search">
                        <input type="text" name="find" value={this.setState.find} onChange={this.change}/>
                        <button>Find</button>
                    </form>
                    <ul className="nav-change">
                        <select>
                            <option>paid</option>
                            <option>unpaid</option>
                        </select>
                    </ul>
                </div>
                <table className="nav-table">
                    <thead>
                        <tr className="table-row">
                            <th>S.No</th>
                            <th>Total Amount</th>
                            <th>Amount Paid</th>
                            <th>Paid Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((d,index)=>{
                            return <tr className="table-row" key={index}>
                                <td>1</td>
                                <td>{d.total_amount}</td>
                                <td>{d.amount_paid}</td>
                                <td>{d.paid_date}</td>
                                <td>{d.due_date}</td>
                                <td>{d.status}</td>
                                <td>
                                <div className="dots">
                                <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3.78186C2.55228 3.78186 3 3.25629 3 2.60797C3 1.95965 2.55228 1.43408 2 1.43408C1.44772 1.43408 1 1.95965 1 2.60797C1 3.25629 1.44772 3.78186 2 3.78186Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3.78186C2.55228 3.78186 3 3.25629 3 2.60797C3 1.95965 2.55228 1.43408 2 1.43408C1.44772 1.43408 1 1.95965 1 2.60797C1 3.25629 1.44772 3.78186 2 3.78186Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    
                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3.78186C2.55228 3.78186 3 3.25629 3 2.60797C3 1.95965 2.55228 1.43408 2 1.43408C1.44772 1.43408 1 1.95965 1 2.60797C1 3.25629 1.44772 3.78186 2 3.78186Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {/* <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12.4453 13C12.9976 13 13.4453 12.5523 13.4453 12C13.4453 11.4477 12.9976 11 12.4453 11C11.893 11 11.4453 11.4477 11.4453 12C11.4453 12.5523 11.893 13 12.4453 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M12.4453 6C12.9976 6 13.4453 5.55228 13.4453 5C13.4453 4.44772 12.9976 4 12.4453 4C11.893 4 11.4453 4.44772 11.4453 5C11.4453 5.55228 11.893 6 12.4453 6Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M12.4453 20C12.9976 20 13.4453 19.5523 13.4453 19C13.4453 18.4477 12.9976 18 12.4453 18C11.893 18 11.4453 18.4477 11.4453 19C11.4453 19.5523 11.893 20 12.4453 20Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg> */}
                                </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <ul className="pagination">
                    <li><a href="/1">1</a></li>
                    <li><a href="/2">2</a></li>
                    <li><a href="/3">3</a></li>
                    <li><a href="/4">4</a></li>
                    <li><a href="/5">next</a></li>
                </ul>
            </div>
        )
    }
}
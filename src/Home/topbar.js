import './home.css'
import img from './index.jpeg'

export const Topbar = () =>{
    return(
        <div className="main">
            <div className="topbar">
                <ul className="topbar-right">
                    <li>
                        <select>
                            <option>20000</option>
                            <option>50000</option>
                            <option>100000</option>
                        </select>
                    </li>
                        <li><img src={img} alt="img"/></li>
                        {/* <li>dkkdk</li> */}
                </ul>
            </div>
        </div>

    )
}
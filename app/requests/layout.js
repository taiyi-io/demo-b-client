import Navbar from "../../components/navbar";
import SideTab from "../../components/side_tab";

export default function RequestLayout({ children }){
    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <SideTab current='requests'/>
                    </div>
                    <div className="col pt-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
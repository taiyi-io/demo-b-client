import Navbar from "../../../components/navbar";
import SideTab from "../../../components/side_tab";

export default function AssetLayout({ children }){
    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <SideTab/>
                    </div>
                    <div className="col pt-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
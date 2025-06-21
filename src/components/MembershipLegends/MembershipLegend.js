import './MembershipLegend.css';

const MembershipLegend = () => {
    return (
        <div className="floating-membership-legend" >
             <div className="membership-legend">
                <p className="free-membership-legend"
                    style={{ backgroundColor: "lightgrey", width: "12px", height: "12px", margin: "10px" }}></p>
                <span>Free Members</span>
            </div>
            <div className="membership-legend">
                <p className="premium-membership-legend"
                    style={{ backgroundColor: "mediumspringgreen", width: "12px", height: "12px", margin: "10px" }}></p>
                <span>Premium Members</span>
            </div>
            <div className="membership-legend">
                <p className="deactivated-membership-legend"
                    style={{ backgroundColor: "lightcoral", width: "12px", height: "12px", margin: "10px"}}></p>
                <span>Deactivated Members</span>
            </div>
        </div>
    )
}

export default MembershipLegend

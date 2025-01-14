import { Link } from "react-router-dom";
function DefaultProfile() {
    return (
        <>
        <p>I'm the Default Profile</p>
        <Link to="/">Click here to go back</Link>
        </>
    );
}
export default DefaultProfile;
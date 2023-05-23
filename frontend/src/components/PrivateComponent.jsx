import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateComponent = (props) => {
    const auth = localStorage.getItem('localSession');
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            return navigate('/')
        }
    },[]);


    return (
        props.children
    );

}
export default PrivateComponent;
import { useSelector } from "react-redux";


const Modal = ({closeModal}) => {
    const getNews = useSelector((state)=>
    {
        // console.log(state.newsData);
        return state.newsData;
    })
    return (
        <div className="modal_holder">
            <button className="submit_btn" onClick={closeModal}>Close</button>
            <div className="modal">
                <h1 style={{textAlign:'center',margin:'2% 5%'}} >{getNews[0].headLine}</h1>
                <img className="img_modal" src={getNews[0].pic} alt="picNotFound" />
                <p className="subtitle_modal">{getNews[0].subTitle}</p>
                <div className="brief_news">{getNews[0].newsBrief}</div>
            </div>
        </div>
    );
}
export default Modal;
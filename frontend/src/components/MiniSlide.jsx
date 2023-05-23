
const MiniSlide = ({slide,openModal}) =>
{
    


    return (
        <div className="miniSlide" > 
        <button className="mini_slide_btn" onClick={openModal}>           
            <h4>{slide.headLine}</h4>
            <img className="mini_Slide_Pic" src={slide.pic} alt="newsPic" />
            <p>{slide.subTitle}</p>
            {/* <p>{slide.newsBrief}</p> */}
        </button>
        </div>
    );
}
export default MiniSlide;
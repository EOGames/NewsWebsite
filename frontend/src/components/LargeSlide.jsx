import { useSelector } from "react-redux";
// import { getHomePageData } from "../store/Slices/homeSlice";

const LargeSlide = () => {
    const getLargeSlide = useSelector((state) => {
        console.log('large slide:', state.homePageData);
        return state.homePageData;
    });

    return (
        <>

            {
                getLargeSlide[0]?.headLine ?

                    <div className="largeSlide">
                        <h2 style={{ margin: '0', padding: '0' }} >{getLargeSlide[0]?.headLine}</h2>
                        <img className="largeSlide_Pic" src={getLargeSlide[0]?.pic} alt="LargeSlidePic" />
                        <h4>{getLargeSlide[0]?.subTitle}</h4>
                        <p>{getLargeSlide[0]?.newsBrief}</p>

                    </div>
                    :
                    <h2 style={{color:'darkred'}} >No News Found Add One From Database</h2>
            }
        </>
    );
}
export default LargeSlide;
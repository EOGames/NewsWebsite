import { useSelector } from "react-redux";
// import { getHomePageData } from "../store/Slices/homeSlice";

const LargeSlide = () =>
{
    const getLargeSlide = useSelector((state)=>
    {
        console.log('large slide:',state.homePageData);
        return state.homePageData;
    });

    return (
        <div className="largeSlide">
            <h1>Top News</h1>
            <img src={getLargeSlide[0]?.pic} alt="LargeSlidePic" />
            <h3>{getLargeSlide[0]?.headLine}</h3>
            <p>{getLargeSlide[0]?.subTitle}</p>
            <p>{getLargeSlide[0]?.newsBrief}</p>
        </div>
    );
}
export default LargeSlide;
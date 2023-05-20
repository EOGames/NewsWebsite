import { useRef, useState } from "react";
import { saveToDatabase } from "../api/saveToDatabase.api";

const AddNews = () => {
    const [pic, setPic] = useState('');
    const headLine = useRef('');
    const subTitle = useRef('');
    const newsInBrief = useRef('');
    // const picToEncoded = useRef('');


   

    const convertImageToBase64 =  (e) => {
        console.log(e);

        let reader = new FileReader();

        try {
            if (e!= null)
            {
                reader.readAsDataURL(e);
                reader.onloadend = () => 
                {
                    console.log(reader.result);
                    setPic(reader.result);
                }
            }
        } catch (error) {
            console.log('Error While Encoding Image Error:',error);
        }

    }

    const sendToDatabase = async () => {
        let resp = await saveToDatabase(headLine.current.value, pic, subTitle.current.value, newsInBrief.current.value);
        console.log('resp::::::: ', resp);
    }

    return (
        <div className="formHolder">
            <div className="my_form">
                <input ref={headLine} type="text" placeholder="Enter Headline" />
                <div>
                    <span>Upload Preview Pic</span>
                    <input type="file" onChange={(e)=> convertImageToBase64(e.target.files[0])} />
                </div>
                <input ref={subTitle} type="text" placeholder="SubTitle" />
                <input ref={newsInBrief} type="text" placeholder="News In Brief" />
                <button className="submit_btn" onClick={sendToDatabase}>Save</button>
            </div>
        </div>
    );
}
export default AddNews;
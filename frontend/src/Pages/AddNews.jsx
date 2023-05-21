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

    const sendToDatabase = async () => 
    {
        ShowStatus(true);
        let resp = await saveToDatabase(headLine.current.value, pic, subTitle.current.value, newsInBrief.current.value);
        console.log('resp::::::: ', resp);
        ShowStatus(false);
    }

    const ShowStatus =(bool) =>
    {
        const addNews_status = document.getElementById('addNews_status');
        if (bool)
        {
            addNews_status.innerHTML = 'Saving...';
            addNews_status.style = 'color:red';
        }
        else
        {
            addNews_status.innerHTML = 'Save Completed';
            addNews_status.style = 'color:green';
        }
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
                <p id="addNews_status"></p>
            </div>
        </div>
    );
}
export default AddNews;
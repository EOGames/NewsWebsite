import { useEffect, useRef, useState } from "react";
import { saveToDatabase } from "../api/saveToDatabase.api";
import { findNewsData } from "../api/findNewsData.api";
import { useNavigate, useParams } from "react-router-dom";
import { updateNewsData } from "../api/updateNewsData.api";


const EditNews = () => {
    const navigate = useNavigate();
    const [pic, setPic] = useState('');

    const [headLineValue, setHeadLineValue] = useState('');
    const [subTitleValue, setSubTitleValue] = useState('');
    const [newsInBriefValue, setNewsInBriefValue] = useState('');
    const [picValue, setPicValue] = useState('');

    const headLine = useRef('');
    const subTitle = useRef('');
    const newsInBrief = useRef('');
    // const picToEncoded = useRef('');

    const params = useParams();

    const getValues = async () => {
        let data = await findNewsData(params.id);
        data = data.data.data;
        setHeadLineValue(data.headLine);
        setSubTitleValue(data.subTitle);
        setNewsInBriefValue(data.newsBrief);
        setPicValue(data.pic);
        setPic(data.pic);

        //  headLine.current.value = data.headLine;
        console.log('value:::', data);
    }

    useEffect(() => {
        getValues();
    }, [])
    const convertImageToBase64 = (e) => {
        console.log(e);

        let reader = new FileReader();

        try {
            if (e != null) {
                reader.readAsDataURL(e);
                reader.onloadend = () => {
                    console.log(reader.result);
                    setPic(reader.result);
                }
            }
        } catch (error) {
            console.log('Error While Encoding Image Error:', error);
        }

    }

    const sendToDatabase = async () => {
        ShowStatus(true);
        let resp = await updateNewsData(params.id, headLine.current.value, pic, subTitle.current.value, newsInBrief.current.value);
        console.log('updateNewsData::::::: ', resp);
        ShowStatus(false);

        setTimeout(() =>
        {
            navigate('/database');            
        }, 500);

    }

    const ShowStatus = (bool) => {
        const addNews_status = document.getElementById('addNews_status');
        if (bool) {
            addNews_status.innerHTML = 'Saving...';
            addNews_status.style = 'color:red';
        }
        else {
            addNews_status.innerHTML = 'Save Completed';
            addNews_status.style = 'color:green';
        }
    }

    return (
        <div className="formHolder">
            <div className="my_form">
                <input defaultValue={headLineValue} ref={headLine} type="text" placeholder="Enter Headline" />
                <div>
                    <span>Upload Preview Pic</span>
                    <input defaultValue={picValue} type="file" onChange={(e) => convertImageToBase64(e.target.files[0])} />
                </div>
                <input defaultValue={subTitleValue} ref={subTitle} type="text" placeholder="SubTitle" />
                <input defaultValue={newsInBriefValue} ref={newsInBrief} type="text" placeholder="News In Brief" />
                <button className="submit_btn" onClick={sendToDatabase}>Update</button>
                <p id="addNews_status"></p>
            </div>
        </div>
    );
}
export default EditNews;
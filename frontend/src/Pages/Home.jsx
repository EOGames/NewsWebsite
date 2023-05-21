import React, { useEffect, useState } from 'react'
import { getData } from '../api/getData.api';
import { useDispatch, useSelector } from 'react-redux';
import { addHomePageData,resetStateData } from '../store/Slices/homeSlice';
import LargeSlide from '../components/LargeSlide';
import MiniSlide from '../components/MiniSlide';
import { addNewsdata } from '../store/Slices/newsDataSlice';
import Modal from '../components/Modal';


function Home() {

    const [newsData, setNewsData] = useState([]);
    const dispatch = useDispatch();

    let [handleModal, setOpenModal] = useState(false);
    // let activeId = 0;

    const getMiniSlideData = useSelector((state) => {
        console.log('large slide:', state.homePageData);
        return state.homePageData;
    });

    const FetchData = async () => {
        try {
            let data = await getData();
            dispatch(resetStateData());
            dispatch(addHomePageData(data.data));
            // setNewsData(data.data);

        }
        catch (error) {

        }
    }

    useEffect(() => {
        FetchData();
    }, [])


    const closeModal = () => {
        setOpenModal(false);
    }

    const openModal = (id) => {
        console.log('active_id: For Modal', id);
        dispatch(addNewsdata(getMiniSlideData[id]));
        setOpenModal(true);
    }

    return (
        <div>
            <div className='largeSlideHolder'>
                <LargeSlide />

            </div>

            <div className='miniSlidesHolder'>

                {
                    getMiniSlideData.map((miniSlideData, id) =>

                        <MiniSlide key={'miniSlide_' + id} openModal={() => openModal(id)} slide={miniSlideData} />
                    )
                }


            </div>
            {console.log('handleModal', handleModal)}
            {
                handleModal ? <Modal closeModal={closeModal} /> : null
            }
        </div>
    )
}

export default Home
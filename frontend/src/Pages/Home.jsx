import React, { useEffect, useState } from 'react'
import { getData } from '../api/getData.api';
import { useDispatch, useSelector } from 'react-redux';
import { addHomePageData, resetStateData } from '../store/Slices/homeSlice';
import LargeSlide from '../components/LargeSlide';
import MiniSlide from '../components/MiniSlide';
import { addNewsdata, resetNewsStateData } from '../store/Slices/newsDataSlice';
import Modal from '../components/Modal';
import TablePagination from "@material-ui/core/TablePagination";


function Home() {

    const [newsData, setNewsData] = useState([]);
    const dispatch = useDispatch();

    const [serchValue, setSerchValue] = useState('');

    const [maxNewsCount, setMaxNewsCount] = useState(0);

    const [activePage, setActivePage] = useState(0);


    let [handleModal, setOpenModal] = useState(false);
    // let activeId = 0;


    const FetchData = async () => {
        try {
            let data = await getData(serchValue, activePage);
            console.log('data received in Home ::::', data);
            dispatch(resetStateData());
            dispatch(addHomePageData(data.data.data));
            // setNewsData(data.data);

            if (data?.data?.count) {
                setMaxNewsCount(data.data.count);
            }

        }
        catch (error) {
            console.log('Error In Home Page::::::::', error);
        }
    }

    useEffect(() => {
        FetchData();
    }, [serchValue, activePage])


    const getMiniSlideData = useSelector((state) => {
        console.log('large slide:', state.homePageData);
        return state.homePageData;
    });



    const closeModal = () => {
        setOpenModal(false);
    }

    const openModal = (id) => {
        console.log('active_id: For Modal', id);
        dispatch(resetNewsStateData());
        dispatch(addNewsdata(getMiniSlideData[id]));
        setOpenModal(true);
    }

    const handleSearch = (e) => {
        setSerchValue(e);
    }

    const handleChangePage = (event, newPage) => {
        console.log(' newPage:', newPage)
        setActivePage(newPage);
    }

    return (
        <>
            <input /* className='serchbarPosFixer' */ style={{ margin: '1rem', padding: '1rem' }} type="serch" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />

            <TablePagination className='paginationPosFixer' style={{ display: 'inline-flex'}}
                rowsPerPageOptions={[10]}
                component="div"
                count={maxNewsCount} // This is what your request should be returning in addition to the current page of rows.
                rowsPerPage={10}
                page={activePage}
                size='large'
                onPageChange={handleChangePage}
            //   onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
            {/* <TablePagination style={{ display: 'block',backgroundColor:'grey',marginTop:'1rem' }}
                rowsPerPageOptions={[10]}
                component="div"
                count={maxNewsCount} // This is what your request should be returning in addition to the current page of rows.
                rowsPerPage={10}
                page={activePage}
                size='large'
                onPageChange={handleChangePage}
            //   onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            {console.log('handleModal', handleModal)}
            {
                handleModal ? <Modal closeModal={closeModal} /> : null
            }
        </>
    )
}

export default Home
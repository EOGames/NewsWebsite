import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { useNavigate } from "react-router-dom";
import { getData } from "../api/getData.api";

import { useDispatch } from "react-redux";
import { addNewsdata, resetNewsStateData } from "../store/Slices/newsDataSlice";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { deleteNews } from "../api/deleteNewsData";


const Database = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const [handleModal, setOpenModal] = useState(false);

    const [serchValue, setSerchValue] = useState('');

    const [maxNewsCount,setMaxNewsCount] = useState(0);

    const [activePage,setActivePage] = useState(0);

    const closeModal = () => {
        setOpenModal(false);
    }
    const handleAddNews = () => {
        navigate('/addNews');
    }

    const FetchtData = async () =>
     {
        try 
        {
            let database = await getData(serchValue,activePage);
        console.log('Complete Fetch::::', database);
        if (database?.data?.count)
        {
            setMaxNewsCount(database.data.count);
        }
        setData(database.data.data);    
        } 
        catch (error) 
        {
            console.log('Error While Fetching in Database:::::::',error);    
        }
        
    }

    useEffect(() => {
        FetchtData();
    }, [serchValue,activePage]);


    const openModal = (id) => {
        console.log('id:', data[id]);
        dispatch(resetNewsStateData());
        dispatch(addNewsdata(data[id]));
        setOpenModal(true);
    }

    const editNews = (id) => {
        navigate(`/editNews/${id}`);
    }

    const DeleteNews = async (id) => {
        let data = await deleteNews(id);
        console.log('Deleted:::::::::', data);
        window.location.reload();
    }

    const handleSearch = (e) => {
        setSerchValue(e);
    }

    const handleChangePage = (event,newPage) =>
    {
        console.log(' newPage:',newPage)
        setActivePage(newPage);
    }

    return (
        <div className="dataTableHolder">
            <button onClick={handleAddNews} className="submit_btn btn_right">AddNews</button>
            <input style={{ margin: '1rem', padding: '.5rem' }} type="serch" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
            
            <TablePagination style={{ display: 'inline-flex' }}
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={maxNewsCount} // This is what your request should be returning in addition to the current page of rows.
                    rowsPerPage={10}
                    page={activePage}
                    size='large'
                    onPageChange={handleChangePage}
                //   onRowsPerPageChange={handleChangeRowsPerPage}
                />
            <div className="dataTable">
                <Table>

                    <TableHead >
                        <TableRow>
                            <TableCell style={{ borderTopLeftRadius: '7px' }} className="tableHead" >HeadLine</TableCell>
                            <TableCell className="tableHead" >Preview Pic</TableCell>
                            <TableCell className="tableHead" >SubTitle</TableCell>
                            <TableCell className="tableHead" >Brief</TableCell>
                            <TableCell style={{ borderTopRightRadius: '7px' }} className="tableHead" >Action</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody >
                        {
                            data.length > 0 ?
                                <>
                                    {data.map((n, id) =>
                                        <TableRow style={{ backgroundColor: id % 2 === 0 ? 'grey' : 'darkgrey' }} key={'row_' + id}>
                                            <TableCell className="fontSizeSetter">{n.headLine}</TableCell>
                                            <TableCell className="fontSizeSetter pic_overflowController" >{n.pic}</TableCell>
                                            <TableCell className="fontSizeSetter" >{n.subTitle}</TableCell>
                                            <TableCell className="fontSizeSetter" >{n.newsBrief}</TableCell>
                                            <TableCell className="fontSizeSetter">
                                                <button onClick={() => openModal(id)} className="submit_btn">View</button>
                                                <button onClick={() => editNews(n._id)} className="submit_btn">Edit</button>

                                                <button onClick={() => DeleteNews(n._id)} className="submit_btn">Delete</button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                                :
                                <TableRow>
                                    <TableCell style={{ textAlign: 'center !important', color: 'darkred' }} colSpan={4}>No Data Found</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>

            </div>
              
            {
                handleModal ? <Modal closeModal={closeModal} /> : null
            }
        </div>


    );
}
export default Database;
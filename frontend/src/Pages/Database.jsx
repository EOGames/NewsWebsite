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
import  Modal from "../components/Modal";
import { deleteNews } from "../api/deleteNewsData";


const Database = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data,setData] = useState([]);

    const [handleModal,setOpenModal] = useState(false);

    const closeModal = () =>
    {
        setOpenModal(false);
    }
    const handleAddNews = () => {
        navigate('/addNews');
    }

    const FetchtData = async () => {
        let database = await getData();
        console.log(database);
        setData(database.data);
    }

    useEffect(() => {
        FetchtData();
    }, []);


    const openModal = (id) =>
    {
        console.log('id:',data[id]);
        dispatch(resetNewsStateData());
         dispatch(addNewsdata(data[id]));
        setOpenModal(true);
    }

    const editNews = (id) =>
    {
        navigate(`/editNews/${id}`);
    }

    const DeleteNews = async (id) =>
    {
       let data = await deleteNews(id);
       console.log('Deleted:::::::::',data);
      window.location.reload();
    }

    return (
        <div className="dataTableHolder">
            <button onClick={handleAddNews} className="submit_btn btn_right">AddNews</button>
            <div className="dataTable">
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{borderTopLeftRadius:'7px'}} className="tableHead" >HeadLine</TableCell>
                            <TableCell className="tableHead" >Preview Pic</TableCell>
                            <TableCell className="tableHead" >SubTitle</TableCell>
                            <TableCell className="tableHead" >Brief</TableCell>
                            <TableCell style={{borderTopRightRadius:'7px'}} className="tableHead" >Action</TableCell>
                        </TableRow>
                    </TableHead>

                    
                    <TableBody >
                        {
                            data.length > 0 ?
                                <>
                                    {data.map((n,id) =>
                                        <TableRow style={{backgroundColor: id%2===0 ? 'grey' :'darkgrey'}} key={'row_'+id}>
                                            <TableCell>{n.headLine}</TableCell>
                                            <TableCell className="pic_overflowController" >{n.pic}</TableCell>
                                            <TableCell>{n.subTitle}</TableCell>
                                            <TableCell>{n.newsBrief}</TableCell>
                                            <TableCell>
                                                <button onClick={()=> openModal(id)} className="submit_btn">View</button>
                                                <button onClick={()=> editNews(n._id)} className="submit_btn">Edit</button>

                                                <button onClick={()=> DeleteNews(n._id)} className="submit_btn">Delete</button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                                : 
                                <TableRow>
                                    <TableCell colSpan={4}>No Data Found</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>

            </div>
            {
                handleModal ? <Modal  closeModal ={closeModal} /> : null
            }
        </div>

        
    );
}
export default Database;
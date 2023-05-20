import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { useNavigate } from "react-router-dom";
import { getData } from "../api/getData.api";

import { useDispatch } from "react-redux";
import { addNewsdata } from "../store/Slices/newsDataSlice";
import { useEffect, useState } from "react";
import  Modal from "../components/Modal";


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
         dispatch(addNewsdata(data[id]));
        setOpenModal(true);
    }

    return (
        <div>
            <button onClick={handleAddNews} className="submit_btn btn_right">AddNews</button>
            <div className="dataTable">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>HeadLine</TableCell>
                            {/* <TableCell>Preview Pic</TableCell>
                            <TableCell>SubTitle</TableCell> */}
                            <TableCell>Sub Title</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            data.length > 0 ?
                                <>
                                    {data.map((n,id) =>
                                        <TableRow key={'row_'+id}>
                                            <TableCell>{n.headLine}</TableCell>
                                            {/* <TableCell>{n.headLine}</TableCell>
                                            <TableCell>{n.headLine}</TableCell> */}
                                            <TableCell>{n.subTitle}</TableCell>
                                            <TableCell><button onClick={()=> openModal(id)} className="submit_btn">View</button></TableCell>
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
                handleModal ? <Modal closeModal ={closeModal} /> : null
            }
        </div>

        
    );
}
export default Database;
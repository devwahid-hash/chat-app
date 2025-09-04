import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { serverURL } from "../main";

const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser, userData } = useSelector(state => state.user);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return;
            
            try {
                const response = await axios.get(
                    `${serverURL}/api/message/getMessages/${selectedUser._id}`,
                    { withCredentials: true }
                );
                dispatch(setMessages(response.data));
            } catch (error) {
                console.log(`Error in getMessages: ${error}`);
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
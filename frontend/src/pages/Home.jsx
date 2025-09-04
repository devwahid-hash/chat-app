import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MessageBar from '../components/MessageBar';
import getCurrentUser from '../customHooks/getCurrentUser';
import getAllUsers from '../customHooks/getAllUsers';
import useGetMessages from '../customHooks/getMessage';
import { useSelector } from 'react-redux';

function Home() {
  getCurrentUser();
  getAllUsers();
  useGetMessages();

  const { selectedUser } = useSelector(state => state.user);
  const [isChatOpen, setIsChatOpen] = useState(false);

  React.useEffect(() => {
    if (selectedUser) {
      setIsChatOpen(true);
    }
  }, [selectedUser]);

  return (
    <div className="flex h-screen">
      <div className={`${isChatOpen ? "hidden" : "flex"} md:flex`}>
        <Sidebar />
      </div>
      <MessageBar
        isChatOpen={isChatOpen}
        onBack={() => setIsChatOpen(false)}
      />
    </div>
  );
}

export default Home;

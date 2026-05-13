import { LuBrain } from 'react-icons/lu'
import SideBarItem from './components/SideBarItem'
import { IoIosLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'



const SideBar = ({
  setLoggedIn
}: {
  setLoggedIn: (loggedIn: boolean) => void
}) => {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem("token");

    setLoggedIn(false);

    navigate("/");
  }

  return (
  
    <div className="w-1/4 p-4 bg-[#ffffff] h-screen">
   
      <div className="flex items-center gap-2">

        <span className="text-4xl text-[#4445d7]">
          <LuBrain />
        </span>

        <span className="text-3xl font-bold text-black">
          BRAINEZIUM
        </span>

      </div>

      <div>

        <SideBarItem
          text="Logout"
          onClick={handleLogout}
          icon={<IoIosLogOut />}
        />


      </div>

    </div>
  )
}

export default SideBar
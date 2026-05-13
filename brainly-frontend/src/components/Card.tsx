import { CiShare2 } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
interface CardProps{
  setContents?:React.Dispatch<React.SetStateAction<any[]>>,
  id:string,
  title:string,
  link:string,
  description:string,
  tags:string[],
  date:Date,
  icon:boolean
}
const Card = (props:CardProps) => {
   async function handleShare(){  
        const shareLink=`${window.location.origin}/Content/share/${props.id}`;
        // @ts-ignore
        await navigator.clipboard.writeText(shareLink);
        alert("The link is copied")
     
  }

  async function handleDelete() {
  try {
    await axios.delete(
      "https://brainezium.onrender.com/api/v1/content",
      {
        headers: {
          token: localStorage.getItem("token"),
        },

        data: {
          contentId: props.id
        }
      }
      
    );
if(props.setContents){
      props.setContents((prev) =>
      prev.filter((item) => item._id !== props.id)
    );
  }


    alert("Content deleted successfully");

  } catch (err) {
    console.log(err);
  }
}
  return (
    <div  className="bg-white border border-gray-300 p-4 h-min-70 rounded-xl w-60 m-4 gap-3 flex flex-col justify-start">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2 ">
          <h1 className="text-xl font-bold">{props.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {props.icon &&<>
            <span className="text-xl cursor-pointer text-[#858789]" onClick={handleShare}><CiShare2 /></span>
          <span className="text-xl cursor-pointer  text-[#858789]" onClick={handleDelete}><MdDeleteOutline /></span></>
          }
        </div>
      </div>
      <a
           href={props.link}
           target="_blank"
           rel="noreferrer"
           className="text-blue-500 underline break-all"
            >
           {props.link}
      </a>
      <h4>{props.description}</h4>
      <div>
        {props.tags&&<span className="bg-[#eff3ff]  text-[#5a57a7] rounded-full px-1.5 mx-0.5">#{props.tags} </span>}
      </div>
      <div className="">
    <p className="text-sm text-[#858789]">
  Added on {
    props.date && !isNaN(props.date.getTime())
      ? props.date.toLocaleDateString()
      : "No date"
  }
</p>
    </div>
    </div>
  )
}

export default Card

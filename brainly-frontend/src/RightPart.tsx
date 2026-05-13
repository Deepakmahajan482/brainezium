import { Button } from './components/Button'
import Content from './Content'
import { CiShare2 } from 'react-icons/ci'
import { IoIosAdd } from 'react-icons/io'
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';

const RightPart = () => {
     const [contents, setContents] = useState<any[]>([]);
       const [content,setContent]=useState(false);
       const[link,setlink]=useState("");
       const[title,setTitle]=useState("");
       const[description,setdescription]=useState("");
       const[tags,settags]=useState("");
       const[type,setType]=useState("question");
       const[share,setshare]=useState(false);

      async function handleAddContent(){
        console.log(type);
       await axios.post(`https://brainezium.onrender.com/api/v1/content`,
        {link,type,title,description,tags},
      {
        headers:
        {
          token:localStorage.getItem('token')
        }
      });

      alert("Content added successfully");
      const newContent={
        link,type,title,description,tags,createdAt: new Date().toISOString()
      };
    setContents((prev) => [newContent, ...prev]);
      setContent(false);
    
       }
       
     

       async function handlePrivateLink(){
        const res=await axios.post(`https://brainezium.onrender.com/api/v1/share`,{

        },{
          headers:{
            token:localStorage.getItem('token')
          }
        })
        const hash=res.data.shareId;
        const shareLink=`${window.location.origin}/share/${hash}`;
        // @ts-ignore
        await navigator.clipboard.writeText(shareLink);
        alert("The link is copied")
        setshare(false);

       }
       
   
  return (
    
<div className="w-3/4 p-4 bg-[#f7f9fb] h-min-screen">
        <div>
              {share && <div className="fixed top-0 left-0 w-full h-full bg-slate-500/60   flex items-center justify-center z-10">
    <div className="bg-white p-6 rounded-lg w-1/3">
    <div className='flex flex-row justify-between'>
    <div className='font-bold text-2xl'>Share Link</div>
    <div className="flex justify-end text-2xl font-bold my-4 cursor-pointer" onClick={()=>setshare(false)}>
      <RxCross2 /> 
      </div>  </div>
      <div className='flex flex-row gap-5'>
      <Button variant="#4445d7" textColor="#fff" size='md' text="Click Here to Copy The Link"  onClick={handlePrivateLink} />
  </div></div>
     </div>
    } 
          </div>


          <div>
              {content && <div className="fixed top-0 left-0 w-full h-full bg-slate-500/60   flex items-center justify-center z-10">
    <div className="bg-white p-6 rounded-lg w-1/3">
    <div className="flex justify-end text-2xl font-bold my-4 cursor-pointer" onClick={()=>setContent(false)}>
      <RxCross2 /> 
      </div>  
      <input type="text" placeholder="Enter the Link" value={link} onChange={(e) => setlink(e.target.value)}  className="border border-gray-300 rounded-md p-2 w-full mb-4"  />
      <input type="text" placeholder="Enter the Title" value={title} onChange={(e) => setTitle(e.target.value)}  className="border border-gray-300 rounded-md p-2 w-full mb-4"  />
      <select   value={type}
  onChange={(e) => setType(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full mb-4">
    <option disabled>Select any one</option>
        <option>question</option>
        <option>answer</option>
      </select>
      <input type="text" placeholder="Enter the Description" value={description} onChange={(e) => setdescription(e.target.value)}  className="border border-gray-300 rounded-md p-2 w-full mb-4"  />
      <input type="text" placeholder="Enter the tag" value={tags} onChange={(e) => settags(e.target.value)}  className="border border-gray-300 rounded-md p-2 w-full mb-4"  />
      <div className="flex justify-center">
      <Button variant="#4445d7" textColor="#fff" size='md' text="Add Content"  onClick={handleAddContent} />
        </div>
     </div>
    </div>} 
          </div>
      <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
      <span className="text-2xl text-black font-bold py-10 px-3">ALL NOTES</span>
      </div>
      <div className="flex items-center gap-2">
         <span><Button variant="#dde5ff" textColor="#4644db" size='md' text="Share" startIcon={<CiShare2 />} onClick={()=>{setshare(true)}} /></span>
      <span>
      <Button variant="#4445d7" textColor="#fff" size='md' text="Add Content" startIcon={<IoIosAdd />} onClick={()=>{setContent(true)}} />
      </span>
      </div>
    </div>
    <div>
     <Content contents={contents} setContents={setContents}/>
    </div>
    </div>
  )
}

export default RightPart




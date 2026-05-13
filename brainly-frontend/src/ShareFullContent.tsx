import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Card from './components/Card'
const ShareFullContent = () => {
  interface ContentItem {
  _id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
  createdAt: string;
}
  const [Data,setData]=useState<ContentItem[]>([]);
  const { id } = useParams();
 useEffect(() => {
  axios.get(`http://localhost:3000/api/v1/share/${id}`)
    .then(res => setData(res.data.content));
}, []);
  return (
    <div  className="flex flex-wrap">
     
     {Data.map((data) => (
     <Card
   
     key={data._id}
      id={data._id}
      title={data.title}
      link={data.link}
      description={data.description}
      tags={data.tags}
      date={new Date(data.createdAt)}
      icon={false}
  />
))}
</div>
    
  )
}

export default ShareFullContent
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./components/Card";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
  createdAt: string;
}

const ShareSingleContent = () => {
  const [data, setData] = useState<ContentItem | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/brain/public/${id}`)
      .then((res) => setData(res.data.content))
      .catch((err) => console.log(err));
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex justify-center items-center">
      <Card
        id={data._id}
        title={data.title}
        link={data.link}
        description={data.description}
        tags={data.tags}
        date={new Date(data.createdAt)}
        icon={false}
      />
    </div>
  );
};

export default ShareSingleContent;
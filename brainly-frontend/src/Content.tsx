import { useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
interface ContentProps {
  contents: any[];
  setContents: React.Dispatch<React.SetStateAction<any[]>>;
}
const Content = ({contents,setContents}:ContentProps) => {

  

  async function fetcher() {
    try {
      const res = await axios.get(
        "https://brainezium.onrender.com/api/v1/content",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setContents(res.data.contents);
console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className="flex flex-wrap">
      {contents.map((item: any) => (
        <Card
        icon={true}
          setContents={setContents}
          key={item._id}
          id={item._id}
          title={item.title}
          link={item.link}
          description={item.description}
          tags={item.tags}
          date={new Date(item.createdAt)}
        />
      ))}
    </div>
  );
};

export default Content;
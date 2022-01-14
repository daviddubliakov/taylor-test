import { FC, useEffect, useState } from "react"

import getNews from "../services/posts";

interface INews {
  userId: number,
  id: number,
  title: string,
  body: string
}

const News: FC = () => {
  const [news, setNews] = useState<Array<INews> | null>(null)

  useEffect(() => {
    (async () => {
      const response = await getNews();

      if (response.status === 200) {
        setNews(response.data);
      }
    })();
  }, []);

  return (
    <div className="grid place-content-center py-10">
      <h2 className="text-xl m-auto my-10">Rest API list</h2>
      <ul>
        {(news && news.length !== 0) ? (
          news.map((item, index) => (
            <li key={index} className="my-10 mx-10 box-content h-100 w-100 p-4 border-4">
              <p>{item?.id}</p>
              <p>{item?.title}</p>
              <p>{item?.body}</p>
            </li>
          ))
        ) : (
          <p>
            <strong>You have no items</strong>
          </p>
        )}
      </ul>
    </div>
  )
}

export default News
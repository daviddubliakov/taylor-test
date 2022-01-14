import { FC } from "react";

import ListOfContacts from "./components/ListOfContacts";
import News from "./components/News";

const App: FC = () => {

  return (
    <div>
      <ListOfContacts />
      <hr />
      <News />
    </div>
  )
}

export default App;

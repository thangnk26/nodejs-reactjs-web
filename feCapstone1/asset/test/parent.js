import { useState } from "react";
import Child from "./child";

function Parent() {
  const [name, setName] = useState(true);
  console.log(name);
  //   const [name, setName] = useState("hello");
  const handleChangeText = (text) => {
    setName(text);
  };

  return (
    <>
      <div>
        <h5>hello:{name}</h5>
        <Child handleChangeText={handleChangeText} />
      </div>
    </>
  );
}
export default Parent;

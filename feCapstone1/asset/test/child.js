import { Link } from "react-router-dom";
function Child(props) {
  //   const changeText = (e) => {
  //     props.handleChangeText(e.target.value);
  //     console.log(e.target.value);
  //   };
  const handleLoginClick = (e) => {
    // setHeader({ header: true });
    props.handleChangeText(false);
    // console.log("da bam vao" + header);
  };
  return (
    <>
      <div>
        <h5>I am child</h5>
        {/* <button onClick={(e) => handleLoginClick(e)}>alo</button> */}
        <div onClick={(e) => handleLoginClick(e)}>
          <Link to="/" style={{ border: "none", background: "none" }}>
            <i className="fa-regular fa-user" />
          </Link>
        </div>
        {/* <input onChange={(e) => changeText(e)} type="text" /> */}
      </div>
    </>
  );
}
export default Child;

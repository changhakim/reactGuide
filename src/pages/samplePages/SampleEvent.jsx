import Styles from "./Develop.module.scss";
import image1 from "@styles/assets/images/temp/baseball.png";
function SampleEvent() {
  console.log("== SampleEvent ==");

  return (
    <div className={Styles.page}>
      <span style={{ marginLeft: "200px" }}>작업중</span>
      <img src={image1} />
    </div>
  );
}

export default SampleEvent;

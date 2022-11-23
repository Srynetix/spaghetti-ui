import Parameters from "./Parameters";
import Graph from "./Graph";
import classes from "./style.module.scss";

const Home = () => {
  return (
    <>
      <div className={classes.header}>Spaghetti UI🍝</div>
      <Parameters />
      <Graph />
    </>
  );
};

export default Home;

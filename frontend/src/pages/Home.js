import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home page">
      <nav>
        <Link to="/therapist">Therapist</Link><span> | </span>
        <Link to="/client">Client</Link><span> | </span>
        <Link to="/session">Session</Link>
      </nav>
      <h1>Therapist-Client Management System</h1>
      <h2>Please select a page from the navigation menu</h2>
    </div>
  );
};

export default Home;

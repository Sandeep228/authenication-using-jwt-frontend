import { useSelector } from "react-redux";

function Dashboard() {
  const { user} = useSelector(
    (state) => state.auth
  );
  return (
    <>
    <section className="heading">
      <h3>Welcome to Dashboard {user && user.user.name}</h3>
    </section>
  </>
  );
}
export default Dashboard;

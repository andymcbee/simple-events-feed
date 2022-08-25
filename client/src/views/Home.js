import EventsFeed from "../components/EventsFeed";

function Home({ user }) {
  console.log("HOME....");
  console.log(user);
  return <EventsFeed user={user} />;
}

export default Home;

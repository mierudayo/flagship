import AppLayout from '@/Layouts/AppLayout'

const Home = () => {
  return (
    <>
      <h1>HOME</h1>
      <p>Welcome to Sales Manager+</p>
    </>
  );
}

Home.layout = page => <AppLayout children={page} />

export default Home

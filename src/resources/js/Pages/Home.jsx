import AppLayout from '@/Layouts/AppLayout'

const Home = () => {
  return (
    <>
      <h1>HOME</h1>
      <p>Welcome to Sales Manager+</p>
    </>
  );
}

Home.layout = page => <AppLayout title="HOME" children={page} />

export default Home

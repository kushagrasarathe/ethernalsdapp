import '../styles/globals.css'
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <div style={{backgroundImage: "url(./background.jpg)"}} className="bg-cover bg-no-repeat min-h-screen">
    <Layout>
      <Component {...pageProps} />
    </Layout>
  
    </div>
    </>
  );
}

export default MyApp

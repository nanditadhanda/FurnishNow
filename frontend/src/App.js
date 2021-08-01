import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';

import {Container} from 'react-bootstrap'

function App() {
  return (
    <>
    <Header />
    <main >
      <Container>
        <HomeScreen></HomeScreen>
      </Container>

    </main>
    <Footer />
    </>
  );
}

export default App;

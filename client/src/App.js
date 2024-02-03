import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import User from './components/user';
import Main from './components/main';
import Instruments from './components/instruments';
import Materiels from './components/materiels';
import Normes from './components/normes';
import Documents from './components/documents';
import CreateInstrument from './components/createInstrument';
import CreateDocument from './components/createDocument';
import CreateNorme from './components/createNorme';
import CreateMateriel from './components/createMateriel';
import CreateOperation from './components/createOperation';
import SupprimerInstrument from './components/supprimerInstrument';
import SupprimerMateriel from './components/supprimerMateriel';
import SupprimerNorme from './components/supprimerNorme';
import SupprimerDocument from './components/supprimerDocument';
import ModifierInstrument from './components/modifierInstrument';
import EditInstrument from './components/editInstrument';
import ModifierDocument from './components/modifierDocument';
import EditDocument from './components/editDocument';
import ModifierNorme from './components/modifierNorme';
import EditNorme from './components/editNorme';
import ModifierMateriel from './components/modifierMateriel';
import EditMateriel from './components/editMateriel';
import ModifierOperation from './components/modifierOperation';
import DetailInstrument from './components/detailInstrument';
import AffecterMateriels from './components/affecterMateriels';
import AffecterDocuments from './components/affecterDocuments';
import AffecterNormes from './components/affecterNormes';
import EtalonnerInstrument from './components/etalonnerInstrument';
import About from './components/about';
import Contact from './components/contact';
import Etats from './components/etats';
import FicheVie from './components/ficheVie';
import Planning from './components/planning';
import InstrumentsInactifs from './components/instrumentsInactifs';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/main/" element={<Main />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/materiels" element={<Materiels />} />
          <Route path="/normes" element={<Normes />} />
          <Route path="/etats" element={<Etats />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/add-instrument" element={<CreateInstrument />} />
          <Route path="/add-document" element={<CreateDocument />} />
          <Route path="/add-norme" element={<CreateNorme />} />
          <Route path="/add-materiel" element={<CreateMateriel />} />
          <Route path="/add-operation/:id_instrument" element={<CreateOperation />} />
          <Route path="/delete-instrument" element={<SupprimerInstrument />} />
          <Route path="/delete-materiel" element={<SupprimerMateriel />} />
          <Route path="/delete-document" element={<SupprimerDocument />} />
          <Route path="/delete-norme" element={<SupprimerNorme />} />
          <Route path="/edit-instrument" element={<EditInstrument />} />
          <Route path="/edit-instrument/:id_instrument" element={<ModifierInstrument />} />
          <Route path="/edit-materiel" element={<EditMateriel />} />
          <Route path="/edit-materiel/:id_materiel" element={<ModifierMateriel />} />
          <Route path="/edit-document" element={<EditDocument />} />
          <Route path="/edit-document/:id_document" element={<ModifierDocument />} />
          <Route path="/edit-norme" element={<EditNorme />} />
          <Route path="/edit-norme/:id_norme" element={<ModifierNorme />} />
          <Route path="/edit-operation/:id_operation" element={<ModifierOperation />} />
          <Route path="/detail-instrument/:numero_interne_instrument" element={<DetailInstrument />} />
          <Route path="/materiels-instrument/:numero_interne_instrument" element={<AffecterMateriels />} />
          <Route path="/documents-instrument/:numero_interne_instrument" element={<AffecterDocuments />} />
          <Route path="/normes-instrument/:numero_interne_instrument" element={<AffecterNormes />} />
          <Route path="/etalonner-instrument/:id_instrument" element={<EtalonnerInstrument />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fiche-vie" element={<FicheVie />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/instruments-inactifs" element={<InstrumentsInactifs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

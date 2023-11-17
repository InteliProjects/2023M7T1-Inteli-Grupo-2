import React, { useState } from 'react';
import './home-styles.css';
import tonImage from '../../assets/Ton.png';
import TaxasModal from '../../components/TaxasModal';
import DetalhesModal from '../../components/DetalhesModal';
import DetalhesFlexModal from '../../components/DetalhesFlexModal';
import { useSelectedCategory } from '../../contexts/SelectedCategoryContext';

import { useParams, useNavigate } from 'react-router-dom';

/**
 * Component that renders the home page where the user can choose the plan he wants to buy
 * */
const Home = () => {
  const [showTaxasModal, setShowTaxasModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showDetalhesFlexModal, setShowDetalhesFlexModal] = useState(false);

  const { setSelectedCategory} = useSelectedCategory();
  const navigate = useNavigate();
  const { id } = useParams();

  /*
    * Redirects the user to the order page to buy Ton machines
  */
  const buyTon = async () => {
    setSelectedCategory('ton');
    navigate("/order/" + id);
  }

  /*
    * Redirects the user to the order page to buy Stone machines
  */
  const buyStone = async () => {
    setSelectedCategory('stone');
    navigate("/order/" + id);
  }

  /*
    * Redirects the user to the profile page
  */
  const profile = () => {
      navigate("/profile/" + id);
  }
  
  /*
    * Closes the modal with the taxes information
  */
  const closeTaxasModal = () => {
    setShowTaxasModal(false);
  };

  /*
    * Closes the modal with the details information about the machines
  */
  const closeDetalhesModal = () => {
    setShowDetalhesModal(false);
  };

  /*
    * Closes the modal with the details information about the flex option
  */
  const closeDetalhesFlexModal = () => {
    setShowDetalhesFlexModal(false);
  };

  return (
    <div>
      <div className="rectangle">
        <div id="logo" className='nimbbbus-text'>nimBBBus</div>
        <div className="user-circle" onClick={profile}></div>
      </div>
        <div className="additional-rectangle1">
        <img src={tonImage} alt="Ton" className="ton-image" />
        <div className="text">Ton</div>
        <div className="subtext">O básico para quem quer<br />começar a vender.</div>
        <div className="price-home">
      <span className="bold-text">A partir de:</span> <span className="smaller-text">4x de</span> <span className="bold-price"><br />R$ <span className="larger-text">26,70</span></span>
    </div>
    <div className="button-container" onClick={buyTon}>Contrate agora</div>
  </div>
  <div className="additional-rectangle1">
        <img src={tonImage} alt="Ton" className="ton-image" />
        <div className="text">Ton</div>
        <div className="subtext">O básico para quem quer<br />começar a vender.</div>
        <div className="price-home">
      <span className="bold-text">A partir de:</span> <span className="smaller-text">5x de</span> <span className="bold-price"><br />R$ <span className="larger-text">21,36</span></span>
    </div>
    <div className="button-container" onClick={buyTon}>Contrate agora</div>
  </div>     
      {showTaxasModal && <TaxasModal closeModal={closeTaxasModal} buyTon={buyTon} />}
      {showDetalhesModal && <DetalhesModal closeModal={closeDetalhesModal} buyStone={buyStone} />}
      {showDetalhesFlexModal && <DetalhesFlexModal closeModal={closeDetalhesFlexModal} buyStone={buyStone} />}
    </div>
  );
};

export default Home;

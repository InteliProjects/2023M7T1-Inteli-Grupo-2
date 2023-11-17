import React, { useState } from 'react';
import './home-styles.css';
import tonImage from '../../assets/Ton.png';
import StoneImage from '../../assets/Stone.png';
import TaxasModal from '../../components/TaxasModal';
import DetalhesModal from '../../components/DetalhesModal';
import DetalhesFlexModal from '../../components/DetalhesFlexModal';
import { useSelectedCategory } from '../../contexts/SelectedCategoryContext';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Component that renders the home page where the user can choose the plan he wants to buy
 */
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
   * Opens the modal with the taxes information
   */
  const openTaxasModal = () => {
    setShowTaxasModal(true);
  };

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
   * Opens the modal with the details information about the machines
   */
  const openDetalhesModal = () => {
    setShowDetalhesModal(true);
  };

  /*
   * Closes the modal with the details information about the machines
   */
  const closeDetalhesModal = () => {
    setShowDetalhesModal(false);
  };

  /*
   * Opens the modal with the details information about the flex option
   */
  const openDetalhesFlexModal = () => {
    setShowDetalhesFlexModal(true);
  };

  /*
   * Closes the modal with the details information about the flex option
   */
  const closeDetalhesFlexModal = () => {
    setShowDetalhesFlexModal(false);
  };

  return (
    <div className="home">
      <div className="rectangle">
        <div id="logo" className='nimbbbus-text'>nimBBBus</div>
        <div className="user-circle" onClick={profile}></div>
      </div>
      <div className="additional-rectangle1">
        <img src={tonImage} alt="Ton" className="ton-image" />
        <div className="text">Ton</div>
        <div className="subtext">O básico para quem quer<br />começar a vender.</div>
        <div className="price-home">
          <span className="bold-text">A partir de:</span> <span className="smaller-text">12x de</span> <span className="bold-price"><br />R$ <span className="larger-text">8,90</span></span>
        </div>
        <div className="button-container" onClick={buyTon}>Contrate agora</div>
        <p className="clickable-text" onClick={openTaxasModal} >Entenda as taxas promocionais</p>
      </div>
      <div className="additional-rectangle2">
        <img src={StoneImage} alt="Stone" className="stone-image" />
        <div className="essential-pro">Essential pro</div>
        <div className="subtext2">Zero aluguel e Conta <br />empresa sem mensalidade.</div>
        <div className="price-info">
          <span className="bold-text2">A partir:</span> <span className="smaller-text">12x</span> <span className="smaller-text">de</span> <span className="bold-price2"><br />R$ <span className="larger-text2">49,90</span></span>
        </div>
        <div className="button-container2" onClick={buyStone}>Contrate agora</div>
        <p className="clickable-text2" onClick={openDetalhesModal}>Mais detalhes</p>
      </div>
      <div className="additional-rectangle3">
        <img src={StoneImage} alt="Stone" className="stone-image2" />
        <div className="flex-text flex-text-small">Flex</div>
        <div className="subtext3">
          As melhores taxas
          <br />e máquinas grátis.
        </div>
        <div className="taxas-flexiveis taxas-flexiveis-small">Taxas Flexíveis!</div>
        <div className="button-container3 button-container3-small" onClick={buyStone}>
          Contrate agora
        </div>
        <p className="clickable-text3" onClick={openDetalhesFlexModal}>
          Mais detalhes
        </p>
      </div>

      {showTaxasModal && <TaxasModal closeModal={closeTaxasModal} buyTon={buyTon} />}
      {showDetalhesModal && <DetalhesModal closeModal={closeDetalhesModal} buyStone={buyStone} />}
      {showDetalhesFlexModal && <DetalhesFlexModal closeModal={closeDetalhesFlexModal} buyStone={buyStone} />}
    </div>
  );
};

export default Home;

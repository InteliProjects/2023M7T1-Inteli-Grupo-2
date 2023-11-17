import React, { useState } from 'react';
import './home-styles.css';
import tonImage from '../../assets/Ton.png';
import StoneImage from '../../assets/Stone.png';
import TaxasModal from '../../components/TaxasModal';
import DetalhesModal from '../../components/DetalhesModal';
import DetalhesFlexModal from '../../components/DetalhesFlexModal';
import { useSelectedCategory } from '../../contexts/SelectedCategoryContext';
import { useParams, useNavigate } from 'react-router-dom';

const Home = () => {
  const [showTaxasModal, setShowTaxasModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showDetalhesFlexModal, setShowDetalhesFlexModal] = useState(false);
  const { setSelectedCategory } = useSelectedCategory();
  const navigate = useNavigate();
  const { id } = useParams();

  const buyTon = async () => {
    setSelectedCategory('ton');
    navigate(`/order/${id}`);
  }

  const buyStone = async () => {
    setSelectedCategory('stone');
    navigate(`/order/${id}`);
  }

  const profile = () => {
    navigate(`/profile/${id}`);
  }

  const closeTaxasModal = () => {
    setShowTaxasModal(false);
  };

  const closeDetalhesModal = () => {
    setShowDetalhesModal(false);
  };

  const closeDetalhesFlexModal = () => {
    setShowDetalhesFlexModal(false);
  };

  const clickHome = () => {
    navigate(`/home/${id}`);
  };

  return (
    <div className="home">
      <div className="custom-rectangle">
        <div id="logo" className="custom-nimbbbus-text">nimBBBus</div>
        <div className="custom-user-circle" onClick={profile}></div>
      </div>
      <div className="custom-additional-rectangle1">
        <img src={tonImage} alt="Ton" className="custom-ton-image" />
        <div className="custom-text">Essential <br/>DebitoStar</div>
        <div className="custom-subtext">Transforme suas vendas!<br/>Lucre mais no seu trabalho!</div>
        <div className="custom-price-home">
          <span className="custom-bold-text">Taxas de</span><span className="custom-bold-price"><span className="custom-larger-text"> 0,90%</span></span>
          <br/><span className="custom-bold-text2">ao mês!</span>
        </div>
        <div className="custom-button-container" onClick={buyTon}>Contrate agora</div>
        <p className="custom-clickable-text" onClick={clickHome}>Não satisfeito? Confira mais!</p>
      </div>
      <div className="custom-additional-rectangle2">
        <img src={StoneImage} alt="Stone" className="custom-stone-image" />
        <div className="custom-essential-pro"> Essential <br/>VisaRapid Pro</div>
        <div className="custom-subtext2">Com ela suas vendas fluem<br/>de forma eficiente!</div>
        <div className="custom-price-info">
          <span className="custom-bold-text2">Taxas de</span><span className="custom-bold-price2"><span className="custom-larger-text2"> 4,80%</span></span>
          <br/><span className="custom-bold-text2">ao mês!</span>
        </div>
        <div className="custom-button-container2" onClick={buyStone}>Contrate agora</div>
        <p className="custom-clickable-text2" onClick={clickHome}>Não satisfeito? Confira mais!</p>
      </div>
      <div className="custom-additional-rectangle3">
        <img src={StoneImage} alt="Stone" className="custom-stone-image2" />
        <div className="custom-flex-text custom-flex-text-small">Essential <br/>ParcelPro</div>
        <div className="custom-subtext3">
          Transforme compradores <br/>em clientes fiéis!
        </div>
        <div className="custom-taxas-flexiveis custom-taxas-flexiveis-small">
          <span className="custom-bold-text3">Taxas de</span><span className="custom-bold-price3"><span className="custom-larger-text3"> 12,49%</span></span>
          <br/><span className="custom-bold-text3">ao mês!</span>
        </div>
        <div className="custom-button-container3 custom-button-container3-small" onClick={buyStone}>
          Contrate agora
        </div>
        <p className="custom-clickable-text3" onClick={clickHome}>
          Não satisfeito! Confira mais!
        </p>
      </div>

      {showTaxasModal && <TaxasModal closeModal={closeTaxasModal} buyTon={buyTon} />}
      {showDetalhesModal && <DetalhesModal closeModal={closeDetalhesModal} buyStone={buyStone} />}
      {showDetalhesFlexModal && <DetalhesFlexModal closeModal={closeDetalhesFlexModal} buyStone={buyStone} />}
    </div>
  );
};

export default Home;

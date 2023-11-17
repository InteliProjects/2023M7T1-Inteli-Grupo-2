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
  const [showCustomTaxasModal, setShowCustomTaxasModal] = useState(false);
  const [showCustomDetalhesModal, setShowCustomDetalhesModal] = useState(false);
  const [showCustomDetalhesFlexModal, setShowCustomDetalhesFlexModal] = useState(false);

  const { setSelectedCategory } = useSelectedCategory();
  const navigate = useNavigate();
  const { id } = useParams();

  const buyCustomTon = async () => {
    setSelectedCategory('ton');
    navigate("/order/" + id);
  }

  const buyCustomStone = async () => {
    setSelectedCategory('stone');
    navigate("/order/" + id);
  }

  const profile = () => {
    navigate("/profile/" + id);
  }

  const closeCustomTaxasModal = () => {
    setShowCustomTaxasModal(false);
  };

  const closeCustomDetalhesModal = () => {
    setShowCustomDetalhesModal(false);
  };

  const closeCustomDetalhesFlexModal = () => {
    setShowCustomDetalhesFlexModal(false);
  };

  const clickCustomHome = () => {
    navigate(`/home/${id}`);
  };

  return (
    <div className="abc-home">
      <div className="abc-rectangle">
        <div id="logo" className='abc-nimbbbus-text'>nimBBBus</div>
        <div className="abc-user-circle" onClick={profile}></div>
      </div>
      <div className="abc-additional-rectangle1">
        <img src={tonImage} alt="Ton" className="abc-ton-image" />
        <div className="abc-text">Essential Master</div>
        <div className="abc-subtext">Desbloqueie o poder <br />de vender!</div>
        <div className="abc-price-home">
          <span className="abc-bold-text">Taxa de</span> <span className="abc-larger-text"> 15,39%</span>
          <br /> <span className="abc-bold-month">ao mês!</span>
        </div>
        <div className="abc-button-container" onClick={buyCustomTon}>Contrate agora</div>
        <p className="abc-clickable-text" onClick={clickCustomHome}>Não satisfeito? Confira mais!</p>
      </div>
      <div className="abc-additional-rectangle2">
        <img src={StoneImage} alt="Stone" className="abc-stone-image" />
        <div className="abc-essential-pro">Essential Charge</div>
        <div className="abc-subtext2">O sucesso do seu negócio <br />com taxas imbativeis!</div>
        <div className="abc-price-info">
        <span className="abc-bold-text">Taxa de</span> <span className="abc-larger-text"> 15,39%</span>
          <br /><span className="abc-bold_month">ao mês!</span>
        </div>
        <div className="abc-button-container2" onClick={buyCustomStone}>Contrate agora</div>
        <p className="abc-clickable-text2" onClick={clickCustomHome}>Não satisfeito? Confira mais!</p>
      </div>
      <div className="abc-additional-rectangle3">
        <img src={StoneImage} alt="Stone" className="abc-stone-image2" />
        <div className="abc-flex-text abc-flex-text-small">Essential <br />PayPro</div>
        <div className="abc-subtext3">
          Flexibilidade e economia
          <br />se encontram aqui!
        </div>
        <div className="abc-taxas-flexiveis custom-taxas-flexiveis-small">Taxa de <span className="abc-larger-text3">12,39%</span>
          <br /><span className="abc-bold_month3">ao mês!</span>
        </div>
        <div className="abc-button-container3 custom-button-container3-small" onClick={buyCustomStone}>
          Contrate agora
        </div>
        <p className="abc-clickable-text3" onClick={clickCustomHome}>
          Não satisfeito? Confira mais!
        </p>
      </div>

      {showCustomTaxasModal && <TaxasModal closeModal={closeCustomTaxasModal} buyCustomTon={buyCustomTon} />}
      {showCustomDetalhesModal && <DetalhesModal closeModal={closeCustomDetalhesModal} buyCustomStone={buyCustomStone} />}
      {showCustomDetalhesFlexModal && <DetalhesFlexModal closeModal={closeCustomDetalhesFlexModal} buyCustomStone={buyCustomStone} />}
    </div>
  );
};

export default Home;

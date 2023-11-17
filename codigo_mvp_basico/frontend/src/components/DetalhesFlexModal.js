import React from 'react';
import '../pages/Home/flex-modal-styles.css';
import M2 from '../assets/m2.png';
import M4 from '../assets/m4.png';
import TableModal from './TableModal';

/**
 * Component that renders the modal where the user can see the details of the Flex plan
 * @param closeModal: function that closes the modal
 * @param buyStone: function that redirects the user to the page where he can choose the products from the Stone plan
 */
const DetalhesFlexModal = ({ closeModal, buyStone }) => {

  /**
   * Closes the modal
   * */
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={handleCloseModal}>X</button>
        <div className="flex-title">Flex</div>
        <div className="recommended-text2">Recomendado para</div>
        <div className="rectangle2">
          Quem fatura acima de 30 mil reais por mês em vendas na Maquininha Stone.
        </div>
        <div className="conditions">Condições</div>
        <div className="rectangle3">
          <TableModal />
          </div>
        <div className="flex-offer">Isenção por volume de vendas</div>
        <div className="rectangle4">
          <p>Tenha mensalidade grátis nas Maquininhas de acordo com as suas vendas do mês.</p>
          <p>Contam vendas de débito, crédito, Pix da Maquininha e Link de Pagamento. <br />Confira as condições:</p>
          <img src={M2} alt="M2" className="M2" />
          <img src={M4} alt="M4" className="M4" />
          <p className="amount">R$ 30 mil</p>
          <p className="mensalidades-text">2 mensalidades <br />grátis no mês</p>
          <p className="amount2">R$ 50 mil</p>
          <p className="mensalidades-text2">4 mensalidades <br />grátis no mês</p>
          <p className="discount-text">O desconto é aplicado do maior para o menor valor de mensalidade.</p>
          <p className="email-text">Se não conseguir mensalidade grátis para todas as Maquininhas, você recebe um e-mail no início do mês com o valor que vai ser cobrado.</p>
        </div>
        <button className="choose-button" onClick={buyStone}>Escolher Flex</button>
      </div>
    </div>
  );
};

export default DetalhesFlexModal;

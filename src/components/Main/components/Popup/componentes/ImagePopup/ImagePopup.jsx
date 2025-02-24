export default function ImagePopup(props) {
  const { card } = props;

  return (
    <div className="popup__content popup__content_type_image">
      <img className="popup__image" src={card.link} alt="" />
      <p className="popup__caption">{card.name}</p>
    </div>
  );
}

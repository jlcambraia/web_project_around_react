import "../../blocks/loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading__spinning-wheel"></div>
      <p className="loading__text">Carregando...</p>
    </div>
  );
}

export default function BuyButton({ label }) {
  return (
    <a className="btn" href="#buy">
      {label || "Order the Dimple Dial"}
    </a>
  );
}

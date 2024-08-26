export const handleAddToCartAnimation = ({
  imageRef
}: {
  imageRef: React.RefObject<HTMLImageElement>;
}) => {
  const navbarCart = document.getElementById("shopping-cart");
  const cartPosition = navbarCart?.getBoundingClientRect();
  const imagePosition = imageRef.current?.getBoundingClientRect();
  const sampleImage = new Image();
  sampleImage.src = imageRef.current?.src || "";
  sampleImage.height = imagePosition?.height || 0;
  sampleImage.width = imagePosition?.width || 0;

  sampleImage.className = "absolute transition-all linear duration-1000";
  sampleImage.style.left = `${imagePosition?.left || 0}px`;
  sampleImage.style.top = `${imagePosition?.top || 0}px`;
  sampleImage.style.opacity = "0.8";
  sampleImage.style.objectFit = "contain";

  document.body.append(sampleImage);

  setTimeout(() => {
    sampleImage.style.top = `${cartPosition?.top || 0}px`;
    sampleImage.style.left = `${(cartPosition?.left || 0) + 20}px`;
    sampleImage.style.transformOrigin = "0 0";
    sampleImage.style.scale = "0";
    sampleImage.style.opacity = "0.3";
  }, 0);

  setTimeout(() => {
    document.body.removeChild(sampleImage);
  }, 1200);
};

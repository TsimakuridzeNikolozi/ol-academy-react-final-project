import { UncontrolledCarousel } from "reactstrap";

const ImageCarousel = ({ imageSources }) => {
  const items = imageSources.map((imageSource, index) => ({
    caption: "",
    key: index,
    src: imageSource,
  }));

  return <UncontrolledCarousel interval={null} items={items} />;
};

export default ImageCarousel;

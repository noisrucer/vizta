import image1 from "../../images/OVERVIEW.png";
import image2 from "../../images/INFO.png";
import image3 from "../../images/YEARLY.png";
import image4 from "../../images/PROFESSOR.png";

export const images = [image1, image2, image3, image4];

const imageByIndex = (index) => images[index % images.length];

export default imageByIndex;

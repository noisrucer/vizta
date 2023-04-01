import image1 from "../../images/OVERVIEW_light.png";
import image2 from "../../images/INFO_light.png";
import image3 from "../../images/YEARLY_light.png";
import image4 from "../../images/PROFESSOR_light.png";

export const images = [image1, image2, image3, image4];

const imageByIndex = (index) => images[index % images.length];

export default imageByIndex;

import ALERT from 'constants/alert';
import alertModal from 'utils/alertModal';

const Valid = {
  imgLengthCheck(img, length) {
    if (img.length > length) {
      alertModal(false, ALERT.CHECK_IMAGE_LENGTH(length), 2);
      return false;
    }

    return true;
  },
};

export default Valid;

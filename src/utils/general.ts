import {HOST_IMAGE_IFF_LOCATION} from '../constants/constants';

export const buildImageUrl = (hostImage, id) =>
  `${hostImage}/${id}/${HOST_IMAGE_IFF_LOCATION}`;

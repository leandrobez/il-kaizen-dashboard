'use strict';

/*;

*/

const pictures = {
  media: async () => {
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      navigator.getMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      window.URL =
        window.URL || window.webkitURL || window.mozURL || window.msURL;
      const constraint = {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440
          }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraint);
      return stream;
    }
  },
  endMedia: async () => {
    const media = await navigator.mediaDevices.enumerateDevices(media => {
      return media;
    });
    console.log(media);
  },
  handleStream: async () => {
    navigator.mediaDevices.getUserMedia({ video: false });
  }
};

export default pictures;

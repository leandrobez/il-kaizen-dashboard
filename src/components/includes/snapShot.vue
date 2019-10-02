<template>
<div class="il-snapshot">
    <div class="il-card--snapshot">
        <div class="il-card--content">
            <video autoplay class="il-video"></video>
            <button class="il-btn il-btn--picture" @click.prevent="openCamera" id="btnCamera">Camera</button>
        </div>
        <div class="il-card--content">
            <canvas class="il-canvas"></canvas>
            <button class="il-btn il-btn--picture" @click.prevent="takePicture" id="btnTakePhoto">Fotografar</button>
        </div>
    </div>
</div>
</template>

<script>
import pictures from '../../common/snapshot.js';
export default {
  name: 'snapShot',
  data() {
    return {
      avatar: null
    };
  },
  methods: {
    endCamera() {
      pictures.endMedia();
    },
    openCamera() {
      let stream = pictures.media(),
        video = document.querySelector('video.il-video');
      stream.then(r => {
        video.srcObject = r;
      });
    },
    takePicture() {
      const canvas = document.querySelector('.il-canvas'),
        video = document.querySelector('video.il-video');
      canvas.width = video.clientWidth;
      let w = canvas.width;
      canvas.height = video.clientHeight - 4;
      let ctx = canvas.getContext('2d');
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      let data = canvas.toDataURL('image/jpeg');
      let value = data.split('data:image/jpeg;base64,/');
      //let b64 = btoa(value[1]);
      this.avatar = 'data:image/jpeg;base64,/' + value[1];
      this.$emit('avatar', value[1]);
    }
  }
};
</script>

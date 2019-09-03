<template>
<div class="il-snapshot">
    <div class="il-card--snapshot player">
        <div class="il-card--content">
            <video autoplay class="il-video"></video>
            <button class="il-btn il-btn--picture" @click.prevent="openCamera" id="btnCamera">Acessar Camera</button>
        </div>
        <div class="il-card--content">
            <canvas class="il-canvas"></canvas>
            <button class="il-btn il-btn--picture" @click.prevent="takePicture" id="btnTakePhoto">Fotografar</button>
        </div>
    </div>
    <div class="il-card--snapshot photo">
        <img src="" class="picture">
        <button class="il-btn il-btn--picture" id="btnSave">Salvar</button>
    </div>
</div>
</template>

<script>
import pictures from '../../../common/snapshot.js';
export default {
  name: 'snapShot',
  methods: {
    openCamera() {
      let stream = pictures.media(),
        video = document.querySelector('video.il-video');
      const btnTakePhoto = document.getElementById('btnTakePhoto'),
        cameraBtn = document.getElementById('btnCamera'),
        saveBtn = document.getElementById('btnSave');
      stream.then(r => {
        //console.log(r);
        video.srcObject = r;
      });
    },
    takePicture() {
      const canvas = document.querySelector('.il-canvas'),
        video = document.querySelector('video.il-video'),
        photo = document.querySelector('.photo');
      canvas.width = video.clientWidth;
      let w = canvas.width;
      canvas.height = video.clientHeight - 4;
      let ctx = canvas.getContext('2d');
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      photo.classList.add('show');
      const pict = document.querySelector('.picture');
      let data = canvas.toDataURL('image/jpeg');
      //let b64 = btoa(data);

      pict.setAttribute('src', data);
    }
  }
};
</script>

<style>
</style>

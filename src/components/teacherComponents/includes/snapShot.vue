<template>
<div class="il-snapshot">
    <div class="il-card--snapshot il-camera">
        <div class="il-card--content">
            <video autoplay class="il-video"></video>
            <button class="il-btn il-btn--picture" @click.prevent="openCamera" id="btnCamera">Camera</button>
        </div>
        <div class="il-card--content">
            <canvas class="il-canvas"></canvas>
            <button class="il-btn il-btn--picture" @click.prevent="takePicture" id="btnTakePhoto">Fotografar</button>
        </div>
    </div>
    <div class="il-card--snapshot il-photo">
        <img src="" class="il-picture">
        <button class="il-btn il-btn--picture" @click="savePhoto">Salvar</button>
        <button class="il-btn il-btn--picture" @click="endCamera">Encerrar</button>
    </div>
</div>
</template>

<script>
import pictures from '../../../common/snapshot.js';
export default {
  name: 'snapShot',
  mounted() {
    //this.manageDOM();
  },
  methods: {
    manageDOM() {
      const saveBtn = document.getElementById('btnSave'),
        closeBtn = document.getElementById('btnClose');
      saveBtn.addEventListener('click', () => {
        window.alert('Foto tirada');
      });
      closeBtn.addEventListener('click', () => {
        //pictures.handleStream();
      });
    },
    savePhoto() {},
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
        video = document.querySelector('video.il-video'),
        photo = document.querySelector('.il-photo');
      canvas.width = video.clientWidth;
      let w = canvas.width;
      canvas.height = video.clientHeight - 4;
      let ctx = canvas.getContext('2d');
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      photo.classList.add('show');
      const pict = document.querySelector('.il-picture');
      let data = canvas.toDataURL('image/jpeg');
      let b64 = btoa(data);
      //console.log(b64);
      pict.setAttribute('src', data);
    }
  }
};
</script>

<template>
  <div class="overlay" v-if="modelValue">
    <div class="loader"></div>
  </div>
</template>
  <script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    modelValue(newValue) {
      if (newValue) {
        document.body.classList.add("body-no-scroll");
      } else {
        document.body.classList.remove("body-no-scroll");
      }
    },
  },
};
</script>
  <style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
}

.body-no-scroll {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.loader {
  width: 100px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(circle closest-side, #ffffff 90%, #0000);
  background: var(--_g) 0% 50%, var(--_g) 25% 50%, var(--_g) 50% 50%, var(--_g) 75% 50%,
   var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: loading 1.5s infinite linear;
}
@keyframes loading {
  0% {
    background-position: 0% 50%, 25% 50%, 50% 50%, 75% 50%, 100% 50%;
  }
   
   10% {
    background-position: 0% 0%, 25% 50%, 50% 50%, 75% 50%, 100% 50%;
  }
  20% {
    background-position: 0% 50%, 25% 0%, 50% 50%, 75% 50%, 100% 50%;
  }
  30% {
    background-position: 0% 100%, 25% 50%, 50% 0%, 75% 50%, 100% 50%;
  }
  40% {
    background-position: 0% 50%, 25% 100%, 50% 50%, 75% 0%, 100% 50%;
  } 


  50% {
    background-position: 0% 50%, 25% 50%, 50% 100%, 75% 50%, 100% 0%;
  } 
  60% {
    background-position: 0% 50%, 25% 50%, 50% 50%, 75% 100%, 100% 50%;
  } 
  70% {
    background-position: 0% 50%, 25% 50%, 50% 50%, 75% 50%, 100% 100%;
  } 
  80% {
    background-position: 0% 50%, 25% 50%, 50% 50%, 75% 50%, 100% 50%;
  } 
  /* 50% {
    background-position: 0% 100%, 25% 100%, 50% 100%, 75% 100%;
  }  */
}
</style>
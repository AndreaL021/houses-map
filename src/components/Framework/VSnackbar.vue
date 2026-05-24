<template>
  <div
    ref="snackbar"
    class="snackbar"
    :style="{ backgroundColor: bgColor, color: color  }"
  >
    {{ msg }}
  </div>
</template>
  
  <script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "rgb(72, 109, 254)",
    },
    color: {
      type: String,
      default: "white",
    },
  },
  data() {
    return {
      msg: "",
    };
  },
  watch: {
    modelValue(newVal) {
      if (newVal) {
        this.msg = this.modelValue;
        this.show();
      }
    },
  },
  methods: {
    show() {
      var x = this.$refs.snackbar;
      x.className += " show";
      // y=this.$emit
      setTimeout(function () {
        x.className = x.className.replace("show", "");
        this.msg = "";
      }, 4000);
      this.$emit("update:modelValue", "");
    },
  },
};
</script>
  
<style scoped>
.snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 12px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 18px;
}
.snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 4s;
  animation: fadein 0.5s, fadeout 0.5s 4s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
  
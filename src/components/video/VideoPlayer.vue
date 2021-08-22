<template>
  <div class="videoPlayer">
    <video :srcObject="mediaStream" :ref="`video-${videoId}`" autoplay :id="videoId" width="300" height="200"></video>
  </div>
</template>
<script>
export default {
  name: 'videoPlayer',
  data() {
    return {};
  },
  props: { videoId: { type: String, required: true, default: 'video' }, mediaStream: { required: false } },
  mounted() {},
  methods: {
    getVideoEl() {
      console.log('videoPlayer ', this.$refs, this.$refs[`video-${this.videoId}`]);
      return this.$refs[`video-${this.videoId}`];
    }
  }
};
</script>
<style lang="scss"></style>

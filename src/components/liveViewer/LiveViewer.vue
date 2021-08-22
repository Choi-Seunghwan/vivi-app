<template>
  <!-- 임시  -->
  <div class="liveViewer">
    <div class="info"></div>
    <button @click="btnHandler">setRemote</button>
    <VideoPlayer ref="localVideo" :videoId="'localVideo'"></VideoPlayer>
    <VideoPlayer ref="roomVideo" :videoId="'roomVideo'"></VideoPlayer>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import VideoPlayer from '@/components/video/VideoPlayer.vue';

export default {
  components: {
    VideoPlayer
  },

  data() {
    return {};
  },
  computed: {
    ...mapState('media', ['localStream'])
  },
  methods: {
    ...mapActions('live', ['callUser']),
    ...mapActions('media', [
      'getDeviceMedia',
      'createOffer',
      'setLocalStreamVideoEl',
      'setRemoteStreamVideoEl',
      'setRemote'
    ]),
    callHandler() {
      // const offer = this.createOffer();
    },
    btnHandler() {},
    async init() {
      await this.getDeviceMedia();
      this.$nextTick(() => {
        this.setLocalStreamVideoEl(this.$refs.localVideo.getVideoEl());
        this.setRemoteStreamVideoEl(this.$refs.remoteVideo.getVideoEl());
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

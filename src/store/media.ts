const state = () => ({
  localStream: undefined,
  liveStream: undefined,
  peerConnection: undefined,
  localDescriptionOffer: undefined
});

const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
  ]
};

const mutations = {};

const getters = {
  getLocalDescriptionOffer(state) {
    return state.localDescriptionOffer;
  }
};

const actions = {
  initMedia({ state }) {
    const { RTCPeerConnection } = window;
    state.peerConnection = new RTCPeerConnection(iceServers);
  },

  async getDeviceMedia({ state }) {
    if ('mediaDevices' in navigator) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        state.localStream = stream;

        stream.getTracks().forEach(track => state.peerConnection.addTrack(track, stream));
      } catch (error) {
        alert(error);
      }
    }
  },

  async createOffer({ state }) {
    const { RTCSessionDescription } = window;
    const offer = await state.peerConnection.createOffer();
    await state.peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    state.localDescriptionOffer = offer;
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};

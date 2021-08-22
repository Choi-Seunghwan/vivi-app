import ws from '../services/webSocket.js';
import api from '../services/api.js';
import { TYPE_RADIO, SET_CURRENT_LIVE_ROOM_ID } from '@/constant';
import _get from 'lodash/get';

const state = () => ({
  joinedLiveRoom: {}
});

const mutations = {
  setJoinedLiveRoom: (state, room) => (state.joinedLiveRoom = room)
};

const getters = {
  _joinedLiveRoomId: state => state.joinedLiveRoomId
};

const actions = {
  async createRoom({ dispatch, rootGetters }, { title, type = TYPE_RADIO }) {
    await dispatch('media/createOffer', true, { root: true });
    const localDescriptionOffer = rootGetters['media/getLocalDescriptionOffer'];

    ws.sendMessage('live/createRoom', { title, type, localDescriptionOffer });
  },

  // async startLive({ dispatch, rootGetters }, roomInfo) {
  //   await dispatch('media/createOffer', true, { root: true });

  //   const localDescriptionOffer = rootGetters['media/getLocalDescriptionOffer'];
  //   ws.sendMessage('live/startLive', [{ ...roomInfo, localDescriptionOffer }]);
  // },

  joinRoom({ state }, roomId: string) {
    ws.sendMessage('live/joinRoom', { roomId });
  },

  outRoom({ state }) {
    const { roomId } = state.joinedLiveRoom;
    ws.sendMessage('live/outRoom', { roomId });
  },

  async getRoomList() {
    const res = await api.get('live/roomList');
    const roomList = _get(res, 'result.roomList', []);

    return roomList;
  },

  handleMessage({ state, commit, dispatch }, args) {
    const { method } = args;
    const splittedMethod = method.split('/');

    switch (splittedMethod[1]) {
      case 'joinRoom': {
        const { room } = args.result.result;
        const { creatorDescriptionOffer } = room;
        commit('setJoinedLiveRoom', room);
        commit('media/setRemoteDescriptionOffer', creatorDescriptionOffer, { root: true });
        break;
      }

      case 'outRoom': {
        break;
      }
      default:
        break;
    }
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};

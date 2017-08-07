/**
 * Created by 001264 on 2017/6/26.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import state from './state';
import mutations from './mutations';
import actions from './actions';

import com from 'src/common/js/com.js';
import config from 'src/common/js/config.js';
state.com = com;
state.config = config;

import entryState from 'src/entry/store/state';
import entryMutations from 'src/entry/store/mutations';
import entryActions from 'src/entry/store/actions';

Object.assign(state, entryState);
Object.assign(mutations, entryMutations);
Object.assign(actions, entryActions);

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
});

export default store;
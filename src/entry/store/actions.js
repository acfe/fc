import Storage from 'fcbox/utils/storage';

module.exports = {

    checkStore(store, param = {}) {
        if (!store.state.useStore) {
            for (var i in param.state) {
                let sessionData;
                switch(param.type) {
                    case 'local':
                        sessionData = localStorage.getItem('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''));
                        break;
                    case 'cookie':
                        sessionData = Storage.getCookie('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''));
                        break;
                    default:
                        sessionData = sessionStorage.getItem('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''));
                        break;
                }
                if (sessionData) {
                    store.rootState[param.state[i]] = JSON.parse(sessionData);
                }
            }
        }
        store.commit('setValue', {
            key: 'useStore',
            value: true
        });
    },

    setStore(store, param) {
        const rootState = store.rootState;
        for (var i in param.state) {
            switch(param.type) {
                case 'local':
                    localStorage.setItem('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''), JSON.stringify(rootState[param.state[i]]));
                    break;
                case 'cookie':
                    Storage.setCookie('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''), JSON.stringify(rootState[param.state[i]]), param.time);
                    break;
                default:
                    sessionStorage.setItem('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''), JSON.stringify(rootState[param.state[i]]));
                    break;
            }
        }
    },

    delStore(store, param) {
        for (var i in param.state) {
            switch(param.type) {
                case 'local':
                    localStorage.removeItem('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''));
                    break;
                case 'cookie':
                    Storage.delCookie('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''));
                    break;
                default:
                    sessionStorage.removeItem('fcbox_state_' + (param.entry || '') + '_' + (param.state[i] || ''));
                    break;
            }
        }
    },

    clearAllStorage(store, param = {}) {
        switch(param.type) {
            case 'local':
                for (var i in localStorage) {
                    if (/fcbox_state/.test(i)) {
                        localStorage.removeItem(i);
                    }
                }
                break;
            case 'cookie':
                const cookieArr = document.cookie.split(';');
                for (var i in cookieArr) {
                    if (/fcbox_state/.test(cookieArr[i])) {
                        Storage.delCookie(cookieArr[i].split('=')[0]);
                    }
                }
                break;
            default:
                for (var i in sessionStorage) {
                    if (/fcbox_state/.test(i)) {
                        sessionStorage.removeItem(i);
                    }
                }
                break;
        }
    }

};
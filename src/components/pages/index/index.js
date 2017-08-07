/**
 * Created by 001264 on 2017/6/26.
 */
import Vue from 'vue';
import { mapState } from 'vuex';

import IndexStore from 'src/components/pages/index/store';

const Index =  {
    name: 'Index',
    data() {
		return {};
	},
    computed: Object.assign ({
            
        }, mapState({
            title: (state) => state.Index.title,
		})
	),
    created() {
        if (!this.$store.state.Index) {
            this.$store.registerModule('Index', IndexStore);
        }
        document.title = this.title;
    },
    methods: Object.assign({
        
    })
}

export default Index;
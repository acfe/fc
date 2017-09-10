/**
 * Created by 001264 on 2017/9/10.
 */

const FcVerticalScroll =  {
    name: 'FcVerticalScroll',
    data() {
		return {};
	},
    props: ['param'],
    created() {
        this.scrollParam = {};
        setTimeout(() => {
            this.scroll= this.$refs.scroll;
            this.scrollHeight = this.scroll.clientHeight;
            this.contentHeight = this.$refs.content.clientHeight;
        })
    },
    methods: {
        touchstart(e) {
            const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e;
            const scrollParam = this.scrollParam;
            const sY = event.pageY || event.y;
            Object.assign(scrollParam, {
                sY,
            });
        },
        touchmove(e) {
            const scrollParam = this.scrollParam;
            const event = (!e.pageX && !e.x) ? e.targetTouches[0] : e;
            const mY = event.pageY || event.y;
            const changeY = scrollParam.sY - mY;
            if(this.scroll.scrollTop == 0 && changeY < 0) {
                e.preventDefault();
            }
            if(this.scroll.scrollTop >= this.contentHeight - this.scrollHeight && changeY > 0) {
                e.preventDefault();
            }
        },
        touchend(e) {

        },
    }
}

export default FcVerticalScroll;
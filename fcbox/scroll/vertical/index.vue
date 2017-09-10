<template>
    <div class="FcVerticalScroll" ref="FcVerticalScroll">
        <div
            class="FcScrollArea"
            ref="scroll"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
        >
            <div class="FcScrollContent" ref="content">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
	import './index.less';
    import Index from './index.js';
    export default Index;
</script>
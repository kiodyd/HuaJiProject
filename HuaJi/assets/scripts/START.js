

cc.Class({
    extends: cc.Component,

    properties: {
        bgm:cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.audioEngine.play(this.bgm, true, 1);
    },

    startHuaji(){
        cc.director.loadScene('1');
    }
    // update (dt) {},
});

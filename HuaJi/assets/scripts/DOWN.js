var down = Math.random() * 5;
var scaleSpeed = Math.random() / 10;
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // setInterval(function(){
        //     down +=0.5;
        //     scaleSpeed += 0.05;
        // },5000);
    },

     update (dt) 
     {
        this.node.scale += Math.random() / 10;      
        this.node.zIndex = this.node.scale;
        this.node.y -= Math.random() * 5;;
     },
});

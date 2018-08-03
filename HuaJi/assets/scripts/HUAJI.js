
cc.Class({
    extends: cc.Component,

    properties: {
        huaji:{
            type:cc.Prefab,
            default:null
        }
    },


    onLoad () 
    {
        this.makeHuaji(100);
    },

    makeHuaji(n)
    {
        for(let i = 0; i < n; i++)
        {
            let x = Math.floor(Math.random() *  960);
            let y = Math.floor(Math.random() *  640);
            let z = Math.floor(Math.random() *  100);

            let node = cc.instantiate(this.huaji);
            node.parent = this.node;
            node.setPosition(cc.v2(x,y));
            node.scale = z/20;
            node.zIndex = node.scale;
        }
    },

    start () 
    {

    },

    update (dt) 
    {
        let length = this.node.childrenCount;
        for(let i = 0; i < length; i++){
            
            if(this.node.children[i].y < -100 )
            {
                this.node.children[i].destroy();
            }
        }
        if( length < 80)
        {
            this.makeHuaji(20);
        }
    },
});

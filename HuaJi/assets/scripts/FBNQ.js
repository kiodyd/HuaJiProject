var fbnq = [0,3];
cc.Class({
    extends: cc.Component,

    properties: {
       RotationRate:0,
       LineSpace:0,
       huaji:{
           type:cc.Prefab,
           default:null
       },
       huajiParent:{
           default:[],
           type:cc.Node          
       },
       boss:cc.Node
    },


    onLoad () 
    {
        this.draw();
        for(let i = 0; i < this.huajiParent.length; i++)
        {
            let n = Math.round(360 / this.huajiParent.length);
            this.huajiParent[i].rotation = i *n;
        }
    },

    Fbnq(n)
    {
        let length = fbnq.length;
        for(let i = length; i <= n; i++)
        {
            fbnq.push(fbnq[i-1] + fbnq[i-2]);
        }
        return fbnq[n];
        
    },

    arc(r)
    {
        
        let dt = this.LineSpace * Math.PI / 180;
        let n = Math.round((Math.PI / 2) / dt +0.5);
        let ta = 0 ;

        let x = r;
        let y =0;
        
        for(let i = 0; i < this.huajiParent.length; i++)
        {
            let node = cc.instantiate(this.huaji);
            let worldPosition = this.node.convertToWorldSpaceAR(cc.v2(x,y));
            let localPosition = this.huajiParent[i].convertToNodeSpaceAR(worldPosition);
            node.parent = this.huajiParent[i];
            node.setPosition(localPosition);
        }
        
        

        for(let i = 2; i<n; i++)   //首尾不用画   首前面已经画了，而尾由后面的衔接上
        {
            ta += dt;
            let cost = Math.cos(ta);
            let sint = Math.sin(ta);
            x = Math.round(r*cost);
            y = Math.round(r*sint);
            for(let i = 0; i < this.huajiParent.length; i++)
            {
                let node = cc.instantiate(this.huaji);
                let worldPosition = this.node.convertToWorldSpaceAR(cc.v2(x,y));
                let localPosition = this.huajiParent[i].convertToNodeSpaceAR(worldPosition);
                node.parent = this.huajiParent[i];
                node.setPosition(localPosition);
            }
             
        }
    },
    
    draw()
    {    

         let index = 1;
         for(let i = 2;i < 13; i++)
         {
            
            this.arc(this.Fbnq(i));
            this.node.rotation -= 90;
            switch(index % 4)       //这里是由于cocos好像旋转后  移动还是按世界坐标轴移动 故分成四段
            {
            case 1:
                this.node.y -= fbnq[i - 1];
                break;
            case 2:
                this.node.x += fbnq[i - 1];
                break;
            case 3:
                this.node.y += fbnq[i - 1];
                break;
            case 0:
                this.node.x -= fbnq[i - 1];
                break;
            }
            index++;
            //this.node.x -= fbnq[i - 1];
            //this.node.y -= fbnq[i - 1];
        }
        
    },


    update (dt) 
    {
        for(let i = 0; i < this.huajiParent.length; i++)
        {
            this.huajiParent[i].rotation += this.RotationRate;
        }
        this.boss.scale += 0.03;
        if(this.boss.scale >= 10)
        {
            cc.director.loadScene('2');
        }
    },
});


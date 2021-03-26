
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Button)
    tryAgainButton: cc.Button = null;

    @property(cc.Button)
    nextTabButton: cc.Button = null;

    @property(cc.Button)
    tryAgainButtonArctic: cc.Button = null;

    @property
    labelInitialPosition = null;
    btnInitialPosition = null;

    onLoad () {
        this.node.opacity = 0;
        this.labelInitialPosition = this.node.getChildByName('label').getPosition();
        this.btnInitialPosition = this.tryAgainButton.node.getPosition();
    }

    getInstruction(heading, stmt){

        this.node.opacity = 255;

        var label = this.node.getChildByName('label');

        label.getChildByName('heading').getComponent(cc.Label).string = heading;
        label.getChildByName('information').getComponent(cc.Label).string = stmt;

        if(heading.localeCompare('Nope!')==0)
            label.getChildByName('heading').color = cc.color(255,0,0);
        else if(heading.localeCompare('Correct!')==0)
            label.getChildByName('heading').color = cc.color(0,255,0);

        label.runAction(cc.moveTo(0.5,cc.v2(0,0)));

    }

    getButton(btnName){

        if(btnName.localeCompare('tryAgain') == 0){
            this.tryAgainButton.node.runAction(cc.moveTo(0.5,cc.v2(0,-180)));
        }
        else if(btnName.localeCompare('nextTab') == 0){
            this.nextTabButton.node.runAction(cc.moveTo(0.5,cc.v2(0,-180)));
        }
        else if(btnName.localeCompare('tryAgainArctic') == 0){
            this.tryAgainButtonArctic.node.runAction(cc.moveTo(0.5,cc.v2(0,-180)));

        }

    }

    removeInstruction(){

        this.node.opacity = 0;
        this.node.getChildByName('label').runAction(cc.moveTo(0.5,this.labelInitialPosition));

    }

    removeButton(){

        this.tryAgainButton.node.runAction(cc.moveTo(0.5,this.btnInitialPosition));
        this.nextTabButton.node.runAction(cc.moveTo(0.5,this.btnInitialPosition));

    }

    reset(){
        
        this.removeInstruction();
        this.removeButton();

    }



    start () {

    }

    // update (dt) {}
}

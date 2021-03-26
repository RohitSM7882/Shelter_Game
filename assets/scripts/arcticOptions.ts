import instrcutionTop from "./instructionTop";
import instructionBottom from './instructionBottom';

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(instrcutionTop)
    instructionTopRef: instrcutionTop = null;

    @property(instructionBottom)
    instructionBottomRef: instructionBottom = null;

    @property(cc.Node)
    igloo: cc.Node = null;

    @property(cc.Node)
    treeHouse: cc.Node = null;

    @property(cc.Node)
    boatHouse: cc.Node = null;

    @property(cc.Node)
    character: cc.Node = null;

    @property(cc.Node)
    currentSelected: cc.Node = null;

    @property(cc.Prefab)
    iglooPrefab: cc.Prefab = null;
    
    @property(cc.Prefab)
    treeHousePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    boatHousePrefab: cc.Prefab = null;

    @property(cc.AudioClip)
    wrongAnswerAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    correctAnswerAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    iglooSelectedAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    treeHouseSelectedAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    boatHouseSelectedAudio: cc.AudioClip = null;

    @property
    newChild = null;
    currentSelectedInitialPosition = null;

    onLoad () {

        this.igloo.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.onTouchStart(this.igloo);
        })

        this.igloo.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveOption(event);
        })

        this.igloo.on(cc.Node.EventType.TOUCH_END, ()=>{
            this.onTouchEnd();
        })

        this.treeHouse.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.onTouchStart(this.treeHouse);
        })

        this.treeHouse.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveOption(event);
        })

        this.treeHouse.on(cc.Node.EventType.TOUCH_END, ()=>{
            this.onTouchEnd();
        })

        this.boatHouse.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.onTouchStart(this.boatHouse);
        })

        this.boatHouse.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveOption(event);
        })

        this.boatHouse.on(cc.Node.EventType.TOUCH_END, ()=>{
            this.onTouchEnd();
        })

    }

    onTouchStart(selectedNode){

        this.currentSelected = selectedNode;
        this.currentSelectedInitialPosition = this.currentSelected.getPosition();
        this.currentSelected.parent.getChildByName('bg').opacity = 100;

    }

    moveOption(event){

        var delta = event.touch.getDelta();

        this.currentSelected.x += delta.x;
        this.currentSelected.y += delta.y;

    }

    onTouchEnd(){

        this.currentSelected.parent.getChildByName('bg').opacity = 255;

        this.instructionTopRef.fadeOutStmt();

        if(this.currentSelected.name.localeCompare('igloo')==0){
            this.runIglooAnimation();
        }
        else if(this.currentSelected.name.localeCompare('treeHouse')==0){
            this.runTreeHouseAnimation();
            this.runWrongAnswerAnimation();
        }
        else if(this.currentSelected.name.localeCompare('boatHouse')==0){
            this.runWrongAnswerAnimation();
            this.runBoatHouseAnimation();
        }

        this.currentSelected.setPosition(this.currentSelectedInitialPosition);
        this.currentSelected.opacity = 0;
        this.removeOptions();

    }

    runIglooAnimation(){

        this.newChild = cc.instantiate(this.iglooPrefab);
        this.newChild.setPosition(-10,35);
        this.node.parent.addChild(this.newChild);

        cc.audioEngine.playEffect(this.iglooSelectedAudio,false);
        cc.audioEngine.playEffect(this.correctAnswerAudio,false);

        this.character.opacity = 0;

        var character = this.newChild.getChildByName('character');
        character.getComponent(cc.Animation).play('walkInArctic').repeatCount = 2;
        character.runAction(cc.moveTo(2.4,cc.v2(110,0)));

        this.instructionBottomRef.getInstruction('Correct!',"An igloo is made of snow. It keeps the shelter warm because it has \n lots of air pockets. Also, its shape protects it from wind.");
        // setTimeout(() => {
        //     this.instructionBottomRef.getButton('nextTab');
        // }, 12000);
    }

    runTreeHouseAnimation(){

        this.newChild = cc.instantiate(this.treeHousePrefab);
        this.newChild.setPosition(-10,35);
        this.node.parent.addChild(this.newChild);

        this.newChild.getComponent(cc.Animation).play('treeHouse').repeatCount = 2;
        cc.audioEngine.playEffect(this.treeHouseSelectedAudio,false);

        this.instructionBottomRef.getInstruction('Nope!','Sorry, there are no trees in the Arctic to build treehouse.');
        setTimeout(() => {
            this.instructionBottomRef.getButton('tryAgainArctic');
        }, 3000);

    }

    runBoatHouseAnimation(){

        this.newChild = cc.instantiate(this.boatHousePrefab);
        this.newChild.setPosition(0,0);
        this.node.parent.addChild(this.newChild);

        this.newChild.getComponent(cc.Animation).play('boatHouse').repeatCount = 2;
        cc.audioEngine.playEffect(this.boatHouseSelectedAudio,false);

        this.instructionBottomRef.getInstruction('Nope!','Houseboats would do nothing to keep warm. plus, a lot of water \n in the Arctic is frozen.');
        setTimeout(() => {
            this.instructionBottomRef.getButton('tryAgainArctic');
        }, 5000);

    }

    runWrongAnswerAnimation(){

        cc.audioEngine.playEffect(this.wrongAnswerAudio,false);
        this.character.getComponent(cc.Animation).play('wrongAnswerArctic').repeatCount = 2;

        setTimeout(() => {
            this.character.getComponent(cc.Animation).play('standingArctic').repeatCount = Infinity;
        }, 2000);

    }

    getOptions(){

        var optionTab1 = this.node.getChildByName('optiontab1');
        var optionTab2 = this.node.getChildByName('optiontab2');
        var optionTab3 = this.node.getChildByName('optiontab3');
        var count = 0;

        console.log(optionTab1,optionTab2,optionTab3);

        setInterval(()=>{

            count += 1;

            if(count == 1){
                optionTab1.opacity = 255;
                optionTab1.runAction(cc.moveTo(0.5,cc.v2(-200,0)));
            }
            else if(count == 2){
                optionTab2.opacity = 255;
                optionTab2.runAction(cc.moveTo(0.5,cc.v2(0,0)));
            }
            else if(count == 3){
                optionTab3.opacity = 255;
                optionTab3.runAction(cc.moveTo(0.5,cc.v2(200,0)));
            }

        },500);

    }

    removeOptions(){

        this.currentSelected.opacity = 255;
        this.node.runAction(cc.moveTo(0.5,cc.v2(0,-550)));

    }

    removeChildAndSetPosition(){

        this.newChild.active = false;
        this.node.setPosition(0,-310);
        this.node.getChildByName('optiontab1').setPosition(-200,-550);
        this.node.getChildByName('optiontab2').setPosition(0,-550);
        this.node.getChildByName('optiontab3').setPosition(200,-550);

    }

    start () {

    }

    // update (dt) {}
}

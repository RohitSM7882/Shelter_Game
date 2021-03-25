import instrcutionTop from './instructionTop';
import instructionBottom from './instructionBottom';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    igloo: cc.Node = null;

    @property(cc.Node)
    woodHouse: cc.Node = null;

    @property(cc.Node)
    mudHouse: cc.Node = null;

    @property(cc.Node)
    currentSelected: cc.Node = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(instrcutionTop)
    instructionTopRef: instrcutionTop = null;

    @property(instructionBottom)
    instructionBottomRef: instructionBottom = null;

    @property(cc.Prefab)
    iglooPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    woodHousePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    mudHousePrefab: cc.Prefab = null;

    @property(cc.AudioClip)
    wrongAnswerAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    correctAnswerAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    iglooMeltingAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    iglooSelectAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    woodHouseSelectAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    mudHouseSelectAudio: cc.AudioClip = null;

    @property(cc.Node)
    character: cc.Node = null;

    @property
    newChild = null;
    currentSelectedInitialPosition = null;
    optionsInitialPosition = null;
    nodeInitialPosition = null;

    // onLoad () {}

    onLoad(){

        this.optionsInitialPosition = [ this.igloo.getPosition(), this.woodHouse.getPosition(), this.mudHouse.getPosition()];
        this.nodeInitialPosition = this.node.getPosition();

        this.igloo.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.onTouchStart(this.igloo);
        })

        this.igloo.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveOption(event);
        })

        this.igloo.on(cc.Node.EventType.TOUCH_END, ()=>{
            this.onTouchEnd();
        })

        this.woodHouse.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.onTouchStart(this.woodHouse);
        })

        this.woodHouse.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveOption(event);
        })

        this.woodHouse.on(cc.Node.EventType.TOUCH_END, ()=>{
            this.onTouchEnd();
        })

        this.mudHouse.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.onTouchStart(this.mudHouse);
        })

        this.mudHouse.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveOption(event);
        })

        this.mudHouse.on(cc.Node.EventType.TOUCH_END, ()=>{
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
            this.runWrongAnswerAnimation();
        }
        else if(this.currentSelected.name.localeCompare('woodHouse')==0){
            this.runWoodHouseAnimation();
            this.runWrongAnswerAnimation();
        }
        else if(this.currentSelected.name.localeCompare('mudHouse')==0){
            this.runMudHouseAnimation();
        }

        this.currentSelected.setPosition(this.currentSelectedInitialPosition);
        this.currentSelected.opacity = 0;
        this.removeOptions();

    }

    runIglooAnimation(){

        this.newChild = cc.instantiate(this.iglooPrefab);
        this.newChild.setPosition(-10,35);
        // this.canvas.addChild(this.newChild);
        this.node.parent.addChild(this.newChild);

        this.newChild.scaleX = 2;
        this.newChild.scaleY = 2;
        this.newChild.getComponent(cc.Animation).play('iglooMelting');
        cc.audioEngine.playEffect(this.iglooMeltingAudio,false);
        cc.audioEngine.playEffect(this.iglooSelectAudio,false);

        this.instructionBottomRef.getInstruction('Nope!','An igloo is made of snow. It will melt in hot region. not a good idea.');
        setTimeout(() => {
            this.instructionBottomRef.getButton('tryAgain');
        }, 5000);

    }

    runWoodHouseAnimation(){

        this.newChild = cc.instantiate(this.woodHousePrefab);
        this.newChild.setPosition(25,50);
        // this.canvas.addChild(this.newChild);
        this.node.parent.addChild(this.newChild);

        this.newChild.getChildByName('smoke1').getComponent(cc.Animation).play('woodHouseSmoke').repeatCount = Infinity;
        this.newChild.getChildByName('smoke2').getComponent(cc.Animation).play('woodHouseSmoke').repeatCount = Infinity;
        this.newChild.getChildByName('smoke3').getComponent(cc.Animation).play('woodHouseSmoke').repeatCount = Infinity;
        cc.audioEngine.playEffect(this.woodHouseSelectAudio,false);

        this.instructionBottomRef.getInstruction('Nope!','A wooden house would not keep Rehana cool in such hot weather.');
        setTimeout(() => {
            this.instructionBottomRef.getButton('tryAgain');
        }, 5000);

    }

    runMudHouseAnimation(){
        
        cc.audioEngine.playEffect(this.mudHouseSelectAudio,false);
        cc.audioEngine.playEffect(this.correctAnswerAudio,false);
        this.newChild = cc.instantiate(this.mudHousePrefab);
        this.newChild.setPosition(0,0);
        this.node.parent.addChild(this.newChild);
        this.character.destroy();

        var character = this.newChild.getChildByName('character');
        character.getComponent(cc.Animation).play('walkIn').repeatCount = 2;
        character.runAction(cc.moveTo(2.4,cc.v2(-50,-10)));

        var wind = this.newChild.getChildByName('wind');
        wind.getComponent(cc.Animation).play('wind').repeatCount = Infinity;
        wind.runAction(cc.moveTo(3,cc.v2(-500,10)));

        setTimeout(() => {
            wind.runAction(cc.fadeOut(0.5));
            setTimeout(() => {
                wind.runAction(cc.moveTo(0,cc.v2(300,10)));
            }, 500);
        }, 2500);

        this.instructionBottomRef.getInstruction('Correct!','Mud houses are constructed in desert region because they help in \n keeping the insdide cool. Large windows also help in air circulation.');
        setTimeout(() => {
            this.instructionBottomRef.getButton('nextTab');
        }, 12000);

    }

    runWrongAnswerAnimation(){

        cc.audioEngine.playEffect(this.wrongAnswerAudio,false);
        this.character.getComponent(cc.Animation).play('wrongAnswer').repeatCount = 2;

        setTimeout(() => {
            this.character.getComponent(cc.Animation).play('standing').repeatCount = Infinity;
        }, 2000);

    }

    getOptions(){

        console.log('getting options');

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

        console.log('getting options');
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

    deActivateNode(){

        this.node.active = false;
        
    }

    start () {

    }

    // update (dt) {}
}

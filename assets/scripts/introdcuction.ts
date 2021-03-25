
import instrcutionTop from "./instructionTop";
import desert from "./desert";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    character: cc.Node = null;

    @property(cc.AudioClip)
    audio1: cc.AudioClip = null;

    @property(cc.AudioClip)
    audio2: cc.AudioClip = null;

    @property(cc.AudioClip)
    backgroundMusic: cc.AudioClip = null;

    @property(instrcutionTop)
    instructionTopRef: instrcutionTop = null;

    @property(desert)
    desertRef: desert = null;

    // onLoad () {
  
    // }

    loadScene(){

        cc.audioEngine.playEffect(this.backgroundMusic,true);
        var stmt1 = 'Meet Rehna, an adventuruous 12 year old. Rehna is on journey \n around the world.';
        var stmt2 = 'She needs a place to stay while travels. Help her to find \n appripriate shelter';
        this.instructionTopRef.fadeInStmt(stmt1);

        setTimeout(() => {
            cc.audioEngine.playEffect(this.audio1,false);
            this.character.getComponent(cc.Animation).play('introductionWalking').repeatCount = 2;

            setTimeout(()=>{
                this.character.getComponent(cc.Animation).play('standing').repeatCount = Infinity;
                },2400);
            this.character.runAction(cc.moveTo(2.4,cc.v2(500,-80)));

            setTimeout(() => {
                this.instructionTopRef.fadeOutStmt();
                
                setTimeout(() => {
                    this.instructionTopRef.fadeInStmt(stmt2);

                    setTimeout(() => {
                        cc.audioEngine.playEffect(this.audio2,false);

                        setTimeout(() => {
                            this.instructionTopRef.fadeOutStmt();

                            setTimeout(()=>{
                                this.stopScene();
                                this.desertRef.loadScene();
                            },1000);

                        }, 7000);

                    }, 600);

                }, 600);

            }, 7000);

        }, 700);

    }

    stopScene(){
        cc.audioEngine.stopAllEffects();
        // this.node.destroy();
        this.node.active = false;
    }

    start () {

    }

    // update (dt) {}
}

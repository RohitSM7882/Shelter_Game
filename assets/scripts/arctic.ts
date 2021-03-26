import instructionTop from "./instructionTop";
import arcticOptions from "./arcticOptions";

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
    backgroundMusic: cc.AudioClip = null;

    @property(cc.AudioClip)
    audio1: cc.AudioClip = null;

    @property(cc.AudioClip)
    audio2: cc.AudioClip = null;

    @property(instructionTop)
    instrcutionTopRef: instructionTop = null;

    @property(arcticOptions)
    arcticOptionsRef: arcticOptions = null;

    // onLoad () {}

    loadScene(){

        cc.audioEngine.playEffect(this.backgroundMusic,true);
        this.character.getComponent(cc.Animation).play('standingArctic').repeatCount = Infinity;

        var stmt1 = "Brr.. Rehna is in very cold region near the Arctic. she sure is \n adventurous.";
        var stmt2 = "Help her to find a nice house to survive the extreme cold.";
        
        this.instrcutionTopRef.fadeInStmt(stmt1);

        setTimeout(() => {
            cc.audioEngine.playEffect(this.audio1,false);

            setTimeout(() => {
                this.instrcutionTopRef.fadeOutStmt();

                setTimeout(() => {
                    this.instrcutionTopRef.fadeInStmt(stmt2);
                    
                    setTimeout(() => {
                        cc.audioEngine.playEffect(this.audio2,false);

                        setTimeout(() => {
                            this.arcticOptionsRef.getOptions();

                        }, 1000);

                    }, 500);

                }, 1000);

            }, 7000);

        }, 1000);

    }

    stopScene(){

        cc.audioEngine.stopAllEffects();
        this.arcticOptionsRef.removeChildAndSetPosition();

    }

    start () {

    }

    // update (dt) {}
}


import instructionTop from "./instructionTop";
import desertOption from './desertOptions';

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
    instructionTopRef: instructionTop = null;

    @property(cc.Node)
    options: cc.Node = null;

    @property(desertOption)
    desertOptionRef: desertOption = null;

    loadScene(){

        cc.audioEngine.playEffect(this.backgroundMusic,true);
        this.character.getComponent(cc.Animation).play('standing').repeatCount = Infinity;

        var stmt1 = 'Rehna is in place which is really hot!';
        var stmt2 = 'Drag the right kind of house for Rehna to stay \n comfortably.';

        this.instructionTopRef.fadeInStmt(stmt1);

        setTimeout(() => {
            cc.audioEngine.playEffect(this.audio1,false);

            setTimeout(() => {
                this.instructionTopRef.fadeOutStmt();

                setTimeout(() => {
                    this.instructionTopRef.fadeInStmt(stmt2);

                    setTimeout(() => {
                        cc.audioEngine.playEffect(this.audio2,false);

                        setTimeout(() => {
                            this.desertOptionRef.getOptions();

                        }, 1000);

                    }, 600);

                }, 600);

            }, 3600);

        }, 600);

    }

    stopScene(){

        cc.audioEngine.stopAllEffects();
        this.desertOptionRef.removeChildAndSetPosition();

    }

    removeScene(){

        cc.audioEngine.stopAllEffects();
        this.node.active = false;
        this.desertOptionRef.deActivateNode();

    }

    // onLoad(){}

    // start () {}

    // update (dt) {}
}

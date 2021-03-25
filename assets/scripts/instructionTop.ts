
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // onLoad () {

    // }

    fadeInStmt(stmt){

        this.node.getComponent(cc.Label).string = stmt;
        this.node.runAction(cc.fadeIn(0.5));
        this.node.runAction(cc.moveTo(0.5,cc.v2(0,350)));

    }

    fadeOutStmt(){

        var sequence = cc.sequence(cc.fadeOut(0.5),cc.moveTo(0,cc.v2(-500,350)));
        this.node.runAction(sequence);
        this.node.runAction(cc.moveTo(0.5,cc.v2(500,350)));

    }

    start () {

    }

    // update (dt) {}
}

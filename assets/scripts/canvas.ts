import introduction from "./introdcuction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(introduction)
    introductionRef: introduction = null;

    onLoad () {

        this.introductionRef.loadScene();

    }

    start () {

    }

    // update (dt) {}
}

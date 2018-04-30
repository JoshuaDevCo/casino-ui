import * as React from 'react';
import {Slider} from '../../../reusable/index';
import {MAX_NUMBER_DICE_1, MIN_NUMBER_DICE_1} from '../../../config/config';
import ResultSlider from './ResultSlider';
import Ticks from './Ticks';
import sounds from '../sound';

type Props = {
    num: number,
    result: {num: number, won: boolean},
    showResult: boolean,
    sound: boolean,
    reversedRoll: boolean,

    onNumberChange(n: number): void,
}

type State = {
    value: number;
}

export default class DiceSlider extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: 50
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const {num: curNum, sound} = this.props;
        const nextNum = nextProps.num;

        if (curNum !== nextNum) {
            if (sound) {
                if (nextNum > curNum) {
                    sounds.menuUp.playFromBegin();
                } else {
                    sounds.menuDown.playFromBegin();
                }
            }

            if (this.state.value !== nextNum) {
                this.setState({value: nextNum});
            }
        }
    }

    onChange = (newValue: number) => {
        if (newValue >= MIN_NUMBER_DICE_1 && newValue <= MAX_NUMBER_DICE_1) {
            this.setState({value: newValue});
            this.props.onNumberChange(newValue);
        }
    };

    render() {
        const {result, showResult, reversedRoll} = this.props;
        const {value} =  this.state;
        const lowColor = reversedRoll ? 'danger' : 'success';
        const highColor = reversedRoll ? 'success' : 'danger';

        return (
            <div style={{position: 'relative', width: '100%', marginTop: '3em', marginBottom: '1em'}}>
                <Ticks />
                <div style={{width: '100%', position: 'relative', left: '0%'}}>
                    <Slider
                        min={0}
                        max={100}
                        value={value}
                        onValue={this.onChange}
                        lowColor={lowColor}
                        highColor={highColor}
                    />
                </div>
                <ResultSlider result={result} showResult={showResult}/>
            </div>
        );
    }
}

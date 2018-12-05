/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import { CollapseHeader, CollapseBody } from "../../index";

type Props = {
    isCollapsed: ?boolean,
    onToggle: ?Function,
    handleLongPress: ?Function
};

export default class Collapse extends Component<Props> {

    constructor(props){
        super(props);
        this.state={
          show:this.props.isCollapsed,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            show:nextProps.isCollapsed
        });
    }

    __toggle(){
        this.setState({
           show:!this.state.show
        },()=>this.props.onToggle(this.state.show));
    }

    render() {
        let header = null;
        let body = null;
        const handleLongPressCallback = this.props.handleLongPress;
        React.Children.forEach(this.props.children,(child)=>{
            if(child.type === CollapseHeader){
                header = (
                    <TouchableOpacity onPress={()=>this.__toggle()} onLongPress={handleLongPressCallback} activeOpacity={0.9}>
                        {child}
                    </TouchableOpacity>
                );
            }else if(child.type === CollapseBody){
               if(this.state.show){
                   body = child;
               }
            }
        });

            if(header === null){
                console.warn("header wasn't found to be rendered. Please make sure you have wrapped an CollapseHeader in the Collapse Component.");
                return null;
            }else{
                return (
                    <View {...this.props}>
                        {header}
                        {body}
                    </View>
                );
            }

    }
}

Collapse.defaultProps={
    isCollapsed: false,
    onToggle:() => undefined,
    handleLongPress: () => undefined
};

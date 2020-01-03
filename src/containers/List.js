import React, { Component } from 'react';
import Card from '../components/Card';

class List extends Component{

    render() {
        return (
            <div>
                <h1>Movies List</h1>
                <Card />
            </div>
        )
    }
}

export default List;
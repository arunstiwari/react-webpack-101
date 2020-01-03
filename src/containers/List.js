import React, { Component } from 'react';
import Card from '../components/Card';

class List extends Component{

    constructor(){
        super();
        this.state = {
            data: [],
            loading: true,
        }
    
    }

    
    async componentDidMount() {
        const movies = await fetch('../../assets/data.json');
        const moviesJson = await movies.json();

        if (moviesJson) {
            this.setState({
                data: moviesJson,
                loading: false
            });
        }
    }
    

    render() {
        const {data, loading} = this.state;

        if (loading) {
            return <div>Loading...</div>
        }
        return data.map(movie => <Card key={movie.id} movie={movie} />)
    }
}

export default List;
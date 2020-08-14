import React, { Component } from 'react'
import {List, Layout, Col, Row, Typography} from 'antd'
import Axios from 'axios'

const {Content} = Layout
const {Title} = Typography

class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filmData: null
        }
    }

    componentDidMount(){
        if (this.state.filmData === null) {
            Axios.get(`https://backendexample.sanbersy.com/api/movies`)
            .then(res => {
                const data = res.data.map(el => {
                    return {
                        id: el.id,
                        created_at: el.created_at,
                        update_at: el.update_at,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        review: el.review,
                        image_url: el.image_url
                    }
                })
                console.log(data)
                this.setState({
                    filmData: data
                })
            })
        }
    }

    render(){
        return (
            <>
            <Row>
                <Col span={18} offset={3}>
                    <Content style={{padding: '50px 50px 20px'}}>
                        <div className="site-layout-content">
                        <Title style={{textAlign:'center'}}>Movie List</Title>
                        {this.state.filmData !== null &&
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.filmData}
                                renderItem={item => (
                                <List.Item
                                    extra={
                                        <img width={200} alt="poster" src={item.image_url} />
                                    }
                                >
                                    <List.Item.Meta
                                    title={<h1>{item.title}</h1>}
                                    description={
                                        <div>
                                            <p>Tahun Rilis: {item.year}</p>
                                            <p>Rating: {item.rating}</p>
                                            <p>Durasi: {item.duration / 60} Jam</p>
                                            <p>Genre: {item.genre}</p>
                                            <p>Deskripsi: {item.description}</p>
                                            <p>Review: {item.review}</p>
                                        </div>
                                    }
                                    />
                                </List.Item>
                                )}
                            />
                        }
                        </div>
                    </Content>
                </Col>
            </Row>
            </>
        )
    }
}

export default MovieList
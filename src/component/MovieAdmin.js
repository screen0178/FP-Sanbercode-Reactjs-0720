import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from './AppContext'
import {useHistory} from 'react-router-dom'
import {Table, Space, Typography, Col, Row, Button, Modal, Form, Input } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import Axios from 'axios'

const {Title} = Typography

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Add new Movie"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item name="title" label="Title" rules={[{required: true,message: 'Please input the Movie Title!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{required: true,message: 'Please input the Year!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{required: true,message: 'Please input the Rating!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{required: true,message: 'Please input the Duration!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="genre" label="Genre" rules={[{required: true,message: 'Please input the Genre!',},]}>
            <Input />
          </Form.Item> 
          <Form.Item name="description" label="Dscription" rules={[{required: true,message: 'Please input the Description!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="review" label="Review" rules={[{required: true,message: 'Please input the Review!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="image_url" label="Image_URL" rules={[{required: true,message: 'Please input the url of movie poster!',},]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    )
}


const MovieTable = () => {
    const [
      , ,
      , ,
      filmData, setFilmData,
      editId, setEditId,
      isEdit, setIsEdit
    ] = useContext(AppContext)
    const [visible, setVisible] = useState(false);

    const onCreate = values => {
        console.log('Received values of form: ',);
        setVisible(false);
        let currentdate = new Date()

        let title = values.title
        let description = values.description
        let year = values.year
        let duration = values.duration
        let genre = values.genre
        let rating = values.rating
        let review = values.review
        let image_url = values.image_url
        let created_at = currentdate.getDate() + "-"
        + (currentdate.getMonth()+1)  + "-" 
        + currentdate.getFullYear() + " "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds()
        let updated_at = created_at

        Axios.post(`https://backendexample.sanbersy.com/api/movies`,{title, description, year, duration, genre, rating, review, image_url, created_at, updated_at})
        .then(res => {
            setFilmData([
                ...filmData,
                {
                    id: res.data.id,
                    created_at: res.data.created_at,
                    update_at: res.data.update_at,
                    title: res.data.title,
                    description: res.data.description,
                    year: res.data.year,
                    duration: res.data.duration,
                    genre: res.data.genre,
                    rating: res.data.rating,
                    review: res.data.review,
                    image_url: res.data.image_url
                }
            ])
        })
      }

    useEffect(() => {
        if (filmData === null) {
            Axios.get(`https://backendexample.sanbersy.com/api/movies`)
            .then(res => {
                setFilmData(res.data.map(el => {
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
                }))
            })
        }
    })

    const columns = [
        {title: 'Title', dataIndex: 'title', key: 'title'},
        {title: 'Year', dataIndex: 'year', key: 'year'},
        {title: 'Rating', dataIndex: 'rating', key: 'rating'},
        {title: 'Duration', dataIndex: 'duration', key: 'duration'},
        {title: 'Genre', dataIndex: 'genre', key: 'genre'},
        // {title: 'Description', dataIndex: 'description', key: 'title'},
        // {title: 'Review', dataIndex: 'review', key: 'title'},
        // {title: 'Image_URL', dataIndex: 'image_url', key: 'title'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <Space size="middle">
                  <Button value={record.id} onClick={(e) => {handleEdit(record.id, e)}}>Edit</Button>
                  <Button value={record.id} onClick={(e) => { handleDelete(record.id, e) }}>Delete</Button>
                </Space>
              ),
          },
    ]

    const handleDelete = (key, evt) => {
      evt.preventDefault()
      let id = parseInt(key)
      let newFilmData = filmData.filter(el => el.id !== id)

      Axios.delete(`https://backendexample.sanbersy.com/api/movies/${id}`)
      .then(res => {
        console.log(res)
      })
      setFilmData([...newFilmData])
    }

    const handleEdit = (key, evt) => {
      evt.preventDefault()
      setEditId(parseInt(key))
      setIsEdit(true)
    }

    return (
        <Row>
            <Col>
                <Title>Movie Data</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {setVisible(true)}}>
                    Add
                </Button>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                    setVisible(false);
                    }}
                />
            </Col>
            <Col>
                <Table columns={columns} 
                     expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                dataSource={filmData} 
                />
            </Col>
        </Row>
    )
}

const MovieEdit = () => {
  const [
    , ,
    , ,
    filmData, setFilmData,
    editId, setEditId,
    isEdit, setIsEdit
  ] = useContext(AppContext)
  const history = useHistory()

  const cancelEdit = (evt) => {
    setIsEdit(false)
    setEditId(0)
    history.push("/admin")
  }

  const handleSubmit = (evt) => {


  }

  return (
    <div>
    <Title>Movie Edit</Title>
      <Form  layout="vertical" name="form_in_modal">
        <Form.Item name="title" label="Title" rules={[{required: true,message: 'Please input the Movie Title!',},]}>
          <Input />
        </Form.Item>
        <Form.Item name="year" label="Year" rules={[{required: true,message: 'Please input the Year!',},]}>
          <Input />
        </Form.Item>
        <Form.Item name="rating" label="Rating" rules={[{required: true,message: 'Please input the Rating!',},]}>
          <Input />
        </Form.Item>
        <Form.Item name="duration" label="Duration" rules={[{required: true,message: 'Please input the Duration!',},]}>
          <Input />
        </Form.Item>
        <Form.Item name="genre" label="Genre" rules={[{required: true,message: 'Please input the Genre!',},]}>
          <Input />
        </Form.Item> 
        <Form.Item name="description" label="Dscription" rules={[{required: true,message: 'Please input the Description!',},]}>
          <Input />
        </Form.Item>
        <Form.Item name="review" label="Review" rules={[{required: true,message: 'Please input the Review!',},]}>
          <Input />
        </Form.Item>
        <Form.Item name="image_url" label="Image_URL" rules={[{required: true,message: 'Please input the url of movie poster!',},]}>
          <Input />
        </Form.Item>
        <Form.Item>
            <Button type="default" className="login-form-button" onClick={cancelEdit}>
                Cancel
            </Button>
            <Button type="primary" style={{marginTop: '10px'}} htmlType="submit" className="login-form-button" onClick={handleSubmit}>
                Submit
            </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const MovieAdmin = () => {
  const [
    , ,
    , ,
    , ,
    editId, setEditId,
    isEdit, setIsEdit
  ] = useContext(AppContext)
    let view
    if (isEdit === false) {
        view = <MovieTable />
    } else {
      view = <MovieEdit />
    }

    return view
}

export default MovieAdmin
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
        title="Add new Game"
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
          <Form.Item name="name" label="Name" rules={[{required: true,message: 'Please input the Game Name!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="genre" label="Genre" rules={[{required: true,message: 'Please input the genre!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="singlePlayer" label="Single Player" rules={[{required: true,message: 'Do not leave empty',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="multiplayer" label="Multi Player" rules={[{required: true,message: 'Do not leave empty!',},]}>
            <Input />
          </Form.Item>
          <Form.Item name="platform" label="Platform" rules={[{required: true,message: 'Please input the Platform!',},]}>
            <Input />
          </Form.Item> 
          <Form.Item name="release" label="Release Year" rules={[{required: true,message: 'Please input the Realese year!',},]}>
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
      , ,
      editId, setEditId,
      isEdit, setIsEdit,
      gameData, setGameData
    ] = useContext(AppContext)
    const [visible, setVisible] = useState(false);

    const onCreate = values => {
        console.log('Received values of form: ',values);
        setVisible(false);
        let currentdate = new Date()

        let name = values.name
        let genre = values.genre
        let singlePlayer = values.singlePlayer
        let multiplayer  = values.multiplayer
        let platform = values.platform
        let release = values.release
        let image_url = values.image_url
        let created_at = currentdate.getDate() + "-"
        + (currentdate.getMonth()+1)  + "-" 
        + currentdate.getFullYear() + " "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds()
        let updated_at = created_at

        Axios.post(`https://backendexample.sanbersy.com/api/games`,{name, genre, singlePlayer, multiplayer,platform, release, image_url, created_at, updated_at})
        .then(res => {
            setGameData([
                ...gameData,
                {
                    id: res.data.id,
                    created_at: res.data.created_at,
                    update_at: res.data.update_at,
                    name: res.data.name,
                    genre: res.data.genre,
                    singlePlayer: res.data.singlePlayer,
                    multiplayer: res.data.multiplayer,
                    platform: res.data.platform,
                    release: res.data.release,
                    image_url: res.data.image_url
                }
            ])
        })
      }

    useEffect(() => {
        if (gameData === null) {
            Axios.get(`https://backendexample.sanbersy.com/api/games`)
            .then(res => {
                setGameData(res.data.map(el => {
                    return {
                        id: el.id,
                        created_at: el.created_at,
                        update_at: el.update_at,
                        name: el.name,
                        genre: el.genre,
                        singlePlayer: el.singlePlayer,
                        multiplayer: el.multiplayer,
                        platform: el.platform,
                        release: el.release,
                        image_url: el.image_url
                    }
                }))
            })
        }
    })

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Genre', dataIndex: 'genre', key: 'genre'},
        {title: 'Single Player', dataIndex: 'singlePlayer', key: 'singlePlayer'},
        {title: 'Multi Player', dataIndex: 'multiplayer', key: 'multiPlayer'},
        {title: 'Platform', dataIndex: 'platform', key: 'platform'},
        {title: 'Release', dataIndex: 'release', key: 'release'},
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
      let newGameData = gameData.filter(el => el.id !== id)

      Axios.delete(`https://backendexample.sanbersy.com/api/games/${id}`)
      .then(res => {
        console.log(res)
      })
      setGameData([...newGameData])
    }

    const handleEdit = (key, evt) => {
      evt.preventDefault()
      setEditId(parseInt(key))
      setIsEdit(true)
    }

    return (
        <Row>
            <Col>
                <Title>Game Data</Title>
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
                dataSource={gameData} 
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
  const [currentData, setCurrentData] = useState(null)
  const [inpName, setInpName] = useState("")
  const [inpGenre, setInpGenre] = useState("")
  const [inpSinglePlayer, setInpSinglePlayer] = useState("")
  const [inpMultiPlayer, setInpMultiPlayer] = useState("")
  const [inpPlatform, setInpPlatform] = useState("")
  const [inpRelease, setRelease] = useState("")
  const [inpImage_URL, setInpImage_URL] = useState("")
  const history = useHistory()

  useEffect(() => {
    if (currentData === null) {
      Axios.get(`https://backendexample.sanbersy.com/api/games/${editId}`)
      .then(res => {
        setCurrentData(res.data)
        setInpName(res.data.name)
        setInpGenre(res.data.genre)
        setInpSinglePlayer(res.data.singlePlayer)
        setInpMultiPlayer(res.data.multiplayer)
        setInpPlatform(res.data.platform)
        setRelease(res.data.release)
        setInpImage_URL(res.data.image_url)
      })
    }
  })

  const cancelEdit = (evt) => {
    setIsEdit(false)
    setEditId(0)
    history.push("/admin")
  }

  const handleChangeName = evt => {
    setInpName(evt.target.value)
  }
  const handleChangeGenre = evt => {
    setInpGenre(evt.target.value)
  }
  const handleChangeSingle = evt => {
    setInpSinglePlayer(evt.target.value)
  }
  const handleChangeMulti = evt => {
    setInpMultiPlayer(evt.target.value)
  }
  const handleChangePlatform = evt => {
    setInpPlatform(evt.targe.value)
  }
  const handleChangeRelease = evt => {
    setRelease(evt.target.value)
  }
  const handleChangeImage = (evt) => {
    setInpImage_URL(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    let currentdate = new Date()

    let name = inpName
    let genre = inpGenre
    let singlePlayer = inpSinglePlayer
    let multiplayer  = inpMultiPlayer
    let platform = inpPlatform
    let release = inpRelease
    let image_url = inpImage_URL
    let updated_at = currentdate.getDate() + "-"
    + (currentdate.getMonth()+1)  + "-" 
    + currentdate.getFullYear() + " "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds()
    let created_at = currentData.created_at

    Axios.put(`https://backendexample.sanbersy.com/api/games/${editId}`,{name, genre, singlePlayer, multiplayer,platform, release, image_url, created_at, updated_at})
    .then(res => {
      console.log(res)
    })
    setIsEdit(false)
  }

  return (
    <div>
      <Title>Game Edit</Title>
      <form>
        <label>Name : </label>
        <input type="text" name="inpName" onChange={handleChangeName} value={inpName} />
        <label>Genre : </label>
        <input type="text" name="inpGenre" onChange={handleChangeGenre} value={inpGenre} />
        <label>Single Player : </label>
        <input type="text" name="inpSinglePlayer" onChange={handleChangeSingle} value={inpSinglePlayer} />
        <label>Multi Player : </label>
        <input type="text" name="inpMultiPlayer" onChange={handleChangeMulti} value={inpMultiPlayer} />
        <label>Platform : </label>
        <input type="text" name="inpPlatform" onChange={handleChangePlatform} value={inpPlatform} />
        <label>Release : </label>
        <input type="text" name="inpRelease" onChange={handleChangeRelease} value={inpRelease} />
        <label>Image_URL : </label>
        <input type="text" name="inpImage_URL" onChange={handleChangeImage} value={inpImage_URL} />
        <input type="submit" onClick={cancelEdit} value="Cancel"/>
        <input type="submit" onClick={handleSubmit} value="Submit" />
      </form>
    </div>
  )
}

const GameAdmin = () => {
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

export default GameAdmin